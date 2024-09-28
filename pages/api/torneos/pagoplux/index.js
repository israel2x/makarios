const { NextResponse } = require("next/server");
import db from "/libs/db";
// import moment from 'moment-timezone';

export default async function pagoHandler(req, res) {
  try {
    // const data = { ...req.body };
    // data.idtransaccion = data.id_transaccion;
    // const { id_transaccion, ...pagoData } = data;
    const data_new = {
      idtransaccion: req.body.id_transaccion,
      description: req.body.description,
      token: req.body.token,
      amount: req.body.amount,
      cardType: req.body.cardType,
      cardIssuer: req.body.cardIssuer,
      cardInfo: req.body.cardInfo,
      clientID: req.body.clientID,
      clientName: req.body.clientName,
      state: req.body.state,
      fecha: req.body.fecha,
      acquirer: req.body.acquirer,
      deferred: req.body.deferred,
      interests: req.body.interests,
      interestValue: req.body.interestValue,
      amountWoTaxes: req.body.amountWoTaxes,
      amountWTaxes: req.body.amountWTaxes,
      taxesValue: req.body.taxesValue,
      amountAuthorized: req.body.amountAuthorized,
      discountRate: req.body.discountRate,
      extras: req.body.extras,
      tipoPago: req.body.tipoPago
    };
    

    const newPago = await db.pagoplux.create({
      data: data_new,
    });

    return res.status(200).json({ message: "success", newPago });
  } catch (error) {
    console.error("Backend error pagoplux:", error);
    return res
      .status(500)
      .json({ error: { message: error.message, stack: error.stack } });
  }
}
