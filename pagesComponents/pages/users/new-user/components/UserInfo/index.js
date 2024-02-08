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
function UserInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  // const { firstName, lastName, company, email, password, repeatPassword } =
  //   formField;
    const { nombres, apellidos, cedula, genero, fechaNacimiento, condicion,
    celular, fechaCompetencia, actividad, ciudad, direccion, pais
    } =
    formField;
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
    pais:paisV,
    ciudad:ciudadV,
    direccion:direccionV
  } = values;

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">Perfil</MDTypography>
        <MDTypography variant="button" color="text">
          Información personal
        </MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={nombres.type}
              label={nombres.label}
              name={nombres.name}
              value={nombresV}
              placeholder={nombres.placeholder}
              error={errors.nombres && touched.nombres}
              success={nombresV.length > 0 && !errors.nombres}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={cedula.type}
              label={cedula.label}
              name={cedula.name}
              value={cedulaV}
              placeholder={cedula.placeholder}
              error={errors.cedula && touched.cedula}
              success={cedulaV.length > 0 && !errors.cedula}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={apellidos.type}
              label={apellidos.label}
              name={apellidos.name}
              value={apellidosV}
              placeholder={apellidos.placeholder}
              error={errors.apellidos && touched.apellidos}
              success={apellidosV.length > 0 && !errors.apellidos}
            />
         </Grid>
          

          <Grid item xs={12} sm={3}>
            <FormField
              type={genero.type}
              label={genero.label}
              name={genero.name}
              value={generoV}
              placeholder={genero.placeholder}
              error={errors.genero && touched.genero}
              success={generoV.length > 0 && !errors.genero}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              type={condicion.type}
              label={condicion.label}
              name={condicion.name}
              value={condicionV}
              placeholder={condicion.placeholder}
              error={errors.condicion && touched.condicion}
              success={condicionV.length > 0 && !errors.condicion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={celular.type}
              label={celular.label}
              name={celular.name}
              value={celularV}
              placeholder={celular.placeholder}
              error={errors.celular && touched.celular}
              success={celularV.length > 0 && !errors.celular}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  defaultValue="Male"
                  options={selectData.gender}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="I'm"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      defaultValue="February"
                      options={selectData.birthDate}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          label="Fecha nacimiento"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      defaultValue="1"
                      options={selectData.days}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      defaultValue="2021"
                      options={selectData.years}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <FormField
              type={fechaNacimiento.type}
              label={fechaNacimiento.label}
              name={fechaNacimiento.name}
              value={fechaNacimientoV}
              placeholder={fechaNacimiento.placeholder}
              error={errors.fechaNacimiento && touched.fechaNacimiento}
              // success={fechaNacimientoV.length > 0 && !errors.fechaNacimiento}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormField
              type={pais.type}
              label={pais.label}
              name={pais.name}
              value={paisV}
              placeholder={pais.placeholder}
              error={errors.pais && touched.pais}
              success={paisV.length > 0 && !errors.pais}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={ciudad.type}
              label={ciudad.label}
              name={ciudad.name}
              value={ciudadV}
              placeholder={ciudad.placeholder}
              error={errors.ciudad && touched.ciudad}
              success={ciudadV.length > 0 && !errors.ciudad}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormField
              type={direccion.type}
              label={direccion.label}
              name={direccion.name}
              value={direccionV}
              placeholder={direccion.placeholder}
              // error={errors.ciudad && touched.ciudad}
              // success={ciudadV.length > 0 && !errors.direccion}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={company.type}
              label={company.label}
              name={company.name}
              value={companyV}
              placeholder={company.placeholder}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={password.type}
              label={password.label}
              name={password.name}
              value={passwordV}
              placeholder={password.placeholder}
              error={errors.password && touched.password}
              success={passwordV.length > 0 && !errors.password}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={repeatPassword.type}
              label={repeatPassword.label}
              name={repeatPassword.name}
              value={repeatPasswordV}
              placeholder={repeatPassword.placeholder}
              error={errors.repeatPassword && touched.repeatPassword}
              success={repeatPasswordV.length > 0 && !errors.repeatPassword}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
        </Grid> */}
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
