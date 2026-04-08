"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadResource, deleteResource } from "@/app/actions/resource-actions";

interface ResourceUploaderProps {
  moduleId: string;
  existingResources: any[];
  onUpdate: () => void;
}

export function ResourceUploader({ moduleId, existingResources, onUpdate }: ResourceUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadResource(formData, moduleId);
    if (result.success) {
      onUpdate();
    } else {
      alert("Upload failed: " + result.error);
    }
    setIsUploading(false);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [moduleId]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center group",
          isDragging 
            ? "border-brand-orange bg-brand-orange/5" 
            : "border-brand-navy/10 bg-brand-cream/30 hover:border-brand-orange/40"
        )}
      >
        <input 
          type="file" 
          onChange={onFileSelect} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          accept=".pdf,.doc,.docx"
        />
        
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all",
          isUploading ? "bg-brand-orange animate-pulse" : "bg-brand-navy/5 group-hover:bg-brand-orange/10"
        )}>
          {isUploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Upload className="w-6 h-6 text-brand-navy group-hover:text-brand-orange" />}
        </div>

        <h4 className="text-sm font-black text-brand-navy">Drag & Drop Worksheet</h4>
        <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest mt-1">PDF or DOCX (Max 10MB)</p>
      </div>

      {/* Resource List */}
      <div className="space-y-3">
        <h5 className="text-xs font-black uppercase tracking-widest text-brand-navy/30 ml-2">Attached Assets</h5>
        {existingResources.filter(r => r.module_id === moduleId).map((res) => (
          <div key={res.id} className="flex items-center justify-between p-4 bg-white border border-brand-navy/5 rounded-2xl group shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-brand-navy/5 rounded-lg">
                <FileText className="w-4 h-4 text-brand-navy" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-navy truncate max-w-[150px]">{res.title}</p>
                <p className="text-xs font-black text-brand-orange uppercase tracking-tighter">Verified Asset</p>
              </div>
            </div>
            <button 
              onClick={() => deleteResource(res.id, res.url.split('/').pop() || '')}
              className="p-2 text-brand-navy/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {existingResources.filter(r => r.module_id === moduleId).length === 0 && (
          <p className="text-xs font-bold text-brand-navy/20 text-center py-4 uppercase italic">No assets attached yet</p>
        )}
      </div>
    </div>
  );
}
