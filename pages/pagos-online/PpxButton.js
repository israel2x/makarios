import { useEffect } from "react";
import Head from "next/head";
import { iniciarDatos } from "../../funciones-pagos/pagos-functions";

interface PpxButtonProps {
  data: any; // Cambia 'any' por el tipo real si está disponible
}

const PpxButton = ({ data }) => {
  const estiloBoton: React.CSSProperties = {
    display: "none",
    backgroundColor: "#FAFAFA",
    right: "80px",
    backgroundImage: "url(https://sandbox-paybox.pagoplux.com/img/pagar.png?v1)",
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

  useEffect(() => {
    iniciarDatos(data);
  }, [data]);

  return (
    <>
      <Head>
        {/* Incluir jQuery y el script del botón de pago */}
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" />
        <script src="https://sandbox-paybox.pagoplux.com/paybox/index_angular.js"></script>
      </Head>
      <div align="center">
        <div id="modalPaybox"></div>
        <button
          style={estiloBoton}
          id="pay"
          type="button"
          onClick={() => iniciarDatos(data)}
        ></button>
      </div>
    </>
  );
};

export default PpxButton;
