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
import MDButton from "../../components/MDButton";

const url = `http://localhost:8080/api/v1/project`


function Projects() {


    const [projectData, setProjectData] = useState(null);
    const [currentSasCode, setCurrentSasCode] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const [openStartConfirmationDialog, setOpenStartConfirmationDialog] = useState(false);
    const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);
    const phaseNamesMap = new Map();
    const projectStatusMap = new Map();
    const navigate = useNavigate();

    const handleClickOpenCreateProjectDialog = () => {
        setOpenCreateProjectDialog(true);
    };

    const onDelete = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': currentSasCode
                }
            })
            .then(() => {
                handleClickCloseDeleteConfirmationDialog();
                loadData();
            })
            .catch((e) => {
                handleClickCloseDeleteConfirmationDialog();
                console.log(e);
            })
    }

    const onExpand = ({item}) => {
        navigate('/project-details', {state: {project: JSON.stringify(item)}});
    }

    const onStart = () => {
        localStorage.setItem('project', JSON.stringify(currentItem));
        localStorage.setItem('phase', JSON.stringify(currentItem.phases[0]));
        localStorage.setItem('qIndex', "1");
        navigate('/survey');
    }

    const prepareTableData = (data) => {
        let tableData = [];
        for (let i in data) {
            let item = data[i];
            let sasCode = item.sasCode;
            if (projectStatusMap.get(sasCode)) {
                tableData.push({
                    "name": item.name,
                    "clientName": item.clientName,
                    "startDate": item.startDate,
                    "endDate": item.endDate,
                    "delete": <MDTypography component="a" href="" role="button"
                                            onClick={(e) => handleClickOpenDeleteConfirmationDialog(e, sasCode)}
                                            color="error">
                        <Icon>delete</Icon>
                    </MDTypography>,
                    "expand": <MDTypography component="a" href="" role="button" onClick={() => onExpand({item})}
                                            color="info">
                        <Icon>arrow_outward</Icon>
                    </MDTypography>
                });
            } else {
                tableData.push({
                    "name": item.name,
                    "clientName": item.clientName,
                    "startDate": item.startDate,
                    "endDate": item.endDate,
                    "delete": <MDTypography component="a" href="" role="button"
                                            onClick={(e) => handleClickOpenDeleteConfirmationDialog(e, sasCode)}
                                            color="error">
                        <Icon>delete</Icon>
                    </MDTypography>,
                    "expand": <MDTypography component="a" href="" role="button" onClick={() => onExpand({item})}
                                            color="info">
                        <Icon>arrow_outward</Icon>
                    </MDTypography>,
                    "start": <MDTypography component="a" href="" role="button"
                                           onClick={(e) => handleClickOpenStartConfirmationDialog(e, item)}
                                           color="info">
                        <Icon>play_arrow</Icon>
                    </MDTypography>
                });
            }

        }
        return tableData;
    }

    const loadProjectStatuses = () => {
        const token = localStorage.getItem('token');
        axios
            .get(url + "/status", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    projectStatusMap.set(response.data[i].sasCode, true);
                }
                loadData();
            })
            .catch((e) => {
                if(e.response.status === 403){
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    const loadData = () => {
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
        loadProjectStatuses();
    }, []);

    function CreateProject() {
        const [errorMessage, setErrorMessage] = useState("");
        const projectNameRef = useRef(null);
        const phaseNameRef = useRef(null);
        const clientNameRef = useRef(null);
        const statusRef = useRef(null);
        const sasCodeRef = useRef(null);
        const jobNumberRef = useRef(null);
        const [projectType, setProjectType] = useState(0);
        const [startDate_, setStartDate_] = useState("");
        const [endDate_, setEndDate_] = useState("");
        const [inputMap, setInputMap] = useState({
            formValues: []
        });

        const addFormFields = (e) => {
            setInputMap(({
                formValues: [...inputMap.formValues, {phaseName: phaseNameRef.current.value}]
            }))
            phaseNamesMap.set(inputMap.formValues.length, phaseNameRef.current.value);
            phaseNameRef.current.value = "";
        }

        function PhaseNames() {

            function removeFormFields(i) {
                let formValues = inputMap.formValues;
                phaseNamesMap.delete(i);
                formValues.splice(i, 1);
                setInputMap({formValues});
            }


            return (
                <MDBox>
                    {inputMap.formValues.map((element, index) => (
                        <MDBox mb={2} key={index}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <MDInput type="email" label="Phase Name" value={element.phaseName}
                                             disabled={true}></MDInput>
                                </Grid>
                                <Grid item>
                                    <MDButton color="error" onClick={() => removeFormFields(index)}>
                                        <Icon>delete</Icon>
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox>
                    ))
                    }
                </MDBox>
            );
        }

        const handleCloseCreateProjectDialog = () => {
            setOpenCreateProjectDialog(false);
            setErrorMessage("");
        };

        const doCreateProject = ({
                                     projectName,
                                     projectTypeSelected,
                                     clientName,
                                     startDate,
                                     endDate,
                                     status,
                                     sasCode,
                                     jobNumber
                                 }, phasesInfo) => {
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
                    jobNumber: jobNumber,
                    phases: phasesInfo
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
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

        const isValidInput = ({
                                  projectName,
                                  clientName,
                                  status,
                                  sasCode,
                                  jobNumber,
                                  startDate,
                                  endDate,
                                  projectTypeSelected
                              }) => {
            if (projectName === "" || clientName === "" || status === "" || sasCode === "" || jobNumber === "" || startDate === "" || endDate === "") {
                setErrorMessage("Please give necessary information to create a project")
                return false;
            } else if (startDate > endDate) {
                setErrorMessage("Start date can not be greater than end date")
                return false;
            } else if (projectTypeSelected === 1 && phaseNamesMap.size === 0) {
                setErrorMessage("phase names can not be empty")
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
            const phases = [];
            for (let [key, value] of phaseNamesMap) {
                phases.push({
                    "serial": key,
                    "name": value
                })
            }

            if (isValidInput({
                projectName,
                clientName,
                status,
                sasCode,
                jobNumber,
                startDate,
                endDate,
                projectTypeSelected
            })) {
                doCreateProject({
                    projectName,
                    projectTypeSelected,
                    clientName,
                    startDate,
                    endDate,
                    status,
                    sasCode,
                    jobNumber
                }, phases);
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
                                sx={{minHeight: 45}}
                            >
                                <MenuItem value={0}>Single Phase</MenuItem>
                                <MenuItem value={1}>Multi Phase</MenuItem>
                            </Select>
                        </FormControl>
                    </MDBox>
                    {
                        projectType === 1 ? <MDBox>
                            <PhaseNames/>
                            <MDBox mb={2}>
                                <MDInput type="email" label="Phase Name" inputRef={phaseNameRef} fullWidth/>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDButton color="info" onClick={addFormFields} fullWidth>
                                    Add phase
                                </MDButton>
                            </MDBox> </MDBox> : null
                    }
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
                        errorMessage ? <MDTypography fontSize="small" color="error"> <Icon
                            fontSize="small">error</Icon>&nbsp; {errorMessage} </MDTypography> : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateProjectDialog}>Cancel</Button>
                    <Button onClick={onCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        );
    }

    const handleClickOpenDeleteConfirmationDialog = (e, sasCode) => {
        e.preventDefault();
        setCurrentSasCode(sasCode)
        setOpenDeleteConfirmationDialog(true)
    }

    const handleClickCloseDeleteConfirmationDialog = () => {
        setOpenDeleteConfirmationDialog(false)
    }

    const handleClickOpenStartConfirmationDialog = (e, item) => {
        e.preventDefault();
        setCurrentItem(item)
        setOpenStartConfirmationDialog(true)
    }

    const handleClickCloseStartConfirmationDialog = () => {
        setOpenStartConfirmationDialog(false)
    }


    function DeleteConfirmationDialog() {
        return (
            <Dialog open={openDeleteConfirmationDialog} onClose={handleClickCloseDeleteConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info"> Are you sure you want to delete this
                        Project?</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseDeleteConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        onDelete()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function StartConfirmationDialog() {
        return (
            <Dialog open={openStartConfirmationDialog} onClose={handleClickCloseStartConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info"> Do you want to start completing the survey now
                        ?</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseStartConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        onStart()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <CreateProject/>
            <DeleteConfirmationDialog/>
            <StartConfirmationDialog/>
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
                                                {Header: "expand", accessor: "expand"},
                                                {Header: "start", accessor: "start"}
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
