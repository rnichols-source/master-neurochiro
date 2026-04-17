import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import { EliteCard } from "@/components/ui/elite-ui";
import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiropractic Education & Business Resources | NeuroChiro Blog",
  description: "Explore the latest insights on chiropractic coaching, patient communication, practice management, and clinical certainty for modern chiropractors.",
};

export default function BlogListingPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-brand-cream">
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Education & Insights</p>
          <h1 className="text-7xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            The NeuroChiro <br />
            <span className="text-brand-orange">Training Blog.</span>
          </h1>
          <p className="text-xl text-brand-gray font-medium max-w-2xl mx-auto">
            Actionable strategies for chiropractic business growth, patient conversion, and clinical authority.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/resources/blog/${post.slug}`}>
                  <EliteCard className="h-full group hover:border-brand-orange/40 transition-all flex flex-col p-8 bg-white border-brand-navy/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="px-3 py-1 bg-brand-navy/5 rounded-lg">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-navy/60">{post.category}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-brand-navy mb-4 group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-brand-gray text-sm leading-relaxed mb-8 flex-grow">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-brand-navy/5">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-gray uppercase tracking-widest">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-black text-brand-orange uppercase tracking-widest">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </EliteCard>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-brand-navy/5 space-y-3">
              <p className="text-lg font-black text-brand-navy">Resources are shared inside the Mastermind portal.</p>
              <p className="text-sm text-brand-gray font-medium">Members get access to scripts, playbooks, and training materials after enrollment.</p>
            </div>
          )}
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
