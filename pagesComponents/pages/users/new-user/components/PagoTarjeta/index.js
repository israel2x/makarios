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

import Image from "next/image";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

// Images
import masterCardLogo from "/assets/images/logos/mastercard.png";
import visaLogo from "/assets/images/logos/visa.png";
import MasterCard from "/examples/Cards/MasterCard";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card id="delete-account">
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Metodo de Pago
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>payments</Icon>
          &nbsp;Pago
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}  display="flex"
          justifyContent="center"
          alignItems="center">
        <Grid item xs={12} xl={8}>
                  <MasterCard
                    number={4562112245947852}
                    holder="Jaime Rodas"
                    expires="11/24"
                  />
                </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
