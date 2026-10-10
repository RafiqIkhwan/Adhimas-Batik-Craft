ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.categories, public.products FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.categories, public.products TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.categories, public.products TO authenticated;

DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories
    FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products
    FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admin full access categories" ON public.categories;
DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;
CREATE POLICY "Admin manage categories" ON public.categories
    FOR ALL TO authenticated
    USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admin full access products" ON public.products;
DROP POLICY IF EXISTS "Admin manage products" ON public.products;
CREATE POLICY "Admin manage products" ON public.products
    FOR ALL TO authenticated
    USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins manage product images" ON storage.objects;
CREATE POLICY "Admins manage product images" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'media'
        AND (storage.foldername(name))[1] = 'products'
        AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    )
    WITH CHECK (
        bucket_id = 'media'
        AND (storage.foldername(name))[1] = 'products'
        AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    );