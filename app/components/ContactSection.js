'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon, MapPinAreaIcon, WhatsappLogoIcon, LinkedinLogoIcon, CheckIcon, XIcon } from '@phosphor-icons/react';
import { useTheme } from '../hooks/useTheme';
import "../styles/ResumeButton.css";

// Email template cache
const templateCache = new Map();

// Environment variables
const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://your-portfolio.com';
const CREATOR_NAME = process.env.NEXT_PUBLIC_CREATOR_NAME || 'Muhammad Umair';

// Professional email template for creator
const getCreatorEmailTemplate = (senderName, senderEmail, subject, message) => {
  const cacheKey = `creator-${senderName}-${subject}`;
  if (templateCache.has(cacheKey)) {
    return templateCache.get(cacheKey);
  }

  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  const template = {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Contact</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 40px;">📧</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">New Portfolio Contact!</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Someone wants to connect with you 🎉</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <!-- Sender Info Card -->
            <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #3b82f6;">
              <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 20px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">👤</span>Contact Details
              </h2>
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center;">
                  <strong style="color: #475569; width: 80px; font-size: 14px;">Name:</strong>
                  <span style="color: #1e293b; font-size: 16px;">${senderName}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <strong style="color: #475569; width: 80px; font-size: 14px;">Email:</strong>
                  <a href="mailto:${senderEmail}" style="color: #3b82f6; text-decoration: none; font-size: 16px;">${senderEmail}</a>
                </div>
                <div style="display: flex; align-items: center;">
                  <strong style="color: #475569; width: 80px; font-size: 14px;">Subject:</strong>
                  <span style="color: #1e293b; font-size: 16px;">${subject}</span>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">💬</span>Message
              </h3>
              <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="mailto:${senderEmail}?subject=Re: ${encodeURIComponent(subject)}" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                📧 Reply Now
              </a>
              <a href="${PORTFOLIO_URL}" 
                 style="display: inline-block; background: transparent; color: #3b82f6; text-decoration: none; padding: 12px 30px; border: 2px solid #3b82f6; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                🌐 View Portfolio
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px; font-size: 14px;">
              <strong>Received:</strong> ${timestamp}
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              This email was automatically generated from your portfolio contact form
            </p>
            <div style="margin-top: 15px;">
              <span style="font-size: 20px;">⚡</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🎉 NEW PORTFOLIO CONTACT!

👤 CONTACT DETAILS:
Name: ${senderName}
Email: ${senderEmail}
Subject: ${subject}

💬 MESSAGE:
${message}

📧 Reply to: ${senderEmail}
🌐 Portfolio: ${PORTFOLIO_URL}

Received: ${timestamp}
This email was automatically generated from your portfolio contact form.
    `
  };

  templateCache.set(cacheKey, template);
  return template;
};

// Friendly confirmation email template for sender
const getConfirmationEmailTemplate = (senderName, subject) => {
  const cacheKey = `confirmation-${senderName}-${subject}`;
  if (templateCache.has(cacheKey)) {
    return templateCache.get(cacheKey);
  }

  const template = {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - Thank You!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 40px;">✨</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Message Received!</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Thanks for reaching out 😊</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 24px;">Hey ${senderName}! 👋</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                I've received your message about "<strong style="color: #1e293b;">${subject}</strong>" and I'm excited to connect with you!
              </p>
            </div>

            <!-- Status Card -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #10b981;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <span style="font-size: 24px; margin-right: 10px;">🚀</span>
                <h3 style="color: #166534; margin: 0; font-size: 18px;">Your message is on its way!</h3>
              </div>
              <p style="color: #15803d; margin: 0; font-size: 14px;">
                I typically respond within 24-48 hours. Keep an eye on your inbox!
              </p>
            </div>

            <!-- What's Next -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px;">What happens next? 🤔</h3>
              <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="background-color: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px;">1</span>
                  <span style="color: #475569; font-size: 14px;">I'll review your message carefully</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="background-color: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px;">2</span>
                  <span style="color: #475569; font-size: 14px;">I'll craft a personalized response</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="background-color: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px;">3</span>
                  <span style="color: #475569; font-size: 14px;">You'll hear back from me soon!</span>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div style="margin-bottom: 30px;">
              <p style="color: #64748b; margin: 0 0 15px; font-size: 14px;">While you wait, feel free to connect with me:</p>
              <div>
                <a href="https://linkedin.com/in/muhammadumair" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                  <span style="background-color: #0077b5; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px;">🔗 LinkedIn</span>
                </a>
                <a href="https://wa.me/31630574687" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                  <span style="background-color: #25d366; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px;">💬 WhatsApp</span>
                </a>
                <a href="${PORTFOLIO_URL}" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                  <span style="background-color: #6366f1; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px;">🌐 Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 10px; font-size: 16px; font-weight: 600;">
              Thanks for your interest! 🙏
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Best regards,<br>
              <strong>${CREATOR_NAME}</strong>
            </p>
            <div style="margin-top: 15px;">
              <span style="font-size: 20px;">🌟</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
✨ MESSAGE RECEIVED - THANK YOU!

Hey ${senderName}! 👋

I've received your message about "${subject}" and I'm excited to connect with you!

🚀 YOUR MESSAGE IS ON ITS WAY!
I typically respond within 24-48 hours. Keep an eye on your inbox!

WHAT HAPPENS NEXT? 🤔
1. I'll review your message carefully
2. I'll craft a personalized response  
3. You'll hear back from me soon!

CONNECT WITH ME:
🔗 LinkedIn: https://linkedin.com/in/muhammadumair
💬 WhatsApp: https://wa.me/31630574687
🌐 Portfolio: ${PORTFOLIO_URL}

Thanks for your interest! 🙏

Best regards,
${CREATOR_NAME}
    `
  };

  templateCache.set(cacheKey, template);
  return template;
};

