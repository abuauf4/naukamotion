import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultFaqs = [
  {
    question: 'Berapa lama waktu pengerjaan website?',
    answer:
      'Waktu pengerjaan tergantung kompleksitas proyek. Website landing page biasanya 2-3 minggu, website dengan fitur custom 4-8 minggu, dan sistem bisnis 6-12 minggu.',
    category: 'general',
    order: 0,
  },
  {
    question: 'Berapa biaya pembuatan website?',
    answer:
      'Biaya bervariasi sesuai kebutuhan. Kami menawarkan paket yang dapat disesuaikan dengan budget Anda. Hubungi kami untuk konsultasi gratis dan penawaran detail.',
    category: 'harga',
    order: 1,
  },
  {
    question: 'Apakah website akan responsif di mobile?',
    answer:
      'Tentu saja. Semua website yang kami buat responsif dan dioptimasi untuk semua perangkat — desktop, tablet, dan mobile.',
    category: 'teknis',
    order: 2,
  },
  {
    question: 'Apakah ada layanan maintenance?',
    answer:
      'Ya, kami menyediakan paket maintenance bulanan yang mencakup update keamanan, backup rutin, dan dukungan teknis.',
    category: 'layanan',
    order: 3,
  },
  {
    question: 'Apakah saya bisa mengelola konten sendiri?',
    answer:
      'Ya, kami bisa mengintegrasikan CMS yang memungkinkan Anda mengelola konten tanpa pengetahuan teknis.',
    category: 'teknis',
    order: 4,
  },
  {
    question: 'Bagaimana proses kerja Nauka Motion?',
    answer:
      'Proses kami: Konsultasi → Proposal & Desain → Pengembangan → Testing → Launch. Anda terlibat di setiap tahap.',
    category: 'general',
    order: 5,
  },
];

export async function GET() {
  try {
    const { data: faqs, error } = await supabasePublic
      .from('faqs')
      .select('question, answer, category, order')
      .eq('status', 'published')
      .order('"order"', { ascending: true });

    if (error) throw error;

    if (faqs && faqs.length > 0) {
      return NextResponse.json(faqs, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
      });
    }

    return NextResponse.json(defaultFaqs, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json(defaultFaqs, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
