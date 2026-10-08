-- SQL Schema and Seed Data for Adhimas Batik Website
-- Compatible with PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- SHA256 hashed password or managed via Supabase Auth
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    image TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    motif VARCHAR(255) NOT NULL DEFAULT '',
    technique VARCHAR(255) NOT NULL DEFAULT '',
    material VARCHAR(255) NOT NULL DEFAULT '',
    color VARCHAR(255) NOT NULL DEFAULT '',
    size VARCHAR(255) NOT NULL DEFAULT '',
    price DECIMAL(12, 2) NOT NULL DEFAULT 0,
    stock_status VARCHAR(50) NOT NULL DEFAULT 'Tersedia',
    short_description TEXT DEFAULT '',
    description TEXT DEFAULT '',
    philosophy TEXT DEFAULT '',
    story TEXT DEFAULT '',
    production_time VARCHAR(255) DEFAULT '',
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL DEFAULT 'Karya & Produk',
    image TEXT NOT NULL,
    alt VARCHAR(255) DEFAULT '',
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SITE CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(255) NOT NULL DEFAULT 'Adhimas Batik Sembagi',
    logo TEXT DEFAULT '',
    whatsapp VARCHAR(100) NOT NULL DEFAULT '6285845987124',
    email VARCHAR(255) NOT NULL DEFAULT 'halo@adhimasbatik.id',
    phone VARCHAR(100) NOT NULL DEFAULT '+62 858 45987124',
    address TEXT NOT NULL DEFAULT 'Jl. Mlati Tromol Pos 2, Sleman, D.I. Yogyakarta 55281',
    instagram VARCHAR(255) DEFAULT '@adhimasbatik',
    tiktok VARCHAR(255) DEFAULT '@adhimasbatik',
    opening_hours VARCHAR(255) DEFAULT 'Senin – Sabtu: 09.00 – 17.00 WIB (Minggu Tutup)',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);

-- RLS POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read gallery" ON public.gallery;
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read site_config" ON public.site_config;
CREATE POLICY "Public read site_config" ON public.site_config FOR SELECT USING (true);

-- PUBLIC INSERT FOR INQUIRIES
DROP POLICY IF EXISTS "Public insert inquiries" ON public.contact_inquiries;
CREATE POLICY "Public insert inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- ALL ACCESS FOR AUTHENTICATED ADMINS AND ANON ADMIN OVERRIDES
DROP POLICY IF EXISTS "Admin full access categories" ON public.categories;
CREATE POLICY "Admin full access categories" ON public.categories FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access products" ON public.products;
CREATE POLICY "Admin full access products" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access gallery" ON public.gallery;
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin full access inquiries" ON public.contact_inquiries FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access site_config" ON public.site_config;
CREATE POLICY "Admin full access site_config" ON public.site_config FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access users" ON public.users;
CREATE POLICY "Admin full access users" ON public.users FOR ALL USING (true);

-- SEED DATA INITIALIZATION

-- 1. SITE CONFIG
INSERT INTO public.site_config (brand_name, whatsapp, email, phone, address, instagram, tiktok, opening_hours)
VALUES (
    'Adhimas Batik Sembagi',
    '6285845987124',
    'halo@adhimasbatik.id',
    '+62 858 45987124',
    'Jl. Mlati Tromol Pos 2, Sleman, D.I. Yogyakarta 55281',
    '@adhimasbatik',
    '@adhimasbatik',
    'Senin – Sabtu: 09.00 – 17.00 WIB (Minggu Tutup)'
) ON CONFLICT DO NOTHING;

