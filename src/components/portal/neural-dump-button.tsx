"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Play, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/ui/elite-ui";

export function NeuralDumpButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setShowModal(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Please allow microphone access to use the Voice Note.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'dump.webm');

      const response = await fetch('/api/neural-dump', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("Failed to process audio.");
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error processing audio.");
      setShowModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 z-40 md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={startRecording}
          className="w-14 h-14 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(214,104,41,0.5)] border-2 border-white/20"
        >
          <Mic className="w-6 h-6 fill-white" />
        </motion.button>
      </div>

      {/* Processing Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-navy/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              {isRecording ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-brand-orange/10 rounded-full flex items-center justify-center relative">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-brand-orange rounded-full"
                    />
                    <Mic className="w-8 h-8 text-brand-orange animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-brand-navy">Voice Note Active</h3>
                    <p className="text-xs text-brand-navy/60 mt-2 font-medium">Speak your bottleneck. We'll transcribe and categorize it.</p>
                  </div>
                  <BrandButton variant="primary" className="w-full gap-2 py-4 bg-red-500 hover:bg-red-600 shadow-red-500/20" onClick={stopRecording}>
                    <Square className="w-4 h-4 fill-white" /> Stop Recording
                  </BrandButton>
                </div>
              ) : isProcessing ? (
                <div className="text-center space-y-6 py-8">
                  <Loader2 className="w-12 h-12 text-brand-orange animate-spin mx-auto" />
                  <div>
                    <h3 className="text-xl font-black text-brand-navy">Synthesizing...</h3>
                    <p className="text-xs text-brand-navy/60 mt-2 font-medium">AI is analyzing your clinical friction.</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-xl"><CheckCircle2 className="w-6 h-6 text-green-500" /></div>
                    <h3 className="text-xl font-black text-brand-navy">Dump Logged</h3>
                  </div>
                  
                  <div className="p-4 bg-brand-cream/50 rounded-xl border border-brand-navy/5">
                    <p className="text-xs font-black uppercase text-brand-orange tracking-widest mb-2">Transcription</p>
                    <p className="text-xs font-medium text-brand-navy italic leading-relaxed">"{result.transcription}"</p>
                  </div>

                  <div className="p-4 bg-brand-navy/5 rounded-xl border border-brand-navy/10">
                    <p className="text-xs font-black uppercase text-brand-navy/40 tracking-widest mb-2">Prescribed Action</p>
                    <p className="text-sm font-bold text-brand-navy leading-relaxed">{result.recommendation}</p>
                    {result.moduleLink && (
                      <BrandButton variant="accent" size="sm" className="w-full mt-4 gap-2 text-xs py-3">
                        <Play className="w-3 h-3 fill-white" /> Open Module
                      </BrandButton>
                    )}
                  </div>

                  <button 
                    onClick={() => { setShowModal(false); setResult(null); }}
                    className="w-full py-3 text-xs font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-3 h-3" /> Close Panel
                  </button>
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
