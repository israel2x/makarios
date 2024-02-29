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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { useState, useEffect } from "react";
import moment from "moment";
// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import selectData from "/pagesComponents/pages/account/settings/components/BasicInfo/data/selectData";

function Confirmacion({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const [edad, setEdad] = useState(null);
  const [categoria, setCategoria] = useState(null);

  // const { firstName, lastName, company, email, password, repeatPassword } =
  //   formField;
  const {
    nombres,
    apellidos,
    cedula,
    genero,
    dia,
    mes,
    anio,
    fechaNacimiento,
    condicion,
    celular,
    fechaCompetencia,
    actividad,
    ciudad,
    direccion,
    pais,
    precio,
  } = formField;
  // const {
  //   firstName: firstNameV,
  //   lastName: lastNameV,
  //   company: companyV,
  //   email: emailV,
  //   password: passwordV,
  //   repeatPassword: repeatPasswordV,
  // } = values;

  const {
    nombres: nombresV,
    apellidos: apellidosV,
    cedula: cedulaV,
    email: emailV,
    genero: generoV,
    condicion: condicionV,
    celular: celularV,
    dia: diaV,
    mes: mesV,
    anio: anioV,
    actividad: actividadV,
    fechaNacimiento: fechaNacimientoV,
    pais: paisV,
    ciudad: ciudadV,
    direccion: direccionV,
    precio: precioV,
  } = values;

  useEffect(() => {
    // Crea un objeto moment con la fecha de nacimiento
    const fechaNacimientoP = moment(`${anioV}-${mesV}-${diaV}`, "YYYY-MMMM-DD");
    // setFieldValue("fechaNacimiento", `${anioV}-${mesV}-${diaV}`);
    const age = moment().diff(fechaNacimientoP, "years");
    const isLegal = age >= 18;
    if (age >= 10 && age <= 14) {
      setCategoria("Infantil");
    } else if (age >= 15 && age <= 17) {
      setCategoria("Cadete");
    } else if (age >= 18 && age <= 20) {
      setCategoria("Juvenil");
    } else if (age >= 21 && age <= 49) {
      setCategoria("Senior");
    } else if (age >= 50) {
      setCategoria("Master");
    }

    setEdad(age);
  });

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="h5">CONFIRMACIÓN DE REGISTRO</MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="button" color="text">
            Revisa los detalles del registro
          </MDTypography>
        </Grid>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MDTypography variant="h5">Datos de Participante</MDTypography>
          </Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body1">Nombre Completo</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body2">
              {/* Marina Belen Casares Tesky */}
              {nombresV + " " + apellidosV}
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body1">Edad</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body2">{edad} años</MDTypography>
          </Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body1">Categoria</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body2">{categoria}</MDTypography>
          </Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={2}></Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body1">Total a pagar</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDTypography variant="body2">${precioV}</MDTypography>
          </Grid>
          <Grid item xs={6} sm={2}></Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
Confirmacion.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Confirmacion;
