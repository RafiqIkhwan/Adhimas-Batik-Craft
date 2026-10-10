-- Revert Realtime publication membership added for the cancelled public-data integration.
-- Keep whatsapp_display and the hardened site_config policies in place.
DO $$
DECLARE
  table_name text;
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_publication
    WHERE pubname = 'supabase_realtime'
  ) THEN
    FOREACH table_name IN ARRAY ARRAY['products', 'categories', 'gallery', 'site_config']
    LOOP
      IF EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = table_name
      ) THEN
        EXECUTE format(
          'ALTER PUBLICATION %I DROP TABLE %I.%I',
          'supabase_realtime',
          'public',
          table_name
        );
      END IF;
    END LOOP;
  END IF;
END;
$$;
