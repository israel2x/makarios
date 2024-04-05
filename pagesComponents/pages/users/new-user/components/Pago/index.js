
// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import axios from "axios";
// NewUser page components
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import selectData from "/pagesComponents/pages/account/settings/components/BasicInfo/data/selectData";
import MDButton from "/components/MDButton";
import PpxButton from "/pages/pagos-online/PpxButton";
import PagoTarjeta from "/pagesComponents/pages/users/new-user/components/PagoTarjeta";
function Pago({ formData, pagos }) {
  const [detallepromocion, setDetallepromocion] = useState("");

  const [botonDesactivado, setBotonDesactivado] = useState(false);
  const { formField, values, errors, touched, setFieldValue } = formData;
  const [dataPago, setDataPago] = useState(pagos);
  // const { firstName, lastName, company, email, password, repeatPassword } =
  //   formField;
  const {
    nombrefactura,
    rucfactura,
    direccionfactura,
    mailfactura,
    promocion,
  } = formField;

  const {
    nombrefactura: nombrefacturaV,
    rucfactura: rucfacturaV,
    direccionfactura: direccionfacturaV,
    mailfactura: mailfacturaV,
    actividadid: actividadidV,
    actividad: actividadV,
    detallepromo: detallepromoV,
    programacion: programacionV,
    precio: precioV,
    promocion: promocionV,
  } = values;

  const [precioState, setPrecioState] = useState(precioV);

  const validarPromo = async () => {
    const data = {
      codigo: promocionV,
      actividad: actividadidV,
    };
    const dataPromo = await loadPromo(data);

    if (dataPromo && dataPromo.length > 0) {
      const { porcentaje, descripcion, id } = dataPromo[0];
      setDetallepromocion(descripcion);
      setFieldValue("promocionid", id);
      setFieldValue("detallepromo", descripcion);
      let newPrecio = parseFloat(precioV) * (1 - parseFloat(porcentaje) / 100);
      setPrecioState(newPrecio);
      setFieldValue("porcentajepromo", newPrecio);
      // aqui va el context del precio
      await setDataPago((prevdataPago) => ({
        ...prevdataPago,
        PayboxBase0: newPrecio,
      }));
      setBotonDesactivado(true);
    }

  };

  const loadPromo = async (data) => {
    // setFieldValue("precio", session.user.email);

    try {
      const response = await axios.get("/api/torneos/promocion", {
        params: { codigo: data.codigo, actividad: data.actividad },
      });

      if (response.statusText === "OK" || response.status === 200) {
        return response.data.promocionFound.map((item) => ({
          id: item.id,
          descripcion: item.descripcion,
          codigo: item.codigo,
          porcentaje: item.porcentaje,
        }));
      }
    } catch (error) {
      
      return [];
    }
  };
  // setFieldValue("promocion", "");



  const onChangeRuc =((e)=>{
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      setFieldValue("rucfactura", e.target.value);
      
    }
})
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="h5">Pago</MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDTypography variant="h6" color="text">
            {/* Inscripción Personal a Torneo Vacacional de Tiro con Arco */}
            {actividadV} - {programacionV}
          </MDTypography>
        </Grid>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="body1">Datos de facturación</MDTypography>
            <Grid item xs={12} sm={12}>
              <FormField
                type={nombrefactura.type}
                label={nombrefactura.label}
                name={nombrefactura.name}
                value={nombrefacturaV}
                placeholder={nombrefactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={rucfactura.type}
                label={rucfactura.label}
                name={rucfactura.name}
                value={rucfacturaV}
                onChange={onChangeRuc}
                placeholder={rucfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={direccionfactura.type}
                label={direccionfactura.label}
                name={direccionfactura.name}
                value={direccionfacturaV}
                placeholder={direccionfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                type={mailfactura.type}
                label={mailfactura.label}
                name={mailfactura.name}
                value={mailfacturaV}
                placeholder={mailfactura.placeholder}
                // error={errors.nombres && touched.nombres}
                // success={nombresV.length > 0 && !errors.nombres}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="h5">Ingrese su tarjeta</MDTypography>
            {/* <PagoTarjeta /> */}
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Monto a Pagar: </MDTypography>
              <MDTypography
                variant="h3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="info"
              >
                {" "}
                ${precioState}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <PpxButton data={dataPago} />
            </Grid>
            <br />
            <MDTypography variant="overline">{detallepromocion}</MDTypography>
            <Grid container spacing={4}>
              <Grid item xs={8} sm={6}>
                <FormField
                  type={promocion.type}
                  label={promocion.label}
                  name={promocion.name}
                  value={promocionV}
                  placeholder={promocion.placeholder}
                  disabled={botonDesactivado}
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <MDButton
                  variant="gradient"
                  disabled={botonDesactivado}
                  onClick={validarPromo}
                  color="success"
                >
                  Validar
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
Pago.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Pago;
