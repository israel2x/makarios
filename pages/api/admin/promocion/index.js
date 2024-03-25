const { NextResponse } = require("next/server");
import { messages } from "../../../../utils/mesagges";
import db from "/libs/db";

export default async function promocionHanler(req, res) {
  try {
    const promocionFound = await db.promocion.findMany({
      select:{
        id:true,
        actividad:{
          select:{
            descripcion:true
          }
        },
        descripcion:true,
        codigo:true,
        porcentaje:true,
        fechainicio:true,
        fechafin:true,
        estado:true,
        createdAt:true
      }
    });
    if (!promocionFound) {
      return res.status(409).send("Programacion not found");
    }
    return res
      .status(200)
      .json({ message: messages.success.responseSuccess, promocionFound });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
