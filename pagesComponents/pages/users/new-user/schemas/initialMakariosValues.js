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
    dia,
    mes,
    anio,
    pais,
    ciudad,
    direccion,
    actividad,
    competencia,
    horario,
    pagado,
    precio
  },
} = checkout;

const initialValues = {
  [nombres.name]: "",
  [apellidos.name]: "",
  [cedula.name]: "",
  [email.name]: "",
  [genero.name]: "",
  [condicion.name]: "",
  [celular.name]: "",
  [fechaNacimiento.name]: "",
  [dia.name]: "",
  [mes.name]: "",
  [anio.name]: "",
  [pais.name]: "",
  [ciudad.name]: "",
  [direccion.name]: "",
  [actividad.name]: "",
  [competencia.name]: "",
  [horario.name]: "",
  [pagado.name]: "",
  [precio.name]: "",
};

export default initialValues;
