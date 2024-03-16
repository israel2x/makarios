import { messages } from "/utils/mesagges";
import { Resend } from "resend";
import bcrypt from "bcrypt";
// import { headers } from "next/headers";
import db from "/libs/db";
import jwt from "jsonwebtoken";
import EmailTemplate from "/pages/components/emailTemplate";
const resend = new Resend(process.env.RESEND_APIKEY);

export default async function changePasswordHanler(req, res) {
  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(409).send(messages.error.needProps);
    }
    const hed = req.headers;

    const token = req.headers.token;
    console.log("token");
    console.log(token);
    // Verificar que haya token
    if (!token) {
      return res.status(409).send(messages.error.notAuthorized);
    }
    const isTokenValid = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

    const { data } = isTokenValid;
    console.log(isTokenValid);
    const userFind = await db.user.findUnique({
      where: {
        id: data.id,
      },
    });

    // Validamos que exista el usuario
    if (!userFind) {
      return res.status(409).send(messages.error.userNotFound);
    }

    // Validamos que la nueva contraseña sea igual a la confirmacion
    if (password !== confirmPassword) {
      return res.status(409).send(messages.error.passwordsNotMatch);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    console.log("actualizado");
    console.log(updateUser);

    return res
      .status(200)
      .json({ message: messages.success.passwordChanged, user: data.email });
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json({ message: messages.error.default, error });
  }
}
