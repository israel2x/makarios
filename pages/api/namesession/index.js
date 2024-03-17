const { NextResponse } = require("next/server");
import db from "../../../libs/db";


export default async function nameHanler(req, res) {
  try {
    const emaildata = req.query.email;
    const nameFound = await db.user.findFirst({
      where: {
        email: emaildata,
      },
    });

    if (!nameFound) {
      return res.status(409).send("Programacion not found");
    }
    // const name = [...nameFound, ]
    return res.status(200).json({ message: "sucess name", name: nameFound.firstname });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
