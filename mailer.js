/* eslint-disable no-undef */
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail", // ← AQUI É O SERVIÇO, NÃO O EMAIL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendWelcomeEmail(to) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Bem-vindo à Newsletter de Futebol!",
    html: `
      <h2>Obrigado por se inscrever! ⚽</h2>
      <p>Agora você receberá novidades exclusivas sobre futebol.</p>
    `
  });
}

export default { sendWelcomeEmail };

