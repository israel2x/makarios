const { NextResponse } = require("next/server");
import db from "/libs/db";


export default async function actividadHanler(req, res) {
  try {
    console.log(req.query.codigo);
    console.log(req.query);
    const promocionFound = await db.promocion.findMany({
      where: { AND: [
        { estado: 'A' },
        { codigo: req.query.codigo },
      ],
      }
    });;

    if (!promocionFound) {
      return res.status(409).send("Promocion not found");
    }
    return res.status(200).json({ message: "sucess promocion", promocionFound });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
