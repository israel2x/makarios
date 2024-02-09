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

import MDDatePicker from "/components/MDDatePicker";
// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";

// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

function Address({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { actividad, competencia, horario } = formField;
  const {
    actividad: actividadV,
    competencia: competenciaV,
    horario: horarioV,
  } = values;

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Actividad
      </MDTypography>
      {/* <MDTypography variant="h5">Perfil</MDTypography> */}
      <MDTypography variant="button" color="text">
        Elige la actividad en la que deseas participar
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <FormField
              type={actividad.type}
              label={actividad.label}
              name={actividad.name}
              value={actividadV}
              placeholder={actividad.placeholder}
              error={errors.actividad && touched.actividad}
              success={actividadV.length > 0 && !errors.actividad}
            /> */}
            <Autocomplete
              options={[
                "ENTRENAMIENTO EXPRESS",
                "TORNEO FLECHA A FLECHA",
                "VACACIONAL DE TIRO CON ARCO",
                "TORNEO VACACIONAL",
                "SHOOT&SMILE",
              ]}
              defaultValue="ENTRENAMIENTO EXPRESS"
              onChange={(e, value) => {
                setFieldValue("actividad", value);
              }}
              renderInput={(params) => (
                <FormField
                  {...params}
                  type={actividad.type}
                  label={actividad.label}
                  name={actividad.name}
                  value={actividadV}
                  placeholder={actividad.placeholder}
                  // error={errors.actividad && touched.actividad}
                  // success={actividadV.length > 0 && !errors.actividad}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <MDDatePicker
              readOnly
              input={{ placeholder: "Selecciones una fecha" }}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={["8:00", "9:24", "10:25"]}
              onChange={(e, value) => {
                setFieldValue("horario", value);
              }}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  label={horario.label}
                  name={horario.name}
                  value={horarioV}
                  InputLabelProps={{ shrink: true }}
                  // error={errors.horario && touched.horario}
                  // success={horarioV.length > 0 && !errors.horario}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6}>
            <FormField
              type={horario.type}
              label={horario.label}
              name={horario.name}
              value={horarioV}
              placeholder={horario.placeholder}
              error={errors.horario && touched.horario}
              success={horarioV.length > 0 && !errors.horario}
            />
          </Grid> */}
          <Grid item xs={6} sm={3}>
            {/* <Autocomplete
              options={["State 1", "State 2", "State 3"]}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  
                  label="Cupos participantes"
                />
              )}
            /> */}
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <FormField
              type={zip.type}
              label={zip.label}
              name={zip.name}
              value={zipV}
              placeholder={zip.placeholder}
              error={errors.zip && touched.zip}
              success={zipV.length > 0 && !errors.zip}
            />
          </Grid> */}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for Address
Address.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
