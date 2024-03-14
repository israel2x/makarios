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
import { getSession } from "next-auth/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MDDatePicker from "/components/MDDatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  const {
    actividad,
    email,
    actividadid,
    programacionid,
    programacion,
    dia,
    mes,
    anio,
    fechanacimiento,
    precio,
  } = formField;
  const {
    cedula: cedulaV,
    direccion: direccionV,
    direccionfactura: direccionfacturaV,
    nombres: nombresV,
    apellidos: apellidosV,
    email: emailV,
    actividad: actividadV,
    fechanacimiento: fechanacimientoV,
    dia: diaV,
    mes: mesV,
    anio: anioV,
    programacion: programacionV,
    programacionid: programacionidV,
    actividadid: actividadidV,
    horario: horarioV,
    precio: precioV,
  } = values;

  const [actividades, setActividades] = useState([]);
  const [actividadesNombre, setActividadesNombre] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [cupoTotal, setCupoTotal] = useState(null);
  const [ocupado, setOcupado] = useState(null);
  const [disponible, setDisponible] = useState(null);

  const handleChange = async (event) => {
    await setFieldValue("horario", "");
    console.log("programacion id");
    console.log(detalle);
    await loadCupos(event.target.value);
    const programacion = await detalle.find(
      (item) => event.target.value === item.id
    );
    // await setFieldValue("programacionid", event.target.value);
    console.log(programacion);
    console.log(programacionV);
    console.log(event.target.value);
    await setFieldValue("programacionid", event.target.value);
    await setFieldValue("programacion", programacion.detalle);
    setFieldValue("rucfactura", cedulaV);
    setFieldValue("direccionfactura", direccionV);
    setFieldValue("mailfactura", emailV);
    setFieldValue("nombrefactura", nombresV + " " + apellidosV);

    // await loadHora(event, event.target.value);
  };

  const loadActividad = async (data) => {
    const session = await getSession(data);
    setFieldValue("email", session.user.email);
    try {
      const response = await axios.get("/api/actividad", data);
      console.log("response actividad");
      console.log(response);
      if (response.statusText === "OK" || response.status === 200) {
        const dataActividad = response.data.actividadFound.map((item) => ({
          id: item.id,
          descripcion: item.descripcion,
          precio: item.precio,
        }));
        setActividades(dataActividad);
        // carga los nombres para el list
        const data_Actividad = response.data.actividadFound.map(
          (item) => item.descripcion
        );
        setActividadesNombre(data_Actividad);
        console.log(actividadesNombre);
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
      console.log("response programacion");
      console.log(response);
      if (response.statusText === "OK" || response.status === 200) {
        const detalle = await response.data.programacionFound.map((item) => ({
          id: item.id,
          detalle: item.detalle,
        }));

        setDetalle(detalle);
        console.log("array detalle");
        console.log(detalle);
        // const arrayConDuplicados = dataFechas.map((item) => item.from);
        // await setFechasProgramacion([...new Set(arrayConDuplicados)]);
      } else {
      }
    } catch (error) {
      console.log("error programacion");
      console.log(error);
    }
  };

  const loadCupos = async (programacion) => {
    try {
      const response = await axios.get("/api/cupos", {
        params: { cupos: programacion },
      });
      console.log("cupos response");
      console.log(response);
      if (response.statusText === "OK" || response.status === 200) {
        const cupo = response.data.resultCupos.cupo;
        const ocupado = response.data.resultCupos.ocupado;
        const disponible = response.data.resultCupos.disponible;
        // const cupos = await response.data.resultCupos.map((item) => ({
        //   cupo: item.cupo,
        //   ocupado: item.ocupado,
        //   disponible: item.disponible
        // }));

        setCupoTotal(cupo);
        setOcupado(ocupado);
        setDisponible(disponible);
      } else {
      }
    } catch (error) {
      console.log("error programacion");
      console.log(error);
    }
  };

  const handleProgramacion = async (e, data) => {
    try {
      const resultado = actividades.find(
        (actividad) => actividad.descripcion === data
      );

      await loadProgramacion(resultado.id);
      setFieldValue("precio", resultado.precio);
      setFieldValue("actividadid", resultado.id);
      const fechaNacimientoP = moment(
        `${anioV}-${mesV}-${diaV}`,
        "YYYY-MMMM-DD"
      );
      const fechaFormateada = fechaNacimientoP.format("YYYY-MM-DD");
      setFieldValue("fechanacimiento", fechaFormateada);
      console.log("programacion");
      console.log(resultado);
      console.log(precioV);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  // const loadHora = async (e, data) => {
  //   try {
  //     console.log("load hora");
  //     console.log(programacion);

  //     const resultado = await programacion.filter(
  //       (actividad) =>
  //         new Date(actividad.vigenciaDesde).toISOString().split("T")[0] <=
  //           data &&
  //         new Date(actividad.vigenciaHasta).toISOString().split("T")[0] >= data
  //     );
  //     const horas = await resultado.map((item) => item.horaDesde);
  //     console.log("resultado fecha y hora");
  //     console.log(resultado);
  //     console.log(horas);
  //     await setHora(horas);
  //     console.log(hora);
  //   } catch (error) {
  //     console.log("error");
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    loadActividad();
    // loadProgramacion();
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
              options={actividadesNombre}
              onChange={(e, value) => {
                handleProgramacion(e, value);
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
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Programación
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={programacionidV}
                onChange={handleChange}
                label="Programación"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {detalle.map((opcion, index) => (
                  <MenuItem value={opcion.id} key={index}>
                    {opcion.detalle}
                  </MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={5}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Horario
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={horarioV}
                onChange={handleHorarioChange}
                label="Competencia"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {hora.map((opcion, index) => (
                  <MenuItem value={opcion} key={index}>
                    {opcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={3}>
            <MDBox mb={1.5}>
              <MDBox textAlign="right" lineHeight={1.25}>
                <MDTypography variant="button" fontWeight="light" color="text">
                  {/* {title} */}
                  Cupos disponibles
                </MDTypography>
                <MDTypography variant="h5" color={"success"}>
                  {disponible}
                  <MDTypography variant="h7" color={"secondary"}>
                    /{cupoTotal}
                  </MDTypography>
                </MDTypography>
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
