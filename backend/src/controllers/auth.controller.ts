import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store in session
  (req.session as any).otp = otp;

  (req.session as any).email = email;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,

    to: email,

    subject: "Your OTP Code",

    text: `Your OTP is: ${otp}`,
  });

  res.json({
    message: "OTP sent",
  });
};

export const verifyOtp = (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (
    (req.session as any).otp === otp &&
    (req.session as any).email === email
  ) {
    (req.session as any).isVerified = true;

    return res.json({
      verified: true,
    });
  }

  res.status(400).json({
    verified: false,
    message: "Invalid OTP",
  });
};
