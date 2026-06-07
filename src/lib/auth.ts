import { SignJWT, jwtVerify } from 'jose';

// JWT secret — in production, use env variable
const SECRET_KEY = process.env.JWT_SECRET || 'nauka-motion-admin-secret-2026';
const secret = new TextEncoder().encode(SECRET_KEY);

export interface AdminTokenPayload {
  adminId: string;
  username: string;
  name: string;
}

export async function createAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      adminId: payload.adminId as string,
      username: payload.username as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
