import { supabase, BlogArticle } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getArticle(slug: string): Promise<BlogArticle | null> {
  const { data, error } = await supabase
    .from('t0t0_blog')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data;
}

// Simple markdown-like rendering
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-[#222] mb-4 mt-8 first:mt-0">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-[#222] mb-3 mt-6">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
      if (match) {
        elements.push(
          <li key={key++} className="text-[#666] mb-2 ml-4">
            <span className="font-medium text-[#222]">{match[1]}</span>: {match[2]}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-[#666] mb-2 ml-4">
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<br key={key++} />);
    } else {
      elements.push(
        <p key={key++} className="text-[#666] mb-4 leading-relaxed">
          {line}
        </p>
      );
    }
  }

  return elements;
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 mb-6 text-[#999] hover:text-[#FF6D1F] transition-colors text-sm">
            <span>{"<"}</span>
            <span>blog</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-[#999] font-mono mb-4">
            <span>#</span>
            <span>
              {article.published_at 
                ? new Date(article.published_at).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : ''
              }
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#222] tracking-tight mb-4">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg text-[#666] leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Header Image */}
        {article.header_image && (
          <div className="mb-8 rounded-lg overflow-hidden border border-[#E5DCC8]">
            <img 
              src={article.header_image} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose-custom">
          {article.content && renderContent(article.content)}
        </article>

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

