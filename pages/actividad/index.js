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
import $ from "jquery";
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

import PpxButton from "/pages/pagos-online/PpxButton"; 

function Actividad() {
  const [activeStep, setActiveStep] = useState(0);
  //maneja el valor de la cita
  
  let dataPagos = { 
    PayboxRemail: "info@makarios.club",
    PayboxSendmail: "jcalcivar@hotmail.com",
    PayboxRename: "CLUB DEPORTIVO ESPECIALIZADO FORMATIVO MAKARIOS",
    PayboxSendname: "juan carlos alcivar",
    PayboxBase0: "2.7",
    PayboxBase12: "0",
    PayboxDescription: "Pago de prueba",
    PayboxProduction: false,
    PayboxEnvironment: "sandbox",
    PayboxLanguage: "es",
    PayboxPagoPlux: true,
    PayboxDirection: "VIA LA PUNTILLA SALITRE EL BUIJO KM 5",
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


  return (
<><h1>Hola Actividad</h1>

{/* <PpxButton data={dataPagos} />  */}
</>
  );
}

export default Actividad;
