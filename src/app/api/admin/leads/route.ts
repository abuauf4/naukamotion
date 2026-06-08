import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { db } = await import('@/lib/db')
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(leads)
  } catch {
    // DB unavailable — return empty (leads only come from form submissions)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await import('@/lib/db')
    const body = await request.json()
    const lead = await db.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        message: body.message,
        status: body.status ?? 'new',
        notes: body.notes,
      },
    })
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Failed to create lead:', error)
    return NextResponse.json({ error: 'Gagal menyimpan lead — database tidak tersedia' }, { status: 500 })
  }
}
