const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function registrosHanler(req, res) {
  try {
    console.log("en backend registro");
    // const actividadId = parseInt(req.query.actividad, 10);

    // if (isNaN(actividadId)) {
    //   return res.status(400).send("Invalid actividadId");
    // }

    const registroFound = await db.registro.findMany({
      select: {
        id:true,
        programacion: {
          select: {
            actividad: {
              select:{
                descripcion:true
              }
            },
            detalle:true
          },
        },
        profile: {
          select: {
            nombres:true,
            apellidos:true
          }
        },
        pagoplux: {
          select: {
              amount:true
          }
        },
        fecharegistro:true,
        detallepromo:true,
        
          },
          orderBy: {
            fecharegistro: 'desc',
          },
      
    });

    if (!registroFound) {
      return res.status(409).send("Registro not found");
    }
    return res.status(200).json({ message: "sucess registro", registroFound });
  } catch (error) {
    console.log("error en API:", error);
    return res.status(500).json({ message: error.message });
  }
}
