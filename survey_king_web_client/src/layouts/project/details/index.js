import React from "react";
// react-router-dom components
//axios to call apis
// @mui material components
// @mui icons
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import {useMaterialUIController} from "../../../context";
import {useLocation} from "react-router-dom";
import Card from "@mui/material/Card";
import Information from "../components/Information";
import Grid from "@mui/material/Grid";
import SimpleBlogCard from "../../../examples/Cards/BlogCards/SimpleBlogCard";


function ProjectDetails() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const location = useLocation();

    if(location.state != null){
        localStorage.setItem("project", location.state.project);
    }

    console.log(localStorage.getItem('project'));
    const project = JSON.parse(localStorage.getItem('project'));
    const user = localStorage.getItem('user');

    const handleOnClick = async () => {

    }

    return (
        <DashboardLayout>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleBlogCard
                                title="Add Question"
                                description="Add a question to the project"
                                action={{
                                    type: "internal",
                                    route: "/project-create",
                                    color: "info",
                                    label: "Add"
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={8}>
                        <Card>
                            <MDBox pt={3} px={2}>
                                <MDTypography variant="h6" fontWeight="medium">
                                    Project Information
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={1} pb={2} px={2}>
                                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                                    <Information
                                        name={project.name}
                                        projectType={project.type}
                                        clientName={project.clientName}
                                        status={project.status}
                                        sasCode={project.sasCode}
                                        jobNumber={project.jobNumber}
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                    />
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

        </DashboardLayout>
    );
}

export default ProjectDetails;
