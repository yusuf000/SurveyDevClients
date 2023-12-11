import React, {useEffect, useRef, useState} from "react";
// react-router-dom components
//axios to call apis
// @mui material components
// @mui icons
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import {useLocation, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import Information from "../components/Information";
import Grid from "@mui/material/Grid";
import SimpleBlogCard from "../../../examples/Cards/BlogCards/SimpleBlogCard";
import DataTable from "../../../examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import axios from "axios";
import SimpleActionCard from "../components/SimpleActionCard";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const url = `http://localhost:8080/`

function ProjectDetails() {
    const location = useLocation();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [phaseData, setPhaseData] = useState(null)
    const [isPhaseDataLoaded, setIsPhaseDataLoaded] = useState(false);
    const [tableDataMember, setTableDataMember] = useState(null);
    const [tableDataPhase, setTableDataPhase] = useState(null);
    const [openAddMemberDialog, setOpenAddMemberDialog] = React.useState(false);
    const newMemberIdRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOpenAddMemberDialog = () => {
        setOpenAddMemberDialog(true);
    };

    const handleCloseAddMemberDialog = () => {
        setOpenAddMemberDialog(false);
    };

    const onAdd = () => {
        const memberId = newMemberIdRef.current.value;
        if (memberId) {
            const token = localStorage.getItem('token');
            axios
                .post(url + "api/v1/project/add-member", {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    params: {
                        'sasCode': project.sasCode,
                        'memberId': memberId
                    }
                })
                .then(() => {
                    loadMemberData();
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        setOpenAddMemberDialog(false);
    };

    if (location.state != null) {
        localStorage.setItem("project", location.state.project);
    }

    const project = JSON.parse(localStorage.getItem('project'));
    const user = localStorage.getItem('user');

    const onDelete = ({memberId}) => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/project/remove-member", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': project.sasCode,
                    'memberId': memberId
                }
            })
            .then(() => {
                loadMemberData();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const prepareTableDataMember = (members) => {
        let data = []
        for (let i in members) {
            let member = members[i];
            let memberId = member;

            if (member !== user) {
                data.push({
                    "name": member,
                    "delete": <MDTypography component="a" href="#" role="button" onClick={() => onDelete({memberId})}
                                            color="error">
                        <Icon>delete</Icon>
                    </MDTypography>
                });
            } else {
                data.push({
                    "name": member
                });
            }
        }
        return data;
    }

    function onDeletePhase({phaseId}) {

    }

    function onExpandPhase({phaseId}) {

    }

    const prepareTableDataPhase = (phases) => {
        let data = []
        for (let i in phases) {
            let phaseName = phases[i].name;
            let phaseId = phases[i].id;

            data.push({
                "name": phaseName,
                "delete": <MDTypography component="a" href="" role="button" onClick={() => onDeletePhase({phaseId})}
                                        color="error">
                    <Icon>delete</Icon>
                </MDTypography>,
                "expand": <MDTypography component="a" href="" role="button" onClick={() => onExpandPhase({phaseId})}
                                        color="info">
                    <Icon>arrow_outward</Icon> </MDTypography>
            });

        }
        return data;
    }

    const loadMemberData = () => {
        const token = localStorage.getItem('token');
        axios
            .get(url + "api/v1/project/member", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    sasCode: project.sasCode
                }
            })
            .then((response) => {
                if (response.data.length !== 0) {
                    setTableDataMember(prepareTableDataMember(response.data));
                    setIsDataLoaded(true);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const loadPhaseData = () => {
        const token = localStorage.getItem('token');
        axios
            .get(url + "api/v1/phase", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    sasCode: project.sasCode
                }
            })
            .then((response) => {
                setTableDataPhase(prepareTableDataPhase(response.data));
                setIsPhaseDataLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadMemberData();
        loadPhaseData();
    }, []);

    const handleOnAddQuestionClick = () => {
        navigate('/question-add');
    };

    function AddMember() {
        return (
            <Dialog open={openAddMemberDialog} onClose={handleCloseAddMemberDialog}>
                <DialogTitle>Add Member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a member to this project please type the email address of the member here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        inputRef={newMemberIdRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddMemberDialog}>Cancel</Button>
                    <Button onClick={onAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <DashboardLayout>
            <MDBox py={3}>
                <AddMember/>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleActionCard
                                title="Add Question"
                                description="Add a question to the project"
                                click={handleOnAddQuestionClick}
                                action={{
                                    type: "internal",
                                    route: "/project-create",
                                    color: "info",
                                    label: "Add"
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleActionCard
                                title="Add Member"
                                description="Add a member to the project"
                                click={handleClickOpenAddMemberDialog}
                                action={{
                                    type: "internal",
                                    route: "/project-create",
                                    color: "info",
                                    label: "Add"
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleBlogCard
                                title="Take Survey"
                                description="Complete the survey"
                                action={{
                                    type: "internal",
                                    route: "/project-create",
                                    color: "info",
                                    label: "Start"
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={5}>
                        <Card>
                            <MDBox pt={3} px={2}>
                                <MDTypography variant="h4" fontWeight="medium">
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
            {
                isDataLoaded ? <MDBox py={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={5}>
                            {
                                <Card>
                                    <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                        Members
                                    </MDTypography>
                                    <DataTable
                                        table={{
                                            columns: [
                                                {Header: "Name", accessor: "name", width: "85%"},
                                                {Header: "delete", accessor: "delete"}
                                            ],
                                            rows: tableDataMember
                                        }}/>
                                </Card>
                            }
                        </Grid>
                    </Grid>
                </MDBox> : null
            }
            {
                isPhaseDataLoaded ? <MDBox py={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={5}>
                            {
                                <Card>
                                    <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                        Phases
                                    </MDTypography>
                                    <MDTypography variant="h6" fontWeight="light" color="dark" mt={1} my={3} mx={3}>
                                        Expand a phase to see questions under it
                                    </MDTypography>
                                    <DataTable
                                        table={{
                                            columns: [
                                                {Header: "Name", accessor: "name", width: "85%"},
                                                {Header: "delete", accessor: "delete"},
                                                {Header: "expand", accessor: "expand"}
                                            ],
                                            rows: tableDataPhase
                                        }}/>
                                </Card>
                            }
                        </Grid>
                    </Grid>
                </MDBox> : null
            }
        </DashboardLayout>
    );
}

export default ProjectDetails;
