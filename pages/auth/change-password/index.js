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

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import MDButton from "/components/MDButton";

import CircularProgress from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Authentication layout components
import CoverLayout from "/pagesComponents/authentication/components/CoverLayout";
import { useState } from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


import { useSearchParams } from 'next/navigation';

import MDSnackbar from "/components/MDSnackbar";

import { useRouter } from "next/router";
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";

// Images
import bgImage from "/assets/images/makarios3.jpg";

function Cover() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Verifica si tus contraseñas estan correctas"
      dateTime="ahora"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const validateEmailEquals = (pass_data, confPass_data) => {
    return pass_data !== confPass_data;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await setLoading(true);

      // if (validateEmailEquals(data.password, data.confirmPassword)) {
      //  await openErrorSB();
      //   throw new Error("Las contraseñas no coinciden");
      // }
     
      const token = searchParams.get('token')

      const options= {
        headers: {
          token
        }
      }
      const response = await axios.post("/api/auth/change-password/", data, options);

      await setTimeout(() => {
        setLoading(false);
        if (response.statusText === "OK" || response.status === 200) {
          router.push("/auth/login");
        } else {
          console.log("ess");
          setErrorEmail(true);
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      await openErrorSB();
      
      console.log("error");
      console.log(error);
    }
  });

  return (
    <CoverLayout coverHeight="40vh" image={bgImage}>
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Cambiar Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            ingresa tu nueva contraseña
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <FormControl sx={{ s: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Contraseña
                </InputLabel>
                <Input
                  // type="password"
                  label="Contraseña"
                  {...register("password", { required: true })}
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  // fullWidth
                />
              </FormControl>
            </MDBox>
            <MDBox mb={4}>
              <FormControl sx={{ s: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Confirmar Contraseña
                </InputLabel>
                <Input
                  // type="password"
                  label="Confirmar Contraseña"
                  {...register("confirmPassword", { required: true })}
                  variant="standard"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  // fullWidth
                />
              </FormControl>
            </MDBox>
            {loading && (
              <MDBox textAlign="center">
                <CircularProgress color="info" />
              </MDBox>
            )}
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" disabled={loading} onClick={onSubmit} color="info" fullWidth>
                Cambiar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
