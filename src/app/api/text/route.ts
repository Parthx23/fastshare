import { NextRequest, NextResponse } from 'next/server'
import { saveText } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }
    
    if (text.length > 1024 * 1024) { // 1MB text limit
      return NextResponse.json({ error: 'Text too long' }, { status: 400 })
    }
    
    const item = await saveText(text)
    
    return NextResponse.json({
      id: item.id,
      url: `${request.nextUrl.origin}/${item.id}`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}