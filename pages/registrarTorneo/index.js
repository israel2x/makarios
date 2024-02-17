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

import { useState } from "react";

// formik components
import { Formik, Form } from "formik";

import Swal from 'sweetalert2';

import PageLayout from "/examples/LayoutContainers/PageLayout";

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

// NewUser page components
import UserInfo from "/pagesComponents/pages/users/new-user/components/UserInfo";
import Address from "/pagesComponents/pages/users/new-user/components/Address";
import Confirmacion from "/pagesComponents/pages/users/new-user/components/Confirmacion";
import Pago from "/pagesComponents/pages/users/new-user/components/Pago";

// NewUser layout schemas for form and form feilds
import validations from "/pagesComponents/pages/users/new-user/schemas/validationsMakarios";
import form from "/pagesComponents/pages/users/new-user/schemas/formMakarios";
import initialValues from "/pagesComponents/pages/users/new-user/schemas/initialMakariosValues";

function getSteps() {
  // return ["User Info", "Address", "Social", "Profile"];
  return ["Perfil", "Actividad", "Confirmación", "Pago"];
}

function getStepContent(stepIndex, formData, dataPagos) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    case 2:
      return <Confirmacion formData={formData} />;
    case 3:
      return <Pago formData={formData} pagos={dataPagos} />;
 
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  //maneja el valor de la cita
  
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);


  let dataPagos = { 
    PayboxRemail: "info@makarios.club",
    PayboxSendmail: "",
    PayboxRename: "CLUB DEPORTIVO ESPECIALIZADO FORMATIVO MAKARIOS",
    PayboxSendname: "",
    PayboxBase0: "2.7",
    PayboxBase12: "0",
    PayboxDescription: "Pago de TORNEO DEPORTIVO",
    PayboxProduction: false,
    PayboxEnvironment: "sandbox",
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
    onAuthorize: (response) => {
	
      if (response.status === "succeeded") {
		    console.log(response);
        
         console.log("dentro de data, despues de success");
         
         //onSubmitxy();
         Swal.fire(
          'Transacción exitosa!',
          'Preciona Ok para aceptar tu cita!',
          'success'
        ).then(res=>{
          console.log("estoy aqui con MBA");
        
        });
      } 
    }
  }

  const [dataPagoCita, setDataPagoCita] = useState(dataPagos);
  const submitForm = async (values, actions) => {
    await sleep(1000);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));

    actions.setSubmitting(false);
    actions.resetForm();

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {
   
    if (isLastStep) {
      // actions.stopPropagation(); 
      console.log("last step"); 
      console.log(values);
      console.log(actions);  
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    // <DashboardLayout>
    <PageLayout>
      <DashboardNavbar />
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
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                          setFieldValue
                        }, dataPagos)}
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
                            // disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="info"
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
  );
}

export default NewUser;
