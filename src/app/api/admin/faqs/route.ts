import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const faqs = await db.faq.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const faq = await db.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category ?? 'general',
        order: body.order ?? 0,
        status: body.status ?? 'published',
      },
    })
    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error('Failed to create FAQ:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}
