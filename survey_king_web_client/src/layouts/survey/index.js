import Question from "../question";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, {useEffect, useRef, useState} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MDBox from "../../components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Choice from "../question/Components/Choice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const url = `http://localhost:8080/`

function Survey() {
    const navigate = useNavigate();
    const project = JSON.parse(localStorage.getItem('project'));
    let phase = JSON.parse(localStorage.getItem('phase'));
    let qIndex = localStorage.getItem('qIndex');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentChoiceId, setCurrentChoiceId] = useState();
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const answerDescription = useRef(null);

    function startPhase() {
        phase = JSON.parse(localStorage.getItem('phase'));
        const token = localStorage.getItem('token');
        axios
            .get(url + 'api/v1/question/start', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    phaseId: phase.id
                }
            })
            .then((response) => {
                setCurrentQuestion(response.data);
            })
            .catch((e) => {
                if(e.response.status === 403){
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    function submitAnswer() {
        const token = localStorage.getItem('token');
        let description = null;
        if (answerDescription.current !== null) description = answerDescription.current.value;
        axios
            .post(url + 'api/v1/answer/submit', {
                questionId: currentQuestion.id,
                sasCode: project.sasCode,
                choiceId: currentChoiceId,
                description: description
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                if (response.data === true) {
                    getNextQuestion();
                }
            })
            .catch((e) => {
                handleClickOpenErrorDialog();
            })
    }

    function getNextQuestion() {
        const token = localStorage.getItem('token');
        axios
            .get(url + 'api/v1/question/next', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: currentQuestion.id
                }
            })
            .then((response) => {
                if (response.data) {
                    const nextIndex = parseInt(qIndex) + 1;
                    localStorage.setItem('qIndex', nextIndex + "");
                    localStorage.setItem('previousQuestion', JSON.stringify(currentQuestion));
                    setCurrentQuestion(response.data);
                } else {
                    if (phase.serial === project.phases.length - 1) {
                        completeSurvey();
                    } else {
                        localStorage.setItem('phase', JSON.stringify(project.phases[phase.serial + 1]));
                        localStorage.setItem('qIndex', "1");
                        startPhase();
                    }
                }
            })
            .catch((e) => {
                handleClickOpenErrorDialog();
            })
    }

    function completeSurvey() {
        const token = localStorage.getItem('token');
        axios
            .post(url + 'api/v1/project/complete', {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    params: {
                        sasCode: project.sasCode
                    }
                })
            .then((response) => {
                if (response.data === true) {
                    handleClickOpenSuccessDialog();
                }else{
                    handleClickOpenErrorDialog();
                }
            })
            .catch((e) => {
                handleClickOpenErrorDialog();
            })
    }

    const handleClickOpenSuccessDialog = () => {
        setOpenSuccessDialog(true);
    };

    const handleClickCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
        navigate('/projects');
    };

    const handleClickOpenErrorDialog = () => {
        setOpenErrorDialog(true);
    };


    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };


    useEffect(() => {
        startPhase();
    }, []);

    function SuccessDialog() {
        return (
            <Dialog open={openSuccessDialog} onClose={handleClickCloseSuccessDialog}>
                <DialogTitle color="green"><Icon
                    fontSize="medium">check_circle_outline</Icon> &nbsp; Success</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="success"> Thank you for completing the survey</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseSuccessDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function ErrorDialogue() {
        return (
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                <DialogTitle color="red"><Icon fontSize="small">error</Icon> &nbsp; Error</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error"> Failed to submit answer, please try
                        again</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function Question() {
        const handleRadioChange = (event) => {
            event.preventDefault();
            setCurrentChoiceId(event.target.value);
        };

        return (
            <MDBox>
                <Card>
                    <MDBox m={2}>
                        <MDTypography fontWeight={"bold"}>Q{qIndex}. {currentQuestion.description} </MDTypography>
                    </MDBox>
                    <MDBox>
                        {
                            currentQuestion.questionType.name === "descriptive" ? <MDBox m={2}>
                                <TextField
                                    label="Answer"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    inputRef={answerDescription}
                                />
                            </MDBox> : currentQuestion.questionType.name === "multiple-choice" ? <MDBox m={2}>
                                <FormControl fullWidth>
                                    <RadioGroup onChange={handleRadioChange}
                                    >
                                        {
                                            currentQuestion.choices.map((choice, index1) => {
                                                    return (
                                                        <MDBox m={1}>
                                                            {
                                                                choice.choices.length === 0 ?
                                                                    <FormControlLabel value={choice.id} control={<Radio/>}
                                                                                      label={"C" + (index1 + 1) + ". " + choice.value}
                                                                                      sx={{'& .MuiFormControlLabel-label': {fontSize: '20px'}}}/> :
                                                                    <MDBox>
                                                                        <MDTypography
                                                                            fontWeight={"bold"}>{"C" + (index1 + 1) + ". " + choice.value}</MDTypography>
                                                                        {
                                                                            choice.choices.map((subChoice, index2) => {
                                                                                    return (
                                                                                        <FormControlLabel value={subChoice.id}
                                                                                                          control={<Radio/>}
                                                                                                          label={String.fromCharCode(index2 + 65) + ". " + subChoice.value}/>
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    </MDBox>
                                                            }
                                                            <hr/>
                                                        </MDBox>
                                                    )
                                                }
                                            )
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </MDBox> : null
                        }
                        <MDBox m={2}>
                            <MDButton variant="gradient" color="info" onClick={submitAnswer}>
                                Next
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </Card>
            </MDBox>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SuccessDialog/>
            <ErrorDialogue/>
            <MDBox m={2}>
                <MDTypography color={"info"}>{phase.name}</MDTypography>
            </MDBox>
            {
                currentQuestion ? <MDBox>
                    <Question/>
                </MDBox> : null
            }
        </DashboardLayout>
    )
}

export default Survey;