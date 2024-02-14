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



function Actividad() {
  const [activeStep, setActiveStep] = useState(0);
  //maneja el valor de la cita
  

  return (
<><h1>Hola Actividad</h1></>
  );
}

export default Actividad;
