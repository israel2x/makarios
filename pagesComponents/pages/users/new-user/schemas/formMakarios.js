/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
    formId: "new-user-form",
    formField: {
      nombres: {
        name: "nombres",
        label: "Nombres",
        type: "text",
        errorMsg: "Nombre is obligatorio.",
      },
      apellidos: {
        name: "apellidos",
        label: "Apellidos",
        type: "text",
        errorMsg: "Apellido es obligatorio.",
      },
      cedula: {
        name: "cedula",
        label: "CI o DNI",
        type: "text",
        errorMsg: "Identificación es obligatorio.",
      },
      email: {
        name: "email",
        label: "Email Address",
        type: "email",
        errorMsg: "Email address is required.",
        invalidMsg: "Your email address is invalid",
      },
      genero: {
        name: "genero",
        label: "Genero",
        type: "text",
        errorMsg: "Genero is obligatorio.",

      },
      condicion: {
        name: "condicion",
        label: "Condición especial",
        type: "text",
        errorMsg: "Condición is obligatorio.",
        
      },
      celular: {
        name: "celular",
        label: "Celular",
        type: "text",
        errorMsg: "Celular es obligatorio.",
      },
      fechanacimiento: {
        name: "fechanacimiento",
        label: "Fecha Nacimiento",
        type: "text",
      },
      dia: {
        name: "dia",
        label: "Dia",
        type: "number",
      },
      mes: {
        name: "mes",
        label: "mes",
        type: "text",
      },
      anio: {
        name: "anio",
        label: "año",
        type: "number",
      },
      pais: {
        name: "pais",
        label: "Pais",
        type: "text",
        errorMsg: "Pais es obligatorio",
      },
      ciudad: {
        name: "ciudad",
        label: "Ciudad",
        type: "text",
        errorMsg: "Ciudad is obligatorio.",
      },
      direccion: {
        name: "direccion",
        label: "Dirección (opcional)",
        type: "text",
        
      },
      actividadid: {
        name: "actividadid",
        type: "text",
      },
      actividad: {
        name: "actividad",
        type: "text",
      },
      programacionid: {
        name: "programacionid",
        type: "text",
      },
      programacion: {
        name: "programacion",
        type: "text",
      },
      pagado: {
        name: "pagado",
        type:"text"
      },
      precio: {
        name: "precio",
        type:"text"
      },
      rucfactura:{
        name: "rucfactura",
        type:"text",
        label: "Ruc/CI"
      },
      nombrefactura:{
        name: "nombrefactura",
        type:"text",
        label: "Nombre",
      },
      mailfactura:{
        name: "mailfactura",
        type:"text",
        label: "email",
      },
      direccionfactura:{
        name: "direccionfactura",
        type:"text",
        label: "Dirección"
      },
      promocionid:{
        name: "promocionid",
        type:"text",
        
      },
      porcentajepromo:{
        name: "porcentajepromo",
        type:"text",
      },
      promocion:{
        name: "promocion",
        type:"text",
        label: "Tienes un código promocional?"
      },
      pagoplux:{
        name: "pagoplux",
        type:"text",

      },
    },
  };
  
  export default form;
  