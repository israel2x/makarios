import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

function Programacion() {


  return (
<>
 
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox my={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <MDButton variant="gradient" color="dark">
              new order
            </MDButton>
            <MDBox display="flex"></MDBox>
          </MDBox>
          <Card>
            <MDBox>
              <h2>tabla Programacion</h2>
            </MDBox>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
  
    
</>
  );
}

export default Programacion;
