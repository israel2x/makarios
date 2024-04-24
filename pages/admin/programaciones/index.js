import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

// @mui select
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

// form
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDDatePicker from "/components/MDDatePicker";

import { useForm, Controller } from "react-hook-form";

//@mui components for modal-dialog
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DataTable from "/examples/Tables/DataTable";

// Data
import dataTableData from "/libs/programacion/dataTableData";
import CircularProgress from "@mui/material/CircularProgress";
import { exportToExcel } from "/utils/exportExcel";

import Flatpickr from "react-flatpickr";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

//import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment"; // Importa Moment.js
import "moment/locale/es"; // Imp
const { DateTime } = require("luxon");

function Programacion() {
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
  }, []);

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
    data.vigenciaDesde = data.vigenciaDesde[0];
    data.vigenciaHasta = data.vigenciaHasta[0];

    console.log(data.fechatope);

    const fechax = moment.utc(data.fechatope);
    console.log(fechax.toDate());
    console.log(data);

    try {
      const response = await axios.post(
        "/api/admin/programacion/saveProgramacion/",
        {
          data,
        }
      );
      console.log(response);
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
            <MDBox pt={1} pb={2} px={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Actividad
                    </InputLabel>
                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: "actividadId",
                        id: "uncontrolled-native",
                      }}
                      sx={{
                        width: 250,
                        height: 40,
                      }}
                      {...register("actividadId", {
                        required: {
                          value: true,
                          message: "Actividad is required",
                        },
                      })}
                    >
                      <option value={1}>
                        Campeonato Semi Senior Post 40 Clase A
                      </option>
                      <option value={2}>Campeonato Junior Clase A</option>
                    </NativeSelect>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Fecha Inicio
                    </InputLabel>
                    <LocalizationProvider
                      dateAdapter={AdapterMoment}
                      locale="es"
                    >
                      <Controller
                        name="vigenciaDesde"
                        control={control}
                        defaultValue={null}
                        render={({ field, datePickerRef }) => (
                          <MDDatePicker
                            {...field}
                            ref={datePickerRef}
                            input={{ placeholder: "Selecione una fecha" }}
                            label="Fecha"
                            value={field.value}
                            onChange={(date) => field.onChange(date)}
                            renderInput={(params) => <input {...params} />}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={0} px={0}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Fecha Fin
                    </InputLabel>
                    <Controller
                      name="vigenciaHasta"
                      control={control}
                      defaultValue={null}
                      render={({ field, secondDateRef }) => (
                        <MDDatePicker
                          {...field}
                          ref={secondDateRef}
                          input={{ placeholder: "Selecione una fecha" }}
                          label="Fecha"
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          renderInput={(params) => <input {...params} />}
                        />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Fecha Tope
                    </InputLabel>
                    <Controller
                      name="fechatope"
                      control={control}
                      defaultValue={null}
                      render={({ field, thirdDateRef }) => (
                        <MDDatePicker
                          {...field}
                          ref={thirdDateRef}
                          input={{ placeholder: "Selecione una fecha" }}
                          label="Fecha"
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          renderInput={(params) => <input {...params} />}
                        />
                      )}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Hora Inicio
                    </InputLabel>
                    <MDBox>
                      <MDBox mb={0} px={0}>
                        <Controller
                          name="horaDesde"
                          control={control}
                          defaultValue={null}
                          render={({ field, oneTimeRef }) => (
                            <TimePicker
                              {...field}
                              ref={oneTimeRef}
                              input={{ placeholder: "Selecciona una hora" }}
                              label="Hora"
                              value={field.value}
                              onChange={(date) => field.onChange(date)}
                              renderInput={(params) => <input {...params} />}
                            />
                          )}
                        />
                        {/*  <TimePicker
                          onChange={onChangeHoraInicio}
                          value={horaInicio}
                        /> */}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Hora Fin
                    </InputLabel>
                    <MDBox mb={0} px={0}>
                      <Controller
                        name="horaHasta"
                        control={control}
                        defaultValue={null}
                        render={({ field, secondTimeRef }) => (
                          <TimePicker
                            {...field}
                            ref={secondTimeRef}
                            input={{ placeholder: "Selecciona una hora" }}
                            label="Hora"
                            value={field.value}
                            onChange={(date) => field.onChange(date)}
                            renderInput={(params) => <input {...params} />}
                          />
                        )}
                      />
                      {/* <TimePicker onChange={onChangeHoraFin} value={timex} /> */}
                    </MDBox>
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MDBox mb={2} px={0}>
                    <MDInput
                      type="number"
                      name="cupo"
                      label="Cupo"
                      {...register("cupo", {
                        required: {
                          value: true,
                          message: "El Cupo is required",
                        },
                      })}
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MDBox mb={0}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Estado
                    </InputLabel>
                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: "estado",
                        id: "uncontrolled-native",
                      }}
                      sx={{
                        width: 250,
                        height: 40,
                      }}
                      {...register("estado", {
                        required: {
                          value: true,
                          message: "Estado is required",
                        },
                      })}
                    >
                      <option value={"A"}>Activo</option>
                      <option value={"I"}>Inactivo</option>
                    </NativeSelect>
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <MDBox mb={0} px={0}>
                    <MDInput
                      type="text"
                      name="detalle"
                      label="Detalle"
                      {...register("detalle", {
                        required: {
                          value: true,
                          message: "El Detalle is required",
                        },
                      })}
                    />
                  </MDBox>
                </Grid>

                {loading && (
                  <MDBox textAlign="center">
                    <CircularProgress color="info" />
                  </MDBox>
                )}
                {/* </MDBox> */}
              </Grid>
            </MDBox>
            {/*  </LocalizationProvider> */}
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
