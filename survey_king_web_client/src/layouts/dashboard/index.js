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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import SimpleBlogCard from "../../examples/Cards/BlogCards/SimpleBlogCard";
import DataTable from "../../examples/Tables/DataTable";
import MDTypography from "../../components/MDTypography";
import React from "react";
import Card from "@mui/material/Card";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import Link from "@mui/material/Link";

function Dashboard() {

    const {sales, tasks} = reportsLineChartData;

    const handleOnClickProject = () => {
        console.log('project clicked');
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleBlogCard
                                title="Create Project"
                                description="Start right away by creating a project and adding questions"
                                action={{
                                    type: "internal",
                                    route: "/somewhere",
                                    color: "info",
                                    label: "create"
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <DefaultInfoCard
                                icon="folder"
                                title="Total Running Projects"
                                description="Running projects can still take answers"
                                value="3"
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        {/*<Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>*/}
                        {/*<Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>*/}
                    </Grid>
                </MDBox>
                <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Card>
                                <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                    Your Projects
                                </MDTypography>
                                <DataTable
                                    table={{
                                        columns: [
                                            {Header: "project name", accessor: "project_name", width: "35%"},
                                            {Header: "client", accessor: "client"},
                                            {Header: "start date", accessor: "start_date"},
                                            {Header: "end date", accessor: "end_date"},
                                        ],
                                        rows: [
                                            {
                                                project_name: <MDBox>
                                                    <Link href="#" onClick={handleOnClickProject} color="blue">
                                                        project-x
                                                    </Link>
                                                </MDBox>,
                                                client: "Hanny Baniard",
                                                start_date: "4/11/2021",
                                                end_date: "10/11/2021",
                                            }
                                        ]
                                    }}
                                />
                            </Card>
                        </Grid>
                        {/*<Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>*/}
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Dashboard;
