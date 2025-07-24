import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

// Define schema for input validation
const emailSchema = yup.object().shape({
  to: yup.string().email('Invalid recipient email').required('Recipient email is required'),
  from: yup.string().email('Invalid sender email').required('Sender email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject cannot exceed 100 characters')
    .required('Subject is required'),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  html: yup
    .string()
    .min(10, 'HTML content must be at least 10 characters')
    .max(10000, 'HTML content cannot exceed 10000 characters')
    .required('HTML content is required'),
  text: yup
    .string()
    .min(10, 'Text content must be at least 10 characters')
    .max(5000, 'Text content cannot exceed 5000 characters')
    .required('Text content is required'),
  confirmationHtml: yup
    .string()
    .min(10, 'Confirmation HTML content must be at least 10 characters')
    .max(10000, 'Confirmation HTML content cannot exceed 10000 characters')
    .required('Confirmation HTML content is required'),
  confirmationText: yup
    .string()
    .min(10, 'Confirmation text content must be at least 10 characters')
    .max(5000, 'Confirmation text content cannot exceed 5000 characters')
    .required('Confirmation text content is required'),
});

// Environment variables
const EMAIL_USER = process.env.EMAIL_USER || 'taimoorkn2221@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret';
const CREATOR_NAME = process.env.CREATOR_NAME || 'Muhammad Umair';

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    // Verify JWT
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    let validatedData;
    try {
      validatedData = await emailSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      const errors = validationError.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return NextResponse.json({ error: 'Invalid input data', details: errors }, { status: 400 });
    }

    // Send email to creator
    try {
      await transporter.sendMail({
        from: `"${CREATOR_NAME} Portfolio" <${EMAIL_USER}>`,
        to: validatedData.to,
        replyTo: validatedData.from,
        subject: `🎉 New Portfolio Contact: ${validatedData.subject}`,
        html: validatedData.html,
        text: validatedData.text,
      });
    } catch (emailError) {
      return NextResponse.json(
        { error: 'Failed to send email to creator. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email to sender
    try {
      await transporter.sendMail({
        from: `"${CREATOR_NAME}" <${EMAIL_USER}>`,
        to: validatedData.from,
        replyTo: validatedData.to,
        subject: `✨ Message Received - Thanks for reaching out!`,
        html: validatedData.confirmationHtml,
        text: validatedData.confirmationText,
      });
    } catch (emailError) {
      console.warn('Confirmation email failed, but creator email was sent successfully.');
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}