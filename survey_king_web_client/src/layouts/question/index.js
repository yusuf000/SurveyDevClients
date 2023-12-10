import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import Card from "@mui/material/Card";
import MDButton from "../../components/MDButton";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";

const url = `http://localhost:8080`

function Question() {

    const [openCreateProjectDialog, setOpenCreateProjectDialog] = React.useState(false);
    const [questionType, setQuestionType] = useState("descriptive");
    const [language, setLanguage] = useState();
    const [phase, setPhase] = useState();
    const questionDescriptionRef = useRef(null);
    const [languageData, setLanguageData] = useState();
    const [isLanguageDataLoaded, setIsLanguageDataLoaded] = useState(false);
    const [questionTypeData, setQuestionTypeData] = useState();
    const [isQuestionTypeDataLoaded, setIsQuestionTypeDataDataLoaded] = useState(false);
    const [phaseData, setPhaseData] = useState();
    const [isPhaseDataLoaded, setIsPhaseDataLoaded] = useState(false);
    const token = localStorage.getItem('token');
    const project = JSON.parse(localStorage.getItem('project'));


    const doCreateQuestion = () => {

        axios
            .post(url + "/api/v1/question/add", {
                description: questionDescriptionRef.current.value,
                language: language,
                questionType: questionType,
                phaseId: phase
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(() => {
                console.log("question created");
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const loadLanguages = () => {
        axios
            .get(url + "/api/v1/language", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setLanguageData(response.data);
                setIsLanguageDataLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadQuestionTypes = () => {
        axios
            .get(url + "/api/v1/question-type", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setQuestionTypeData(response.data);
                setIsQuestionTypeDataDataLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const loadPhases = () => {
        axios
            .get(url + "/api/v1/phase", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    sasCode: project.sasCode
                }
            })
            .then((response) => {
                setPhaseData(response.data);
                setIsPhaseDataLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadData = () => {
        loadLanguages();
        loadQuestionTypes();
        loadPhases();
    }

    const handleClickOpenCreateProjectDialog = () => {
        setOpenCreateProjectDialog(true);
    };

    const handleCloseCreateProjectDialog = () => {
        setOpenCreateProjectDialog(false);
    };

    const handleOnLanguageSelect = (event) => {
        setLanguage(event.target.value);
    };

    const handleOnQuestionTypeSelect = (event) => {
        setQuestionType(event.target.value);
    };

    const handleOnPhaseSelect = (event) => {
        setPhase(event.target.value);
    };

    function addChoiceCard() {

    }

    const handleOnAddChoiceClick = () => {

        if (questionType === "descriptive") {
            handleClickOpenCreateProjectDialog();
        } else {
            addChoiceCard();
        }
    };

    const handleOnCreateClick = () => {
        doCreateQuestion();
    };


    useEffect(() => {
        loadData();
    }, []);

    function ErrorDialogue() {
        return (
            <Dialog open={openCreateProjectDialog} onClose={handleCloseCreateProjectDialog}>
                <DialogTitle color="red"><Icon fontSize="small">error</Icon> &nbsp; Wrong Question Type</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error"> Can't add choice in a descriptive type
                        question</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateProjectDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <DashboardLayout>
            <ErrorDialogue/>
            <Card>
                <MDBox mb={2} mt={2} ml={2} mr={2}>
                    <MDBox mb={2}>
                        <MDTypography variant="h5" fontWeight="medium" color="dark">
                            Please give the necessary information to add a question
                        </MDTypography>
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput type="text" label="Description" inputRef={questionDescriptionRef} fullWidth/>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label">Language</InputLabel>
                            {
                                isLanguageDataLoaded ? <Select
                                    labelId="language-label"
                                    id="language-select"
                                    value={language}
                                    label="Language"
                                    onChange={handleOnLanguageSelect}
                                    sx={{minHeight: 45}}
                                >
                                    {
                                        languageData.map(option => {
                                                return (
                                                    <MenuItem
                                                        value={option.code}>
                                                        {option.name}
                                                    </MenuItem>
                                                )
                                            }
                                        )
                                    }
                                </Select> : null
                            }
                        </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="question-type-label">Question Type</InputLabel>
                            {
                                isQuestionTypeDataLoaded ? <Select
                                    labelId="question-type-label"
                                    id="question-type-select"
                                    value={questionType}
                                    label="Question type"
                                    onChange={handleOnQuestionTypeSelect}
                                    sx={{minHeight: 45}}
                                >
                                    {
                                        questionTypeData.map(option => {
                                            return (
                                                <MenuItem
                                                    value={option.name}>
                                                    {option.name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select> : null
                            }
                        </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="phase-label">Phase</InputLabel>
                            {
                                isPhaseDataLoaded ? <Select
                                    labelId="phase-label"
                                    id="phase-select"
                                    label="Phase"
                                    onChange={handleOnPhaseSelect}
                                    sx={{minHeight: 45}}
                                >
                                    {
                                        phaseData.map(option => {
                                                return (
                                                    <MenuItem
                                                        value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                )
                                            }
                                        )
                                    }
                                </Select> : null
                            }
                        </FormControl>
                    </MDBox>
                    <Grid container spacing={2}>
                        <Grid item>
                            <MDBox mb={2}>
                                <MDButton variant="gradient" color="light" onClick={handleOnAddChoiceClick}>
                                    Add a choice
                                </MDButton>
                            </MDBox>
                        </Grid>
                        <Grid item>
                            <MDBox mb={2}>
                                <MDButton variant="gradient" color="info" onClick={handleOnCreateClick}>
                                    Create
                                </MDButton>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </Card>
        </DashboardLayout>
    );
}

export default Question;