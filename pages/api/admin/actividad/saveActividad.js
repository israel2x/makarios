const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function actividadHanler(req, res) {
  try {
    const actividad = await db.actividad.create({
      data: req.body,
    });

    console.log(actividad);

    return res.status(200).json({ message: "sucess actividad", actividad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
