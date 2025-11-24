import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const UPLOADS_DIR = path.join(process.cwd(), 'uploads')
const MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours

export interface ShareItem {
  id: string
  type: 'file' | 'text'
  content: string
  filename?: string
  size?: number
  created: number
}

function generateId(): string {
  return crypto.randomBytes(4).toString('hex')
}

async function ensureUploadsDir() {
  try {
    await fs.access(UPLOADS_DIR)
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true })
  }
}

export async function saveFile(buffer: Buffer, filename: string): Promise<ShareItem> {
  await ensureUploadsDir()
  
  const id = generateId()
  const filePath = path.join(UPLOADS_DIR, `${id}.bin`)
  const metaPath = path.join(UPLOADS_DIR, `${id}.json`)
  
  const item: ShareItem = {
    id,
    type: 'file',
    content: filePath,
    filename,
    size: buffer.length,
    created: Date.now()
  }
  
  await fs.writeFile(filePath, buffer)
  await fs.writeFile(metaPath, JSON.stringify(item))
  
  return item
}

export async function saveText(text: string): Promise<ShareItem> {
  await ensureUploadsDir()
  
  const id = generateId()
  const metaPath = path.join(UPLOADS_DIR, `${id}.json`)
  
  const item: ShareItem = {
    id,
    type: 'text',
    content: text,
    created: Date.now()
  }
  
  await fs.writeFile(metaPath, JSON.stringify(item))
  
  return item
}

export async function getItem(id: string): Promise<ShareItem | null> {
  try {
    const metaPath = path.join(UPLOADS_DIR, `${id}.json`)
    const data = await fs.readFile(metaPath, 'utf8')
    const item: ShareItem = JSON.parse(data)
    
    // Check if expired
    if (Date.now() - item.created > MAX_AGE) {
      await deleteItem(id)
      return null
    }
    
    return item
  } catch {
    return null
  }
}

export async function deleteItem(id: string): Promise<void> {
  try {
    const metaPath = path.join(UPLOADS_DIR, `${id}.json`)
    const filePath = path.join(UPLOADS_DIR, `${id}.bin`)
    
    await fs.unlink(metaPath).catch(() => {})
    await fs.unlink(filePath).catch(() => {})
  } catch {}
}

export async function cleanupExpired(): Promise<number> {
  await ensureUploadsDir()
  
  try {
    const files = await fs.readdir(UPLOADS_DIR)
    const metaFiles = files.filter(f => f.endsWith('.json'))
    let deleted = 0
    
    for (const file of metaFiles) {
      const id = file.replace('.json', '')
      const item = await getItem(id)
      
      if (!item) {
        deleted++
      }
    }
    
    return deleted
  } catch {
    return 0
  }
}