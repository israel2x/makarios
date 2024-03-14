const { NextResponse } = require("next/server");
import db from "../../../libs/db";

export default async function programacionHanler(req, res) {
  try {
    const actividadId = parseInt(req.query.actividad, 10);

    if (isNaN(actividadId)) {
      return res.status(400).send("Invalid actividadId");
    }

    const programacionFound = await db.programacion.findMany({
      where: {
        estado: "A",
        actividadId: actividadId,
      },
    });

    if (!programacionFound) {
      return res.status(409).send("Programacion not found");
    }
    return res
      .status(200)
      .json({ message: "sucess programacion", programacionFound });
  } catch (error) {
    console.log("error en API:", error);
    return res.status(500).json({ message: error.message });
  }
}
