import { NextRequest, NextResponse } from 'next/server'
import { saveFile } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }
    
    const buffer = Buffer.from(await file.arrayBuffer())
    const item = await saveFile(buffer, file.name)
    
    return NextResponse.json({
      id: item.id,
      url: `${request.nextUrl.origin}/${item.id}`,
      filename: item.filename,
      size: item.size
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}