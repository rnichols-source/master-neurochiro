"use client";

import { 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Video, 
  UserCheck, 
  Target, 
  ArrowRight,
  ChevronRight,
  Search,
  BookOpen,
  Mic,
  Lightbulb,
  X,
  FileDown,
  ArrowLeft,
  RotateCcw,
  Volume2,
  Trophy,
  History,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewPrepPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [activeTrack, setActiveTrack] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentPracticeTrack, setCurrentPracticeTrack] = useState<any>(null);
  
  // Drill State
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const modules = [
    {
      id: "track-1",
      title: "First Impression Mastery",
      desc: "How to dress, speak, and present your clinical philosophy in the first 5 minutes.",
      icon: UserCheck,
      color: "text-blue-600 bg-blue-50",
      content: [
        "Clinical Attire: Modern professionalism vs standard scrubs.",
        "The Handshake & Eye Contact: Building instant patient-provider trust.",
        "The Elevator Pitch: Summarizing your NeuroChiro journey in 60 seconds."
      ]
    },
    {
      id: "track-2",
      title: "Clinical Scenario Drills",
      desc: "Practice explaining complex neurological findings to patients and clinic owners.",
      icon: Target,
      color: "text-purple-600 bg-purple-50",
      content: [
        "Explaining the Scan: Translating thermal and sEMG data for laypeople.",
        "Pattern Recognition: Discussing tonal analysis with clinic owners.",
        "Crisis Management: Responding to clinical skeptics with objective data."
      ]
    },
    {
      id: "track-3",
      title: "Salary & Growth Questions",
      desc: "How to ask about money, mentorship, and buy-ins without sounding greedy.",
      icon: MessageSquare,
      color: "text-neuro-orange bg-neuro-orange/5",
      content: [
        "Base vs. Bonus: How to ask for a floor that protects your downside.",
        "Defining Mentorship: Ensuring 'mentorship' isn't just 'free labor'.",
        "Equity Timelines: Bringing up ownership during the second interview."
      ]
    }
  ];

  const commonQuestions = [
    {
      q: "What is your clinical philosophy?",
      hint: "Focus on the nervous system, tonal assessment, and the NeuroChiro framework. Owners want to know you align with their mission.",
      script: "My philosophy is rooted in nervous system integrity. I prioritize objective assessment of the autonomic system through scanning and tonal analysis to ensure we are addressing the root cause, not just symptoms."
    },
    {
      q: "Where do you see yourself in 3 years?",
      hint: "Be honest but show commitment. Owners fear you'll leave and open across the street.",
      script: "In three years, I want to be a clinical anchor in this community. I'm looking for a mentorship-heavy environment where I can eventually discuss partnership or a long-term director role."
    },
    {
      q: "How do you handle a patient who isn't responding to care?",
      hint: "Show clinical humility and a collaborative spirit.",
      script: "I revisit the objective scans. If the patterns persist, I'd consult with you (the owner) for a second set of eyes and then, if necessary, refer out to ensure the patient's best interest is always first."
    }
  ];

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      triggerSuccess("Interview Guide Downloaded!");
    }, 1500);
  };

  const startDrill = (track: any) => {
    setActiveTrack(null);
    setCurrentPracticeTrack(track);
    setIsPracticeMode(true);
    setActivePromptIndex(0);
    setIsRecording(false);
    setRecordingComplete(false);
    setShowSummary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishDrill = () => {
    setShowSummary(true);
  };

  const nextPrompt = () => {
    if (activePromptIndex < currentPracticeTrack.content.length - 1) {
      setActivePromptIndex(activePromptIndex + 1);
      setIsRecording(false);
      setRecordingComplete(false);
    } else {
      handleFinishDrill();
    }
  };

  if (isPracticeMode && currentPracticeTrack) {
    if (showSummary) {
      return (
        <div className="p-8 max-w-2xl mx-auto space-y-8 animate-in zoom-in duration-500 text-center py-20">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-neuro-navy">Drill Complete!</h1>
          <p className="text-neuro-gray text-lg">Great work. You've practiced {currentPracticeTrack.content.length} key interview scenarios.</p>
          
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm text-left space-y-4">
            <h3 className="font-bold text-neuro-navy flex items-center gap-2">
              <History className="w-5 h-5 text-neuro-orange" /> Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Clarity Score</p>
                <p className="text-xl font-black text-neuro-navy">92%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase">Tone Alignment</p>
                <p className="text-xl font-black text-neuro-navy">Optimal</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => startDrill(currentPracticeTrack)}
              className="flex-1 py-5 bg-gray-100 text-neuro-navy font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
            >
              Restart Drill
            </button>
            <button 
              onClick={() => setIsPracticeMode(false)}
              className="flex-[2] py-5 bg-neuro-orange text-white font-black rounded-2xl shadow-xl hover:bg-neuro-orange-light transition-all uppercase tracking-widest text-sm"
            >
              Return to Library
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setIsPracticeMode(false)}
          className="flex items-center gap-2 text-gray-400 hover:text-neuro-navy font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Library
        </button>

        <header className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neuro-orange/5 blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${currentPracticeTrack.color}`}>
                <currentPracticeTrack.icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-neuro-navy">{currentPracticeTrack.title}</h1>
                <p className="text-neuro-gray font-medium">Practice Drill Mode • Prompt {activePromptIndex + 1} of {currentPracticeTrack.content.length}</p>
              </div>
            </div>
            <div className="flex gap-2">
               {currentPracticeTrack.content.map((_: any, i: number) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activePromptIndex >= i ? 'w-6 bg-neuro-orange' : 'w-2 bg-gray-100'}`}></div>
               ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section className="bg-neuro-navy text-white rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Mic className="w-5 h-5 text-neuro-orange" /> Voice Simulator
              </h3>
              <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                {isRecording ? (
                  <>
                    <div className="absolute inset-0 bg-neuro-orange/5 animate-pulse"></div>
                    <div className="w-24 h-24 rounded-full bg-neuro-orange/20 flex items-center justify-center mb-6 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <p className="text-lg font-bold mb-2 relative z-10">Recording...</p>
                    <p className="text-red-400 text-sm font-bold animate-pulse relative z-10">00:12</p>
                  </>
                ) : recordingComplete ? (
                  <>
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-lg font-bold mb-2">Response Captured!</p>
                    <p className="text-gray-400 text-sm px-8">Great job. You can review this response or proceed to the next prompt.</p>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-neuro-orange/20 flex items-center justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full bg-neuro-orange flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform active:scale-95" 
                        onClick={() => setIsRecording(true)}
                      >
                        <Mic className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-bold mb-2">Ready to record?</p>
                    <p className="text-gray-400 text-sm">Click the mic to start your response.</p>
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button 
                  onClick={() => {
                    setIsRecording(false);
                    setRecordingComplete(false);
                  }}
                  className="py-4 bg-white/10 hover:bg-white/20 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 border border-white/5"
                >
                  Reset Recording
                </button>
                {isRecording ? (
                  <button 
                    onClick={() => {
                      setIsRecording(false);
                      setRecordingComplete(true);
                    }}
                    className="py-4 bg-red-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-95"
                  >
                    Stop Recording
                  </button>
                ) : recordingComplete ? (
                  <button 
                    onClick={nextPrompt}
                    className="py-4 bg-green-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    Next Prompt <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleFinishDrill}
                    className="py-4 bg-neuro-orange text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-95"
                  >
                    Finish & Review
                  </button>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm h-fit">
              <h3 className="text-xl font-bold text-neuro-navy mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-neuro-orange" /> Active Prompt
              </h3>
              <div className="space-y-4">
                {currentPracticeTrack.content.map((item: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActivePromptIndex(i);
                      setIsRecording(false);
                      setRecordingComplete(false);
                    }}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer group ${activePromptIndex === i ? 'bg-neuro-orange/5 border-neuro-orange ring-4 ring-neuro-orange/5' : 'bg-gray-50 border-gray-100 hover:border-neuro-orange/30'}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm shrink-0 ${activePromptIndex === i ? 'bg-neuro-orange text-white' : 'bg-white text-gray-400'}`}>{i + 1}</span>
                      <p className={`text-sm font-bold leading-relaxed transition-colors ${activePromptIndex === i ? 'text-neuro-navy' : 'text-gray-500 group-hover:text-neuro-navy'}`}>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8">
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Pro Tip for this drill
              </h4>
              <p className="text-sm text-blue-900 leading-relaxed font-medium">
                Keep your answers under 45 seconds. Clinic owners value precision and clarity. If you can't explain a scan simply, they'll worry you can't explain it to a patient.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[400] bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <header>
        <h1 className="text-4xl font-heading font-black text-neuro-navy flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-neuro-orange" />
          Interview Prep
        </h1>
        <p className="text-neuro-gray mt-2 text-lg max-w-2xl">
          Walk into your next interview with the clinical confidence and professional polish of a veteran.
        </p>
      </header>

      {/* Preparation Track */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTrack(mod)}
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group active:scale-95"
          >
            <div className={`p-4 rounded-2xl w-fit mb-6 ${mod.color}`}>
              <mod.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neuro-navy mb-3 group-hover:text-neuro-orange transition-colors">{mod.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-neuro-navy">
              Start Drill <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Practice Questions */}
        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h2 className="text-2xl font-black text-neuro-navy mb-8 flex items-center gap-2">
            <Mic className="w-6 h-6 text-neuro-orange" /> Common Interview Questions
          </h2>
          <div className="space-y-4">
            {commonQuestions.map((item, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedQuestion(item)}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-neuro-orange transition-all active:scale-[0.98]"
              >
                <span className="font-bold text-neuro-navy group-hover:text-neuro-orange transition-colors">{item.q}</span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-neuro-orange transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Essential Checklist */}
        <section className="bg-neuro-navy text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-neuro-orange/10 blur-3xl -mr-24 -mt-24"></div>
          <h2 className="text-2xl font-black mb-8">Pre-Interview Checklist</h2>
          <div className="space-y-6">
            {[
              "Review the clinic's website and social media",
              "Have 3 objective case studies ready to discuss",
              "Prepare your 'Reason for Chiropractic' story",
              "Print 3 high-quality copies of your CV/Portfolio",
              "Have 5 thoughtful questions for the owner ready"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-neuro-orange" />
                </div>
                <span className="text-sm font-medium text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full mt-10 py-4 bg-neuro-orange text-white font-black rounded-2xl hover:bg-neuro-orange-light shadow-lg transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isDownloading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><FileDown className="w-5 h-5" /> Download Full Guide</>
            )}
          </button>
        </section>
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {selectedQuestion && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-md bg-neuro-navy/60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neuro-orange/10 rounded-lg text-neuro-orange">
                    <Mic className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-xl text-neuro-navy">Question Strategy</h3>
                </div>
                <button onClick={() => setSelectedQuestion(null)} className="p-2 hover:bg-white rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">The Question</h4>
                  <p className="text-xl font-bold text-neuro-navy leading-tight">{selectedQuestion.q}</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Strategy Tip
                  </h4>
                  <p className="text-sm text-blue-900 leading-relaxed font-medium">{selectedQuestion.hint}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Example Script</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl italic border-l-4 border-neuro-orange">
                    "{selectedQuestion.script}"
                  </p>
                </div>
                <button onClick={() => setSelectedQuestion(null)} className="w-full py-4 bg-neuro-navy text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl active:scale-95">Got it</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Track Detail Modal */}
      <AnimatePresence>
        {activeTrack && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-md bg-neuro-navy/60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className={`p-8 ${activeTrack.color} flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <activeTrack.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl">{activeTrack.title}</h3>
                </div>
                <button onClick={() => setActiveTrack(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{activeTrack.desc}</p>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In this module:</h4>
                  {activeTrack.content.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-neuro-orange" />
                      </div>
                      <span className="text-sm font-bold text-neuro-navy">{item}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => startDrill(activeTrack)} 
                  className="w-full py-4 bg-neuro-navy text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl active:scale-95"
                >
                  Confirm & Start Drill
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
