import React, {useEffect, useState} from "react";
// react-router-dom components

//axios to call apis

// @mui material components
import Card from "@mui/material/Card";

// @mui icons
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import {DatePicker} from "@mui/x-date-pickers";
import {useLocation} from "react-router-dom";


function ProjectDetails() {
    const location = useLocation();
    const [project, setProject] = useState(null);

    useEffect(() => {
        //if(!project){
            setProject(location.state);
        //}
    }, []);

    const handleOnClick = async () => {

    }

    return (
        <DashboardLayout>
            <MDBox
                my={3}
                mt={15}
                mx={15}
            >
                <Card>
                    <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                        mx={2}
                        mt={-3}
                        p={2}
                        mb={1}
                        textAlign="center"
                    >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                            Project
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={5} px={6}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDTypography type="email" label="Project Name"  fullWidth>

                                </MDTypography>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Project Type"  fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Client Name"  fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Status"  fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Sas-Code"  fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Job Number"  fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='Start Date' />
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='End Date' />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Card>

            </MDBox>

        </DashboardLayout>
    );
}

export default ProjectDetails;
