import { NextResponse } from 'next/server'
import { cleanupExpired } from '@/lib/storage'

export async function POST() {
  try {
    const deleted = await cleanupExpired()
    return NextResponse.json({ deleted })
  } catch (error) {
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}