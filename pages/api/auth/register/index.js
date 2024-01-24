const { NextResponse } = require("next/server");
import db from "../../../../libs/db";
import bcrypt from "bcrypt";

export default async function registerHanler(req, res) {
  try {
    const userFound = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (userFound) {
      return res.status(409).send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password=hashedPassword;
    const newUser = await db.user.create({
      data: req.body,
    });

    const { password: _, ...user } = newUser;
    return res.status(200).json({ message: "sucess register", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
