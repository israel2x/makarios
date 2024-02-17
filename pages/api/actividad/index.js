const { NextResponse } = require("next/server");
import db from "../../../libs/db";


export default async function actividadHanler(req, res) {
  try {
    const actividadFound = await db.actividad.findMany({
      where: {
        estado: 'A',
      }
    });;

    if (!actividadFound) {
      return res.status(409).send("Actividad not found");
    }
    return res.status(200).json({ message: "sucess actividad", actividadFound });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
