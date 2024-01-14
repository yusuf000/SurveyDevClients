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
import MDButton from "../../../components/MDButton";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";


const url = `http://203.161.57.194:8080/`

function AddMember({openAddMemberDialog, handleCloseAddMemberDialog, newMemberIdRef, onAdd}) {
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

function ProjectDetails() {
    const location = useLocation();
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [openStartConfirmationDialog, setOpenStartConfirmationDialog] = React.useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isPhaseDataLoaded, setIsPhaseDataLoaded] = useState(false);
    const [tableDataMember, setTableDataMember] = useState(null);
    const [tableDataPhase, setTableDataPhase] = useState(null);
    const [selectedPhase, setSelectedPhase] = useState(null);
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
                    handleClickCloseConfirmationDialog()
                    loadMemberData();
                })
                .catch((e) => {
                    handleClickCloseConfirmationDialog()
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

    function onDeletePhase() {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/phase/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'phaseId': selectedPhase
                }
            })
            .then(() => {
                handleClickCloseConfirmationDialog();
                loadPhaseData();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const onStart = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/project/start", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': project.sasCode
                }
            })
            .then(() => {
                handleClickCloseStartConfirmationDialog();
                navigate('/projects');
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

    function onExpandPhase({phaseId}) {
        navigate('/phase-details', {state: {phaseId: phaseId}});
    }

    const prepareTableDataPhase = (phases) => {
        let data = []
        for (let i in phases) {
            let phaseName = phases[i].name;
            let phaseId = phases[i].id;

            data.push({
                "name": phaseName,
                "delete": <MDBox>
                    {
                        phases.length !== 1 ? <MDTypography component="a" href="" role="button"
                                                            onClick={(event) => handleClickOpenConfirmationDialog({
                                                                event,
                                                                phaseId
                                                            })}
                                                            color="error">
                            <Icon>delete</Icon>
                        </MDTypography> : null
                    }
                </MDBox>,
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
                if (e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
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

    const handleClickOpenConfirmationDialog = ({event, phaseId}) => {
        event.preventDefault()
        setSelectedPhase(phaseId)
        setOpenConfirmationDialog(true)
    }

    const handleClickOpenStartConfirmationDialog = () => {
        setOpenStartConfirmationDialog(true)
    }

    const handleClickCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false)
    }

    const handleClickCloseStartConfirmationDialog = () => {
        setOpenStartConfirmationDialog(false)
    }

    function ConfirmationDialog() {
        return (
            <Dialog open={openConfirmationDialog} onClose={handleClickCloseConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info"> Deleting the phase will delete the related questions
                        also</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        onDeletePhase()
                    }}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function ConfirmationStartDialog() {
        return (
            <Dialog open={openStartConfirmationDialog} onClose={handleClickCloseStartConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info">Starting will prevent you from modifying the project
                        further and you can start collecting reponses</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseStartConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        onStart()
                    }}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
    }


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <ConfirmationDialog/>
            <ConfirmationStartDialog/>
            <AddMember onAdd={onAdd} handleCloseAddMemberDialog={handleCloseAddMemberDialog}
                       newMemberIdRef={newMemberIdRef} openAddMemberDialog={openAddMemberDialog}/>

            <MDBox>
                <Card sx={{height: '100%', width: '100%'}}>
                    <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems={{xs: "flex-start", sm: "center"}}
                        flexDirection={{xs: "column", sm: "row"}}
                    >
                        <MDBox m={2} sx={{height: '10%'}}>
                            <MDTypography variant="h4" fontWeight="medium">
                                Project Information
                            </MDTypography>
                        </MDBox>
                        <MDBox m={3}>
                            <MDButton color={"success"} variant={"gradient"}
                                      onClick={handleClickOpenStartConfirmationDialog}>Start</MDButton>
                        </MDBox>
                    </MDBox>

                    <MDBox pt={1} pb={2} px={2} sx={{height: '90%'}}>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}
                               sx={{height: '100%'}}>
                            <Information
                                name={project.name}
                                projectType={project.projectType}
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
            </MDBox>
            {
                isDataLoaded ?

                    <MDBox mt={3}>
                        <Card sx={{height: '100%', width: '100%'}}>
                            <MDBox
                                display="flex"
                                justifyContent="space-between"
                                alignItems={{xs: "flex-start", sm: "center"}}
                                flexDirection={{xs: "column", sm: "row"}}
                                mb={2}
                            >
                                <MDBox mt={1} my={3} mx={3}>
                                    <MDTypography variant="h4" fontWeight="medium" color="dark">
                                        Members
                                    </MDTypography>
                                </MDBox>
                                <MDBox mt={1} my={3} mx={3}>
                                    <MDButton variant="gradient" onClick={handleClickOpenAddMemberDialog}
                                              color="info">
                                        Add New
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                            <DataTable
                                table={{
                                    columns: [
                                        {Header: "Name", accessor: "name", width: "85%"},
                                        {Header: "delete__", accessor: "delete"}
                                    ],
                                    rows: tableDataMember
                                }}/>
                        </Card>

                    </MDBox> : null
            }

            {
                isPhaseDataLoaded ? <MDBox mt={3}>
                    <Grid container spacing={3}>
                        <Grid item md={6} lg={12}>
                            {
                                <Card sx={{height: '100%', width: '100%'}}>
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
                                                {Header: "delete__", accessor: "delete"},
                                                {Header: "expand__", accessor: "expand"}
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
