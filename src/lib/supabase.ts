import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uimqzfmspegwzmdoqjfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbXF6Zm1zcGVnd3ptZG9xamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjU1OTcsImV4cCI6MjA2NDA0MTU5N30.kaVxrifHrs-5UgSIp9HQaNMVXoBeUM5j3HoEGs1-McQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  header_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

