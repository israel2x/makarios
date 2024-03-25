const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function programacionHanler(req, res) {
  try {
    const programacionFound = await db.programacion.findMany({
      select: {
        id: true,
        actividad: {
          select: {
            descripcion: true,
          },
        },
        detalle: true,
        vigenciaDesde: true,
        vigenciaHasta: true,
        fechatope: true,
        cupo: true,
        estado: true,

        registro: {
          select: {
            id: true,
          },
        },
        // createdAt:true
      },
    });
    if (!programacionFound) {
      return res.status(409).send("Programacion not found");
    }
    return res
      .status(200)
      .json({ message: "sucess programacion", programacionFound });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
