import {
  buildContactFormEmailHtml,
  buildContactFormEmailSubject,
  buildContactFormEmailText,
} from "@/lib/emails/contact-form-email";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!firstName || !email || !message) {
      return NextResponse.json({ message: "First name, email, and message are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }

    const smtpHost = process.env.NODEMAILER_HOST ?? process.env.SMTP_HOST;
    const smtpPort = Number(process.env.NODEMAILER_PORT ?? process.env.SMTP_PORT ?? 587);
    const smtpUser = process.env.NODEMAILER_USER ?? process.env.SMTP_USER;
    const smtpPass = process.env.NODEMAILER_PASSWORD ?? process.env.SMTP_PASS;
    const secureFromEnv = process.env.NODEMAILER_SECURE;
    const smtpSecure = secureFromEnv ? secureFromEnv.toLowerCase() === "true" : smtpPort === 465;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? smtpUser;
    const fromEmail = process.env.NODEMAILER_FROM ?? process.env.CONTACT_FROM_EMAIL ?? smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
      return NextResponse.json({ message: "Email service is not configured on the server." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailData = { firstName, lastName, email, phone, message };

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: buildContactFormEmailSubject(emailData),
      text: buildContactFormEmailText(emailData),
      html: buildContactFormEmailHtml(emailData),
    });

    return NextResponse.json({ message: "Thanks! Your message has been sent." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Something went wrong while sending your message." }, { status: 500 });
  }
}
