"use server";

import nodemailer from "nodemailer";

type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendContactMessage(
  formData: FormData,
): Promise<ContactFormState> {
  try {
    // =====================================================
    // GET FORM DATA
    // =====================================================

    const firstName = String(
      formData.get("firstName") ?? "",
    ).trim();

    const lastName = String(
      formData.get("lastName") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).trim();

    const message = String(
      formData.get("message") ?? "",
    ).trim();

    const privacy = formData.get("privacy");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !message
    ) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    if (privacy !== "on") {
      return {
        success: false,
        message:
          "Please accept the privacy notice before submitting.",
      };
    }

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // =====================================================
    // ENVIRONMENT VARIABLES
    // =====================================================

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(
      process.env.SMTP_PORT || 465,
    );
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword =
      process.env.SMTP_PASSWORD;
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !receiverEmail
    ) {
      console.error(
        "Contact email environment variables are missing.",
      );

      return {
        success: false,
        message:
          "Email service is not configured correctly.",
      };
    }

    // =====================================================
    // SMTP TRANSPORTER
    // =====================================================

    const transporter =
      nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

    // =====================================================
    // FULL NAME
    // =====================================================

    const fullName =
      `${firstName} ${lastName}`;

    // =====================================================
    // EMAIL → ADMIN
    // =====================================================

    await transporter.sendMail({
      from: `"UAMC Website" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Contact Message from ${fullName}`,

      text: `
New Contact Us Message

Name:
${fullName}

Email:
${email}

Phone:
${phone}

Message:
${message}
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            background: #f7faf8;
          "
        >
          <div
            style="
              background: #008B45;
              padding: 20px;
              color: white;
            "
          >
            <h2 style="margin: 0;">
              New Contact Us Message
            </h2>
          </div>

          <div
            style="
              background: white;
              padding: 25px;
            "
          >
            <p>
              <strong>Name:</strong>
              ${fullName}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <hr />

            <p>
              <strong>Message:</strong>
            </p>

            <p
              style="
                line-height: 1.7;
                white-space: pre-wrap;
              "
            >
              ${message}
            </p>
          </div>
        </div>
      `,
    });

    // =====================================================
    // AUTO REPLY → USER
    // =====================================================

    await transporter.sendMail({
      from: `"Uttara Adhunik Medical College" <${smtpUser}>`,
      to: email,
      subject:
        "Thank You for Contacting Uttara Adhunik Medical College",

      text: `
Dear ${firstName},

Thank you for contacting Uttara Adhunik Medical College.

We have successfully received your message.

Our team will review your message and get back to you as soon as possible.

Regards,
Uttara Adhunik Medical College
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            background: #f7faf8;
          "
        >
          <div
            style="
              background: #008B45;
              padding: 20px;
              color: white;
            "
          >
            <h2 style="margin: 0;">
              Thank You for Contacting UAMC
            </h2>
          </div>

          <div
            style="
              background: white;
              padding: 30px;
            "
          >
            <p>
              Dear ${firstName},
            </p>

            <p
              style="
                line-height: 1.7;
                color: #444;
              "
            >
              Thank you for contacting
              Uttara Adhunik Medical College.
            </p>

            <p
              style="
                line-height: 1.7;
                color: #444;
              "
            >
              We have successfully received
              your message. Our team will review
              your message and get back to you
              as soon as possible.
            </p>

            <br />

            <p
              style="
                line-height: 1.7;
                color: #444;
              "
            >
              Regards,
              <br />
              <strong>
                Uttara Adhunik Medical College
              </strong>
            </p>
          </div>
        </div>
      `,
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return {
      success: true,
      message:
        "Your message has been sent successfully. A confirmation email has been sent to you.",
    };
  } catch (error) {
    console.error(
      "CONTACT FORM EMAIL ERROR:",
      error,
    );

    return {
      success: false,
      message:
        "Something went wrong while sending your message. Please try again later.",
    };
  }
}