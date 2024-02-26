const { NextResponse } = require("next/server");
// import db from "../../../libs/db";
import db from "/libs/db";

export default async function userHanler(req, res) {
  try {
    console.log("en backend user");

    const userFound = await db.user.findUnique({
        where: { email: req.query.email },
      include: {
        profile: true,
      },
    });
    if (!userFound) {
        return res.status(409).send("User not found");
    }
    const newUser = exclude(userFound, ['password','role','createdAt','defaultAt']);
    return res.status(200).json({ message: "sucess user", newUser });
  } catch (error) {
    console.log("error en API:", error);
    return res.status(500).json({ message: error.message });
  }
}

function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }