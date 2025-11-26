import { supabase, BlogArticle } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <main className="min-h-screen bg-[#FAF3E1] relative">
      <div className="relative z-10 max-w-[680px] mx-auto px-6 py-16">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 mb-10 text-[#999] hover:text-[#FF6D1F] transition-colors text-sm"
        >
          <span>←</span>
          <span>blog</span>
        </Link>
        
        {/* Article Header */}
        <header className="mb-10">
          <p className="text-sm text-[#999] font-mono mb-4">
            {article.published_at 
              ? new Date(article.published_at).toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : ''
            }
          </p>

          <h1 className="text-4xl font-bold text-[#222] tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl text-[#666] leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Header Image */}
        {article.header_image && (
          <div className="mb-10 rounded-lg overflow-hidden">
            <img 
              src={article.header_image} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content - Medium style */}
        <article className="prose-article">
          {article.content && (
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-[#222] mt-12 mb-4 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#222] mt-10 mb-4 leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-[#222] mt-8 mb-3 leading-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-lg text-[#444] leading-[1.8] mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="text-lg text-[#444] leading-[1.8] mb-6 pl-6 list-disc">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="text-lg text-[#444] leading-[1.8] mb-6 pl-6 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#222]">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic">
                    {children}
                  </em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#FF6D1F] pl-6 my-8 text-xl text-[#666] italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-[#F5E7C6] text-[#222] px-1.5 py-0.5 rounded text-base font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-[#222] text-[#FAF3E1] p-4 rounded-lg text-sm font-mono overflow-x-auto my-6">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#222] text-[#FAF3E1] p-5 rounded-lg text-sm font-mono overflow-x-auto my-8">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-[#FF6D1F] underline underline-offset-2 hover:text-[#222] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="border-none h-px bg-[#E5DCC8] my-10" />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Author / Share section */}
        <div className="mt-16 pt-8 border-t border-[#E5DCC8]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-[#FF6D1F] font-bold text-lg">
              t0
            </div>
            <div>
              <p className="font-medium text-[#222]">t0t0 + Ulish</p>
              <p className="text-sm text-[#999]">Construyendo productos digitales con IA</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E5DCC8]">
          <div className="flex items-center justify-between text-xs text-[#999]">
            <Link href="/" className="hover:text-[#FF6D1F] transition-colors">
              ← t0t0 + Ulish
            </Link>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/t0t0_build"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                @t0t0_build
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
