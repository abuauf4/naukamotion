import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { order: 'asc' },
      include: { clientRef: true },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
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
    // Prisma unique constraint violation (P2002) — duplicate slug
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug sudah digunakan. Gunakan slug yang berbeda.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
