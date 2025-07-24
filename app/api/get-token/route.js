import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret';

export async function GET() {
  try {
    const token = jwt.sign({ form: 'contact' }, JWT_SECRET, { expiresIn: '15m' });
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}