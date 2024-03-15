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

import { getSession } from 'next-auth/react';

import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Swal from "sweetalert2";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";

// Authentication layout components
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

// Images
import bgImage from "/assets/images/tiro-con-arco-2022.jpeg";

// import { handleLoginUser } from "../../../actions";
import colors from "/assets/theme/base/colors";

import linearGradient from "/assets/theme/functions/linearGradient";

const { transparent, gradients, socialMediaColors, badgeColors } = colors;

import { useRouter } from "next/router";

function Basic() {
  
  const [loading, setLoading] = useState(false);
  // const { dispatch } = useContext(UserCitaContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [emailUser, setEmailUser] = useState(false);
  const [passwordlUser, setPasswordUser] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const session = await getSession(data);
    try {
      await setLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      await setTimeout(() => {
        setLoading(false);
        
        if (res.error) {
          // alert("Usuario o contraseña incorrectos");
          Swal.fire({
            icon: "error",
            text: "Usuario o contraseña incorrectos!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {

          // console.log('Usuario:', session.user);
          // console.log('Rol:', session.user.firstname);
          // dispatch({ type: "SET_USER_EMAIL", payload: res.Email });
          router.push("/registrarTorneo");
        }
      }, 2000);
      
    } catch (error) {}
  });

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="dark"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar Sesión
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            {/* <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                })}
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recuerdame
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
                color="info"
                fullWidth
                onClick={() => {
                  onSubmit();
                }}
              >
                ingresar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {/* Don&apos;t have an account?{" "}  */}
                No tienes una cuenta?
                <Link href="/auth/register">
                  <MDTypography
                    variant="button"
                    color="dark"
                    fontWeight="medium"
                    textGradient
                  >
                    {/* Sign up */}
                    Registrar
                  </MDTypography>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
