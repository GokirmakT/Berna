create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category text not null,
  title text not null,
  image_url text not null default '',
  image_alt text not null default '',
  reading_time text not null default '',
  excerpt text not null default '',
  paragraphs jsonb not null default '[]'::jsonb
    check (jsonb_typeof(paragraphs) = 'array'),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.articles enable row level security;
alter table public.admin_users enable row level security;

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Anyone can read published articles" on public.articles;
create policy "Anyone can read published articles"
  on public.articles for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all articles" on public.articles;
create policy "Admins can read all articles"
  on public.articles for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can insert articles" on public.articles;
create policy "Admins can insert articles"
  on public.articles for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can update articles" on public.articles;
create policy "Admins can update articles"
  on public.articles for update
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can delete articles" on public.articles;
create policy "Admins can delete articles"
  on public.articles for delete
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Users can read their own admin status" on public.admin_users;
create policy "Users can read their own admin status"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view blog images" on storage.objects;
create policy "Anyone can view blog images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'blog-images'
    and exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'blog-images'
    and exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  )
  with check (
    bucket_id = 'blog-images'
    and exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'blog-images'
    and exists (
      select 1
      from public.admin_users
      where admin_users.user_id = auth.uid()
    )
  );

insert into public.articles (
  slug,
  category,
  title,
  image_url,
  image_alt,
  reading_time,
  excerpt,
  paragraphs,
  published,
  created_at
)
values
(
  'terapiye-baslamak',
  'Terapi süreci',
  'Terapiye başlamak üzerine',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&h=800&q=85',
  'Sabah ışığında sakin bir doğa manzarası',
  '4 dk okuma',
  'Terapiye başlama kararı çoğu zaman pek çok soruyu beraberinde getirir. İlk adımın nasıl görünebileceğine birlikte bakalım.',
  jsonb_build_array(
    'Terapiye başlamak için her şeyi önceden netleştirmiş olmak gerekmez. Bazen yalnızca bir süredir zorlayıcı gelen bir konuyu anlamak ya da yaşadıklarına başka bir yerden bakabilmek için destek arayışı yeterli bir başlangıçtır.',
    'İlk görüşmelerde ihtiyaçlar, beklentiler ve çalışma çerçevesi konuşulur. Sürecin nasıl ilerleyeceği kişiye ve ele alınan konulara göre şekillenir; sorularınızı görüşme sırasında paylaşabilirsiniz.'
  ),
  true,
  now() - interval '1 minute'
),
(
  'kaygiya-alan-acmak',
  'Duygular',
  'Kaygıyı anlamaya çalışmak',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&h=800&q=85',
  'Dağların arasında uzanan sakin bir göl',
  '5 dk okuma',
  'Kaygı, zaman zaman hepimizin deneyimlediği bir duygu. Onu fark etmek ve yaşamımızdaki yerini anlamak önemli bir başlangıç olabilir.',
  jsonb_build_array(
    'Kaygı bazen düşüncelerimizde, bazen bedenimizde kendini gösterebilir. Herkesin deneyimi farklıdır; bu nedenle kaygıyı tek bir tarifle açıklamak ya da herkese uyan bir çözüm önermek mümkün değildir.',
    'Nelerin kaygıyı artırdığını ve günlük yaşamı nasıl etkilediğini fark etmek, ihtiyaçları anlamaya yardımcı olabilir. Zorlanma uzun sürüyor veya yaşamınızı belirgin biçimde etkiliyorsa bir uzmandan destek almayı değerlendirebilirsiniz.'
  ),
  true,
  now() - interval '2 minutes'
),
(
  'iliskilerde-sinirlar',
  'İlişkiler',
  'İlişkilerde sınırlar üzerine',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=800&q=85',
  'Doğal bir patikayı çevreleyen yeşil ağaçlar',
  '3 dk okuma',
  'Sınırlar, yakınlığa engel olmak zorunda değil. İhtiyaçlarımızı ve kişisel alanımızı ifade etmenin ilişkilerdeki yerini keşfedelim.',
  jsonb_build_array(
    'Sınırlar, ilişkide neye ihtiyaç duyduğumuzu ve nelerin bizim için uygun olduğunu ifade etmemize yardımcı olur. Her ilişkide aynı şekilde görünmeleri gerekmez; koşullara ve kişilere göre değişebilirler.',
    'Bir ihtiyacı dile getirmek her zaman kolay olmayabilir. Kendi sınırlarınızı fark etmek ve bunları açık, saygılı bir dille paylaşmak üzerine düşünmek ilişkilerinizde yeni bir alan açabilir.'
  ),
  true,
  now() - interval '3 minutes'
)
on conflict (slug) do nothing;

-- Supabase Auth'ta admin hesabı oluşturduktan sonra kullanıcı UUID'sini ekleyin:
 insert into public.admin_users (user_id)
 values ('5976b94f-21f2-4df1-881e-50772ef59028');
