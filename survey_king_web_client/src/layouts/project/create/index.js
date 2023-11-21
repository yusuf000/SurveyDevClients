import React, {useRef, useState} from "react";
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

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import MDButton from "../../../components/MDButton";
import {DatePicker} from "@mui/x-date-pickers";
import MDAlert from "../../../components/MDAlert";
import Icon from "@mui/material/Icon";

const url = `http://localhost:8080/api/v1/project/add`

function ProjectCreate() {
    const [errorMessage, setErrorMessage] = useState("");
    const projectNameRef = useRef(null);

    const projectTypeRef = useRef(null);
    const clientNameRef = useRef(null);
    const statusRef = useRef(null);
    const sasCodeRef = useRef(null);
    const jobNumberRef = useRef(null);
    const [startDate_, setStartDate_] = useState("");
    const [endDate_, setEndDate_] = useState("");
    const navigate = useNavigate();


    const doCreateProject = ({projectName, projectType, clientName, startDate, endDate, status, sasCode, jobNumber}) => {
        const token = localStorage.getItem('token');
        axios
            .post(url, {
                name: projectName,
                type: projectType,
                clientName: clientName,
                startDate: startDate,
                endDate: endDate,
                status: status,
                sasCode: sasCode,
                jobNumber: jobNumber
            },{
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then(() => {
                console.log("project created")
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage("Can not create project")
            })

    }

    const isValidInput = ({projectName, projectType, clientName, status, sasCode, jobNumber, startDate, endDate}) => {
        if (projectName === "" || projectType === "" || clientName === "" || status === "" || sasCode === "" || jobNumber === "" || startDate === "" || endDate === "") {
            setErrorMessage("Please give necessary information to create a project")
            return false;
        } else if (startDate > endDate) {
            setErrorMessage("Start date can not be greater than end date")
            return false;
        } else {
            return true;
        }
    }

    const handleOnClick = async () => {
        console.log('create clicked');
        const projectName = projectNameRef.current.value;
        const projectType = projectTypeRef.current.value;
        const clientName = clientNameRef.current.value;
        const status = statusRef.current.value;
        const sasCode = sasCodeRef.current.value;
        const jobNumber = jobNumberRef.current.value;
        const startDate = startDate_;
        const endDate = endDate_;
        if(isValidInput({
            projectName,
            projectType,
            clientName,
            status,
            sasCode,
            jobNumber,
            startDate,
            endDate})){
            doCreateProject({projectName, projectType, clientName, startDate, endDate, status, sasCode, jobNumber});
        }
    }

    return (
        <DashboardLayout>
            {
                errorMessage ? <MDAlert fontSize="small" color="error" > <Icon fontSize="small">error</Icon>&nbsp; {errorMessage} </MDAlert> : null
            }
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
                                <MDInput type="email" label="Project Name" inputRef={projectNameRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Project Type" inputRef={projectTypeRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Client Name" inputRef={clientNameRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Status" inputRef={statusRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Sas-Code" inputRef={sasCodeRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Job Number" inputRef={jobNumberRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='Start Date' onChange={setStartDate_}/>
                            </MDBox>
                            <MDBox mb={2}>
                                <DatePicker label='End Date' onChange={setEndDate_}/>
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

export default ProjectCreate;
