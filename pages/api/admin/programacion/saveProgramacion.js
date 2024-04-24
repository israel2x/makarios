const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function programacionHanler(req, res) {
  try {
    const programacion = await db.programacion.create({
      data: req.body,
    });

    console.log(programacion);

    /* if (!programacionFound) {
      return res.status(409).send("Programacion not found");
    } */
    return res
      .status(200)
      .json({ message: "sucess programacion", programacion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
