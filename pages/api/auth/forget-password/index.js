import { messages } from "/utils/mesagges";
import { Resend } from "resend";
import bcrypt from "bcrypt";
import db from "/libs/db";
import jwt from "jsonwebtoken";
import EmailTemplate from "/pages/components/emailTemplate";
const resend = new Resend(process.env.RESEND_APIKEY);

export default async function forgetpasswordHanler(req, res) {
  try {
    const { email } = req.body;

    const userFound = await db.user.findUnique({
      where: {
        email,
      },
    });

    
    if (!userFound) {
        return res.status(409).send("Email No exists");
      }

    const tokenData = {
        email: userFound.email,
        id: userFound.id,
    }
    console.log(tokenData);
    const token = jwt.sign({ data: tokenData },process.env.SECRET_KEY_TOKEN, {
        expiresIn: 86400,
      });
      

    const forgetUrl = `http://51.79.49.107:3000/auth/change-password?token=${token}`;

    
    await resend.emails.send({
        from: "Makarios club <noreply@makarios.club>",
        to: email,
        subject: "Cambio de Contraseña",
        react: EmailTemplate({ buttonUrl: forgetUrl }),
      }); 


    return res
      .status(200)
      .json({ message: messages.success.emailSent });
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json({ message: messages.error.default, error });
  }
}
 