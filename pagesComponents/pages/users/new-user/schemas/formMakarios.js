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
        type: "number",
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
        type: "number",
        errorMsg: "Celular es obligatorio.",
      },
      fechaNacimiento: {
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
        label: "anio",
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
        label: "Dirección",
        type: "text",
        
      },
      actividad: {
        name: "actividad",
        label: "Actividad",
        type: "text",
        errorMsg: "Actividad es obligatorio.",
      },
      competencia: {
        name: "competencia",
        label: "Fecha Competencia",
        type: "text",
        errorMsg: "Fecha competencia es obligatorio.",
      },
      horario: {
        name: "horario",
        label: "Horario",
        type: "text",
        errorMsg: "Horario es obligatorio.",
      },
      pagado: {
        name: "pagado",
        type:"text"
      },
    },
  };
  
  export default form;
  