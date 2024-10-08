import axios from "axios";
import { useEffect, useState } from "react";
// formik components


// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// @mui select
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

// form

import { useForm } from "react-hook-form";

//@mui components for modal-dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
import dataTableData from "/libs/actividad/dataTableData";

function Actividad() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false); //modal
  const [loading, setLoading] = useState(false);
  const [dataTableData2, setDataTableData2] = useState({
    columns: [],
    rows: [],
  });

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const [formData, setFormData] = useState({
    descripcion: '',
    precio: '',
    estado: 'A' // Asumiendo 'A' como activo por defecto
  });
  
  //load data table
  const [responseActividad, setResponseActividad] = useState();
  const [dataActividad, setDataActividad] = useState();
  const [loadingTable, setloadingTable] = useState(false);
  const [dataActividadTable, setDataActividadTable] = useState(dataTableData);

  useEffect(() => {
    buscarActividadesData();
  }, []);


  const handleEdit = (actividad) => {
    setFormData({
      id: actividad.id, // Asegúrate de que cada actividad tiene un ID único
      descripcion: actividad.descripcion,
      precio: actividad.precio,
      estado: actividad.estado
    });
    setOpen(true);
  };
  
  const buscarActividadesData = async () => {
    //add  loading
    setloadingTable(true);

    try {
      const response = await axios.get("/api/admin/actividad/");
      const columns = dataTableData.columns;
      setDataTableData2({
        columns: columns,
        rows: response.data.actividadFound,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    setloadingTable(false);
  };

  //modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //form actividad
  const onSubmit = async (data) => {
    console.log(data);
    const parsePrecio = parseInt(data.precio, 10);
    console.log({
      ...data,
      precio: parsePrecio,
    });

    try {
      const response = await axios.post("/api/admin/actividad/saveActividad/", {
        ...data,
        precio: parsePrecio,
      });
      console.log(response);
      await handleClose();
      await buscarActividadesData();
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Actividad</DialogTitle>
          <DialogContent>
            <MDBox pt={1} pb={2} px={2}>
              <MDBox>
                <MDBox mb={2} px={0}>
                  <MDInput
                    type="text"
                    label="Descripción"
                    {...register("descripcion", {
                      required: {
                        value: true,
                        message: "Descripción is required",
                      },
                    })}
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2} px={0}>
                  <MDInput
                    type="number"
                    label="Precio"
                    {...register("precio", {
                      required: {
                        value: true,
                        message: "Precio is required",
                      },
                    })}
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={0}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
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

export default Actividad;
