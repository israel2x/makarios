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

// NextJS Material Dashboard 2 PRO base styles
import typography from "/assets/theme/base/typography";
import colors from "/assets/theme/base/colors";

// NextJS Material Dashboard 2 PRO helper functions
import pxToRem from "/assets/theme/functions/pxToRem";

const { size, fontWeightRegular, fontWeightBold } = typography;
const { white, grey } = colors;

const stepLabel = {
  styleOverrides: {
    label: {
      marginTop: `${pxToRem(8)} !important`,
      fontWeight: fontWeightRegular,
      fontSize: size.xs,
      color: grey[500],
      textTransform: "uppercase",

      "&.Mui-active": {
        fontWeight: `${fontWeightBold} !important`,
        color: `${white.main} !important`,
        fontSize: size.sm
      },

      "&.Mui-completed": {
        fontWeight: `${fontWeightBold} !important`,
        color: `${white.main} !important`,
        fontSize: size.sm
      },
    },
  },
};

export default stepLabel;
