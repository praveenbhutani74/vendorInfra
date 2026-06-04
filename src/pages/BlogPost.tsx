import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/pages/Blog";
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { setPageSeo, resetPageSeo } from "@/lib/seo";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const postIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  useEffect(() => {
    if (post) {
      setPageSeo({
        title: `${post.title} | Vendor Infra Blog`,
        description: post.preview,
      });
    }
    return () => resetPageSeo();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#00274d] mb-4">Article not found</h2>
            <Link href="/blog" className="text-[#edad1a] hover:underline font-semibold">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section data-preserve-hero-typography className="relative bg-[#00274d] text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#edad1a]" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#edad1a] text-sm font-semibold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-3 py-1 text-xs font-semibold text-[#edad1a] uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#edad1a]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#edad1a]" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <main className="flex-1 bg-white py-14">
        <div className="container mx-auto max-w-3xl px-4">
          <article className="prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:text-[#00274d]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-[#00274d]
            prose-li:text-gray-600
          ">
            {paragraphs.map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-semibold text-[#00274d] mt-10 mb-4 pb-2 border-b border-gray-100">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("**") && trimmed.includes("**:")) {
                const [boldPart, ...rest] = trimmed.split("**:");
                const label = boldPart.replace("**", "");
                return (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">
                    <strong className="text-[#00274d] font-bold">{label}:</strong>
                    {rest.join("**:")}
                  </p>
                );
              }

              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").filter(l => l.startsWith("- "));
                return (
                  <ul key={i} className="list-none space-y-2 mb-6">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#edad1a] shrink-0" />
                        <span>{item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="text-gray-600 leading-relaxed mb-5">
                  {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              );
            })}
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col gap-1 border border-gray-200 rounded-xl p-5 hover:border-[#edad1a] hover:shadow-md transition-all">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </span>
                <span className="text-sm font-semibold text-[#00274d] group-hover:text-[#edad1a] transition-colors leading-snug line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col gap-1 border border-gray-200 rounded-xl p-5 hover:border-[#edad1a] hover:shadow-md transition-all text-right sm:ml-auto sm:w-full">
                <span className="flex items-center justify-end gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold text-[#00274d] group-hover:text-[#edad1a] transition-colors leading-snug line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] font-semibold px-6 py-3 rounded-full transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
