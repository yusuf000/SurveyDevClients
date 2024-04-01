import {QuestionFactory} from "model/QuestionFactory";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, {useEffect, useRef, useState} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MDBox from "../../components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {BouncingBalls} from "react-cssfx-loading";

const url = `http://203.161.57.194:8080/`

function Questions({qIndex,currentQuestion,answerDescription,handleRadioChange,submitAnswer}) {


    return (
        <MDBox>
            <Card>
                <MDBox m={2}>
                    <MDTypography fontWeight={"bold"}>Q{qIndex}. {currentQuestion.description} </MDTypography>
                </MDBox>
                <MDBox>
                    {
                        QuestionFactory.getQuestion(currentQuestion, answerDescription, handleRadioChange).getView()
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

function Survey() {
    const navigate = useNavigate();
    const project = JSON.parse(localStorage.getItem('project'));
    let phase = JSON.parse(localStorage.getItem('phase'));
    let qIndex = localStorage.getItem('qIndex');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentChoiceId, setCurrentChoiceId] = useState();
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const answerDescription = useRef(null);

    const handleRadioChange = (event) => {
        setCurrentChoiceId(event.target.value);
    };

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
                handleClickCloseLoadingDialog();
                setCurrentQuestion(response.data);
            })
            .catch((e) => {
                handleClickCloseLoadingDialog();
                if(e.response.status === 403){
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    function submitAnswer() {
        handleClickOpenLoadingDialog();
        const token = localStorage.getItem('token');
        const phase = JSON.parse(localStorage.getItem('phase'));
        let description = null;
        if (answerDescription.current !== null) description = answerDescription.current.value;
        axios
            .post(url + 'api/v1/answer/submit', {
                questionId: currentQuestion.id,
                sasCode: project.sasCode,
                phaseId: phase.id,
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
                }else{
                    handleClickCloseLoadingDialog();
                    handleClickOpenErrorDialog();
                }
            })
            .catch((e) => {
                handleClickCloseLoadingDialog();
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
                    handleClickCloseLoadingDialog();
                } else {
                    if (phase.serial === project.phases.length - 1) {
                        handleClickCloseLoadingDialog();
                        completeSurvey();
                    } else {
                        localStorage.setItem('phase', JSON.stringify(project.phases[phase.serial + 1]));
                        localStorage.setItem('qIndex', "1");
                        startPhase();
                    }
                }
            })
            .catch((e) => {
                handleClickCloseLoadingDialog();
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

    const handleClickOpenLoadingDialog = () => {
        setOpenLoadingDialog(true);
    }

    const handleClickCloseLoadingDialog = () => {
        setOpenLoadingDialog(false);
    }

    function LoadingDialog({}) {
        return (
            <Dialog open={openLoadingDialog} onClose={handleClickCloseLoadingDialog}>
                <DialogContent>
                    <BouncingBalls color="#2882eb" width="35px" height="10px" duration="1s"/>
                </DialogContent>
            </Dialog>
        );
    }

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


    return (
        <DashboardLayout>
            <LoadingDialog/>
            <DashboardNavbar/>
            <SuccessDialog/>
            <ErrorDialogue/>
            <MDBox m={2}>
                <MDTypography color={"info"}>{phase.name}</MDTypography>
            </MDBox>
            {
                currentQuestion ? <MDBox>
                    <Questions currentQuestion={currentQuestion} handleRadioChange={handleRadioChange} answerDescription={answerDescription} qIndex={qIndex} submitAnswer={submitAnswer}/>
                </MDBox> : null
            }
        </DashboardLayout>
    )
}

export default Survey;