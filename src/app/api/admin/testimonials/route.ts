import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
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
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
