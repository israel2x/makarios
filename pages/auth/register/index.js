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
// "use client";

import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";
import MDAlert from "/components/MDAlert";
import { useRouter } from "next/router";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import moment from "moment";
// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";

import CircularProgress from "@mui/material/CircularProgress";
// Images
import bgImage from "/assets/images/fondo_registrar.avif";

function Cover() {


  const [loading, setLoading] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const  router  = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Error de registro"
      dateTime="hace 1 min"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const onSubmit = handleSubmit(async(data) => {
    try {
      console.log("data");
      data.role='participante';
      await setLoading(true);
      // console.log(data.role);
      const response = await axios.post('/api/auth/register/', data);
      // console.log(" antes del response");
      console.log("response login");
      console.log(response);
      // const resJSON = await response.json()
      // console.log(resJSON);
      console.log(router);
      await setTimeout(() => {
        setLoading(false);
        

      if(response.statusText === "OK" || response.status===200) {
        router.push('/auth/login');

      }else{
        
        console.log("ess");
        setErrorEmail(true);
      }
    }, 2000);
  } catch (error) {
    
    console.log(error);
    await openErrorSB();
    if(error.response.status === 409 ){
      // alert("Usuario o contraseña incorrectos");
    }
  
      console.log("error");
      console.log(error);

  }


  });

  return (
    <CoverLayout image={bgImage}>
       {/* {errorEmail === true && (
                         <MDAlert color="error" dismissible>This is a dismissible alert!</MDAlert>
                          ) } */}
           
      
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registrar
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa tu email and password 
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "Firstname is required",
                  },
                })}
                variant="standard"
                fullWidth
                
              />
     
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Apellidos"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "Lastname is required",
                  },
                })}
                variant="standard"
                fullWidth
                
              />
     
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                {...register("email", { required: true })}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                {...register("password", { required: true })}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Estoy de acuerdo&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Termino y Condiciones
              </MDTypography>
            </MDBox>
            {loading && (
            <MDBox textAlign="center">
              <CircularProgress color="info" />
            </MDBox>
          )}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={() => {
                 onSubmit()
                }}
                color="info"
                fullWidth
              >
                Registrar
              </MDButton>
            </MDBox>
            {renderErrorSB}
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
