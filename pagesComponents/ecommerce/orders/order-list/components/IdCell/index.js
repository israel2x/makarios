import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

function IdCell({ id, checked, }) {
  const handleChange = (id, value) => {
    console.log("id: ", id);
    console.log(id);
console.log(value);
  };
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} onChange={(e) => handleChange(id, e.target.checked)} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
