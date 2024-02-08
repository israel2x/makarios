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

// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import selectData from "/pagesComponents/pages/account/settings/components/BasicInfo/data/selectData";

function Confirmacion({ formData }) {
  const { formField, values, errors, touched } = formData;
  // const { firstName, lastName, company, email, password, repeatPassword } =
  //   formField;
  const {
    nombres,
    apellidos,
    cedula,
    genero,
    fechaNacimiento,
    condicion,
    celular,
    fechaCompetencia,
    actividad,
    ciudad,
    direccion,
    pais,
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
    fechaNacimiento: fechaNacimientoV,
    pais: paisV,
    ciudad: ciudadV,
    direccion: direccionV,
  } = values;

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
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body1">Nombre Completo</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body2">
              Marina Belen Casares Tesky
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body1">Edad</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body2">22 años</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body1">Categoria</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body2">Senior</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body1">Total a pagar</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MDTypography variant="body2">$94.99</MDTypography>
          </Grid>
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
