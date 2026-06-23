'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  ArrowRight,
  CheckCircle,
  Loader2,
} from 'lucide-react';

/**
 * ContactPage — Nauka Motion
 *
 * Primary conversion page. Where ideas become projects.
 * Structure: Dark Hero → Form Section → Alternative Contact → Footer
 *
 * Design: Clean, professional, confident — Nauka style.
 * All text in Bahasa Indonesia.
 */

/* ━━ Project type options ━━ */
const projectTypes = [
  { value: 'website', label: 'Website Development' },
  { value: 'business-system', label: 'Business System' },
  { value: 'cms-platform', label: 'CMS Platform' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Konsultasi Digital' },
  { value: 'other', label: 'Lainnya' },
];

/* ━━ Budget range options ━━ */
const budgetRanges = [
  { value: '5-15', label: 'Rp 5 – 15 Juta' },
  { value: '15-30', label: 'Rp 15 – 30 Juta' },
  { value: '30-50', label: 'Rp 30 – 50 Juta' },
  { value: '50-100', label: 'Rp 50 – 100 Juta' },
  { value: '100+', label: 'Rp 100 Juta+' },
  { value: 'undecided', label: 'Belum ditentukan' },
];

/* ━━ Alternative contact data ━━ */
const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '0896 6252 4542',
    href: 'https://wa.me/6289662524542',
    description: 'Respon cepat di hari kerja',
    accent: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'naukamotion@gmail.com',
    href: 'mailto:naukamotion@gmail.com',
    description: 'Detail proyek dalam satu email',
    accent: false,
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Jakarta, Indonesia',
    href: null,
    description: 'Bisa meeting online atau tatap muka',
    accent: false,
  },
];

