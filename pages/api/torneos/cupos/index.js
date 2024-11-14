import { NextResponse } from "next/server";
import db from "../../../../libs/db";

export default async function cuposHandler(req, res) {
  try {
    // Log para depuración
    console.log("In backend programacion");
    console.info(req.query);

    // Validar que el ID de la programación sea un número válido
    const programacionId = parseInt(req.query.cupos, 10);
    if (isNaN(programacionId)) {
      return res.status(400).json({ message: "Invalid programacionId" });
    }

    // Buscar la programación en la base de datos
    const programacion = await db.programacion.findUnique({
      where: {
        id: programacionId, // ID de la programación específica
      },
      select: {
        cupo: true,
        registro: {
          select: {
            id: true,
          },
          where: {
            programacionId: programacionId,
          },
        },
      },
    });

    // Validar si se encontró la programación
    if (!programacion) {
      return res.status(404).json({ message: "Cupos disponibles not found" });
    }

    // Calcular los cupos ocupados y disponibles
    const ocupados = programacion.registro.length;
    const disponibles = parseInt(programacion.cupo, 10) - ocupados;

    console.log(`Cupo: ${programacion.cupo}, Ocupado: ${ocupados}, Disponible: ${disponibles}`);

    const resultCupos = {
      cupo: programacion.cupo,
      ocupado: ocupados,
      disponible: disponibles,
    };

    return res.status(200).json({ message: "success cupos", resultCupos });
  } catch (error) {
    console.error("Error in cuposHandler:", error); // Mejor manejo de log de errores
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
