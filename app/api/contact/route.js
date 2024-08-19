import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codeflowoff@gmail.com", // Your Gmail address
    pass: "Code Flow 4444", // Your app-specific password
  },
});

export const POST = async (request, res) => {
  const { name, email, message, subject } = request.body;
  const mailOptions = {
    from: email, // Sender address
    to: "sakouhiamine144@outlook.fr", // Developer's email address
    subject: subject,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response("Mail sent successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Failed to send mail", {
      status: 500,
    });
  }
};
