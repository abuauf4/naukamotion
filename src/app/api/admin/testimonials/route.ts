import { NextResponse } from 'next/server'
import { fallbackTestimonials } from '@/lib/fallback-data'

export async function GET() {
  try {
    const { db } = await import('@/lib/db')
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
    })

    if (testimonials.length > 0) {
      return NextResponse.json(testimonials)
    }

    return NextResponse.json(fallbackTestimonials)
  } catch {
    return NextResponse.json(fallbackTestimonials)
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await import('@/lib/db')
    const body = await request.json()
    const testimonial = await db.testimonial.create({
      data: {
        quote: body.quote,
        author: body.author,
        role: body.role,
        company: body.company,
        featured: body.featured ?? false,
        order: body.order ?? 0,
        status: body.status ?? 'published',
        projectId: body.projectId,
      },
    })
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Failed to create testimonial:', error)
    return NextResponse.json({ error: 'Gagal membuat testimonial — database tidak tersedia' }, { status: 500 })
  }
}
