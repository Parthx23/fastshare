import { NextRequest, NextResponse } from 'next/server'
import { getItem } from '@/lib/storage'
import { promises as fs } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await getItem(params.id)
    
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    
    if (item.type === 'text') {
      return NextResponse.json({
        type: 'text',
        content: item.content,
        created: item.created
      })
    } else {
      const fileBuffer = await fs.readFile(item.content)
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${item.filename}"`,
          'Content-Length': item.size?.toString() || '0'
        }
      })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve' }, { status: 500 })
  }
}