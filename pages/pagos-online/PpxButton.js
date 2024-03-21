import { iniciarDatos } from "../../funciones-pagos/pagos-functions";
import MDBox from "/components/MDBox";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
const PpxButton = ({ data }) => {
  const estiloBoton = {
    display: "none",
    backgroundColor: "#FAFAFA",
    right: "80px",
    backgroundImage:
      "url(https://sandbox-paybox.pagoplux.com/img/pagar.png?v1)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "96px",
    width: "215px",
    border: "none",
    cursor: "pointer",
    backgroundSize: "contain",
    outline: "0",
    boxShadow: "0px 2px 2px lightgray",
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("iniciar datos");
    setLoading(true);
    setTimeout(async () => {
      await iniciarDatos(data);
      await setLoading(false);
    }, 2000);
  }, [data]);

  return (
    <>
      <div align={"center"}>
        {loading && (
          <MDBox textAlign="center">
            <CircularProgress color="info" />
          </MDBox>
        )}
        <div id="modalPaybox"></div>
        <button
          style={estiloBoton}
          id="pay"
          type="button"
          onClick={iniciarDatos}
        ></button>
      </div>
    </>
  );
};

export default PpxButton;
