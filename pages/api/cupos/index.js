const { NextResponse } = require("next/server");
import db from "../../../libs/db";


export default async function cuposHanler(req, res) {
  try {
    console.log("en backend programacion");
    console.info(req.query);
    const programacionId = parseInt(req.query.cupos, 10);

      const programacion = await prisma.programacion.findUnique({
        where: {
          id: programacionId // El ID de la programación específica que deseas consultar
        },
        select: {
          cupo: true,
          registro: {
            select: {
              id: true
            },
            where: {
              programacionId: programacionId
            }
          }
        }});
      
    if (!programacion) {
      return res.status(409).send("Cupos disponinles not found");
    }
    const ocupados = programacion.registro.length;
    const disponibles = parseInt(programacion.cupo) - parseInt(ocupados);
    
    console.log(`Cupo: ${programacion.cupo}, Ocupado: ${ocupados}, Disponible: ${disponibles}`);
    const resultCupos = {
        cupo: programacion.cupo,
        ocupado: ocupados,
        disponible: disponibles
    }

    return res.status(200).json({ message: "success cupos", resultCupos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

