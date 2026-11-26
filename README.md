# Berna

Klinik psikolog tanıtım sitesi ve Supabase destekli blog yönetimi.

## Yerel çalıştırma

Bağımlılıkları kurup Vite geliştirme sunucusunu başlatın:

```sh
npm install
npm run dev
```

Supabase bağlantı ayarları `.env.local` dosyasında tutulur. Gerekirse `.env.example`
dosyasını kopyalayıp `VITE_SUPABASE_URL` ve `VITE_SUPABASE_PUBLISHABLE_KEY`
değerlerini girin. Publishable key tarayıcıda kullanılmak içindir; `service_role`
anahtarını frontend ortam değişkenlerine veya kaynak koda koymayın.

## Supabase kurulumu

1. Supabase Dashboard > SQL Editor'da `supabase/setup.sql` dosyasının tamamını
   çalıştırın. Bu, blog tablosunu, RLS kurallarını ve `blog-images` Storage
   bucket'ını oluşturur; mevcut örnek yazıları da ekler. Yeni sürümlerdeki
   değişiklikleri mevcut projeye uygulamak için bu dosyayı yeniden çalıştırın.
2. Authentication > Users bölümünden admin için bir e-posta/şifre hesabı oluşturun.
   İsterseniz herkese açık kayıt olmayı Auth ayarlarından kapatın.
3. Admin kullanıcısının UUID'sini kopyalayıp SQL Editor'da aşağıdaki sorguyu
   çalıştırın:

   ```sql
   insert into public.admin_users (user_id)
   values ('ADMIN_AUTH_USER_UUID');
   ```

4. Siteyi açıp `/admin` adresinden bu hesapla giriş yapın. Panelden yazı
   oluşturabilir, taslakta tutabilir, yayımlayabilir, ana sayfada sabitleyebilir,
   silebilir ve görsel yükleyebilirsiniz. Ana sayfadaki yazılar sabitlenenler önce
   olacak şekilde, kendi grupları içinde yayın tarihine göre yeniden eskiye sıralanır.

Yayımlanmış yazılar `/yazilar` listesinde ve `/yazilar/:slug` detay sayfalarında
görünür. Blog görselleri herkese açık okunabilir; yükleme ve silme işlemleri
yalnızca `admin_users` tablosunda yetkilendirilmiş hesaplara açıktır.

Canlı ortama dağıtırken `VITE_SUPABASE_URL` ve
`VITE_SUPABASE_PUBLISHABLE_KEY` değerlerini hosting sağlayıcısının ortam
değişkenlerine de ekleyin.

## Kontroller

```sh
npm run lint
npm run build
```
