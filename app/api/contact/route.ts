'use client'

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, phone, roleType, interestedIn } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: 'Nexcellence Academy <operations@nexcellenceacademy.com>',
      to: ['operations@nexcellenceacademy.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a192f;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${phone}</td>
            </tr>
            ` : ''}
            ${roleType ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Role:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${roleType}</td>
            </tr>
            ` : ''}
            ${interestedIn ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Interested In:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${interestedIn}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; color: #64748b; font-size: 12px;">
            This email was sent from the contact form on Nexcellence Academy website.
          </p>
        </div>
      `,
    })

    if (data.error) {
      console.error('Resend error:', data.error)
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: 'Nexcellence Academy <operations@nexcellenceacademy.com>',
      to: [email],
      subject: 'Thank you for contacting Nexcellence Academy',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0a192f;">Thank you for reaching out!</h2>
          
          <p>Dear ${name},</p>
          
          <p>We have received your inquiry and want to thank you for taking the time to contact Nexcellence Academy.</p>
          
          <p>Our team will review your message and respond within 48 hours. If your inquiry is urgent, please feel free to call us directly at +1 (800) 123-4567.</p>
          
          <p>Here's a summary of your inquiry:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Contact Form Inquiry</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Date:</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${new Date().toLocaleDateString()}</td>
            </tr>
          </table>
          
          <p>Best regards,<br>The Nexcellence Academy Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>Nexcellence Academy™</p>
            <p>Strategic Academic Consulting for Doctoral Scholars</p>
            <p>operations@nexcellenceacademy.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}