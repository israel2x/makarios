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
"use client";
import { useState, useContext, useEffect } from "react";
import { getSession } from "next-auth/react";
// formik components
import { Formik, Form } from "formik";

import Swal from "sweetalert2";
import Image from "next/image";
import PageLayout from "/examples/LayoutContainers/PageLayout";

import { MakariosProvider } from "/contextMakarios";
import { signOut } from "next-auth/react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

import axios from "axios";
// NewUser page components
import UserInfo from "/pagesComponents/pages/users/new-user/components/UserInfo";
import Address from "/pagesComponents/pages/users/new-user/components/Address";
import Confirmacion from "/pagesComponents/pages/users/new-user/components/Confirmacion";
import Pago from "/pagesComponents/pages/users/new-user/components/Pago";

// NewUser layout schemas for form and form feilds
import validations from "/pagesComponents/pages/users/new-user/schemas/validationsMakarios";
import form from "/pagesComponents/pages/users/new-user/schemas/formMakarios";
import initialValues from "/pagesComponents/pages/users/new-user/schemas/initialMakariosValues";
import { messages } from "/utils/mesagges";
import MDSnackbar from "/components/MDSnackbar";

import bgImage from "/assets/images/BF-Makarios.jpg";

function getSteps() {
  return ["Participante", "Actividad", "Confirmación", "Pago"];
}

