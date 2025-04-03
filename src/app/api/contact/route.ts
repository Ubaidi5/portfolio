import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Zoho SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER, // Your Zoho email address
    pass: process.env.EMAIL_PASSWORD, // Your Zoho email password or app-specific password
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message, date, timezone, country, city, browser, device } =
      body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ubaid7625@gmail.com",
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; margin-bottom: 5px;">Message</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; margin-bottom: 5px;">Contact Information</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Timezone:</strong> ${timezone}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; margin-bottom: 5px;">User Information</h3>
            <p><strong>Location:</strong> ${city}, ${country}</p>
            <p><strong>Browser:</strong> ${browser}</p>
            <p><strong>Device:</strong> ${device}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
            <p>This email was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
