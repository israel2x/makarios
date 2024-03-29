const { NextResponse } = require("next/server");
import db from "/libs/db";
import moment from "moment-timezone";

export default async function torneoHandler(req, res) {
  try {
    const userData = {
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

    const userFound = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    const profileFound = await db.profile.findFirst({
      where: {
        AND: [{ userId: userFound.id }, { cedula: userData.cedula }],
      },
    });

    let profileId;
    let participante;

    if (!profileFound) {
      userData.userId = userFound.id;

      const newProfile = await db.profile.create({
        data: userData,
      });

      profileId = newProfile.id;
      participante = newProfile;
    } else {
      profileId = profileFound.id;
      participante = profileFound;
    }

    // Log relevant information for debugging
    console.log("profileId:", profileId);

    const programacionData = {
      programacionId: req.body.programacionid,
      // pagado: true,
      promocionId: req.body.promocionid || null,
      detallepromo: req.body.detallepromo || null,
      pagopluxId: parseInt(req.body.pagoplux) || null,
      fecharegistro: String(moment.tz("America/Guayaquil").format()),
      profileId: profileId,
    };

    const newTorneo = await db.registro.create({
      data: programacionData,
    });

    let montoFactura = null;
    if (req.body.porcentajepromo) {
      montoFactura = String(req.body.porcentajepromo);
    } else {
      montoFactura = String(req.body.precio);
    }

    const facturacionData = {
      monto: montoFactura,
      referencia: `Factura de participante ${req.body.nombres} ${req.body.apellidos} - ${req.body.actividad} - ${req.body.programacion}`,
      nombres: req.body.nombrefactura,
      ruc: req.body.rucfactura,
      direccion: req.body.direccionfactura,
      correo: req.body.mailfactura,
      registroId: newTorneo.id,
    };

    const newFactura = await db.facturacion.create({
      data: facturacionData,
    });

    return res.status(200).json({ message: "success", newTorneo });
  } catch (error) {
    console.error("Backend error:", error);
    return res
      .status(500)
      .json({ error: { message: error.message, stack: error.stack } });
  }
}