function getStepContent(stepIndex, formData, dataPagos) {
  const components = [UserInfo, Address, Confirmacion, Pago];
  const Component = components[stepIndex];
  return stepIndex === 3 ? (
    <Component formData={formData} pagos={dataPagos} />
  ) : (
    <Component formData={formData} />
  );
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [notificationSB, setNotificationSBSB] = useState(false);
  const openNotificationSB = () => setNotificationSBSB(true);
  const closeNotificationSB = () => setNotificationSBSB(false);

  const [pagoPlux, setPagoplux] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [detalleActividad, setDetalleActividad] = useState("Pago de TORNEO DEPORTIVO");
  const [pagado, setPagado] = useState(false);
  const [emailUser, setEmailUser] = useState(null);
  const [responsePagoPlux, setResponsePagoPlux] = useState(null);
  //maneja el valor de la cita
  //inicializando el context
  // const { state, dispatch } = useContext(UserCitaContext);
  // const precioRegistroP = state.precio;

  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleBack = () => setActiveStep(activeStep - 1);

  let dataPagos = {
    PayboxRemail: "pagos@makarios.club",
    PayboxSendmail: emailUser,
    PayboxRename: "CLUB DEPORTIVO ESPECIALIZADO FORMATIVO MAKARIOS",
    PayboxSendname: "makarios club",
    PayboxBase0: precio,
    PayboxBase12: "0",
    PayboxDescription: detalleActividad,
    PayboxProduction: true,
    PayboxEnvironment: "prod",
    // PayboxProduction: false,
    // PayboxEnvironment: "sandbox",
    PayboxLanguage: "es",
    PayboxPagoPlux: true,
    PayboxDirection: "Bolivar 2-80 y borrero",
    PayBoxClientPhone: "0996600922",
    PayBoxClientIdentification: "0993385314001",
    // Solo si es recurrente
    PayboxRecurrent: false,
    PayboxIdPlan: "Plan Nombre",
    PayboxPermitirCalendarizar: true,
    PayboxPagoInmediato: false,
    PayboxCobroPrueba: false,
    onAuthorize: async (response) => {
      if (response.status === "succeeded") {
        await setPagado(true);
        await setButtonDisabled(false);
        const { email, ...newData } = response;
        await setResponsePagoPlux(newData);
      }
    },
  };

  const renderNotificationSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Bienvenido"
      content={messages.success.userLogged}
      dateTime="ahora"
      open={notificationSB}
      onClose={closeNotificationSB}
      close={closeNotificationSB}
      bgWhite
    />
  );

  const [dataPagoCita, setDataPagoCita] = useState(dataPagos);

  const submitForm = (values, actions) => {
    sleep(1500).then(async () => {
      await handleResetForm(actions);
    });
  };

  const handleResetForm = async (actions) => {
    setActiveStep(0);
    if (pagado) {
      await actions.setSubmitting(true);
      await signOut();
      window.location.href = "https://makarios.club/";
    } else {
      await actions.resetForm();
      await window.location.reload();
    }
  };

  const onPayPagoPluxCreate = async (data) => {
    try {
      const response = await axios.post("/api/torneos/pagoplux/", data);

      if (response.statusText === "OK" || response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Pago exitoso!",
          text: "Pago aceptado!",
          showConfirmButton: false,
          timer: 2400,
        });
        return response.data.newPago.id;
      } else {
        console.log("ess");
        setErrorEmail(true);
      }
    } catch (error) {
      if (error.response.status === 409) {
        // alert("Usuario o contraseña incorrectos");
      }
    }
  };

  const onSubmitCreate = async (data) => {
    try {
      if (pagado) {
        // procede a guardar la informacion de pagoplux response
        const responseCard = await onPayPagoPluxCreate(responsePagoPlux.detail);
        data.pagoplux = responseCard;
        const response = await axios.post("/api/torneos/torneo/", data);

        if (response.statusText === "OK" || response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Registro exitoso!",
            text: "Registro aceptado!",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          setErrorEmail(true);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se realizó el pago!",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      if (error.response.status === 409) {
        // alert("Usuario o contraseña incorrectos");
      }
    }
  };

  // const handleSubmit = async (values, actions) => {
  //   if (isLastStep) {
  //     // actions.stopPropagation();
  //     console.log("last step");
  //     console.log(values);
  //     console.log(actions);
  //     await onSubmitCreate(values);
  //     submitForm(values, actions);
  //   } else {
  //     const session = await getSession(values);

  //     setPrecio(values.precio);
  //     setEmailUser(session.user.email);

  //     setActiveStep(activeStep + 1);
  //     actions.setTouched({});
  //     actions.setSubmitting(false);
  //   }
  // };

  const handleNextStep = async (values, actions) => {
    const session = await getSession(values);

    await setPrecio(values.precio);
    await setEmailUser(session.user.email);
    await setDetalleActividad(values.actividad+' - '+values.programacion);
    await setActiveStep(activeStep + 1);
    await actions.setTouched({});

    await actions.setSubmitting(false);
  };

  const handleFinalStep = async (values, actions) => {
    await onSubmitCreate(values);
    submitForm(values, actions);
  };

  const handleSubmit = async (values, actions) => {
    isLastStep
      ? await handleFinalStep(values, actions)
      : await handleNextStep(values, actions);
  };

  useEffect(() => {
    openNotificationSB();
    if (isLastStep) {
      const buttonSave = document.getElementById("btnGuardar");
      buttonSave.click();
    }
  }, [responsePagoPlux]);

  useEffect(() => {
    if (activeStep === 3) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [activeStep]);

  return (
    // <DashboardLayout>
    // <MakariosProvider>
    <PageLayout>
      <DashboardNavbar />
      {renderNotificationSB}

      <MDBox py={1} mb={10} height="25vh">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", mt: 8 }}
        >
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    {/* <Card sx={{ height: "500px" }}> */}
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(
                          activeStep,
                          {
                            values,
                            touched,
                            formField,
                            errors,
                            setFieldValue,
                          },
                          dataPagos
                        )}
                        <MDBox
                          mt={2}
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton
                              variant="gradient"
                              color="light"
                              onClick={handleBack}
                            >
                              atrás
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting || buttonDisabled}
                            type="Submit"
                            variant="gradient"
                            color="info"
                            id="btnGuardar"
                          >
                            {isLastStep ? "finalizar" : "siguiente"}
                          </MDButton>
                          {isLastStep}
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>

      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </PageLayout>
    // </MakariosProvider>
  );
}

export default NewUser;
