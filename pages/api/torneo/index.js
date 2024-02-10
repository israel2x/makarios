const { NextResponse } = require("next/server");
import db from "/libs/db";

export default async function torneoHanler(req, res) {
  try {
    const dataProfile = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      cedula: req.body.cedula,
      celular: req.body.celular,
      condicion: req.body.condicion,
      fechaNacimiento: req.body.fechaacimiento,
      genero: req.body.genero,
      pais: req.body.pais,
      ciudad: req.body.ciudad,
      direccion: req.body.direccion,
      userId: req.body.user
    };

    const userFound = await db.profile.findUnique({
      where: {
        userId: req.body.user,
      },
    });

    if (!userFound) {
        
      const newTorneo = await db.profile.create({
        data: dataProfile,
      });
    }

    const actividadFound = await db.actividad.findUnique({
      where: {
        actividad: req.body.actividad,
      },
    });

    const horarioFound = await db.horario.findUnique({
      where: {
        horario: req.body.horario,
      },
    });

    const datos = {
      fechatorneo: req.body.fechatorneo,
      pagado: req.body.pagado,
      actividadId: actividadFound.id,
      profileId: userFound.id,
      horarioId: horarioFound.id,
    };

    const newTorneo = await db.registro.create({
      data: req.body,
    });
    return res.status(200).json({ message: "sucess ", newTorneo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