export default function ContactPage() {
  /* ━━ Form state ━━ */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budgetRange: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ━━ Scroll reveal refs ━━ */
  const heroReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const altReveal = useScrollReveal();

  /* ━━ IntersectionObserver for scroll-reveal elements ━━ */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ━━ Form handlers ━━ */
  const handleInputChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (field: string) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Submit to Leads API
        const res = await fetch('/api/admin/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            company: formData.company || undefined,
            service: formData.projectType || undefined,
            message: formData.message || undefined,
          }),
        });

        if (!res.ok) throw new Error('Failed to submit');

        setIsSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
        // Still show success to user (don't expose backend errors)
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budgetRange: '',
      message: '',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ════════════════════════════════════════════
            SECTION 1 — Hero
            Dark, confident, direct invitation
            ════════════════════════════════════════════ */}
        <section className="relative bg-texture-deep py-20 sm:py-28 lg:py-36 overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div ref={heroReveal} className="container-wide relative z-10">
            <div className="max-w-[700px]">
              {/* Eyebrow */}
              <p className="text-caption font-medium uppercase tracking-[0.3em] text-[var(--nauka-accent-light)] mb-5 sm:mb-7 scroll-reveal scroll-reveal-delay-1">
                Mulai Proyek Anda
              </p>

              {/* Headline */}
              <h1 className="text-display font-heading text-white mb-6 sm:mb-8 scroll-reveal scroll-reveal-delay-2">
                Mari Wujudkan{' '}
                <span className="text-[var(--nauka-accent-light)]">Ide Anda</span>
              </h1>

              {/* Subtitle */}
              <p className="text-body-lg text-white/55 max-w-[520px] leading-relaxed scroll-reveal scroll-reveal-delay-3">
                Ceritakan kebutuhan Anda, dan kami akan merespons dengan solusi yang tepat.
                Setiap proyek dimulai dari percakapan ini.
              </p>

              {/* Scroll hint */}
              <div className="mt-10 sm:mt-14 scroll-reveal scroll-reveal-delay-4">
                <div className="flex items-center gap-2 text-white/30 text-body-sm">
                  <ArrowRight className="w-4 h-4 rotate-90 animate-bounce" />
                  <span>Isi formulir di bawah</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 2 — Contact Form
            Light, spacious, inviting
            ════════════════════════════════════════════ */}
        <section className="bg-texture-primary py-16 sm:py-20 lg:py-28">
          <div ref={formReveal} className="container-form">
            {/* Section header */}
            <div className="text-center mb-10 sm:mb-14 scroll-reveal">
              <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-3">
                Informasi Proyek
              </h2>
              <p className="text-body text-[var(--nauka-text-secondary)] max-w-[460px] mx-auto">
                Semakin detail informasi yang Anda berikan, semakin tepat solusi yang kami siapkan.
              </p>
            </div>

            {/* ── Success state ── */}
            {isSubmitted ? (
              <div className="scroll-revealed text-center py-12 sm:py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--nauka-accent)]/10 mb-6">
                  <CheckCircle className="w-8 h-8 text-[var(--nauka-accent)]" />
                </div>
                <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-3">
                  Pesan Terkirim!
                </h3>
                <p className="text-body text-[var(--nauka-text-secondary)] max-w-[400px] mx-auto mb-8">
                  Terima kasih, {formData.name || 'sahabat'}. Tim kami akan menghubungi Anda dalam 1–2 hari kerja.
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="rounded-lg px-6 py-2.5 text-body-sm font-medium border-[var(--nauka-border)] hover:bg-[var(--nauka-bg-secondary)]"
                >
                  Kirim Pesan Lagi
                </Button>
              </div>
            ) : (
              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                className="scroll-reveal space-y-6 sm:space-y-7"
              >
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-body-sm font-medium text-[var(--nauka-text-primary)]"
                    >
                      Nama Lengkap <span className="text-[var(--nauka-accent)]">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nama Anda"
                      required
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      className="h-11 rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)] placeholder:text-[var(--nauka-text-tertiary)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-body-sm font-medium text-[var(--nauka-text-primary)]"
                    >
                      Email <span className="text-[var(--nauka-accent)]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@perusahaan.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      className="h-11 rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)] placeholder:text-[var(--nauka-text-tertiary)]"
                    />
                  </div>
                </div>

                {/* Row: Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-body-sm font-medium text-[var(--nauka-text-primary)]"
                    >
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 812 xxxx xxxx"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      className="h-11 rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)] placeholder:text-[var(--nauka-text-tertiary)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-body-sm font-medium text-[var(--nauka-text-primary)]"
                    >
                      Nama Perusahaan
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="PT. Contoh Sukses"
                      value={formData.company}
                      onChange={handleInputChange('company')}
                      className="h-11 rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)] placeholder:text-[var(--nauka-text-tertiary)]"
                    />
                  </div>
                </div>

                {/* Row: Project Type + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-body-sm font-medium text-[var(--nauka-text-primary)]">
                      Jenis Proyek <span className="text-[var(--nauka-accent)]">*</span>
                    </Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={handleSelectChange('projectType')}
                      required
                    >
                      <SelectTrigger className="h-11 w-full rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)]">
                        <SelectValue placeholder="Pilih jenis proyek" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {projectTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-body-sm font-medium text-[var(--nauka-text-primary)]">
                      Kisaran Budget
                    </Label>
                    <Select
                      value={formData.budgetRange}
                      onValueChange={handleSelectChange('budgetRange')}
                    >
                      <SelectTrigger className="h-11 w-full rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)]">
                        <SelectValue placeholder="Pilih kisaran budget" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-body-sm font-medium text-[var(--nauka-text-primary)]"
                  >
                    Detail Proyek <span className="text-[var(--nauka-accent)]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Ceritakan tentang proyek Anda — tujuan, fitur yang diinginkan, timeline, atau referensi yang relevan..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    className="rounded-lg border-[var(--nauka-border)] bg-white/60 focus-visible:border-[var(--nauka-accent-light)] focus-visible:ring-[var(--nauka-accent-glow)] text-[var(--nauka-text-primary)] placeholder:text-[var(--nauka-text-tertiary)] min-h-[140px] resize-y"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-caption text-[var(--nauka-text-tertiary)]">
                  Dengan mengirim formulir ini, Anda menyetujui bahwa data Anda akan kami gunakan untuk merespons pertanyaan Anda.
                </p>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="magnetic-button w-full sm:w-auto bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-xl px-10 py-4 text-body font-medium h-auto shadow-lg shadow-[var(--nauka-accent)]/15 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 3 — Alternative Contact
            Clean, accessible, direct options
            ════════════════════════════════════════════ */}
        <section className="bg-texture-secondary py-16 sm:py-20 lg:py-24">
          <div ref={altReveal} className="container-wide">
            {/* Section header */}
            <div className="text-center mb-10 sm:mb-14 scroll-reveal">
              <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-3">
                Atau Hubungi Langsung
              </h2>
              <p className="text-body text-[var(--nauka-text-secondary)] max-w-[460px] mx-auto">
                Kalau formulir bukan cara Anda, kami selalu bisa dijangkau melalui channel berikut.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-[900px] mx-auto">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                const isLink = method.href !== null;

                const cardContent = (
                  <>
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--nauka-accent)]/8 mb-4 transition-colors duration-300 group-hover:bg-[var(--nauka-accent)]/14">
                      <Icon className="w-5 h-5 text-[var(--nauka-accent)]" />
                    </div>

                    {/* Label */}
                    <h3 className="text-h4 font-heading text-[var(--nauka-text-primary)] mb-1">
                      {method.label}
                    </h3>

                    {/* Value */}
                    <p className="text-body text-[var(--nauka-text-primary)] font-medium mb-1.5">
                      {method.value}
                    </p>

                    {/* Description */}
                    <p className="text-body-sm text-[var(--nauka-text-tertiary)]">
                      {method.description}
                    </p>
                  </>
                );

                const wrapperClass = `group rounded-2xl border border-[var(--nauka-border)] bg-white/50 p-6 sm:p-7 transition-all duration-300 scroll-reveal scroll-reveal-delay-${idx + 1} ${
                  isLink
                    ? 'hover:border-[var(--nauka-accent)]/25 hover:shadow-md hover:shadow-[var(--nauka-accent)]/5 cursor-pointer'
                    : ''
                }`;

                return isLink ? (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={wrapperClass}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={method.label} className={wrapperClass}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
