// Simple encryption utilities for data at rest
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "default-key-change-in-production";

export function encrypt(data: string): string {
  // Simple XOR encryption for demo - use proper encryption in production
  const key = ENCRYPTION_KEY;
  let encrypted = '';
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return Buffer.from(encrypted, 'binary').toString('base64');
}

export function decrypt(encryptedData: string): string {
  const key = ENCRYPTION_KEY;
  const data = Buffer.from(encryptedData, 'base64').toString('binary');
  let decrypted = '';
  for (let i = 0; i < data.length; i++) {
    decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return decrypted;
}

export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}