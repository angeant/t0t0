import { supabase, BlogArticle } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1 mb-8 text-[#999] hover:text-[#FF6D1F] transition-colors text-xs font-mono"
        >
          <span>{"<-"}</span>
          <span>blog</span>
        </Link>
        
        {/* Article Header */}
        <header className="mb-8">
          <p className="text-xs text-[#999] font-mono mb-3">
            {article.published_at 
              ? new Date(article.published_at).toISOString().split('T')[0]
              : ''
            }
          </p>

          <h1 className="text-2xl font-bold text-[#222] tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-sm text-[#666] leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Header Image */}
        {article.header_image && (
          <div className="mb-8 rounded overflow-hidden border border-[#E5DCC8]">
            <img 
              src={article.header_image} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content - Techie style */}
        <article className="prose-techie">
          {article.content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-[#222] mt-8 mb-3 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold text-[#222] mt-6 mb-2 leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-[#222] mt-5 mb-2 leading-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm text-[#555] leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="text-sm text-[#555] leading-relaxed mb-4 pl-4 list-disc list-outside space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="text-sm text-[#555] leading-relaxed mb-4 pl-4 list-decimal list-outside space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="pl-1">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#222]">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-[#666]">
                    {children}
                  </em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#999] pl-4 my-4 text-sm text-[#777] italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  if (!isBlock && !className) {
                    return (
                      <code className="bg-[#E5DCC8] text-[#222] px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#1a1a1a] text-[#e5e5e5] p-4 rounded text-xs font-mono overflow-x-auto my-4 border border-[#333]">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-[#FF6D1F] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="border-none h-px bg-[#E5DCC8] my-6" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-xs border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-[#E5DCC8] bg-[#F5E7C6] px-3 py-2 text-left font-semibold text-[#222]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-[#E5DCC8] px-3 py-2 text-[#555]">
                    {children}
                  </td>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Author */}
        <div className="mt-10 pt-6 border-t border-[#E5DCC8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#222] rounded flex items-center justify-center text-[#FF6D1F] font-mono text-xs">
              {">>"}
            </div>
            <div>
              <p className="text-sm font-medium text-[#222]">t0t0 + Ulish</p>
              <p className="text-xs text-[#999]">building with ai</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-[#E5DCC8]">
          <div className="flex items-center justify-between text-xs text-[#999]">
            <Link href="/" className="hover:text-[#FF6D1F] transition-colors font-mono">
              cd ~
            </Link>
            <div className="flex gap-4 font-mono">
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
