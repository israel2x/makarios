import axios from "axios";
import React, { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Grid";

// @mui select
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";

// form
import MDDatePicker from "/components/MDDatePicker";

import { Controller, useForm } from "react-hook-form";

//@mui components for modal-dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import Footer from "/examples/Footer";
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import DataTable from "/examples/Tables/DataTable";

// Data
import CircularProgress from "@mui/material/CircularProgress";
import dataTableData from "/libs/programacion/dataTableData";
import { exportToExcel } from "/utils/exportExcel";

import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";

//import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment"; // Importa Moment.js
import "moment/locale/es"; // Imp
const { DateTime } = require("luxon");

function Programacion() {
  const [actividades, setActividades] = useState([]);
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false); //modal
  const [loading, setLoading] = useState(false);
  const [dataTableData2, setDataTableData2] = useState({
    columns: [],
    rows: [],
  });
  const [age, setAge] = useState(""); //select
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  //load data table
  const [responseActividad, setResponseActividad] = useState();
  const [dataActividad, setDataActividad] = useState();
  const [loadingTable, setloadingTable] = useState(false);
  const [dataActividadTable, setDataActividadTable] = useState(dataTableData);

  const [locale, setLocale] = useState("es");
  // Configura Moment.js con el idioma español
  moment.locale("es");
  // fechas horas programacion
  const [horaInicio, setHoraInicio] = useState("11:00");

  const datePickerRef = React.useRef(null);
  const secondDateRef = React.useRef(null);
  const thirdDateRef = React.useRef(null);

  const oneTimeRef = React.useRef(null);
  const secondTimeRef = React.useRef(null);

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    buscarProgramacionesData();
    loadActividad();
  }, []);

  const loadActividad = async (data) => {
    try {
      const response = await axios.get("/api/torneos/actividad", data);

      if (response.statusText === "OK" || response.status === 200) {
        const dataActividad = response.data.actividadFound.map((item) => ({
          id: item.id,
          descripcion: item.descripcion,
          precio: item.precio,
        }));
        setActividades(dataActividad);
        // carga los nombres para el list
        // const data_Actividad = response.data.actividadFound.map(
        //   (item) => item.descripcion
        // );
        // setActividadesNombre(data_Actividad);
      } else {
      }
    } catch (error) {}
  };

  const buscarProgramacionesData = async () => {
    //add  loading
    setloadingTable(true);
    setLoading(true);
    await axios
      .get("/api/admin/programacion/")
      .then((response) => {
        console.log("response programacion");
        console.log(response);

        const infoProgramacion = response.data.programacionFound.map(
          (item) => ({
            id: item.id,
            actividad: item.actividad.descripcion,
            detalle: item.detalle,
            fechadesde: item.vigenciaDesde,
            fechahasta: item.vigenciaHasta,
            fechatope: item.fechatope,
            cupo: item.cupo,
            registrados: item.registro.length,
            estado: item.estado,
          })
        );

        const columns = dataTableData.columns; // Object.keys(response.data.actividadFound[0]); // Suponiendo que la primera fila del arreglo contiene los nombres de las columnas
        setDataTableData2((prevState) => ({
          ...prevState,
          columns: columns,
        }));

        // Actualizar las filas
        setDataTableData2((prevState) => ({
          ...prevState,
          rows: infoProgramacion,
        }));

        setloadingTable(false);
        setLoading(false);
        console.log(loadingTable);
        console.log(loading);
      })
      .catch((error) => console.log(error));

    // off loading
    setloadingTable(false);
  };

  //modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const convertirDate = (date) => date.toISOString();

  //form actividad
  const onSubmit = async (data) => {
    console.log(data);

    const parseCupo = parseInt(data.cupo, 10);
    data.actividadId = parseInt(data.actividadId, 10);
    data.cupo = parseCupo;

    data.fechatope = data.fechatope[0];
    data.vigenciadesde = data.vigenciadesde[0];
    data.vigenciahasta = data.vigenciahasta[0];

    const hora_uno = data.horaDesde[0].toString();
    const hora_dos = data.horaHasta[0].toString();

    data.horaDesde = hora_uno.split(" ")[4].substring(0, 5);
    data.horaHasta = hora_dos.split(" ")[4].substring(0, 5);

    const fechax = moment.utc(data.fechatope);

    try {
      const response = await axios.post(
        "/api/admin/programacion/saveProgramacion/",
        {
          data,
        }
      );
      console.log(response);
      handleClose();
      buscarProgramacionesData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Stado: Activo</MenuItem>
      <MenuItem onClick={closeMenu}>Stado: Inactivo</MenuItem>
      {/* <MenuItem onClick={closeMenu}>Stado: Canceled</MenuItem> */}
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remover Filtro
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  const config_fecha = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
  };

  const handleExportToExcel = () => {
    const arreglo = [];

    // Agregar columnas al arreglo
    arreglo.push(dataTableData2.columns.map((columna) => columna.Header));

    // Agregar filas al arreglo
    dataTableData2.rows.forEach((fila) => {
      const filaArreglo = [];
      dataTableData2.columns.forEach((columna) => {
        filaArreglo.push(fila[columna.accessor]);
      });
      arreglo.push(filaArreglo);
    });
    console.log("arreglo");
    console.log(arreglo);
    exportToExcel(arreglo, "Programacion"); // 'datos' es el nombre del archivo Excel que se generará
  };

  //time inputs
  const [timex, setTimex] = useState("10:00");
  const onChangeHoraFin = (value) => {
    setTimex(value);
  };
  const onChangeHoraInicio = (value) => {
    setHoraInicio(value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Programación</DialogTitle>
          <DialogContent>
            {/* <MDBox pt={2} pb={2} px={2}> */}
            <MDBox mt={1.625}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MDBox mb={2} px={0}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 350, display: "flex" }}
                    >
                      <InputLabel id="programacion-label">Actividad</InputLabel>
                      <Select
                        labelId="programacion-label"
                        id="programacion-select"
                        defaultValue=""
                        {...register("actividadId", {
                          required: "Actividad is required",
                        })}
                      >
                        <MenuItem value="">Seleccione una opción</MenuItem>
                        {actividades.map((opcion, index) => (
                          <MenuItem value={opcion.id} key={index}>
                            {opcion.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Fecha Inicio</InputLabel>
                    <Controller
                      name="vigenciadesde"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <MDDatePicker {...field} label="Fecha" />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Fecha Fin</InputLabel>
                    <Controller
                      name="vigenciahasta"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <MDDatePicker {...field} label="Fecha" />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Fecha Tope</InputLabel>
                    <Controller
                      name="fechatope"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <MDDatePicker {...field} label="Fecha" />
                      )}
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Hora Inicio</InputLabel>
                    <Controller
                      name="horaDesde"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <MDDatePicker
                          {...field}
                          options={config_fecha}
                          label="Hora"
                        />
                        // <TimePicker {...field} label="Hora" />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Hora Fin</InputLabel>
                    <Controller
                      name="horaHasta"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        // <TimePicker {...field}  label="Hora" />
                        <MDDatePicker
                          {...field}
                          options={config_fecha}
                          label="Hora"
                        />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox mb={2} px={0}>
                    <MDInput
                      variant="standard"
                      sx={{ m: 1, minWidth: 350, display: "flex" }}
                      placeholder="Lunes a viernes  08:00 - 11:00 AM"
                      type="text"
                      label="Detalle"
                      {...register("detalle", {
                        required: "El detalle is required",
                      })}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <MDInput
                      type="number"
                      label="Cupo"
                      variant="standard"
                      sx={{ m: 1, display: "flex" }}
                      {...register("cupo", { required: "El cupo is required" })}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <InputLabel variant="standard">Estado</InputLabel>
                    <NativeSelect
                      defaultValue="A"
                      sx={{ m: 1, display: "flex" }}
                      {...register("estado", {
                        required: "Estado is required",
                      })}
                      inputProps={{ name: "estado", id: "estado-native" }}
                    >
                      <option value="">Seleccione</option>
                      <option value="A">Activo</option>
                      <option value="I">Inactivo</option>
                    </NativeSelect>
                  </MDBox>
                </Grid>

                {loading && (
                  <MDBox textAlign="center">
                    <CircularProgress color="info" />
                  </MDBox>
                )}
              </Grid>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <MDButton color="dark" onClick={handleClose}>
              Cancelar
            </MDButton>
            <MDButton type="submit" color="info">
              Guardar
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
      <MDBox my={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <MDButton variant="gradient" color="info" onClick={handleClickOpen}>
            nueva programación
          </MDButton>
          <MDBox display="flex">
            <MDButton
              variant={menu ? "contained" : "outlined"}
              color="dark"
              onClick={openMenu}
            >
              filtro&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton
                variant="outlined"
                onClick={handleExportToExcel}
                color="dark"
              >
                <Icon>description</Icon>
                &nbsp;export excel
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          {/* {loadingTable ? (
          ) : (
            <MDBox textAlign="center">
              <CircularProgress color="info" />
            </MDBox>
          )} */}
          {loadingTable && (
            <MDBox textAlign="center">
              <CircularProgress color="info" />
            </MDBox>
          )}
          <DataTable table={dataTableData2} entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Programacion;
