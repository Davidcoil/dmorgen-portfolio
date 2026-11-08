-- ============================================================================
-- הבית של דוד: סכמת הנתונים (FOUNDATION §3.3, §5)
-- ----------------------------------------------------------------------------
-- עיקרון אחד: הדפדפן קורא רק מה שציבורי, וכותב כלום. כל כתיבה עוברת דרך
-- route handler בשרת עם service role, שם יושבים Turnstile, מגבלת קצב ומודרציה.
-- לכן RLS פתוח ל-SELECT על שורות שפורסמו בלבד, ואין אף מדיניות INSERT ל-anon.
-- להריץ: Supabase Dashboard > SQL editor, או `supabase db push`.
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------- marks: חותמות על הקיר ----------
create table if not exists public.marks (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 40),
  text          text not null check (char_length(text) between 1 and 280),
  lang          text not null default 'he' check (lang in ('he','en')),
  source        text not null default 'visitor' check (source in ('visitor','client','google')),
  status        text not null default 'pending' check (status in ('pending','approved','rejected')),
  ip_hash       text,                       -- sha256(ip + daily salt), למגבלת קצב בלבד, נמחק אחרי 30 יום
  moderation    jsonb,                      -- מה ה-AI סימן, לבדיקה של דוד
  external_id   text unique                 -- מזהה ביקורת גוגל, למניעת כפילויות
);
create index if not exists marks_public_idx on public.marks (created_at desc) where status = 'approved';

-- ---------- thoughts: ההזרקות מהטלגרם ----------
create table if not exists public.thoughts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  published_at  timestamptz,
  kind          text not null check (kind in ('thought','photo','built')),
  body_he       text not null,
  body_en       text,
  image_path    text,                       -- נתיב ב-Storage bucket "thoughts"
  pinned        boolean not null default false,
  status        text not null default 'draft' check (status in ('draft','published','deleted')),
  telegram_msg  bigint unique
);
create index if not exists thoughts_public_idx on public.thoughts (published_at desc) where status = 'published';

-- ---------- doors: דריסת מצב הדלת מ-/admin ----------
create table if not exists public.doors (
  slug          text primary key,
  door          text not null check (door in ('open','locked','soon')),
  sign_he       text,
  sign_en       text,
  unlock        jsonb not null default '"everyone"',
  updated_at    timestamptz not null default now()
);

-- ---------- events: הקרנות, קפה, סדנאות ----------
create table if not exists public.events (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null check (kind in ('screening','coffee','workshop')),
  title_he      text not null,
  title_en      text,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  capacity      int,
  url           text,
  status        text not null default 'scheduled' check (status in ('scheduled','full','done','cancelled'))
);

-- ---------- leads: מי השאיר פרטים, ולמה ----------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  path          text,                       -- simcha / business / ai / looking / coffee
  name          text,
  phone         text,
  email         text,
  message       text check (char_length(message) <= 2000),
  consent_marketing boolean not null default false,  -- חוק הספאם: רק אם סימנו
  source        text,                       -- counter / coffee / library
  ip_hash       text
);

-- ---------- orders: מה נקנה (הסליקה אצל הספק, לא כאן) ----------
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  product       text not null,
  amount_agorot int not null check (amount_agorot >= 0),
  currency      text not null default 'ILS',
  provider      text not null,              -- smartbee / other
  provider_ref  text unique,                -- מזהה העסקה אצל הספק. אף פעם לא פרטי כרטיס
  status        text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  buyer_email   text,
  buyer_name    text,
  invoice_url   text
);

-- ---------- consents: הסכמות לפנים, לקטינים, ל-AI ----------
create table if not exists public.consents (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('gallery','game','ai_training','minor')),
  subject_name  text not null,
  guardian_name text,                       -- חובה כש-kind = minor
  contact       text not null,
  scope         text not null,              -- מה בדיוק הותר
  expires_at    timestamptz,                -- ל-AI: מחיקת נתוני אימון אחרי התאריך
  revoked_at    timestamptz,
  evidence      jsonb                       -- איך ההסכמה ניתנה (טופס, הודעה, חתימה)
);

-- ============================================================================
-- RLS: הכול נעול. anon קורא רק מה שפורסם. כתיבה: רק service role (בשרת).
-- ============================================================================
alter table public.marks    enable row level security;
alter table public.thoughts enable row level security;
alter table public.doors    enable row level security;
alter table public.events   enable row level security;
alter table public.leads    enable row level security;
alter table public.orders   enable row level security;
alter table public.consents enable row level security;

create policy "marks: public reads approved"
  on public.marks for select to anon, authenticated
  using (status = 'approved');

create policy "thoughts: public reads published"
  on public.thoughts for select to anon, authenticated
  using (status = 'published');

create policy "doors: public reads all"
  on public.doors for select to anon, authenticated
  using (true);

create policy "events: public reads upcoming"
  on public.events for select to anon, authenticated
  using (status in ('scheduled','full'));

-- leads, orders, consents: אין מדיניות ל-anon בכלל. רק service role רואה.

-- ============================================================================
-- תצוגה ציבורית רזה לקיר: בלי ip_hash ובלי moderation, גם אם מישהו ינסה לבחור אותם.
-- ============================================================================
create or replace view public.wall as
  select id, created_at, name, text, lang, source
  from public.marks
  where status = 'approved'
  order by created_at desc;

-- ============================================================================
-- ניקוי: ip_hash נמחק אחרי 30 יום (פרטיות). להריץ מה-Cron הלילי.
-- ============================================================================
create or replace function public.scrub_ip_hashes() returns void
language sql security definer as $$
  update public.marks set ip_hash = null where ip_hash is not null and created_at < now() - interval '30 days';
  update public.leads set ip_hash = null where ip_hash is not null and created_at < now() - interval '30 days';
$$;

-- Realtime לנוכחות ("3 אנשים בבית") משתמש ב-Presence channels, לא בטבלה. אין מה להוסיף כאן.
