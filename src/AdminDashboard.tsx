import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { LogOut, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Link as LinkIcon, Tag, IndianRupee, UploadCloud, Loader2, Download, Award, Calendar, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [purchaseLink, setPurchaseLink] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');

  const [cvUrlInput, setCvUrlInput] = useState('');
  const [isUpdatingCv, setIsUpdatingCv] = useState(false);

  const [projectsCount, setProjectsCount] = useState('50');
  const [clientsCount, setClientsCount] = useState('20');
  const [experienceCount, setExperienceCount] = useState('2');
  const [isUpdatingStats, setIsUpdatingStats] = useState(false);

  // Certificate states
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [certFileString, setCertFileString] = useState(''); // Just for preview/existing
  const [certBase64, setCertBase64] = useState('');
  const [isUploadingCert, setIsUploadingCert] = useState(false);
  const [isSubmittingCert, setIsSubmittingCert] = useState(false);

  useEffect(() => {
    const unsubscribeProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching projects:", error);
    });

    const unsubscribeCv = onSnapshot(doc(db, 'settings', 'cv'), (doc) => {
      if (doc.exists() && doc.data().url) {
        setCvUrlInput(doc.data().url);
      } else {
        setCvUrlInput('/SUMIT CARPENTER C.V.pdf');
      }
    });

    const unsubscribeStats = onSnapshot(doc(db, 'settings', 'stats'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.projects) setProjectsCount(data.projects);
        if (data.clients) setClientsCount(data.clients);
        if (data.experience) setExperienceCount(data.experience);
      }
    });

    const unsubscribeCerts = onSnapshot(collection(db, 'certificates'), (snapshot) => {
      const certData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCertificates(certData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching certificates:", error);
    });

    return () => {
      unsubscribeProjects();
      unsubscribeCv();
      unsubscribeStats();
      unsubscribeCerts();
    };
  }, []);

  const handleUpdateCv = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingCv(true);
    try {
      await updateDoc(doc(db, 'settings', 'cv'), { url: cvUrlInput });
      alert("CV URL updated successfully!");
    } catch (error: any) {
      if (error.code === 'not-found') {
        // Document doesn't exist yet, we should create it
        try {
          // You could also use setDoc here if you import it
          const { setDoc } = await import('firebase/firestore');
          await setDoc(doc(db, 'settings', 'cv'), { url: cvUrlInput });
          alert("CV URL saved successfully!");
        } catch (innerError) {
           console.error("Error creating CV setting:", innerError);
           alert("Failed to save CV URL.");
        }
      } else {
        console.error("Error updating CV:", error);
        alert(`Failed to update CV: ${error.message}`);
      }
    }
    setIsUpdatingCv(false);
  };

  const handleUpdateStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingStats(true);
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'settings', 'stats'), {
        projects: projectsCount,
        clients: clientsCount,
        experience: experienceCount
      }, { merge: true });
      alert("Stats updated successfully!");
    } catch (error: any) {
      console.error("Error updating stats:", error);
      alert(`Failed to update stats: ${error.message}`);
    }
    setIsUpdatingStats(false);
  };

  const handleCertFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setIsUploadingCert(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          let quality = 0.9;
          let compressedBase64 = canvas.toDataURL('image/jpeg', quality);

          // Firestore has a 1MB limit per document.
          while (compressedBase64.length > 900000 && quality > 0.1) {
            quality -= 0.1;
            compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          }

          setCertBase64(compressedBase64);
          setCertFileString(file.name);
          setIsUploadingCert(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      // PDF cannot be easily compressed via canvas, so we enforce a strict limit
      if (file.size > 900 * 1024) {
        alert("PDF size exceeds 900KB limit for database storage. Please compress your PDF file before uploading.");
        e.target.value = '';
        return;
      }
      setIsUploadingCert(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCertBase64(event.target?.result as string);
        setCertFileString(file.name);
        setIsUploadingCert(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Unsupported file type. Please upload a PDF or Image.");
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certBase64) {
      alert("Please upload a certificate file or wait for processing to finish.");
      return;
    }
    if (isUploadingCert) {
      alert("Please wait for the file to finish processing.");
      return;
    }
    setIsSubmittingCert(true);
    try {
      // Save metadata and file base64 data directly to Firestore (no Storage needed)
      await addDoc(collection(db, 'certificates'), {
        title: certTitle,
        issuer: certIssuer,
        date: certDate,
        description: certDesc,
        url: certBase64,
        filename: certFileString,
        createdAt: serverTimestamp()
      });
      setCertTitle(''); setCertIssuer(''); setCertDate(''); setCertDesc(''); 
      setCertBase64('');
      setCertFileString('');
      alert("Certificate added successfully!");
    } catch (error: any) {
      console.error("Error adding certificate:", error);
      alert(`Failed to add certificate. The file might be too large for the database. Details: ${error.message}`);
    } finally {
      setIsSubmittingCert(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await deleteDoc(doc(db, 'certificates', id));
    } catch (error: any) {
      console.error("Error deleting certificate:", error);
      alert("Failed to delete certificate.");
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setSubCategory('');
    setImage('');
    setDescription('');
    setTags('');
    setLiveLink('');
    setPurchaseLink('');
    setIsPaid(false);
    setPrice('');
    setCurrentProject(null);
    setIsEditing(false);
    setIsUploading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Force exactly 1920x1080 (16:9 aspect ratio)
        const TARGET_WIDTH = 1920;
        const TARGET_HEIGHT = 1080;
        
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        const ctx = canvas.getContext('2d');
        
        // Calculate crop to center the image and cover the 1920x1080 area
        const imgRatio = img.width / img.height;
        const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
        
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = img.width;
        let sourceHeight = img.height;
        
        if (imgRatio > targetRatio) {
          // Image is wider than 16:9, crop sides
          sourceWidth = img.height * targetRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else {
          // Image is taller than 16:9, crop top/bottom
          sourceHeight = img.width / targetRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }
        
        // Draw the cropped image
        ctx?.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        
        // Compress to JPEG with high quality
        let quality = 0.9;
        let compressedBase64 = canvas.toDataURL('image/jpeg', quality);

        // Firestore has a strict 1MB document limit. 
        // We ensure the base64 string is under ~900KB to safely fit in the database.
        while (compressedBase64.length > 900000 && quality > 0.1) {
          quality -= 0.1;
          compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        }

        setImage(compressedBase64);
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setTitle(project.title);
    setCategory(project.category);
    setSubCategory(project.subCategory || '');
    setImage(project.image);
    setDescription(project.description);
    setTags(project.tags.join(', '));
    setLiveLink(project.liveLink || '');
    setPurchaseLink(project.purchaseLink || '');
    setIsPaid(project.isPaid || false);
    setPrice(project.price || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      alert("Please upload an image first.");
      return;
    }
    if (isUploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }

    const projectData = {
      title,
      category,
      subCategory,
      image,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      liveLink,
      purchaseLink: isPaid ? purchaseLink : '',
      isPaid,
      price: isPaid ? price : '',
    };

    try {
      if (currentProject) {
        await updateDoc(doc(db, 'projects', currentProject.id), projectData);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp()
        });
      }
      resetForm();
      alert("Project saved successfully!");
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(`Failed to save project: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
            ADMIN DASHBOARD
          </h1>
          <p className="text-white/50 mt-2">Manage your portfolio projects</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors border border-accent-blue/20 text-sm font-bold"
          >
            <LinkIcon className="w-4 h-4" />
            View Website
          </a>
          <span className="text-sm text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10 hidden md:inline-block">
            {user.email}
          </span>
          <button 
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-[#00f0ff]" /> Update CV Link
            </h2>
            <form onSubmit={handleUpdateCv} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Drive URL / PDF Link *</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input required type="url" value={cvUrlInput} onChange={e => setCvUrlInput(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm relative z-20" placeholder="https://drive.google.com/..." />
                </div>
                <p className="text-[10px] text-accent-blue mt-1">Make sure Google Drive link access is set to <span className="font-bold">"Anyone with the link"</span> can view.</p>
              </div>
              <button disabled={isUpdatingCv} type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                {isUpdatingCv ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isUpdatingCv ? 'UPDATING...' : 'UPDATE CV'}
              </button>
            </form>
          </div>

          <div className="glass-card p-6 border border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-[#ff3366]" /> Update Stats
            </h2>
            <form onSubmit={handleUpdateStats} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Projects Completed</label>
                <input required type="number" value={projectsCount} onChange={e => setProjectsCount(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Happy Clients</label>
                <input required type="number" value={clientsCount} onChange={e => setClientsCount(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Years Experience</label>
                <input required type="number" value={experienceCount} onChange={e => setExperienceCount(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm" />
              </div>
              <button disabled={isUpdatingStats} type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent-purple to-[#ff3366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                {isUpdatingStats ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isUpdatingStats ? 'UPDATING...' : 'UPDATE STATS'}
              </button>
            </form>
          </div>

          <div className="glass-card p-6 border border-white/10 sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {isEditing ? <Edit2 className="w-5 h-5 text-accent-blue" /> : <Plus className="w-5 h-5 text-accent-blue" />}
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
              {isEditing && (
                <button onClick={resetForm} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Project Title *</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none" />
              </div>
              
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Category *</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none">
                  <option value="">Select Category</option>
                  <option value="Web">Web</option>
                  <option value="Apps">Apps</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Sub Category (Optional)</label>
                <input type="text" value={subCategory} onChange={e => setSubCategory(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="e.g. Restaurant, Dentist, Real Estate" />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Project Image (Will be auto-cropped to 1920x1080 16:9) *</label>
                <div className="relative group/upload">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    required={!image}
                  />
                  <div className={`w-full h-32 bg-white/5 border-2 border-dashed ${image ? 'border-accent-blue/50' : 'border-white/20 group-hover/upload:border-accent-blue/50'} rounded-lg flex flex-col items-center justify-center transition-all overflow-hidden relative`}>
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 text-accent-blue animate-spin" />
                    ) : image ? (
                      <>
                        <img src={image} alt="Preview" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity">
                          <span className="text-sm font-bold flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-white/40 mb-2 group-hover/upload:text-accent-blue transition-colors" />
                        <span className="text-sm text-white/40 group-hover/upload:text-white/70 transition-colors">Click or drag image here</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Description *</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none resize-none" />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Tags (comma separated) *</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input required type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="React, Tailwind, Node.js" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Demo / Live Link (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input type="url" value={liveLink} onChange={e => setLiveLink(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="https://..." />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} className="w-4 h-4 accent-accent-blue" />
                  <span className="text-sm font-medium">Paid Project (Sell via Cosmofeed)</span>
                </label>
                
                {isPaid && (
                  <div className="space-y-4">
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input required={isPaid} type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm" placeholder="Price (e.g. 999)" />
                    </div>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input required={isPaid} type="url" value={purchaseLink} onChange={e => setPurchaseLink(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none text-sm" placeholder="Cosmofeed Product URL" />
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                <Save className="w-5 h-5" />
                {isEditing ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Project List */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card overflow-hidden border border-white/10 group flex flex-col"
                >
                  <div className="h-32 relative overflow-hidden">
                    <img src={project.image || undefined} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => handleEdit(project)} className="p-2 rounded-lg bg-black/50 text-white hover:bg-accent-blue hover:text-black backdrop-blur-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 rounded-lg bg-black/50 text-white hover:bg-red-500 hover:text-white backdrop-blur-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {project.isPaid ? (
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-gradient-to-r from-[#ff9933] to-[#ff3366] text-[10px] font-bold text-white shadow-lg">
                        PAID ₹{project.price?.replace('₹', '')}
                      </div>
                    ) : (
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-gradient-to-r from-[#00ff87] to-[#60efff] text-[10px] font-bold text-black shadow-lg">
                        FREE
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg truncate pr-2">{project.title}</h3>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/70">{project.category}</span>
                    </div>
                    <p className="text-xs text-white/50 line-clamp-2 mb-3">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-1">
                      {project.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {projects.length === 0 && (
              <div className="col-span-full py-12 text-center text-white/30 border border-dashed border-white/10 rounded-xl">
                No projects found. Add your first project!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 mt-12 pb-24">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 border border-white/10 sticky top-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-[#ff3366]" /> Add Certificate
            </h2>
            <form onSubmit={handleAddCertificate} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Certificate Name *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input required type="text" value={certTitle} onChange={e => setCertTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="e.g. Full Stack Bootcamp" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Issuer/Institution *</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input required type="text" value={certIssuer} onChange={e => setCertIssuer(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="e.g. Udemy, Coursera" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Date/Year *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input required type="text" value={certDate} onChange={e => setCertDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent-blue/50 outline-none" placeholder="e.g. May 2024" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Description *</label>
                <textarea required value={certDesc} onChange={e => setCertDesc(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue/50 outline-none resize-none" placeholder="What did you learn?" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Upload Certificate (PDF, JPG, PNG) *</label>
                <div className="relative group/upload">
                  <input 
                    type="file" 
                    accept=".pdf,image/*"
                    onChange={handleCertFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    required={!certBase64}
                  />
                  <div className={`w-full py-4 bg-white/5 border-2 border-dashed ${certBase64 ? 'border-accent-blue/50' : 'border-white/20 group-hover/upload:border-accent-blue/50'} rounded-lg flex flex-col items-center justify-center transition-all overflow-hidden relative`}>
                    {isUploadingCert ? (
                      <Loader2 className="w-6 h-6 animate-spin text-accent-blue" />
                    ) : certBase64 ? (
                      <div className="flex items-center gap-2 text-accent-blue">
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-sm font-medium pr-2 truncate max-w-[200px]">{certFileString}</span>
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-white/50 group-hover/upload:text-accent-blue/80 transition-colors">
                        <UploadCloud className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Click or Drag to upload</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-accent-blue/80 mt-2 font-medium">
                  ★ Images will be compressed automatically. PDFs must be strictly under 900KB.
                </p>
              </div>
              <button disabled={isSubmittingCert} type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-accent-purple to-[#ff3366] text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all">
                {isSubmittingCert ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSubmittingCert ? 'SAVING...' : 'ADD CERTIFICATE'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Certificate List */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-5 border border-white/10 group flex flex-col relative"
                >
                  <button onClick={() => handleDeleteCert(cert.id)} className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <h3 className="font-bold text-lg pr-10 mb-1">{cert.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-accent-blue mb-3 font-mono">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {cert.issuer}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.date}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-5 line-clamp-3">{cert.description}</p>
                  <a download={cert.filename || `Certificate_${cert.title.replace(/\s+/g, '_')}`} href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-sm font-medium border border-white/5 hover:border-white/20">
                    <Download className="w-4 h-4" /> Download Certificate
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
            {certificates.length === 0 && (
              <div className="col-span-full py-12 text-center text-white/30 border border-dashed border-white/10 rounded-xl">
                No certificates uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
