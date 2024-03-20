import { useState } from "react";
import axios from "axios";
// formik components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

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

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DataTable from "/examples/Tables/DataTable";

// Data
import dataTableData from "/pagesComponents/ecommerce/orders/order-list/data/dataTableData";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Actividad() {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false); //modal
  const [loading, setLoading] = useState(false);

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
  }, []);

  const buscarActividadesData = async () => {
    //add  loading
    setloadingTable(true);
    await axios
      .get("/api/actividad/")
      .then((response) => {
        console.log(response);
        //setResponseActividad(response);
        setDataActividad({ rows: response.data.actividadFound });
        dataTableData.rows = dataActividad;
        setDataActividadTable(
          (dataTableData.rows = response.data.actividadFound)
        );
        console.log(dataTableData);
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

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    handleClose();
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
      <MenuItem onClick={closeMenu}>Stado: Canceled</MenuItem>
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
        <Formik
          initialValues={{ description: "", price: "", stateActivity: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <DialogTitle>Crear Actividad</DialogTitle>
            <DialogContent>
              <MDBox pt={1} pb={2} px={2}>
                <MDBox>
                  <MDBox mb={2}>
                    <FormField
                      type="text"
                      name="description"
                      label="Descripción"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <FormField type="number" name="price" label="Precio" />
                  </MDBox>
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
                        name: "stateActivity",
                        id: "uncontrolled-native",
                      }}
                      sx={{
                        width: 250,
                        height: 40,
                      }}
                    >
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
                    </NativeSelect>
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
              <MDButton type="submit" color="dark">
                Guardar
              </MDButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <MDBox my={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
            nueva actividad
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
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          {loadingTable ? (
            <DataTable table={dataTableData} entriesPerPage={false} canSearch />
          ) : (
            <MDBox textAlign="center">
              <CircularProgress color="info" />
            </MDBox>
          )}
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Actividad;
