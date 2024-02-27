const { NextResponse } = require("next/server");
import db from "../../../libs/db";

export default async function torneoHanler(req, res) {
  try {
    const dataProfile = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      cedula: String(req.body.cedula),
      celular: String(req.body.celular),
      condicion: req.body.condicion,
      fechaNacimiento: req.body.fechanacimiento,
      genero: req.body.genero,
      pais: req.body.pais,
      ciudad: req.body.ciudad,
      direccion: req.body.direccion,
    };
    let idProfile = 0;
    const userFound = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    console.log("user found");
    console.log(req.body);
    console.log(userFound);

    const profileFound = await db.profile.findUnique({
      where: {
        userId: userFound.id,
      },
    });

    if (!profileFound) {
      dataProfile.userId= userFound.id;
      const newProfile = await db.profile.create({
        data: dataProfile,
      });
      console.log(newProfile);
      idProfile = newProfile.id;
    }else{
      idProfile = profileFound.id;
    }
    console.log("idProfile");
    console.log(idProfile);
    const programacionData = {
      programacionId: req.body.programacionid,
      pagado: true,
      fechatorneo: String(new Date()),
      profileId: idProfile,
    };

    const newTorneo = await db.registro.create({
      data: programacionData,
    });
    return res.status(200).json({ message: "sucess ", newTorneo });
  } catch (error) {
    console.log("error backend");
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
