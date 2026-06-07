import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const insight = await db.insight.findUnique({ where: { id } })
    if (!insight) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(insight)
  } catch (error) {
    console.error('Failed to fetch insight:', error)
    return NextResponse.json({ error: 'Failed to fetch insight' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.insight.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const insight = await db.insight.update({
      where: { id },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.body !== undefined && { body: body.body }),
        ...(body.topic !== undefined && { topic: body.topic }),
        ...(body.author !== undefined && { author: body.author }),
        ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
      },
    })
    return NextResponse.json(insight)
  } catch (error) {
    console.error('Failed to update insight:', error)
    return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.insight.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await db.insight.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete insight:', error)
    return NextResponse.json({ error: 'Failed to delete insight' }, { status: 500 })
  }
}
