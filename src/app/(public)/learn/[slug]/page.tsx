"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Zap, ShieldCheck, CheckCircle2, MapPin, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Article Header */}
      <header className="bg-neuro-cream pt-32 pb-16 px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link href="/learn" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:text-neuro-orange transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-neuro-orange/10 text-neuro-orange text-[10px] font-black uppercase tracking-widest rounded-md">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Clock className="w-3 h-3" /> {article.readTime} read
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-neuro-navy leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              {article.intro}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16">
          <article className="space-y-12">
            {article.sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-2xl font-bold text-neuro-navy">{section.heading}</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}

            {/* Key Takeaways Card */}
            <div className="bg-neuro-navy rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Brain className="w-32 h-32" />
               </div>
               <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-neuro-orange" /> Key Takeaways
               </h3>
               <ul className="space-y-4">
                  {article.takeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                       <CheckCircle2 className="w-5 h-5 text-neuro-orange shrink-0 mt-1" />
                       <span className="text-gray-300 font-medium">{point}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </article>
        </div>

        {/* Global Journey CTA */}
        <section className="mt-24 pt-24 border-t border-gray-100 text-center space-y-10">
           <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl font-heading font-black text-neuro-navy">Experience this for yourself.</h2>
              <p className="text-gray-500 font-medium">
                Our doctors specialize in regulating the vagus nerve and supporting autonomic harmony.
              </p>
           </div>
           <Link href="/directory" className="inline-flex items-center gap-3 px-12 py-6 bg-neuro-orange text-white font-black uppercase tracking-widest rounded-2xl hover:bg-neuro-orange-light shadow-2xl transition-all group">
              Find a Doctor Near You <MapPin className="w-5 h-5 group-hover:animate-bounce" />
           </Link>
           
           <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link href="/learn/repetition" className="p-6 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                 <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Reading</p>
                    <p className="font-bold text-neuro-navy">Why Repetition Matters</p>
                 </div>
                 <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-neuro-orange group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/learn/faq" className="p-6 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                 <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Questions?</p>
                    <p className="font-bold text-neuro-navy">View Patient FAQs</p>
                 </div>
                 <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-neuro-orange group-hover:translate-x-1 transition-all" />
              </Link>
           </div>
        </section>
      </main>
    </div>
  );
}
