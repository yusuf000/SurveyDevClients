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
import Moment from "dayjs";

const url = `http://203.161.57.194:8080/api/v1/project`


function CreateProject({phaseNamesMap,openCreateProjectDialog, handleCloseCreateProjectDialog, loadData}) {
    const [errorMessage, setErrorMessage] = useState("");
    const projectNameRef = useRef(null);
    const phaseNameRef = useRef(null);
    const clientNameRef = useRef(null);
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

    const doCreateProject = ({
                                 projectName,
                                 projectTypeSelected,
                                 clientName,
                                 startDate,
                                 endDate,
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
                setErrorMessage("")
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
                              jobNumber,
                              startDate,
                              endDate,
                              projectTypeSelected
                          }) => {
        if (projectName === "" || clientName === "" || jobNumber === "" || startDate === "" || endDate === "") {
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
        Moment.locale('en');
        const projectName = projectNameRef.current.value;
        const projectTypeSelected = projectType;
        const clientName = clientNameRef.current.value;
        const sasCode = sasCodeRef.current.value;
        const jobNumber = jobNumberRef.current.value;
        let startDate = Moment(startDate_).format('DD/MM/YYYY');
        let endDate = Moment(endDate_).format('DD/MM/YYYY');
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


function Projects() {


    const [projectData, setProjectData] = useState(null);
    const [currentSasCode, setCurrentSasCode] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const [openStartConfirmationDialog, setOpenStartConfirmationDialog] = useState(false);
    const [openStopConfirmationDialog, setOpenStopConfirmationDialog] = useState(false);
    const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);
    const phaseNamesMap = new Map();
    const [projectStatusMap, setProjectStatusMap] = useState(new Map())
    const navigate = useNavigate();

    const handleClickOpenCreateProjectDialog = () => {
        setOpenCreateProjectDialog(true);
    };

    const handleCloseCreateProjectDialog = () => {
        setOpenCreateProjectDialog(false);
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

    const onShowResult = ({item}) => {
        navigate('/result', {state: {project: JSON.stringify(item)}});
    }

    const onStart = () => {
        localStorage.setItem('project', JSON.stringify(currentItem));
        localStorage.setItem('phase', JSON.stringify(currentItem.phases[0]));
        localStorage.setItem('qIndex', "1");
        navigate('/survey');
    }

    const onStop = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "/end", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': currentItem.sasCode
                }
            })
            .then(() => {
                handleClickCloseStopConfirmationDialog();
                loadData();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const prepareTableData = (data) => {
        let tableData = [];
        for (let i in data) {
            let item = data[i];
            let sasCode = item.sasCode;
            tableData.push({
                "name": item.name,
                "clientName": item.clientName,
                "owner": item.owner,
                "status": item.status,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "delete": <MDBox>
                    {
                        item.owner === localStorage.getItem("user") ? <MDTypography component="a" href="" role="button"
                                                                                    onClick={(e) => handleClickOpenDeleteConfirmationDialog(e, sasCode)}
                                                                                    color="error">
                            <Icon>delete</Icon>
                        </MDTypography> : null
                    }
                </MDBox>,
                "expand": <MDBox>
                    {
                        item.owner === localStorage.getItem("user") && item.status === "CREATED"?
                            <MDTypography component="a" href="" role="button" onClick={() => onExpand({item})}
                                          color="info">
                                <Icon>settings</Icon>
                            </MDTypography> : null
                    }
                </MDBox>,
                "assessment": <MDBox>
                    {
                        item.owner === localStorage.getItem("user") && item.status !== "CREATED"?
                            <MDTypography component="a" href="" role="button" onClick={() => onShowResult({item})}
                                          color="info">
                                <Icon>assessment</Icon>
                            </MDTypography> : null
                    }
                </MDBox>,
                "start": <MDBox>
                    {
                        !projectStatusMap.get(sasCode) && item.status === "RUNNING" ? <MDTypography component="a" href="" role="button"
                                                                       onClick={(e) => handleClickOpenStartConfirmationDialog(e, item)}
                                                                       color="info">
                            <Icon>play_arrow</Icon>
                        </MDTypography> : null
                    }
                </MDBox>,
                "end": <MDBox>
                    {
                        item.owner === localStorage.getItem("user") && item.status === "RUNNING" ? <MDTypography component="a" href="" role="button"
                                                                                                    onClick={(e) => handleClickOpenStopConfirmationDialog(e, item)}
                                                                                                    color="info">
                            <Icon>stop</Icon>
                        </MDTypography> : null
                    }
                </MDBox>
            });
            //}

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
                    setProjectStatusMap(projectStatusMap.set(response.data[i].sasCode, true));
                }
                loadData();
            })
            .catch((e) => {
                if (e.response.status === 403) {
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
                } else {
                    setProjectData(null)
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        loadProjectStatuses();
    }, []);

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

    const handleClickOpenStopConfirmationDialog = (e, item) => {
        e.preventDefault();
        setCurrentItem(item);
        setOpenStopConfirmationDialog(true)
    }

    const handleClickCloseStopConfirmationDialog = () => {
        setOpenStopConfirmationDialog(false);
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

    function StopConfirmationDialog() {
        return (
            <Dialog open={openStopConfirmationDialog} onClose={handleClickCloseStopConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info"> Do you want to end the survey now? Ending the survey will stop taking any further responses from members. You can still view the result.
                    </MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseStopConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        onStop()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <CreateProject phaseNamesMap={phaseNamesMap} openCreateProjectDialog={openCreateProjectDialog} loadData={loadData} handleCloseCreateProjectDialog={handleCloseCreateProjectDialog}/>
            <DeleteConfirmationDialog/>
            <StartConfirmationDialog/>
            <StopConfirmationDialog/>
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
                        <Grid item xs={12} md={6} lg={12}>
                            {
                                projectData ? <Card>
                                    <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                        Your Upcoming Projects
                                    </MDTypography>
                                    <DataTable
                                        table={{
                                            columns: [
                                                {Header: "project name", accessor: "name", width: "15%"},
                                                {Header: "client", accessor: "clientName", width: "15%"},
                                                {Header: "owner", accessor: "owner", width: "15%"},
                                                {Header: "status", accessor: "status"},
                                                {Header: "start date", accessor: "startDate", width: "10%"},
                                                {Header: "end date", accessor: "endDate", width: "10%"},
                                                {Header: "delete__", accessor: "delete"},
                                                {Header: "expand__", accessor: "expand"},
                                                {Header: "assessment__", accessor: "assessment"},
                                                {Header: "start__", accessor: "start"},
                                                {Header: "end__", accessor: "end"}
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
