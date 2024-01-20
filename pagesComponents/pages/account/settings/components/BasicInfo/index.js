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

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
// Settings page components
import FormField from "/pagesComponents/pages/account/components/FormField";

// Data
import selectData from "/pagesComponents/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Información Basica</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="Nombre" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Apellido" placeholder="Thompson" />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  defaultValue="Masculino"
                  options={selectData.gender}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="Genero"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      defaultValue="February"
                      options={selectData.birthDate}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          label="Fecha nacimiento"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      defaultValue="1"
                      options={selectData.days}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      defaultValue="2021"
                      options={selectData.years}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Password"
              placeholder="xxxxxxxxx"
              inputProps={{ type: "password" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation password"
              placeholder="xxxxxxxxxx"
              inputProps={{ type: "password" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField label="Pais" placeholder="Ecuador, A" />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormField label="Ciudad" placeholder="Guayaquil" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              label="Telefono"
              placeholder="+593 982 334 567"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              label="Dirección"
              placeholder="calle principal, numero intercepción"
            />
          </Grid>

          <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
        >
   
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small">
              Guardar
            </MDButton>
          </MDBox>
          </MDBox>
          {/* <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              defaultValue={["react", "angular"]}
              options={selectData.skills}
              renderInput={(params) => (
                <FormField {...params} InputLabelProps={{ shrink: true }} />
              )}
            />
          </Grid> */}

   
        </Grid>
      </MDBox>
    </Card>
  );
}

export default BasicInfo;
