const { NextResponse } = require("next/server");
import { messages } from "../../../../utils/mesagges";
import db from "/libs/db";

export default async function actividadHanler(req, res) {
  try {
    const idActividad = parseInt(req.query.actividad, 10);

    if (isNaN(idActividad)) {
      return res.status(400).send("Invalid actividadId");
    }
    const promocionFound = await db.promocion.findMany({
      where: {
        AND: [
          { estado: "A" },
          { codigo: req.query.codigo },
          { actividadId: idActividad },
        ],
      },
    });

    if (!promocionFound) {
      return res.status(409).send("Promocion not found");
    }
    return res
      .status(200)
      .json({ message: messages.success.responseSuccess, promocionFound });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
