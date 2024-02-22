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
import { getSession } from 'next-auth/react';

import MDDatePicker from "/components/MDDatePicker";
// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import ComplexStatisticsCard from "/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import axios from "axios";
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import { useState, useEffect } from "react";
// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import moment from "moment";

function Address({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { actividad, email, competencia, dia, mes, anio, fechanacimiento, horario, precio } = formField;
  const {
    email: emailV,
    actividad: actividadV,
    fechanacimiento: fechanacimientoV,
    dia:diaV,
    mes:mesV,
    anio:anioV,
    competencia: competenciaV,
    horario: horarioV, 
    precio: precioV,
  } = values;

  const [fechatorneo, setFechaTorneo] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [actividads, setActividads] = useState([]);
  const [programacion, setProgramacion] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [hora, setHora] = useState([]);
  const [cupo, setCupo] = useState([]);

  const loadActividad = async (data) => {
    const session = await getSession(data);
    setFieldValue("email", session.user.email);
    try {
      const response = await axios.get("/api/actividad", data);
      console.log("response actividad");
      console.log(response);
      if (response.statusText === "OK" || response.status===200) {
        const dataActividad = response.data.actividadFound.map((item) => ({
          id: item.id,
          descripcion: item.descripcion,
          precio: item.precio
        }));
        const data_Actividad = response.data.actividadFound.map(
          (item) => item.descripcion
        );
        setActividads(dataActividad);
        setActividades(data_Actividad);
        console.log(actividad);
      } else {
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const loadProgramacion = async (actividadId) => {
    try {
      const response = await axios.get("/api/programacion", {
        params: { actividad: actividadId },
      });
      console.log("response actividad");
      console.log(response);
      if (response.statusText === "OK" || response.status===200) {
        const dataFechas = response.data.programacionFound.map((item) => ({
          from: new Date(item.vigenciaDesde).toISOString().split("T")[0],
          to: new Date(item.vigenciaHasta).toISOString().split("T")[0],
        }));
        await setFechas(dataFechas);
        setProgramacion(response.data.programacionFound);
        console.log("fechas");
        console.log(fechas);
      } else {
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const loadFecha = async (e, data) => {
    try {
      const resultado = actividads.find(
        (actividad) => actividad.descripcion === data
      );
      
      await loadProgramacion(resultado.id);
      setFieldValue("precio", resultado.precio);
      const fechaNacimientoP = moment(`${anioV}-${mesV}-${diaV}`, 'YYYY-MMMM-DD');
      const fechaFormateada = fechaNacimientoP.format('YYYY-MM-DD');
      setFieldValue("fechanacimiento",fechaFormateada);
      console.log("programacion");
      console.log(resultado);
      console.log(precioV);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const loadHora = async (e, data) => {
    try {
      console.log("load hora");
      console.log(programacion);
      const resultado = await programacion.filter(
        (actividad) =>
          new Date(actividad.vigenciaDesde).toISOString().split("T")[0] <=
            data &&
          new Date(actividad.vigenciaHasta).toISOString().split("T")[0] >= data
      );
      const horas = await resultado.map((item) => item.horaDesde);
      console.log("resultado fecha y hora");
      console.log(resultado);
      console.log(horas);
      await setHora(horas);
      console.log(hora);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const flatpickrOptions = {
    // mode: 'range', // Establece el modo en 'range' para habilitar un rango de fecha
    // Agrega más opciones según sea necesario {
    enable: fechas,
  };

  useEffect(() => {
    loadActividad();
    loadProgramacion();
  }, []);

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
            <Autocomplete
              options={actividades}
              onChange={(e, value) => {
                loadFecha(e, value);
                setFieldValue("actividad", value);
                setFieldValue("competencia", "");
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
          <Grid item xs={4}>
            <MDDatePicker
              options={flatpickrOptions}
              value={competenciaV}
              onChange={(e, dateStr) => {
                // competenciaV=fech;
                setFieldValue("competencia", dateStr);
                loadHora(e, dateStr);
              }}
              input={{ placeholder: "Ingrese fecha competencia" }}
            />
          </Grid>

          <Grid item xs={5}>
            <Autocomplete
              // options={["8:00", "9:24", "10:25"]}
              options={hora}
              onChange={(e, value) => {
                setFieldValue("horario", value);
              }}
              renderInput={(params) => (
                <FormField
                  {...params}
                  type={horario.type}
                  label={horario.label}
                  name={horario.name}
                  value={horarioV}
                  InputLabelProps={{ shrink: true }}
                  // error={errors.actividad && touched.actividad}
                  // success={actividadV.length > 0 && !errors.actividad}
                  // InputLabelProps={{ shrink: true }}
                />
                // <MDInput
                //   {...params}
                //   variant="standard"
                //   label={horario.label}
                //   name={horario.name}
                //   value={horarioV}
                //   InputLabelProps={{ shrink: true }}
                //   // error={errors.horario && touched.horario}
                //   // success={horarioV.length > 0 && !errors.horario}
                // />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <MDBox mb={1.5}>
              <MDBox textAlign="right" lineHeight={1.25}>
                <MDTypography variant="button" fontWeight="light" color="text">
                  {/* {title} */}
                  Cupo
                </MDTypography>
                <MDTypography variant="h4">200</MDTypography>
              </MDBox>
            </MDBox>
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
