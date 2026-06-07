import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.testimonial.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        ...(body.quote !== undefined && { quote: body.quote }),
        ...(body.author !== undefined && { author: body.author }),
        ...(body.role !== undefined && { role: body.role }),
        ...(body.company !== undefined && { company: body.company }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.order !== undefined && { order: body.order }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.projectId !== undefined && { projectId: body.projectId }),
      },
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Failed to update testimonial:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.testimonial.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await db.testimonial.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
