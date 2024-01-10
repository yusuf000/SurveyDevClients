/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function Information({ name, projectType, clientName, status, sasCode, jobNumber, startDate, endDate, onStart}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
        sx={{ height: '100%' }}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>
          <MDBox mt={2}>
              <MDButton color={"success"} variant={"gradient"} onClick={onStart}>Start</MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0} >
          <MDTypography variant="h6" fontWeight="light"  color="text">
            project Type:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular" textTransform="capitalize">
              {projectType}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            Client Name:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {clientName}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            Status:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {status}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            Sas-Code:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {sasCode}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            Job Number:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {jobNumber}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            Start Date:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {startDate}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            End Date:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="h7" fontWeight="regular">
              {endDate}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Information.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Information.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string,
  email: PropTypes.string,
  vat: PropTypes.string,
  noGutter: PropTypes.bool,
};

export default Information;
