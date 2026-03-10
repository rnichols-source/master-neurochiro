"use client";

import { useState, useEffect, useRef } from "react";
import { FounderCommandPanel } from "./FounderCommandPanel";
import { motion, AnimatePresence } from "framer-motion";

export function StealthFounderTrigger() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showPassphrasePrompt, setShowPassphrasePrompt] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    fetch('/api/stealth-auth')
      .then(res => res.json())
      .then(data => {
        if (data.active) setIsAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  // Keyboard Trigger: Ctrl + Shift + \
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "\\") {
        e.preventDefault();
        triggerSequence();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated]);

  const triggerSequence = () => {
    if (isAuthenticated) {
      setIsPanelOpen(true);
    } else {
      setShowPassphrasePrompt(true);
    }
  };

  // Mobile/Invisible Hotspot Trigger: 5 rapid taps
  const handleHotspotClick = () => {
    clickCount.current += 1;
    
    if (clickTimer.current) clearTimeout(clickTimer.current);
    
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      triggerSequence();
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 2000); // Must complete 5 taps within 2 seconds
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/stealth-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setShowPassphrasePrompt(false);
        setPassphrase("");
        setIsPanelOpen(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {/* Invisible Hotspot: Absolute bottom right, 50x50px */}
      <div 
        onClick={handleHotspotClick}
        className="fixed bottom-0 right-0 w-[50px] h-[50px] z-[99998] cursor-default opacity-0 bg-transparent"
        style={{ touchAction: "manipulation" }}
      />

      {/* Passphrase Gate */}
      <AnimatePresence>
        {showPassphrasePrompt && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
              onClick={() => setShowPassphrasePrompt(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0A192F] p-8 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto w-full max-w-sm mx-4"
            >
              <div className="text-center mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E67E22] mb-2">Restricted Access</p>
                <h3 className="text-xl font-black text-white">Founder Protocol</h3>
              </div>
              
              <form onSubmit={handleAuth}>
                <input 
                  type="password" 
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter Passphrase"
                  autoFocus
                  className={`w-full bg-black/30 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-[#E67E22] transition-colors mb-4`}
                />
                <button type="submit" className="hidden">Submit</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* The Actual Command Center */}
      <AnimatePresence>
        {isPanelOpen && <FounderCommandPanel onClose={() => setIsPanelOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
