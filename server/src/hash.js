import crypto from 'crypto'


export function SHA256HexEncryptor(str) {
  return crypto.createHash('sha256').update(str).digest('hex')
}