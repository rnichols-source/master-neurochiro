import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  return {
    title: `${post.title} | NeuroChiro Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = getPostData(slug);

  return (
    <div className="min-h-screen bg-brand-cream">
      <MastermindHeader />

      <article className="pt-48 pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Link href="/resources/blog" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange mb-12 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Training Blog
          </Link>

          {/* Header */}
          <header className="space-y-8 mb-16">
            <div className="px-4 py-2 bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest inline-block rounded-xl">
              {post.category}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-navy tracking-tighter leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-brand-navy/5">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-gray">
                <Calendar className="w-4 h-4 text-brand-orange" /> {post.date}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-gray">
                <User className="w-4 h-4 text-brand-orange" /> Dr. Raymond Nichols
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-brand max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA Footer */}
          <div className="mt-24 pt-24 border-t border-brand-navy/5">
            <EliteCard className="p-12 bg-brand-navy text-white border-none relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange" />
               <div className="space-y-8 relative z-10 text-center">
                  <h2 className="text-4xl font-black tracking-tight leading-none">Ready to Master Your Practice?</h2>
                  <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">
                    This training is just a fraction of what we install inside the 8-week NeuroChiro Mastermind. 
                    If you're ready for clinical certainty, apply today.
                  </p>
                  <Link href="/apply" className="inline-block">
                    <BrandButton variant="accent" size="lg" className="group py-6 px-12">
                      Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </BrandButton>
                  </Link>
               </div>
            </EliteCard>
          </div>
        </div>
      </article>

      <SEOFooter />
    </div>
  );
}
