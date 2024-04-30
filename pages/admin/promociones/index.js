import { useState } from "react";
import axios from "axios";
// formik components
import * as XLSX from "xlsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import FormControl from "@mui/material/FormControl";

// @mui select
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

// form
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";

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
import { useForm, Controller } from "react-hook-form";
// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DataTable from "/examples/Tables/DataTable";

import { exportToExcel } from "/utils/exportExcel";
import MDDatePicker from "/components/MDDatePicker";
// Data
import dataTableData from "/libs/promocion/dataTableData";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Promocion() {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

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

  useEffect(() => {
    buscarActividadesData();
    loadActividad();
  }, []);

  // const exportToExcel = (data, fileName) => {
  //   console.log("XLSX");
  //   console.log(XLSX);
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   XLSX.writeFile(workbook, `${fileName}.xlsx`);
  // };
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

  const buscarActividadesData = async () => {
    //add  loading
    setloadingTable(true);
    setLoading(true);
    await axios
      .get("/api/admin/promocion/")
      .then((response) => {
        console.log("response pr0mocion");
        console.log(response);

        const infoProgramacion = response.data.promocionFound.map((item) => ({
          id: item.id,
          actividad: item.actividad.descripcion,
          detalle: item.descripcion,
          codigo: item.codigo,
          porcentaje: String(item.porcentaje),
          fechainicio: item.fechainicio,
          fechafin: item.fechafin,
          estado: item.estado,
        }));

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
    /* 
    if (
      responseActividad.statusText === "OK" ||
      responseActividad.status === 200
    ) {
      setDataActividad(responseActividad.data.actividadFound);
    } else {
      console.log("Error al traer actividades");
    } */

    // off loading
    setloadingTable(false);
  };

  //modal
  const handleClickOpen = () => {
    setOpen(true);
    console.log(dataActividad);
    console.log(dataTableData);
    console.log(dataActividadTable);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //form actividad

  const validationSchema = Yup.object({
    description: Yup.string().required("Ingrese la descripción"),
    price: Yup.number().required("Ingrese el precio"),
    stateActivity: Yup.string().required("Seleccione"),
  });

  const handleSubmiting = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    handleClose();
  };

  //form actividad
  const onSubmit = async (data) => {
    console.log(data);
    data.fechainicio = data.fechainicio[0];
    data.fechafin = data.fechafin[0];

    console.log({
      ...data,
      // porcentaje: parsePorcentaje,
    });

    try {
      const response = await axios.post(
        "/api/admin/promocion/savePromociones/",
        {
          ...data,

        }
      );
      console.log(response);
      await handleClose();
      await buscarActividadesData();
    } catch (error) {
      console.log(error);
    }
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
    exportToExcel(arreglo, "promociones"); // 'datos' es el nombre del archivo Excel que se generará
  };

  const onChangePorcentaje = (e) => {
    const re = /^[0-9\b]+$/;
    const value = e.target.value;
    // Permitir solo dígitos numéricos && parseInt(value) >= 1 && parseInt(value) <= 100
    if (re.test(value)) {
      setValue("porcentaje", value, { shouldValidate: true });
    } else if (value === "" || !re.test(value)) {
      // Asegurar que se pueda establecer un campo vacío si es necesario
      setValue("porcentaje", "");
    }

    // const re = /^[0-9\b]+$/; //rules
    // if (e.target.value === "" || re.test(e.target.value)) {
    //   // setFieldValue("rucfactura", e.target.value);
    //   setValue("porcentaje", e.target.value);

    // }
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Promoción</DialogTitle>
          <DialogContent>
            <MDBox pt={1} pb={2} px={2}>
              <MDBox>
                <MDBox mb={2} px={0}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="simple-select-standard-label">
                      Actividad
                    </InputLabel>
                    <Select
                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      defaultValue="0"
                      {...register("actividadId", {
                        required: {
                          value: true,
                          message: "Actividad is required",
                        },
                      })}
                      label="Actividad"
                    >
                      <MenuItem value="0"> &nbsp;</MenuItem>
                      {actividades.map((opcion, index) => (
                        <MenuItem value={opcion.id} key={index}>
                          {opcion.descripcion}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={2} px={0}>
                  <MDInput
                    type="text"
                    label="Descripción"
                    {...register("descripcion", {
                      required: {
                        value: true,
                        message: "descripción is required",
                      },
                    })}
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2} px={0}>
                  <MDInput
                    type="text"
                    label="Código"
                    {...register("codigo", {
                      required: {
                        value: true,
                        message: "Código is required",
                      },
                    })}
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2} px={0}>
                  <MDInput
                    type="text"
                    label="Porcentaje"
                    {...register("porcentaje", {
                      onChange: (e) => onChangePorcentaje(e),
                      required: {
                        value: true,
                        message: "Porcentaje is required",
                      },
                      min: {
                        value: 1,
                        message: "debe ser mayor a 0",
                      },
                      max: {
                        value: 100,
                        message: "debe ser menos de 100",
                      },
                    })}
                    variant="standard"
                    fullWidth
                  />
                  {errors.porcentaje && (
                    <p style={{ color: "red" }}>{errors.porcentaje.message}</p>
                  )}
                </MDBox>
                <MDBox mb={2} px={0}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Fecha Inicio
                  </InputLabel>
                  <Controller
                    name="fechainicio"
                    control={control}
                    defaultValue={null}
                    render={({ field, thirdDateRef }) => (
                      <MDDatePicker
                        {...field}
                        ref={thirdDateRef}
                        input={{ placeholder: "Selecione una fecha inicio" }}
                        label="Fecha inicio"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        renderInput={(params) => <input {...params} />}
                      />
                    )}
                  />
                </MDBox>
                <MDBox mb={2} px={0}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Fecha Fin
                  </InputLabel>
                  <Controller
                    name="fechafin"
                    control={control}
                    defaultValue={null}
                    render={({ field, thirdDateRef }) => (
                      <MDDatePicker
                        {...field}
                        ref={thirdDateRef}
                        input={{ placeholder: "Selecione una fecha fin" }}
                        label="Fecha fin"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        renderInput={(params) => <input {...params} />}
                      />
                    )}
                  />
                </MDBox>
                <MDBox mb={2} px={0}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="estado-simple-select-standard-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="estado-simple-select-standard-label"
                      id="estado-simple-select-standard"
                      defaultValue="A"
                      {...register("estado", {
                        required: {
                          value: true,
                          message: "Estado is required",
                        },
                      })}
                      label="Actividad"
                    >
                      <MenuItem value="A">Activo</MenuItem>
                      <MenuItem value="I">Inactivo</MenuItem>
                    </Select>
                  </FormControl>

                  {/* <NativeSelect
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
                  </NativeSelect> */}
                </MDBox>
                {loading && (
                  <MDBox textAlign="center">
                    <CircularProgress color="info" />
                  </MDBox>
                )}
              </MDBox>
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
            nueva promoción
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

export default Promocion;
