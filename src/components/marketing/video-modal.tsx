"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-navy/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Placeholder (Cinematic Feel) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center animate-pulse">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <p className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">Cinematic Vision Preview</p>
              {/* In production: <iframe src={videoUrl} className="w-full h-full" allow="autoplay" /> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
