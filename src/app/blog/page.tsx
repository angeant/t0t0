import { supabase, BlogArticle } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import Link from "next/link";

async function getArticles(): Promise<BlogArticle[]> {
  const { data, error } = await supabase
    .from('t0t0_blog')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  return data || [];
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 text-[#999] hover:text-[#FF6D1F] transition-colors text-sm">
            <span>{"<"}</span>
            <span>volver</span>
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF6D1F] text-xl">{">"}</span>
            <h1 className="text-2xl font-bold text-[#222] tracking-tight">
              blog
            </h1>
            <span className="cursor-blink text-[#FF6D1F]">_</span>
          </div>
          <p className="text-sm text-[#666] font-mono">
            Aprendizajes, experimentos y pensamientos sobre lo que construimos.
          </p>
        </header>

        {/* Articles */}
        <section>
          <div className="grid gap-4">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card
                  className={`
                    bg-[#F5E7C6]/50 border-[#E5DCC8] 
                    hover:bg-[#F5E7C6] hover:border-[#D5CCA8]
                    transition-all duration-200 cursor-pointer
                    py-4 px-5 group
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#999] text-sm group-hover:text-[#FF6D1F] transition-colors">
                        #
                      </span>
                      <h2 className="font-medium text-[#222] group-hover:text-[#222]">
                        {article.title}
                      </h2>
                    </div>
                    <span className="text-xs text-[#999] font-mono flex-shrink-0">
                      {article.published_at 
                        ? new Date(article.published_at).toLocaleDateString('es-AR')
                        : ''
                      }
                    </span>
                  </div>
                  {article.excerpt && (
                    <p className="text-sm text-[#666] ml-5">
                      {article.excerpt}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-[#999] text-sm font-mono">
              No hay artículos todavía...
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E5DCC8]">
          <div className="flex items-center justify-between text-xs text-[#999]">
            <Link href="/" className="hover:text-[#FF6D1F] transition-colors">
              ← t0t0 + Ulish
            </Link>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/t0t0_btc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                @t0t0_btc
              </a>
              <a
                href="https://twitter.com/uguareschi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                @uguareschi
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

