import { NextResponse } from 'next/server'
import { fallbackProjects } from '@/lib/fallback-data'

export async function GET() {
  try {
    const { db } = await import('@/lib/db')
    const projects = await db.project.findMany({
      orderBy: { order: 'asc' },
      include: { clientRef: true },
    })

    if (projects.length > 0) {
      return NextResponse.json(projects)
    }

    // DB empty — return fallback
    return NextResponse.json(fallbackProjects)
  } catch {
    // DB unavailable — return fallback
    return NextResponse.json(fallbackProjects)
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await import('@/lib/db')
    const body = await request.json()
    const project = await db.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        client: body.client,
        category: body.category,
        description: body.description,
        approach: body.approach,
        liveUrl: body.liveUrl,
        image: body.image,
        color: body.color ?? '#0d9488',
        featured: body.featured ?? false,
        order: body.order ?? 0,
        status: body.status ?? 'published',
        clientId: body.clientId,
      },
      include: { clientRef: true },
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error: unknown) {
    console.error('Failed to create project:', error)
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug sudah digunakan. Gunakan slug yang berbeda.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Gagal membuat proyek — database tidak tersedia' }, { status: 500 })
  }
}
