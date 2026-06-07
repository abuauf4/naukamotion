import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const settings = await db.setting.findMany()
    // Convert array to key-value object
    const settingsMap: Record<string, string> = {}
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value
    }
    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    // Body expects array of { key, value }
    const items: Array<{ key: string; value: string }> = body

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Request body must be an array of { key, value } objects' },
        { status: 400 }
      )
    }

    // Upsert each setting
    const results = await Promise.all(
      items.map((item) =>
        db.setting.upsert({
          where: { key: item.key },
          update: { value: item.value },
          create: { key: item.key, value: item.value },
        })
      )
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
