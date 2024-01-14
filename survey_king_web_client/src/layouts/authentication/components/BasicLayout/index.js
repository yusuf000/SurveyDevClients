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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication pages components
import Footer from "layouts/authentication/components/Footer";
import MDAlert from "../../../../components/MDAlert";
import React from "react";
import Icon from "@mui/material/Icon";
import MDTypography from "../../../../components/MDTypography";
import {Link} from "react-router-dom";
import DefaultNavbar from "../../../../examples/Navbars/DefaultNavbar";
import routes from "../../../../routes";

function BasicLayout({ image, errorMessage, children}) {


  return (
    <PageLayout>
        <DefaultNavbar
            routes={routes}
            sticky
        />
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        textAlign="center"
      >

          {/*<MDTypography component={Link}
                        to="/"
                        variant="h3"
                        color="light"
                        fontWeight="medium"
                        textGradient>
              SurveyDevs
          </MDTypography>*/}
      </MDBox>
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
        <MDBox mt={2}>
            <Footer light/>
        </MDBox>
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
