const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function promocionesHanler(req, res) {
  try {
    const promocion = await db.promocion.create({
      data: req.body,
    });

    return res.status(200).json({ message: "sucess promocion", promocion });
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
