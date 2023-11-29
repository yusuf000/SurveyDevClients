// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import DataTable from "../../examples/Tables/DataTable";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import Icon from "@mui/material/Icon";

import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MDInput from "../../components/MDInput";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {DatePicker} from "@mui/x-date-pickers";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SimpleActionCard from "./components/SimpleActionCard";

const url = `http://localhost:8080/api/v1/project`


function Projects() {


    const [projectData, setProjectData] = useState(null);
    const [openCreateProjectDialog, setOpenCreateProjectDialog] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpenCreateProjectDialog = () => {
        setOpenCreateProjectDialog(true);
    };

    const onDelete = ({sasCode}) => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': sasCode
                }
            })
            .then(() => {
                loadData();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const onExpand = ({item}) => {
        navigate('/project-details', {state: {project: JSON.stringify(item)}});
    }

    const prepareTableData = (data) => {
        let tableData = [];
        for (let i in data) {
            let item = data[i];
            let sasCode = item.sasCode;
            tableData.push({
                "name": item.name,
                "clientName": item.clientName,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "delete": <MDTypography component="a" href="#" role="button" onClick={() => onDelete({sasCode})}
                                        color="error">
                    <Icon>delete</Icon>
                </MDTypography>,
                "expand": <MDTypography component="a" href="#" role="button" onClick={() => onExpand({item})}
                                        color="info">
                    <Icon>arrow_outward</Icon>
                </MDTypography>
            });
        }
        return tableData;
    }

    const loadData =  () => {
        const token = localStorage.getItem('token');
        axios
            .get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                if (response.data.length !== 0) {
                    setProjectData(prepareTableData(response.data));
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        loadData();
    },[]);


    function CreateProject(){
        const [errorMessage, setErrorMessage] = useState("");
        const projectNameRef = useRef(null);
        const clientNameRef = useRef(null);
        const statusRef = useRef(null);
        const sasCodeRef = useRef(null);
        const jobNumberRef = useRef(null);
        const [projectType, setProjectType] = useState(0);
        const [startDate_, setStartDate_] = useState("");
        const [endDate_, setEndDate_] = useState("");

        const handleCloseCreateProjectDialog = () => {
            setOpenCreateProjectDialog(false);
            setErrorMessage("");
        };

        const doCreateProject = ({projectName, projectTypeSelected, clientName, startDate, endDate, status, sasCode, jobNumber}) => {
            const token = localStorage.getItem('token');

            axios
                .post(url + "/add", {
                    name: projectName,
                    projectType: projectTypeSelected,
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
                    console.log("project created");
                    handleCloseCreateProjectDialog();
                    loadData();
                })
                .catch((error) => {
                    console.log(error)
                    setErrorMessage("Can not create project")
                })

        }

        const isValidInput = ({projectName, clientName, status, sasCode, jobNumber, startDate, endDate}) => {
            if (projectName === "" || clientName === "" || status === "" || sasCode === "" || jobNumber === "" || startDate === "" || endDate === "") {
                setErrorMessage("Please give necessary information to create a project")
                return false;
            } else if (startDate > endDate) {
                setErrorMessage("Start date can not be greater than end date")
                return false;
            } else {
                return true;
            }
        }

        const onCreate = async () => {
            console.log('create clicked');
            const projectName = projectNameRef.current.value;
            const projectTypeSelected = projectType;
            const clientName = clientNameRef.current.value;
            const status = statusRef.current.value;
            const sasCode = sasCodeRef.current.value;
            const jobNumber = jobNumberRef.current.value;
            const startDate = startDate_;
            const endDate = endDate_;

            if(isValidInput({
                projectName,
                clientName,
                status,
                sasCode,
                jobNumber,
                startDate,
                endDate})){
                doCreateProject({projectName, projectTypeSelected, clientName, startDate, endDate, status, sasCode, jobNumber});
            }
        }

        const handleProjectTypeChange = (event) => {
            setProjectType(event.target.value);
        }

        return (
            <Dialog open={openCreateProjectDialog} onClose={handleCloseCreateProjectDialog}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a project fill up the necessary details below.
                    </DialogContentText>
                    <MDBox mb={2}></MDBox>
                    <MDBox mb={2}>
                        <MDInput type="email" label="Project Name" inputRef={projectNameRef} fullWidth/>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="project-type-label">Project Type</InputLabel>
                            <Select
                                labelId="project-type-label"
                                id="project-type-select"
                                value={projectType}
                                label="Project Type"
                                onChange={handleProjectTypeChange}
                                sx={{ minHeight: 45 }}
                            >
                                <MenuItem value={"0"}>Single Phase</MenuItem>
                                <MenuItem value={"1"}>Multi Phase</MenuItem>
                            </Select>
                        </FormControl>
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
                        {
                            errorMessage ? <MDTypography fontSize="small" color="error" > <Icon fontSize="small">error</Icon>&nbsp; {errorMessage} </MDTypography> : null
                        }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateProjectDialog}>Cancel</Button>
                    <Button onClick={onCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        );
    }



    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <CreateProject/>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleActionCard
                                title="Create Project"
                                description="Start right away by creating a project and adding questions"
                                click={handleClickOpenCreateProjectDialog}
                                action={{
                                    type: "internal",
                                    route: "/project-create",
                                    color: "info",
                                    label: "create"
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            {
                                projectData ? <Card>
                                    <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                        Your Projects
                                    </MDTypography>
                                    <DataTable
                                        table={{
                                            columns: [
                                                {Header: "project name", accessor: "name", width: "35%"},
                                                {Header: "client", accessor: "clientName"},
                                                {Header: "start date", accessor: "startDate"},
                                                {Header: "end date", accessor: "endDate"},
                                                {Header: "delete", accessor: "delete"},
                                                {Header: "expand", accessor: "expand"}
                                            ],
                                            rows: projectData
                                        }}/>
                                </Card> : null
                            }
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    );

}

export default Projects;
