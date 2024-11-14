import { NextResponse } from "next/server";
import { messages } from "../../../../utils/mesagges"; // Asume que 'messages' está bien escrito
import db from "/libs/db";

export default async function actividadHandler(req, res) {
  try {
    // Validar que el método HTTP sea el esperado, si es necesario
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const idActividad = parseInt(req.query.actividad, 10);
    if (isNaN(idActividad)) {
      return res.status(400).json({ message: "Invalid actividadId" });
    }

    // Validar que el código esté presente en la query
    const codigo = req.query.codigo;
    if (!codigo) {
      return res.status(400).json({ message: "Codigo is required" });
    }

    const promocionFound = await db.promocion.findMany({
      where: {
        estado: "A",
        codigo: codigo,
        actividadId: idActividad,
      },
    });

    if (!promocionFound || promocionFound.length === 0) {
      return res.status(404).json({ message: messages.error.noFoundRecord }); // Cambié el status a 404 (not found)
    }

    return res
      .status(200)
      .json({ message: messages.success.responseSuccess, promocionFound });
  } catch (error) {
    console.error("Error in actividadHandler:", error); // Agregué un log para errores
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
