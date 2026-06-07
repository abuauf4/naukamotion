import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const insights = await db.insight.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(insights)
  } catch (error) {
    console.error('Failed to fetch insights:', error)
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const insight = await db.insight.create({
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt,
        body: body.body,
        topic: body.topic,
        author: body.author ?? 'Abu Aufa',
        thumbnail: body.thumbnail,
        status: body.status ?? 'draft',
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      },
    })
    return NextResponse.json(insight, { status: 201 })
  } catch (error) {
    console.error('Failed to create insight:', error)
    return NextResponse.json({ error: 'Failed to create insight' }, { status: 500 })
  }
}
