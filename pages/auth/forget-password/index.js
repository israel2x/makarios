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

// @mui material components
import Card from "@mui/material/Card";
import { useState } from "react";
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

import MDSnackbar from "/components/MDSnackbar";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";

import CircularProgress from "@mui/material/CircularProgress";

// Images
import bgImage from "/assets/images/fondo_registrar.jpeg";

function Cover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [notificationSB, setNotificationSB] = useState(false);
  const openNotificationSB = () => setNotificationSB(true);
  const closeNotificationSB = () => setNotificationSB(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderNotificationSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Email enviado"
      content="Revisa tu email y da click al enlace enviado"
      dateTime="ahora"
      open={notificationSB}
      onClose={closeNotificationSB}
      close={closeNotificationSB}
      bgWhite
    />
  );
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Email no valido"
      dateTime="ahora"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      await setLoading(true);
      // console.log(data.role);
      const response = await axios.post("/api/auth/forget-password/", data);
      await setTimeout(() => {
        
      }, 2000);
      if (response.statusText === "OK" || response.status === 200) {
      await openNotificationSB();
        
        await setTimeout(() => {
            if (response.statusText === "OK" || response.status === 200) {
              setLoading(false);
              router.push("/auth/login");
            }else{
                openErrorSB();
            }
          }, 4000);
      
      }
     
    } catch (error) {
        setLoading(false);
        openErrorSB();
      console.log("error");
      console.log(error);
    }
  });

  return (
    <CoverLayout coverHeight="40vh" image={bgImage}>
      {renderNotificationSB}
      {renderErrorSB}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Recuperar contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa tu email registrado
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email es obligatorio",
                  },
                })}
                variant="standard"
                fullWidth
              />
            </MDBox>
            {loading && (
              <MDBox textAlign="center">
                <CircularProgress color="info" />
              </MDBox>
            )}
            <MDBox mt={6} mb={1}>
              <MDButton
                variant="gradient"
                onClick={() => {
                  onSubmit();
                }}
                color="info"
                fullWidth
                disabled={loading}
              >
                recuperar contraseña
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienes un usuario?{" "}
                <Link href="/auth/login">
                  <MDTypography
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Inicia sesión
                  </MDTypography>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
