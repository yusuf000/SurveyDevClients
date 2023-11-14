import React, {useState} from "react";
// react-router-dom components
import {useNavigate} from "react-router-dom";

//axios to call apis
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDButton from "../../components/MDButton";
import {DatePicker} from "@mui/x-date-pickers";

const authURL = `http://localhost:8080/api/v1/auth/authenticate`

function Project() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const doLogin = ({userName, password}) => {
        axios
            .post(authURL, {
                userId: userName,
                password: password
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", userName);
                navigate('/dashboard')
            })
            .catch(() => {
                setErrorMessage("Username and/or password don't match")
            })

    }

    const handleOnClick = async () => {
        console.log('login clicked');

        //doLogin({userName, password});

    }

    return (
        <DashboardLayout>
            <MDBox
                my={3}
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
                    <MDBox pt={4} pb={3} px={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDInput type="email" label="Project Name" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Project Type" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Client Name" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Status" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Sas-Code" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Job Number" fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='Start Date' />
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='Start Date' />
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                                <MDButton variant="gradient" onClick={handleOnClick} color="info" fullWidth>
                                    Create
                                </MDButton>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Card>

            </MDBox>

        </DashboardLayout>
    );
}

export default Project;
