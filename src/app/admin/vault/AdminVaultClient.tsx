"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Plus,
  Save,
  Trash2,
  Lock,
  Unlock,
  FileText,
  Video,
  MessageSquare,
  Settings,
  ChevronDown
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const categories = [
  { id: 'communication', name: 'Clinical Communication' },
  { id: 'rof', name: 'ROF System' },
  { id: 'care_plan', name: 'Care Plan Architecture' },
  { id: 'objections', name: 'Objection Vault' },
  { id: 'marketing', name: 'Marketing & Reactivation' },
  { id: 'staff', name: 'Staff Training' },
  { id: 'clinic_os', name: 'Clinic OS' },
  { id: 'patient_edu', name: 'Patient Education' },
  { id: 'leadership', name: 'CEO & Leadership' },
  { id: 'masterclass', name: 'Masterclass Archive' },
];

export function AdminVaultClient({ initialResources }: { initialResources: any[] }) {
  const [resources, setResources] = useState(initialResources);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const supabase = createClient();

  const handleEdit = (res: any) => {
    setIsEditing(res.id);
    setEditForm(res);
  };

  const handleAddNew = () => {
    const newRes = {
      id: 'new',
      title: 'New Resource',
      description: '',
      category: 'communication',
      tier: 'pro',
      resource_type: 'pdf',
      url: '',
      content: ''
    };
    setIsEditing('new');
    setEditForm(newRes);
  };

  const handleSave = async () => {
    if (isEditing === 'new') {
      const { id, ...dataToInsert } = editForm;
      const { data, error } = await supabase.from('vault_resources').insert(dataToInsert).select().single();
      if (error) {
        alert(error.message);
      } else {
        setResources([data, ...resources]);
        setIsEditing(null);
      }
    } else {
      const { error } = await supabase.from('vault_resources').update(editForm).eq('id', editForm.id);
      if (error) {
        alert(error.message);
      } else {
        setResources(resources.map(r => r.id === editForm.id ? editForm : r));
        setIsEditing(null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    const { error } = await supabase.from('vault_resources').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2">Vault Control</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Intelligence Library</h1>
        </div>
        <BrandButton onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Resource</BrandButton>
      </div>

      {isEditing && (
        <EliteCard className="p-6 border-brand-orange/40 bg-brand-orange/5">
          <h3 className="text-xl font-black text-brand-navy mb-4">{isEditing === 'new' ? 'New Resource' : 'Edit Resource'}</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Title" 
              value={editForm.title}
              onChange={e => setEditForm({...editForm, title: e.target.value})}
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy"
            />
            <textarea 
              placeholder="Description" 
              value={editForm.description || ''}
              onChange={e => setEditForm({...editForm, description: e.target.value})}
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm text-brand-navy resize-none"
            />
            <div className="grid grid-cols-3 gap-4">
              <select 
                value={editForm.category}
                onChange={e => setEditForm({...editForm, category: e.target.value})}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select 
                value={editForm.tier}
                onChange={e => setEditForm({...editForm, tier: e.target.value})}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy"
              >
                <option value="pro">Pro Only (Locked)</option>
                <option value="standard">Standard (Unlocked)</option>
              </select>
              <select 
                value={editForm.resource_type}
                onChange={e => setEditForm({...editForm, resource_type: e.target.value})}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy"
              >
                <option value="pdf">PDF / Document</option>
                <option value="video">Video Masterclass</option>
                <option value="script">Written Script</option>
                <option value="template">Spreadsheet / Template</option>
              </select>
            </div>
            {editForm.resource_type !== 'script' ? (
               <input 
                 type="url" 
                 placeholder="Resource URL (e.g. Google Drive Link, Vimeo Link)" 
                 value={editForm.url || ''}
                 onChange={e => setEditForm({...editForm, url: e.target.value})}
                 className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm text-brand-navy"
               />
            ) : (
               <textarea 
                 placeholder="Script Content..." 
                 rows={6}
                 value={editForm.content || ''}
                 onChange={e => setEditForm({...editForm, content: e.target.value})}
                 className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm text-brand-navy font-mono"
               />
            )}
            
            <div className="flex justify-end gap-3 pt-4">
              <BrandButton variant="ghost" onClick={() => setIsEditing(null)}>Cancel</BrandButton>
              <BrandButton onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Asset</BrandButton>
            </div>
          </div>
        </EliteCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <EliteCard key={res.id} className="p-5 relative flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">{categories.find(c => c.id === res.category)?.name}</span>
              <div className="flex items-center gap-2">
                {res.tier === 'pro' ? <Lock className="w-3 h-3 text-red-500" /> : <Unlock className="w-3 h-3 text-green-500" />}
              </div>
            </div>
            <h3 className="text-lg font-black text-brand-navy mb-1">{res.title}</h3>
            <p className="text-xs text-brand-navy/60 line-clamp-2 flex-1">{res.description}</p>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-navy/5">
              <div className="flex items-center gap-1 text-xs font-bold text-brand-navy/40 uppercase tracking-widest">
                {res.resource_type === 'video' && <Video className="w-3 h-3" />}
                {res.resource_type === 'pdf' && <FileText className="w-3 h-3" />}
                {res.resource_type === 'script' && <MessageSquare className="w-3 h-3" />}
                {res.resource_type}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(res)} className="text-xs font-bold text-brand-navy hover:text-brand-orange px-2 py-1">Edit</button>
                <button onClick={() => handleDelete(res.id)} className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          </EliteCard>
        ))}
      </div>
    </div>
  );
}