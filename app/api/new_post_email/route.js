import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const POST = async (request) => {
  const { recipient, postCreator, postLink } = await request.json();
  try {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILSEND_API_KEY,
    });

    const sentFrom = new Sender(
      "MS_WOjlc4@trial-pxkjn41q320lz781.mlsender.net",
      "CodeFlow 💻 "
    );

    const recipients = [new Recipient(recipient.email, recipient.username)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(`🌟New Post From ${postCreator}🌟`)
      .setHtml(
        `<strong>${postCreator}</strong> just posted something. Click to view it:
        <a>${postLink}</a>`
      )
      .setText("This is the text content");

    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.log(error);
  }
};