export default function ContactSection() {
  const { getStrokeStyle } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [jwtToken, setJwtToken] = useState('');

  // Fetch JWT on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/get-token');
        if (!response.ok) throw new Error('Failed to fetch token');
        const { token } = await response.json();
        setJwtToken(token);
      } catch (error) {
        setSubmitStatus('error');
        setServerError('Unable to initialize form. Please try again later.');
      }
    };
    fetchToken();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!jwtToken) {
      setSubmitStatus('error');
      setServerError('Authentication token missing. Please refresh and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setServerError('');

    try {
      const creatorEmail = getCreatorEmailTemplate(
        formData.name.trim(),
        formData.email.trim(),
        formData.subject.trim(),
        formData.message.trim()
      );
      const confirmationEmail = getConfirmationEmailTemplate(
        formData.name.trim(),
        formData.subject.trim()
      );

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          to: 'taimoorkn2221@gmail.com',
          from: formData.email.trim(),
          subject: `Portfolio Contact: ${formData.subject.trim()}`,
          name: formData.name.trim(),
          html: creatorEmail.html,
          text: creatorEmail.text,
          confirmationHtml: confirmationEmail.html,
          confirmationText: confirmationEmail.text,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
    } catch (error) {
      setSubmitStatus('error');
      setServerError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissError = () => {
    setSubmitStatus(null);
    setServerError('');
  };

  const contactInfo = [
    { icon: <PhoneIcon size={16} />, text: '+31 630574687', href: 'tel:+31630574687' },
    { icon: <EnvelopeIcon size={16} />, text: 'taimoorkn2221@gmail.com', href: 'mailto:taimoorkn2221@gmail.com' },
    { icon: <MapPinAreaIcon size={16} />, text: 'Lahore, PK', href: null },
    { icon: <WhatsappLogoIcon size={16} />, text: 'WhatsApp', href: 'https://wa.me/31630574687' },
    { icon: <LinkedinLogoIcon size={16} />, text: 'LinkedIn', href: 'https://linkedin.com/in/muhammadumair' },
  ];

  return (
    <section className="section">
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          CONTACT
        </h2>
      </div>

      <div className="section_title">
        <span className="text-glow">// GET IN TOUCH</span>
      </div>
      <h2 className="section_heading">Let's Connect</h2>

      <div className="flex flex-wrap gap-4 mb-8 max-w-2xl">
        {contactInfo.map((info, index) => (
          <div key={index}>
            <a
              href={info.href}
              target={info.href ? '_blank' : undefined}
              rel={info.href ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-dashed border-border-light dark:border-border-dark text-text-secondary dark:hover:text-white transition-colors duration-200 font-open_sans text-sm"
            >
              {info.icon}
              <span>{info.text}</span>
            </a>
          </div>
        ))}
        <div>
          <Link href="/resume" className="resume_button">
            <span>
              <span className="container">
                <span className="primary"></span>
                <span className="complimentary"></span>
              </span>
            </span>
            <span>📄 Resume</span>
          </Link>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2">
          <CheckIcon size={20} className="text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200 font-open_sans">
            Message sent successfully! I'll get back to you soon.
          </span>
          <button onClick={dismissError} className="ml-auto">
            <XIcon size={20} className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200" />
          </button>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
          <XIcon size={20} className="text-red-600 dark:text-red-400" />
          <span className="text-red-800 dark:text-red-200 font-open_sans">
            {serverError || 'Failed to send message. Please try again.'}
          </span>
          <button onClick={dismissError} className="ml-auto">
            <XIcon size={20} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              maxLength="50"
              className={`w-full p-4 bg-transparent border-b border-dashed ${errors.name ? 'border-red-500' : 'border-border-light dark:border-border-dark'} text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary focus:outline-none focus:border-blue-500 transition-colors font-open_sans`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 font-open_sans">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-Mail *"
              value={formData.email}
              onChange={handleInputChange}
              maxLength="100"
              className={`w-full p-4 bg-transparent border-b border-dashed ${errors.email ? 'border-red-500' : 'border-border-light dark:border-border-dark'} text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary focus:outline-none focus:border-blue-500 transition-colors font-open_sans`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-open_sans">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleInputChange}
            maxLength="100"
            className={`w-full p-4 bg-transparent border-b border-dashed ${errors.subject ? 'border-red-500' : 'border-border-light dark:border-border-dark'} text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary focus:outline-none focus:border-blue-500 transition-colors font-open_sans`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500 font-open_sans">{errors.subject}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message *"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            maxLength="1000"
            className={`w-full p-4 bg-transparent border-b border-dashed ${errors.message ? 'border-red-500' : 'border-border-light dark:border-border-dark'} text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary focus:outline-none focus:border-blue-500 transition-colors resize-none font-open_sans`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && (
              <p className="text-sm text-red-500 font-open_sans">{errors.message}</p>
            )}
            <p className="text-xs text-text-secondary font-open_sans ml-auto">
              {formData.message.length}/1000
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !jwtToken}
          className="flex items-center space-x-2 bg-transparent text-sm text-text-primary-light dark:text-text-primary-dark border border-dashed border-black dark:border-white px-4 hover:bg-bg-dark dark:hover:bg-bg-light hover:text-text-primary-dark dark:hover:text-text-primary-light py-2 rounded-full font-roboto_mono transition-colors"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>
    </section>
  );
}