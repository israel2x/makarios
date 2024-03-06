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
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import selectData from "/pagesComponents/pages/account/settings/components/BasicInfo/data/selectData";
import MDButton from "/components/MDButton";
import PpxButton from "/pages/pagos-online/PpxButton";
import PagoTarjeta from "/pagesComponents/pages/users/new-user/components/PagoTarjeta";
function Pago({ formData, pagos }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  // const { firstName, lastName, company, email, password, repeatPassword } =
  //   formField;
  const {
    nombres,
    apellidos,
    direccion,
    cedula,
    email,
    nombrefactura,
    rucfactura,
    direccionfactura,
    mailfactura,
    actividad,
    programacion,
    precio,
    promocion,
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
    direccion: direccionV,
    cedula: cedulaV,
    email: emailV,
    nombrefactura: nombrefacturaV,
    rucfactura: rucfacturaV,
    direccionfactura: direccionfacturaV,
    mailfactura: mailfacturaV,
    actividad: actividadV,
    programacion: programacionV,
    precio: precioV,
    promocion: promocionV,
  } = values;

  useEffect(() => {
    setFieldValue("rucfactura", cedulaV);
    setFieldValue("direccionfactura", direccionV);
    setFieldValue("mailfactura", emailV);
    setFieldValue("nombrefactura", nombresV + " " + apellidosV);
  }, []);
  const onChangeNumberCelular = (e) => {
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      setFieldValue("rucfactura ", e.target.value);
    }
  };
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
          <MDTypography variant="h5">Pago</MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="h6" color="text">
            {/* Inscripción Personal a Torneo Vacacional de Tiro con Arco */}
            {actividadV} - {programacionV}
          </MDTypography>
        </Grid>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="body1">Datos de facturación</MDTypography>
            <Grid item xs={12} sm={12}>
              <FormField
                type={nombrefactura.type}
                label={nombrefactura.label}
                name={nombrefactura.name}
                value={nombrefacturaV}
                placeholder={nombrefactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={rucfactura.type}
                label={rucfactura.label}
                name={rucfactura.name}
                value={rucfacturaV}
                onChange={onChangeNumberCelular}
                placeholder={rucfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={direccionfactura.type}
                label={direccionfactura.label}
                name={direccionfactura.name}
                value={direccionfacturaV}
                placeholder={direccionfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={mailfactura.type}
                label={mailfactura.label}
                name={mailfactura.name}
                value={mailfacturaV}
                placeholder={mailfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="h5">Ingrese su tarjeta</MDTypography>
            {/* <PagoTarjeta /> */}
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Monto a Pagar: </MDTypography>
              <MDTypography
                variant="h3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="info"
              >
                {" "}
                ${precioV}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <PpxButton data={pagos} />
            </Grid>
            <br/>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <FormField
                  type={promocion.type}
                  label={promocion.label}
                  name={promocion.name}
                  value={promocionV}
                  placeholder={promocion.placeholder}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDButton variant="gradient" color="success">
                  Promoción
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
Pago.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Pago;
