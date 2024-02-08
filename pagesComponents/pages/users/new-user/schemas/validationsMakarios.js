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

import * as Yup from "yup";
import checkout from "/pagesComponents/pages/users/new-user/schemas/formMakarios";

const {
  formField: {
    nombres,
    apellidos,
    cedula,
    email,
    genero,
    condicion,
    celular,
    fechaNacimiento,
    pais,
    ciudad,
    direccion,
    actividad,
    competencia,
    horario,
    pagado,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [nombres.name]: Yup.string().required(nombres.errorMsg),
    [apellidos.name]: Yup.string().required(apellidos.errorMsg),
    [cedula.name]: Yup.string().required(cedula.errorMsg),
    [pais.name]: Yup.string().required(pais.errorMsg),
    [ciudad.name]: Yup.string().required(ciudad.errorMsg),
    [condicion.name]: Yup.string().required(condicion.errorMsg),

  }),
  // Yup.object().shape({
  //   [actividad.name]: Yup.string().required(actividad.errorMsg),
  //   [competencia.name]: Yup.string().required(competencia.errorMsg),
  //   [horario.name]: Yup.string().required(horario.errorMsg),
    
  // }),
  // Yup.object().shape({
  //   [twitter.name]: Yup.string().required(twitter.errorMsg),
  // }),
];

export default validations;
