import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, Plus, Trash2, Edit2, Zap, Star, Diamond, Smartphone, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWebsitePlans, defaultAppPlans } from './Pricing';

export default function AdminPricing() {
  const [websitePlans, setWebsitePlans] = useState<any[]>([]);
  const [appPlans, setAppPlans] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'website' | 'app'>('website');

  // Editing state
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('Zap'); // 'Zap', 'Star', 'Diamond', 'Smartphone'
  const [nameColor, setNameColor] = useState('from-[#00ff87] to-[#60efff]');
  const [nameGlow, setNameGlow] = useState('drop-shadow(0 0 8px rgba(0,255,135,0.6))');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [buttonText, setButtonText] = useState('Contact Now');
  const [whatsappText, setWhatsappText] = useState('');
  const [buttonStyle, setButtonStyle] = useState('bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105');
  const [isPopular, setIsPopular] = useState(false);
  const [features, setFeatures] = useState<{text: string, tooltip: string | null}[]>([]);

  // Feature input state
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newFeatureTooltip, setNewFeatureTooltip] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'pricing'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.websitePlans) setWebsitePlans(data.websitePlans);
        if (data.appPlans) setAppPlans(data.appPlans);
      } else {
        // Init with defaults if not exists
        // Clean the JSX icons from defaults and map them to icon names for the Admin panel
        setWebsitePlans(defaultWebsitePlans.map(plan => ({
          ...plan,
          icon: plan.name === 'Starter' ? 'Zap' : plan.name === 'Professional' ? 'Star' : 'Diamond'
        })));
        setAppPlans(defaultAppPlans.map(plan => ({
          ...plan,
          icon: plan.name === 'Starter' ? 'Zap' : plan.name === 'Professional' ? 'Star' : 'Diamond'
        })));
      }
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setName('');
    setIcon('Zap');
    setNameColor('from-[#00ff87] to-[#60efff]');
    setNameGlow('drop-shadow(0 0 8px rgba(0,255,135,0.6))');
    setDescription('');
    setPrice(0);
    setButtonText('Contact Now');
    setWhatsappText('');
    setButtonStyle('bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105');
    setIsPopular(false);
    setFeatures([]);
    setEditingPlanIndex(null);
  };

  const handleEdit = (plan: any, index: number) => {
    setEditingPlanIndex(index);
    setName(plan.name || '');
    setIcon(plan.icon || 'Zap');
    setNameColor(plan.nameColor || '');
    setNameGlow(plan.nameGlow || '');
    setDescription(plan.description || '');
    setPrice(plan.price || 0);
    setButtonText(plan.buttonText || '');
    setWhatsappText(plan.whatsappText || '');
    setButtonStyle(plan.buttonStyle || '');
    setIsPopular(plan.isPopular || false);
    setFeatures(plan.features || []);
  };

  const handleSavePlan = () => {
    if (!name || !price || !description) {
      alert("Please fill required fields: Name, Description, Price");
      return;
    }

    const newPlan = {
      name, icon, nameColor, nameGlow, description, price: Number(price),
      buttonText, whatsappText, buttonStyle, isPopular, features
    };

    const currentPlans = activeTab === 'website' ? [...websitePlans] : [...appPlans];

    if (editingPlanIndex !== null) {
      currentPlans[editingPlanIndex] = newPlan;
    } else {
      currentPlans.push(newPlan);
    }

    if (activeTab === 'website') {
      handleSaveToFirestore(currentPlans, appPlans);
    } else {
      handleSaveToFirestore(websitePlans, currentPlans);
    }
  };

  const handleDelete = (index: number) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    
    const currentPlans = activeTab === 'website' ? [...websitePlans] : [...appPlans];
    currentPlans.splice(index, 1);
    
    if (activeTab === 'website') {
      handleSaveToFirestore(currentPlans, appPlans);
    } else {
      handleSaveToFirestore(websitePlans, currentPlans);
    }
  };

  const handleSaveToFirestore = async (newWebPlans: any[], newAppPlans: any[]) => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'pricing'), {
        websitePlans: newWebPlans,
        appPlans: newAppPlans
      });
      resetForm();
    } catch (error: any) {
      console.error(error);
      alert("Error saving: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addFeature = () => {
    if (!newFeatureText) return;
    setFeatures([...features, { text: newFeatureText, tooltip: newFeatureTooltip || null }]);
    setNewFeatureText('');
    setNewFeatureTooltip('');
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Diamond': return <Diamond className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 pb-24 border-t border-white/10 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
            PRICING SETTINGS
          </h2>
          <p className="text-white/50 mt-1">Manage website and application pricing plans</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => { setActiveTab('website'); resetForm(); }}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'website' ? 'bg-accent-blue text-background' : 'text-white/60 hover:text-white'}`}
          >
            Website Plans
          </button>
          <button 
            onClick={() => { setActiveTab('app'); resetForm(); }}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'app' ? 'bg-accent-purple text-white' : 'text-white/60 hover:text-white'}`}
          >
            App Plans
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="glass-card p-6 border border-white/10 h-fit lg:sticky lg:top-24">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-accent-blue" />
            {editingPlanIndex !== null ? 'Edit Plan' : 'Add New Plan'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Plan Name *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1">Price (₹) *</label>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Icon</label>
                <select value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50">
                  <option value="Zap">Zap</option>
                  <option value="Star">Star</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Smartphone">Smartphone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1">Description *</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50" />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1">Color Theme (Tailwind Classes)</label>
              <input type="text" value={nameColor} onChange={e => setNameColor(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50 text-xs" />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="isPopular" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} className="w-4 h-4 rounded bg-black border-white/20 text-accent-blue focus:ring-accent-blue/50" />
              <label htmlFor="isPopular" className="text-sm font-medium">Mark as Popular</label>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="block text-sm font-bold mb-2">Features</label>
              
              <ul className="space-y-2 mb-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                      <span>{feature.text}</span>
                    </div>
                    <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
                {features.length === 0 && <li className="text-xs text-white/40 italic">No features added yet.</li>}
              </ul>

              <div className="space-y-2 bg-black/30 p-3 rounded-lg border border-white/5">
                <input type="text" placeholder="Feature text" value={newFeatureText} onChange={e => setNewFeatureText(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-accent-blue/50" />
                <input type="text" placeholder="Tooltip (optional)" value={newFeatureTooltip} onChange={e => setNewFeatureTooltip(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-accent-blue/50" />
                <button onClick={addFeature} type="button" className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" /> Add Feature
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="block text-xs text-white/50 mb-1">WhatsApp Pre-filled Message</label>
              <textarea value={whatsappText} onChange={e => setWhatsappText(e.target.value)} rows={3} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent-blue/50 text-sm resize-none" />
            </div>

            <div className="flex gap-3 pt-4">
              {editingPlanIndex !== null && (
                <button onClick={resetForm} type="button" className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all">
                  Cancel
                </button>
              )}
              <button 
                onClick={handleSavePlan}
                disabled={isSaving} 
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {editingPlanIndex !== null ? 'Update Plan' : 'Save Plan'}
              </button>
            </div>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-4">
            {(activeTab === 'website' ? websitePlans : appPlans).map((plan, index) => (
              <div key={index} className={`glass-card p-6 border ${plan.isPopular ? 'border-accent-blue/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'border-white/10'} relative flex flex-col`}>
                {plan.isPopular && <div className="absolute top-0 right-0 bg-accent-blue text-background text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-accent-blue">{renderIcon(plan.icon)}</div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(plan, index)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(index)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-3xl font-black mb-1">₹{plan.price}</div>
                <p className="text-sm text-white/50 mb-4">{plan.description}</p>
                <div className="flex-grow">
                  <p className="text-xs font-bold mb-2">Features ({plan.features?.length || 0}):</p>
                  <ul className="space-y-1">
                    {plan.features?.slice(0, 3).map((f: any, i: number) => (
                      <li key={i} className="text-xs text-white/70 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-accent-blue" />
                        <span className="truncate">{f.text}</span>
                      </li>
                    ))}
                    {plan.features?.length > 3 && (
                      <li className="text-xs text-white/40 italic">+{plan.features.length - 3} more...</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
            
            {(activeTab === 'website' ? websitePlans : appPlans).length === 0 && (
              <div className="col-span-full py-12 text-center text-white/30 border border-dashed border-white/10 rounded-xl">
                No {activeTab} plans found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
