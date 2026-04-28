import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/sumitcarpenter01@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            _subject: `New Portfolio Message from ${formState.name}`,
            _template: "box"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-8"
          >
            <div className="glass-card p-8 border border-white/5">
              <h3 className="text-2xl font-heading font-bold mb-6">Contact Information</h3>
              <p className="text-white/60 mb-8">
                Ready to start your next project? Reach out to me directly or use the contact form. I'm currently available for freelance work.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:sumitcarpenter01@gmail.com" className="flex items-center gap-4 group interactive">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-blue transition-colors">
                    <Mail className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-mono">Email</p>
                    <p className="text-lg font-medium group-hover:text-accent-blue transition-colors">sumitcarpenter01@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://wa.me/918955671482" target="_blank" rel="noreferrer" className="flex items-center gap-4 group interactive">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-purple transition-colors">
                    <MessageSquare className="text-accent-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-mono">WhatsApp</p>
                    <p className="text-lg font-medium group-hover:text-accent-purple transition-colors">+91 89556 71482</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 border border-white/5 relative overflow-hidden">
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-secondary/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 size={64} className="text-accent-blue mb-4 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-heading mb-2">Message Sent!</h3>
                  <p className="text-white/70">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-accent-blue/50 rounded-xl font-medium text-white overflow-hidden transition-all hover:scale-[1.02] interactive neon-border-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
