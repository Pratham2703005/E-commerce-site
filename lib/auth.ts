/**
 * Verify API authentication
 * Admin routes require: Authorization: Bearer YOUR_API_SECRET_KEY
 */
export function verifyApiKey(authHeader: string | undefined): boolean {
  if (!authHeader) return false;
  const token = authHeader.split('Bearer ')[1];
  return token === process.env.API_SECRET_KEY;
}
