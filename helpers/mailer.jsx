import nodemailer from "nodemailer";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, id }) => {
  try {
    // Create a hashed token
    const hashedToken = await bcrypt.hash(id.toString(), 10);

    // Update user model based on email type
    const updateFields =
      emailType === "VERIFY"
        ? {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
          }
        : {
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: Date.now() + 3600000,
          };

    await User.findByIdAndUpdate(id, updateFields);

    // Create email transport
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "sandbox.smtp.mailtrap.io",
      port: process.env.EMAIL_PORT || 2525,
      auth: {
        user: process.env.EMAIL_USER || "3d05f345e974fc",
        pass: process.env.EMAIL_PASS || "0aba8593dca6f4",
      },
    });

    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || "webdevu02@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }.</p>`,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
