'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MessageCircle, Instagram, Linkedin, Youtube, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  country: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
});
type FormData = z.infer<typeof schema>;

const services = [
  'Video Editing', 'Short Form Video', 'Long Form Video',
  'Voice Artistry', 'Graphic Design', 'Brand Identity', 'Other',
];
const budgets = [
  'Under $100', '$100 – $500', '$500 – $1,000',
  '$1,000 – $5,000', '$5,000+', 'Let\'s discuss',
];
const contacts = [
  { label: 'Email', value: 'neeraj@nekamivisuals.com', href: 'mailto:neeraj@nekamivisuals.com', icon: Mail },
  { label: 'WhatsApp', value: '+91 99999 99999', href: 'https://wa.me/919999999999', icon: Phone },
  { label: 'Instagram', value: '@nekamivisuals', href: 'https://instagram.com/nekamivisuals', icon: Instagram },
  { label: 'LinkedIn', value: 'Neeraj Singh', href: 'https://linkedin.com/in/neerajsingh', icon: Linkedin },
  { label: 'Behance', value: 'nekamivisuals', href: 'https://behance.net/nekamivisuals', icon: ExternalLink },
  { label: 'YouTube', value: '@nekamivisuals', href: 'https://youtube.com/@nekamivisuals', icon: Youtube },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulated submit (Supabase integration in Phase 4)
    await new Promise(res => setTimeout(res, 1200));
    console.log('Form submitted:', data);
    setSubmitted(true);
  };

  return (
    <section className="py-24 md:py-36" aria-labelledby="contact-h">
      <div className="container">
        {/* Header */}
        <div className="mb-20">
          <p className="section-label mb-6">Get in Touch</p>
          <h1 id="contact-h" className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tightest leading-none mb-8 max-w-3xl">
            Let&apos;s Build Something Amazing Together.
          </h1>
          <p className="text-base text-text-2 max-w-lg leading-relaxed">
            Whether you need cinematic editing, professional voice work or impactful design,
            I&apos;d love to hear about your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-green-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight mb-3">Thank You!</h2>
                  <p className="text-base text-text-2 max-w-md leading-relaxed">
                    Your message has been received. I&apos;ll get back to you as soon as possible — usually within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full border border-border text-sm hover:border-border-hover transition-all duration-250"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Your Name *" error={errors.name?.message}>
                    <input {...register('name')} placeholder=" " />
                  </FormField>
                  <FormField label="Email Address *" error={errors.email?.message}>
                    <input type="email" {...register('email')} placeholder=" " />
                  </FormField>
                </div>

                {/* Row 2: Country + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Country">
                    <input {...register('country')} placeholder=" " />
                  </FormField>
                  <FormField label="Company (optional)">
                    <input {...register('company')} placeholder=" " />
                  </FormField>
                </div>

                {/* Row 3: Service + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Service Required *" error={errors.service?.message}>
                    <select {...register('service')}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Budget Range">
                    <select {...register('budget')}>
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </FormField>
                </div>

                {/* Deadline */}
                <FormField label="Project Deadline">
                  <input type="date" {...register('deadline')} placeholder=" " className="text-text-2" />
                </FormField>

                {/* Message */}
                <FormField label="Project Details *" error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder=" "
                    className="resize-none"
                  />
                </FormField>

                {/* File upload */}
                <div>
                  <p className="text-xs text-text-3 mb-2 tracking-wide">Attach a reference file (optional)</p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-border hover:border-border-hover text-sm text-text-3 hover:text-text-2 transition-all duration-250 w-full justify-center"
                  >
                    📎 Click to Upload a File
                  </button>
                  <input ref={fileRef} type="file" className="hidden" accept="image/*,video/*,audio/*,.pdf,.doc,.docx" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300',
                    isSubmitting
                      ? 'bg-white/20 text-text-3 cursor-not-allowed'
                      : 'bg-white text-bg hover:bg-white/90 active:scale-[0.98]'
                  )}
                >
                  {isSubmitting ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-3">
            <div className="glass rounded-2xl p-6 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-green-400">Available for work</span>
              </div>
              <p className="text-sm text-text-3 leading-relaxed">
                Currently accepting new freelance projects. Typical response time: under 24 hours.
              </p>
            </div>

            {contacts.map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-border-hover transition-all duration-250 group"
                data-cursor="open"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center group-hover:border-border-hover transition-colors duration-250">
                  <c.icon size={16} className="text-text-3 group-hover:text-text-2 transition-colors duration-250" />
                </div>
                <div>
                  <p className="text-2xs font-semibold tracking-widest uppercase text-text-3">{c.label}</p>
                  <p className="text-sm text-text-2 group-hover:text-text transition-colors duration-250">{c.value}</p>
                </div>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, error, children,
}: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="form-group">
      {children}
      <label>{label}</label>
      {error && <p className="text-xs text-red-400 mt-1 pl-1">{error}</p>}
    </div>
  );
}
