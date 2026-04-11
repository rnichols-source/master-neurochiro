"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Brain, Award, RotateCcw } from "lucide-react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

interface CurriculumQuizProps {
  phaseTitle: string;
  questions: Question[];
  onComplete: () => void;
}

export function CurriculumQuiz({ phaseTitle, questions, onComplete }: CurriculumQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsProcessing(true);
    
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsProcessing(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsProcessing(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score === questions.length;
    return (
      <EliteCard className="p-12 text-center space-y-8 bg-white shadow-2xl border-brand-orange/20">
        <div className="w-20 h-20 mx-auto bg-brand-orange/10 rounded-full flex items-center justify-center">
          {passed ? <Award className="w-10 h-10 text-brand-orange" /> : <RotateCcw className="w-10 h-10 text-brand-navy/40" />}
        </div>
        
        <div>
          <h3 className="text-3xl font-black text-brand-navy">
            {passed ? "Quiz Passed" : "Not Yet — Try Again"}
          </h3>
          <p className="text-brand-gray font-medium mt-2">
            You scored {score} out of {questions.length} on the {phaseTitle} Certainty Check.
          </p>
        </div>

        {passed ? (
          <div className="space-y-6">
            <p className="text-sm font-medium text-green-600 bg-green-50 py-3 px-6 rounded-xl inline-block">
              Great work — you passed the quiz.
            </p>
            <BrandButton variant="primary" className="w-full py-4" onClick={onComplete}>
              Unlock Next Phase <ArrowRight className="ml-2 w-4 h-4" />
            </BrandButton>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm font-medium text-brand-navy/60 leading-relaxed">
              Clinical certainty requires 100% precision. Review the modules and try again.
            </p>
            <BrandButton variant="outline" className="w-full py-4" onClick={reset}>
              Re-take Certainty Check
            </BrandButton>
          </div>
        )}
      </EliteCard>
    );
  }

  return (
    <EliteCard className="p-8 md:p-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-navy/5">
        <motion.div 
          className="h-full bg-brand-orange"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-orange">
          <Brain className="w-3 h-3" /> Mastery Check
        </div>
        <span className="text-xs font-black text-brand-navy/20 uppercase tracking-widest">
          Question {currentStep + 1} of {questions.length}
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight mb-10 leading-tight">
        {currentQuestion.text}
      </h3>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctIndex;
          const isSelected = selectedOption === index;
          
          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => handleAnswer(index)}
              className={cn(
                "w-full text-left p-6 rounded-2xl border-2 transition-all group flex justify-between items-center",
                !isAnswered ? "bg-white border-brand-navy/5 hover:border-brand-orange/40" :
                isSelected && isCorrect ? "bg-green-50 border-green-500 text-green-900" :
                isSelected && !isCorrect ? "bg-red-50 border-red-500 text-red-900" :
                isAnswered && isCorrect ? "bg-green-50 border-green-500/20" : "bg-white border-brand-navy/5 opacity-40"
              )}
            >
              <span className="text-sm font-bold">{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-10 p-6 bg-brand-navy/5 rounded-2xl border border-brand-navy/10"
          >
            <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">Context</p>
            <p className="text-xs font-medium text-brand-navy leading-relaxed">
              {currentQuestion.feedback}
            </p>
            <BrandButton 
              variant="primary" 
              size="sm" 
              className="mt-6 w-full md:w-auto"
              onClick={nextStep}
            >
              {currentStep === questions.length - 1 ? "Complete Check" : "Next Question"}
            </BrandButton>
          </motion.div>
        )}
      </AnimatePresence>
    </EliteCard>
  );
}
