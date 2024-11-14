import { NextResponse } from "next/server";
import db from "/libs/db";

export default async function programacionHandler(req, res) {
  try {
    // Consultar las programaciones
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
      },
      orderBy: {
        id: 'desc', // Verificar que la base de datos y el ORM soporten este formato
      },
    });

    // Verificar si no hay resultados
    if (!programacionFound || programacionFound.length === 0) {
      return res.status(404).json({ message: "Programacion not found" });
    }

    // Retornar resultados si existen
    return res
      .status(200)
      .json({ message: "success programacion", programacionFound });
  } catch (error) {
    console.error("Error en API:", error); // Agregué un log para errores
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
