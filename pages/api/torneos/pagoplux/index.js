const { NextResponse } = require("next/server");
import db from "/libs/db";
// import moment from 'moment-timezone';

export default async function pagoHandler(req, res) {
  try {
    const data = { ...req.body };
    data.idtransaccion = data.id_transaccion;
    const { id_transaccion, ...pagoData } = data;

    const newPago = await db.pagoplux.create({
      data: pagoData,
    });

    return res.status(200).json({ message: "success", newPago });
  } catch (error) {
    console.error("Backend error pagoplux:", error);
    return res
      .status(500)
      .json({ error: { message: error.message, stack: error.stack } });
  }
}
