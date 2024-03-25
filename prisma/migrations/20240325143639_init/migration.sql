-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "condicion" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programacion" (
    "id" SERIAL NOT NULL,
    "vigenciaDesde" TIMESTAMP(3) NOT NULL,
    "vigenciaHasta" TIMESTAMP(3) NOT NULL,
    "horaDesde" TEXT NOT NULL,
    "horaHasta" TEXT NOT NULL,
    "fechatope" TEXT NOT NULL,
    "detalle" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cupo" INTEGER NOT NULL,
    "actividadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Programacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagoplux" (
    "id" SERIAL NOT NULL,
    "idtransaccion" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "cardType" TEXT NOT NULL,
    "cardIssuer" TEXT NOT NULL,
    "cardInfo" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "acquirer" TEXT NOT NULL,
    "deferred" INTEGER NOT NULL,
    "interests" TEXT NOT NULL,
    "interestValue" DOUBLE PRECISION NOT NULL,
    "amountWoTaxes" TEXT NOT NULL,
    "amountWTaxes" TEXT NOT NULL,
    "taxesValue" TEXT NOT NULL,
    "amountAuthorized" INTEGER NOT NULL,
    "discountRate" DOUBLE PRECISION,
    "extras" TEXT,
    "tipoPago" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagoplux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promocion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "codigo" TEXT NOT NULL,
    "porcentaje" TEXT NOT NULL,
    "fechainicio" TEXT NOT NULL,
    "fechafin" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "actividadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promocion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facturacion" (
    "id" SERIAL NOT NULL,
    "referencia" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "monto" TEXT NOT NULL,
    "registroId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Facturacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "fecharegistro" TEXT NOT NULL,
    "promocionId" INTEGER,
    "detallepromo" TEXT,
    "pagopluxId" INTEGER NOT NULL,
    "programacionId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programacion" ADD CONSTRAINT "Programacion_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_programacionId_fkey" FOREIGN KEY ("programacionId") REFERENCES "Programacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_pagopluxId_fkey" FOREIGN KEY ("pagopluxId") REFERENCES "Pagoplux"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
