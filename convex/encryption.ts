const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "default-key-change-in-production";

// Convert text ↔ byte array safely
function xorEncrypt(input: string, key: string): string {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    out += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return out;
}

export function encrypt(data: string): string {
  const encrypted = xorEncrypt(data, ENCRYPTION_KEY);
  return btoa(encrypted); // instead of Buffer
}

export function decrypt(encryptedData: string): string {
  const decoded = atob(encryptedData); // instead of Buffer
  return xorEncrypt(decoded, ENCRYPTION_KEY);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}
