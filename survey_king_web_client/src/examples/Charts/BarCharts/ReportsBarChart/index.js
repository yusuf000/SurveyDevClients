/**
 =========================================================
 * Material Dashboard 2  React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import React, {useMemo} from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsBarChart configurations
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
import Grid from "@mui/material/Grid";
import MDButton from "../../../../components/MDButton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsBarChart({color, title, description, date, chart, count, index, onForward, onBackward}) {
    const {data, options} = configs(chart.labels || [], chart.datasets || {});

    return (
        <Card sx={{height: "100%"}}>
            <MDBox padding="1rem">
                {useMemo(
                    () => (
                        <MDBox
                            variant="gradient"
                            bgColor={color}
                            borderRadius="lg"
                            coloredShadow={color}
                            py={2}
                            pr={0.5}
                            mt={-5}
                            height="12.5rem"
                        >
                            <Bar data={data} options={options} redraw/>
                        </MDBox>
                    ),
                    [color, chart]
                )}
                <MDBox pt={3} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        {description}
                    </MDTypography>
                    <Divider/>
                    {
                        date ? <MDBox display="flex" alignItems="center">
                            <MDTypography variant="button" color="text" lineHeight={1} sx={{mt: 0.15, mr: 0.5}}>
                                <Icon>schedule</Icon>
                            </MDTypography>
                            <MDTypography variant="button" color="text" fontWeight="light">
                                {date}
                            </MDTypography>
                        </MDBox> : null
                    }
                    {
                        index ? <MDBox>
                            <MDBox display="flex" alignItems="center">
                                <MDTypography variant="button" color="text" lineHeight={1} sx={{mt: 0.15, mr: 0.5}}>
                                    <Icon>feed</Icon>
                                </MDTypography>
                                <MDTypography variant="button" color="text" fontWeight="light">
                                    {count}
                                </MDTypography>
                            </MDBox>
                            <Divider/>
                            <Grid container spacing={1} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <MDButton onClick={onBackward}>
                                        <Icon color="info">arrow_back_ios</Icon>
                                    </MDButton>
                                </Grid>
                                <Grid item>
                                    <MDTypography>{index}</MDTypography>
                                </Grid>
                                <Grid item>
                                    <MDButton onClick={onForward}>
                                        <Icon color="info">arrow_forward_ios</Icon>
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox> : null
                    }
                </MDBox>
            </MDBox>
        </Card>
    );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
    color: "info",
    description: "",
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    date: PropTypes.string.isRequired,
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsBarChart;