-- 2. DEFAULT ADMIN USER (Password: admin123)
INSERT INTO public.users (email, password, role)
VALUES ('admin@adhimasbatik.id', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 3. CATEGORIES SEED
INSERT INTO public.categories (id, name, slug, description, image) VALUES
('11111111-1111-1111-1111-111111111111', 'Kain Batik', 'kain-batik', 'Koleksi kain batik tulis lembaran kualitas tinggi', 'https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800'),
('22222222-2222-2222-2222-222222222222', 'Kemeja Batik', 'kemeja-batik', 'Kemeja batik tulis pria bespoke matched pattern', 'https://images.pexels.com/photos/35243199/pexels-photo-35243199.jpeg?auto=compress&cs=tinysrgb&w=800'),
('33333333-3333-3333-3333-333333333333', 'Dress Batik', 'dress-batik', 'Gaun dan dress batik wanita anggun kontemporer', 'https://images.pexels.com/photos/20672197/pexels-photo-20672197.jpeg?auto=compress&cs=tinysrgb&w=800'),
('44444444-4444-4444-4444-444444444444', 'Outer Batik', 'outer-batik', 'Cardigan dan outer batik kasual modern', 'https://images.pexels.com/photos/35189098/pexels-photo-35189098.jpeg?auto=compress&cs=tinysrgb&w=800'),
('55555555-5555-5555-5555-555555555555', 'Batik Eksklusif', 'batik-eksklusif', 'Mahakarya batik tulis kraton istimewa', 'https://images.pexels.com/photos/13002518/pexels-photo-13002518.jpeg?auto=compress&cs=tinysrgb&w=800'),
('66666666-6666-6666-6666-666666666666', 'Limited Edition', 'limited-edition', 'Edisi terbatas bernomor seri kurasi museum', 'https://images.pexels.com/photos/32027613/pexels-photo-32027613.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (slug) DO NOTHING;

-- 4. PRODUCTS SEED
INSERT INTO public.products (slug, name, category_id, motif, technique, material, color, size, price, stock_status, short_description, description, philosophy, story, production_time, images) VALUES
('batik-tulis-parang-senja', 'Batik Tulis Parang Senja', '11111111-1111-1111-1111-111111111111', 'Parang', 'Batik Tulis Canting 100% Manual', 'Katun Premium', 'Gradasi Sogan & Terakota', '250 cm × 115 cm', 850000, 'Tersedia', 'Kain batik tulis dengan motif Parang dalam gradasi warna senja.', 'Kain batik tulis dengan motif Parang dalam gradasi warna senja yang hangat. Dikerjakan manual oleh pengrajin berpengalaman.', 'Motif Parang melambangkan keteguhan dan semangat yang tidak pernah padam.', 'Dikerjakan selama 4 minggu dengan teknik canting halus.', '4 Minggu', ARRAY['https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800']),
('batik-tulis-kawung-aruna', 'Batik Tulis Kawung Aruna', '11111111-1111-1111-1111-111111111111', 'Kawung', 'Batik Tulis Canting 100% Manual', 'Primisima', 'Sogan & Hitam Pekat', '250 cm × 115 cm', 1200000, 'Tersedia', 'Motif Kawung melambangkan keseimbangan.', 'Motif Kawung yang melambangkan keseimbangan, dihadirkan pada kain primisima dengan teknik batik tulis penuh ketelitian.', 'Kawung merepresentasikan empat penjuru angin dan kesucian hati.', 'Dibuat oleh pembatik senior di Sleman.', '5 Minggu', ARRAY['https://images.pexels.com/photos/35296787/pexels-photo-35296787.jpeg?auto=compress&cs=tinysrgb&w=800']),
('batik-tulis-sido-mukti', 'Batik Tulis Sido Mukti', '66666666-6666-6666-6666-666666666666', 'Sido Mukti', 'Batik Tulis Sutra Halus', 'Sutra', 'Emas & Sogan', '250 cm × 115 cm', 1750000, 'Limited Edition', 'Edisi terbatas motif Sido Mukti sutra.', 'Edisi terbatas motif Sido Mukti pada kain sutra premium. Setiap helai bernilai harapan akan kehidupan yang penuh kebahagiaan.', 'Sido Mukti mengandung doa kemakmuran dan keberkahan.', 'Mahakarya koleksi museum yang diproduksi terbatas.', '6 Minggu', ARRAY['https://images.pexels.com/photos/32027613/pexels-photo-32027613.jpeg?auto=compress&cs=tinysrgb&w=800']),
('kemeja-batik-parang-klasik', 'Kemeja Batik Parang Klasik', '22222222-2222-2222-2222-222222222222', 'Parang', 'Batik Tulis Bespoke', 'Katun Premium', 'Cokelat Sogan', 'S, M, L, XL', 650000, 'Tersedia', 'Kemeja siap pakai motif Parang.', 'Kemeja siap pakai dengan motif Parang klasik. Potongan modern yang nyaman untuk acara formal maupun santai.', 'Goresan Parang yang konsisten menegaskan wibawa.', 'Dipotong dan dijahit presisi menyambung motif.', '3 Minggu', ARRAY['https://images.pexels.com/photos/35243199/pexels-photo-35243199.jpeg?auto=compress&cs=tinysrgb&w=800']),
('dress-batik-sekar-jagad', 'Dress Batik Sekar Jagad', '33333333-3333-3333-3333-333333333333', 'Sekar Jagad', 'Batik Tulis Kombinasi', 'Katun Premium', 'Multi-color Natural', 'S, M, L', 1100000, 'Tersedia', 'Dress feminin motif Sekar Jagad.', 'Dress dengan motif Sekar Jagad yang feminin dan elegan. Desain kontemporer yang merangkul tradisi.', 'Sekar Jagad melambangkan keindahan keberagaman dunia.', 'Rancangan desainer kontemporer berbasis batik tulis.', '4 Minggu', ARRAY['https://images.pexels.com/photos/20672197/pexels-photo-20672197.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (slug) DO NOTHING;

-- 5. GALLERY SEED
INSERT INTO public.gallery (title, category, image, alt, description) VALUES
('Pengrajin membatik dengan canting', 'Proses Pembuatan', 'https://images.pexels.com/photos/35189098/pexels-photo-35189098.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pengrajin membatik dengan canting', 'Proses pencanting canting halus oleh pengrajin berpengalaman di sanggar.'),
('Kain batik dengan beragam warna', 'Karya & Produk', 'https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kain batik dengan beragam warna', 'Hasil pengeringan kain batik tulis di bawah sinar matahari alami.'),
('Detail tangan mencanting', 'Pengrajin', 'https://images.pexels.com/photos/11218875/pexels-photo-11218875.jpeg?auto=compress&cs=tinysrgb&w=800', 'Detail tangan mencanting', 'Ketelitian jemari pengrajin saat menorehkan cairan malam panas.'),
('Pengrajin membuat pola batik', 'Workshop & Studio', 'https://images.pexels.com/photos/35243199/pexels-photo-35243199.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pengrajin membuat pola batik', 'Suasana kerja yang tenang dan tertata di studio batik kami.')
ON CONFLICT DO NOTHING;
