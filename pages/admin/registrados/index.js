import axios from "axios";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import team1 from "/assets/images/team-3.jpg";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DataTable from "/examples/Tables/DataTable";
import { useState, useEffect } from "react";
// Data
import dataTableData from "/libs/registros/dataTableData";

function OrderList() {
  const [menu, setMenu] = useState(null);
  const [datosTabla, setDatostabla] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const [dataTableData2, setDataTableData2] = useState({
    columns: [],
    rows: []
});
  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  const loadRegistrados = async () => {
    try {
      const response = await axios.get("/api/admin/registro");
      console.log("response infodata");
      console.log(response);
      if (response.statusText === "OK" || response.status === 200) {
        const infoRegistro = response.data.registroFound.map((item) =>({
          id: item.id,
          date: item.fecharegistro,
          program: item.programacion.detalle,
          customer:[item.profile.apellidos +' '+item.profile.nombres,{image: item.profile.apellidos[0]}],
          product: item.programacion.actividad.descripcion,
          promocion:item.detallepromo,
          revenue:  "$ "+(item.pagoplux.amount),
        }));

        const columns = dataTableData.columns; // Object.keys(response.data.actividadFound[0]); // Suponiendo que la primera fila del arreglo contiene los nombres de las columnas
        setDataTableData2(prevState => ({
            ...prevState,
            columns: columns
        }));

        // Actualizar las filas
        setDataTableData2(prevState => ({
            ...prevState,
            rows: infoRegistro
        }));

      } else {
      }
    } catch (error) {
      console.log("error info registro");
      console.log(error);
    }
  };

  // rows: [
  //   {
  //     id: "#10421",
  //     date: "1 Nov, 10:20 AM",
  //     status: "paid",
  //     customer: ["Orlando Imieto", { image: team2 }],
  //     product: "Nike Sport V2",
  //     revenue: "$140,20",
  //   },

  useEffect(() => {
    loadRegistrados();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          {/* <MDButton variant="gradient" color="info">
            new order
          </MDButton> */}
          {/* <MDBox display="flex">
            <MDButton
              variant={menu ? "contained" : "outlined"}
              color="dark"
              onClick={openMenu}
            >
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox> */}
        </MDBox>
        <Card>
          <DataTable table={dataTableData2} entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
