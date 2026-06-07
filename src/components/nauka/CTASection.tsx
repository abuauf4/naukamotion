'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, Send, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * CTASection — Combined CTA + Contact
 *
 * Title: "Mari Memulai Proyek Anda"
 * Form with Name, Email, Textarea
 * WhatsApp + Email contact options
 * POST to /api/admin/leads
 * Magnetic button effect on desktop
 * NO hidden contact, accessible
 */

export function CTASection() {
  const cardRef = useScrollReveal();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Magnetic button effect — desktop only
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const moveX = x * 0.15;
    const moveY = y * 0.15;
    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasHover || prefersReducedMotion) return;

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: 'new',
        }),
      });

      if (!res.ok) throw new Error('Gagal mengirim pesan');

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div className="container-narrow">
        <div ref={cardRef} className="scroll-reveal-scale">
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm border border-[var(--nauka-border)] relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 relative z-10">
              <h2 className="text-h1 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
                Mari Memulai Proyek Anda
              </h2>
              <p className="text-body-lg text-[var(--nauka-text-secondary)] max-w-[480px] mx-auto">
                Ceritakan ide Anda, dan kami akan merespons dalam 24 jam.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-12 relative z-10">
                <CheckCircle className="w-12 h-12 text-[var(--nauka-accent)] mx-auto mb-4" />
                <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-body text-[var(--nauka-text-secondary)] mb-6">
                  Kami akan merespons dalam 24 jam. Atau hubungi kami langsung via WhatsApp untuk respons lebih cepat.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-[var(--nauka-border)] text-[var(--nauka-text-secondary)] hover:text-[var(--nauka-text-primary)]"
                >
                  Kirim Pesan Lagi
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div>
                    <label htmlFor="cta-name" className="text-body-sm font-medium text-[var(--nauka-text-primary)] mb-1.5 block">
                      Nama
                    </label>
                    <Input
                      id="cta-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-[var(--nauka-bg-primary)] border-[var(--nauka-border)] focus:border-[var(--nauka-accent)] focus:ring-[var(--nauka-accent-light)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="text-body-sm font-medium text-[var(--nauka-text-primary)] mb-1.5 block">
                      Email
                    </label>
                    <Input
                      id="cta-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-[var(--nauka-bg-primary)] border-[var(--nauka-border)] focus:border-[var(--nauka-accent)] focus:ring-[var(--nauka-accent-light)]/20"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="mb-4 sm:mb-5">
                  <label htmlFor="cta-message" className="text-body-sm font-medium text-[var(--nauka-text-primary)] mb-1.5 block">
                    Ceritakan Ide Anda
                  </label>
                  <Textarea
                    id="cta-message"
                    placeholder="Ceritakan ide Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-[var(--nauka-bg-primary)] border-[var(--nauka-border)] focus:border-[var(--nauka-accent)] focus:ring-[var(--nauka-accent-light)]/20 resize-none"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-body-sm text-red-500 mb-4">{error}</p>
                )}

                {/* Contact options + Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {/* Submit button */}
                  <div ref={buttonRef} className="w-full sm:w-auto transition-transform duration-200 ease-out">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto magnetic-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg px-8 py-3.5 text-body font-medium h-auto disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-[var(--nauka-border)]" />
                  <span className="hidden sm:block text-caption text-[var(--nauka-text-tertiary)]">atau</span>

                  {/* Contact options */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366]/20 transition-colors text-body-sm font-medium flex-1 sm:flex-none justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat via WhatsApp
                    </a>
                    <a
                      href="mailto:hello@naukamotion.id"
                      className="flex items-center gap-2 px-4 py-2.5 bg-[var(--nauka-bg-primary)] border border-[var(--nauka-border)] text-[var(--nauka-text-secondary)] rounded-lg hover:text-[var(--nauka-text-primary)] hover:border-[var(--nauka-accent)]/30 transition-colors text-body-sm font-medium flex-1 sm:flex-none justify-center"
                    >
                      <Mail className="w-4 h-4" />
                      hello@naukamotion.id
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
