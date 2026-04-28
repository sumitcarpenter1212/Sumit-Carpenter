import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import AdminDashboard from './AdminDashboard';
import { Lock, Mail, Key, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      // If user not found, create it (since this is a personal portfolio and we want to setup the admin)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          if (email === 'sumitcarpenter123@gmail.com') {
             await createUserWithEmailAndPassword(auth, email, password);
          } else {
             setError('Invalid credentials.');
          }
        } catch (createErr: any) {
          setError(createErr.message);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-blue animate-spin" />
      </div>
    );
  }

  if (user) {
    return <AdminDashboard user={user} onLogout={() => signOut(auth)} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 w-full max-w-md relative z-10 border border-white/10 shadow-[0_0_40px_rgba(0,240,255,0.1)]"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-black font-heading text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          ADMIN ACCESS
        </h2>
        <p className="text-center text-white/50 mb-8 text-sm">
          Restricted area. Please login to continue.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50"
          >
            {isLoggingIn ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                LOGIN TO DASHBOARD
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
