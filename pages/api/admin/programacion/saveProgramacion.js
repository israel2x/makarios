const { NextResponse } = require("next/server");
import db from "/libs/db";
import { DateTime } from "luxon";
import moment from "moment-timezone";

const formatDateCita = (value) => {
  const date_cita = DateTime.fromISO(value);
  const fechaFormateada = date_cita.toFormat("yyyy-MM-dd");
  return fechaFormateada;
};
export default async function programacionHanler(req, res) {
  try {
    let datos = req.body;
    console.log(datos);
    console.log(String(moment.tz("America/Guayaquil").format()));

    datos.data.vigenciadesde = moment.tz("America/Guayaquil").format(datos.data.vigenciadesde);
    datos.data.vigenciahasta = moment.tz("America/Guayaquil").format(datos.data.vigenciahasta);
    datos.data.fechatope = moment.tz("America/Guayaquil").format(datos.data.fechatope);
    // datos.data.vigenciadesde = new Date(datos.data.vigenciadesde);
    // datos.data.vigenciahasta = new Date(datos.data.vigenciahasta);
    // datos.data.fechatope = new Date(datos.data.fechatope);
    // datos.data.vigenciadesde = String(formatDateCita(datos.data.vigenciadesde));
    // datos.data.vigenciahasta = String(formatDateCita(datos.data.vigenciahasta));
    // datos.data.fechatope = datos.data.fechatope.split("T")[0];
    console.log(datos);
    const programacion = await db.programacion.create({
      
      data: {
        cupo: datos.data.cupo,
        estado: datos.data.estado,
        detalle: datos.data.detalle,
        vigenciaDesde:  datos.data.vigenciadesde ,
        vigenciaHasta: datos.data.vigenciahasta,
        fechatope: datos.data.fechatope,
        horaDesde: datos.data.horaDesde,
        horaHasta: datos.data.horaHasta,

        actividad: {
          connect: {
            id: datos.data.actividadId,
          },
        },
      },
     
    });

    console.log(programacion);

    return res
      .status(200)
      .json({ message: "sucess programacion", programacion });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message });
  }
}
