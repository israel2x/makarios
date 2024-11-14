import { NextResponse } from "next/server";
import db from "../../../../libs/db";

export default async function programacionHandler(req, res) {
  try {
    // Validar que el query parameter "actividad" esté presente
    if (!req.query.actividad) {
      return res.status(400).json({ message: "actividadId is required" });
    }

    const actividadId = parseInt(req.query.actividad, 10);
    if (isNaN(actividadId)) {
      return res.status(400).json({ message: "Invalid actividadId" });
    }

    // Buscar programaciones activas con el ID de actividad
    const programacionFound = await db.programacion.findMany({
      where: {
        estado: "A",
        actividadId: actividadId,
      },
    });

    if (!programacionFound || programacionFound.length === 0) {
      return res.status(404).json({ message: "Programacion not found" });
    }

    return res
      .status(200)
      .json({ message: "success programacion", programacionFound });
  } catch (error) {
    console.error("Error en API:", error); // Cambié console.log a console.error para errores
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
