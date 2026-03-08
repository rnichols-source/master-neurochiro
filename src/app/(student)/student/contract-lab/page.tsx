"use client";

import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  MessageSquare, 
  FileCheck,
  ArrowRight,
  Upload,
  PlayCircle,
  Briefcase,
  X,
  AlertTriangle,
  Lightbulb,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContractLabPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<any>(null);

  const modules = [
    {
      id: "mod1",
      title: "How Contracts Work",
      description: "Understand base vs. bonus, independent contractor vs employee, and standard collections models.",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      content: {
        intro: "The Chiropractic Associate Agreement is the foundation of your professional career. Understanding how you get paid is step one.",
        sections: [
          {
            title: "Salary vs. Percentage Pay",
            text: "Salary provides stability, while percentage (collections) offers high upside. Most fair contracts offer a base salary 'floor' plus a percentage of what you collect over a certain amount."
          },
          {
            title: "Base + Bonus Structures",
            text: "Example: $70,000 base salary + 25% of all collections over $15,000/month. This aligns your goals with the clinic's success."
          },
          {
            title: "Employee (W-2) vs. Contractor (1099)",
            text: "Employees get taxes withheld and often benefits. Contractors are responsible for their own taxes and equipment. Be wary of 'Contractor' roles where the owner still controls your schedule—that's usually an IRS misclassification."
          }
        ]
      }
    },
    {
      id: "mod2",
      title: "Contract Red Flags",
      description: "Learn to identify unreasonable non-competes, unrealistic quotas, and hidden clauses.",
      icon: ShieldAlert,
      color: "bg-red-100 text-red-600",
      content: {
        intro: "Protect your future self. Predatory clauses can trap you in a bad situation for years.",
        sections: [
          {
            title: "Unreasonable Non-Competes",
            text: "Red Flag: A 20-mile radius in a dense city. Standard should be 5-10 miles for 1-2 years. Anything more is designed to force you out of the region entirely.",
            isWarning: true
          },
          {
            title: "Unrealistic Production Quotas",
            text: "Red Flag: Requiring 150+ visits per week in your first month. This leads to burnout and compromised clinical integrity.",
            isWarning: true
          },
          {
            title: "Vague Termination",
            text: "Red Flag: 'Termination for any reason at any time with no notice.' You need at least 30-90 days notice to ensure patient continuity of care.",
            isWarning: true
          }
        ]
      }
    },
    {
      id: "mod3",
      title: "Fair Agreements",
      description: "Explore what a healthy, balanced employment contract actually looks like.",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      content: {
        intro: "A win-win contract focuses on long-term sustainability and clinical excellence.",
        sections: [
          {
            title: "The Mentorship Clause",
            text: "A fair contract for a new grad MUST define mentorship. Look for: '1 hour of weekly 1-on-1 clinical review' and 'Technique mastery sessions'."
          },
          {
            title: "Malpractice & CE",
            text: "The clinic should ideally cover your malpractice insurance and provide a stipend for Continuing Education (CE) seminars."
          },
          {
            title: "Clear Buy-In Pathways",
            text: "If ownership is the goal, look for a 'Right of First Refusal' or a defined timeline (e.g., 'After 24 months, parties will discuss equity options based on X metrics')."
          }
        ]
      }
    },
    {
      id: "mod5",
      title: "Negotiation Playbook",
      description: "Scripts and strategies to confidently ask for better compensation and mentorship terms.",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
      content: {
        intro: "Negotiation isn't confrontation; it's clarification. Use these frameworks to get what you need.",
        sections: [
          {
            title: "The 'Base Floor' Script",
            text: "Script: 'I am very excited about the clinic culture. Based on the cost of living in this area, I'd like to discuss raising the base floor to $X to ensure I can focus entirely on clinical excellence without financial stress.'"
          },
          {
            title: "Negotiating the Non-Compete",
            text: "Script: 'The current 15-mile radius would prevent me from living in my current neighborhood if we ever parted ways. Can we adjust this to a 5-mile radius to be more in line with standard associate agreements?'"
          },
          {
            title: "Asking for Buy-In Clarity",
            text: "Script: 'I see myself staying here long-term. Can we add a clause that defines a formal review of partnership potential after my second year?'"
          }
        ]
      }
    },
    {
      id: "mod7",
      title: "Contract Examples",
      description: "Review real-world templates for associate roles, buy-ins, and independent contractors.",
      icon: FileCheck,
      color: "bg-neuro-orange/20 text-neuro-orange",
      content: {
        intro: "Study these templates to see how professional agreements are structured.",
        sections: [
          {
            title: "Standard Associate Agreement",
            text: "Download our 'Gold Standard' template. Includes tiered bonuses and 60-day termination notice.",
            hasDownload: true
          },
          {
            title: "Mentorship-Heavy Contract",
            text: "Best for new grads. Lower base pay but guaranteed $5k/year in seminar credits and 4 hours/week of 1-on-1 coaching.",
            hasDownload: true
          },
          {
            title: "Independent Contractor Template",
            text: "Use this if you are 'renting' a room but want to remain under the NeuroChiro umbrella.",
            hasDownload: true
          }
        ]
      }
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-neuro-navy flex items-center gap-3">
            <Scale className="w-8 h-8 text-neuro-orange" />
            Contract Lab
          </h1>
          <p className="text-neuro-gray mt-2 text-lg max-w-2xl">
            Evaluate, understand, and negotiate employment contracts with confidence. Don't sign until you know what you're agreeing to.
          </p>
        </div>
      </header>

      {/* Interactive Tools Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setActiveTool("analyzer")}
          className="bg-neuro-navy text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-neuro-orange/20 blur-3xl -mr-24 -mt-24 group-hover:bg-neuro-orange/30 transition-colors"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="p-4 bg-white/10 w-fit rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-neuro-orange" />
            </div>
            <h3 className="text-2xl font-black mb-2">Contract Breakdown Tool</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Upload or paste an employment contract. Our AI will highlight compensation, non-competes, termination clauses, and flag potential risks.
            </p>
            <div className="mt-auto flex items-center gap-2 text-neuro-orange font-bold uppercase tracking-widest text-sm">
              Analyze a Contract <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTool("comparison")}
          className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm group cursor-pointer hover:border-neuro-orange transition-all"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 bg-gray-50 w-fit rounded-2xl mb-6 group-hover:bg-neuro-orange/10 transition-colors">
              <Briefcase className="w-8 h-8 text-neuro-navy group-hover:text-neuro-orange transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-neuro-navy mb-2">Offer Comparison Tool</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Weigh multiple job offers side-by-side. Compare salary, bonus structures, mentorship quality, and non-compete distances objectively.
            </p>
            <div className="mt-auto flex items-center gap-2 text-neuro-navy font-bold uppercase tracking-widest text-sm group-hover:text-neuro-orange transition-colors">
              Compare Offers <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Educational Modules */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-black text-neuro-navy">Knowledge Modules</h2>
          <button className="text-sm font-bold text-neuro-orange hover:underline">View All Resources</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div 
              key={mod.id} 
              onClick={() => setActiveModule(mod)}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full active:scale-95 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-2xl ${mod.color}`}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neuro-navy text-lg group-hover:text-neuro-orange transition-colors leading-tight">
                  {mod.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 flex-1">{mod.description}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-neuro-navy transition-colors">
                <PlayCircle className="w-4 h-4" /> Start Module
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contract Analyzer Modal */}
      <AnimatePresence>
        {activeTool === "analyzer" && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-neuro-navy/40">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-neuro-navy text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Search className="w-6 h-6 text-neuro-orange" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Contract Breakdown Tool</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">AI-Powered Clause Analysis</p>
                  </div>
                </div>
                <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto bg-gray-50">
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center cursor-pointer hover:border-neuro-orange hover:bg-neuro-orange/5 transition-all group">
                  <Upload className="w-12 h-12 text-gray-300 group-hover:text-neuro-orange mb-4 transition-colors" />
                  <h4 className="text-xl font-bold text-neuro-navy mb-2">Upload or Paste Contract</h4>
                  <p className="text-sm text-gray-500 max-w-md">
                    Upload a PDF or DOCX file, or paste the text directly. We will analyze the terms for compensation, non-competes, and red flags.
                  </p>
                  <button className="mt-6 px-8 py-3 bg-neuro-navy text-white font-black rounded-xl text-sm uppercase tracking-widest shadow-lg">Browse Files</button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 text-red-500 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-widest">We look for Red Flags</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Unreasonable non-compete radius (e.g., &gt;15 miles)</li>
                      <li>• Indefinite non-solicitation clauses</li>
                      <li>• Vague bonus structures</li>
                      <li>• Unfair termination penalties</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 text-green-500 mb-3">
                      <Lightbulb className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-widest">We Highlight Fair Terms</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Clear base salary + collection percentages</li>
                      <li>• Defined mentorship expectations</li>
                      <li>• Standard malpractice insurance coverage</li>
                      <li>• Equitable exit strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Offer Comparison Modal */}
        {activeTool === "comparison" && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-neuro-navy/40">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-neuro-orange/10 rounded-xl">
                    <Scale className="w-6 h-6 text-neuro-orange" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-neuro-navy">Offer Comparison</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Evaluate Your Options</p>
                  </div>
                </div>
                <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-3 gap-6">
                  {/* Labels Column */}
                  <div className="space-y-6 pt-16">
                    <div className="h-12 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">Base Salary</div>
                    <div className="h-12 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">Bonus Structure</div>
                    <div className="h-12 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">Non-Compete</div>
                    <div className="h-12 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">Mentorship</div>
                    <div className="h-12 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">PTO & Benefits</div>
                  </div>

                  {/* Offer 1 */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
                    <input type="text" placeholder="Offer A (e.g. Clinic X)" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-neuro-navy focus:outline-none focus:border-neuro-orange mb-6" />
                    <div className="space-y-6">
                      <input type="text" placeholder="$75,000" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                      <input type="text" placeholder="30% over $15k/mo" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                      <input type="text" placeholder="10 miles, 2 years" className="w-full h-12 bg-white border-red-200 bg-red-50 rounded-xl px-4 text-sm focus:outline-none focus:border-red-400 text-red-900" />
                      <input type="text" placeholder="Weekly 1-on-1s" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                      <input type="text" placeholder="14 days PTO + Health" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                    </div>
                  </div>

                  {/* Offer 2 */}
                  <div className="bg-neuro-navy/5 rounded-3xl p-6 border border-neuro-navy/10 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neuro-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      Stronger Offer
                    </div>
                    <input type="text" placeholder="Offer B (e.g. Clinic Y)" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-neuro-navy focus:outline-none focus:border-neuro-orange mb-6" />
                    <div className="space-y-6">
                      <input type="text" placeholder="$85,000" className="w-full h-12 bg-green-50 border-green-200 rounded-xl px-4 text-sm focus:outline-none text-green-900 font-bold" />
                      <input type="text" placeholder="25% of collections" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                      <input type="text" placeholder="5 miles, 1 year" className="w-full h-12 bg-green-50 border-green-200 rounded-xl px-4 text-sm focus:outline-none text-green-900 font-bold" />
                      <input type="text" placeholder="Unclear" className="w-full h-12 bg-red-50 border-red-200 rounded-xl px-4 text-sm focus:outline-none text-red-900" />
                      <input type="text" placeholder="10 days PTO" className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-neuro-orange" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Module Content Viewer */}
        {activeModule && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-md bg-neuro-navy/60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 50 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className={`p-8 ${activeModule.color} flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <activeModule.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl">{activeModule.title}</h3>
                </div>
                <button onClick={() => setActiveModule(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-10 flex-1 overflow-y-auto space-y-8">
                <p className="text-lg font-medium text-neuro-navy leading-relaxed italic border-l-4 border-neuro-orange pl-6">
                  "{activeModule.content.intro}"
                </p>

                <div className="space-y-8">
                  {activeModule.content.sections.map((section: any, i: number) => (
                    <div key={i} className={`p-6 rounded-3xl border ${section.isWarning ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                      <h4 className={`font-black uppercase tracking-widest text-xs mb-3 ${section.isWarning ? 'text-red-600' : 'text-neuro-navy'}`}>
                        {section.isWarning && <AlertTriangle className="w-3 h-3 inline mr-1 mb-0.5" />}
                        {section.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {section.text}
                      </p>
                      {section.hasDownload && (
                        <button className="mt-4 flex items-center gap-2 text-neuro-orange font-bold text-xs uppercase tracking-widest hover:underline">
                          <Upload className="w-4 h-4 rotate-180" /> Download Template
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                  <button 
                    onClick={() => setActiveModule(null)}
                    className="w-full py-4 bg-neuro-navy text-white font-black rounded-2xl shadow-xl hover:bg-neuro-navy-light transition-all uppercase tracking-widest text-xs"
                  >
                    Finish Module & Return
                  </button>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Estimated Read: 4 mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
