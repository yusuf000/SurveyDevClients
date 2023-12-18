import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import Card from "@mui/material/Card";
import Question from "./components/question";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SimpleActionCard from "../project/components/SimpleActionCard";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

const url = `http://localhost:8080/`

function PhaseDetails() {
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openAddFilterLogicDialog, setOpenAddFilterLogicDialog] = React.useState(false);
    const [openDeleteFilterLogicDialog, setDeleteFilterLogicDialog] = React.useState(false);
    const [openAddChoiceFilterLogicDialog, setOpenAddChoiceFilterLogicDialog] = React.useState(false);
    const [openDeleteChoiceFilterLogicDialog, setDeleteChoiceFilterLogicDialog] = React.useState(false);
    const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false)
    const [questionData, setQuestionData] = useState([])
    const filterLogicRef = useRef();
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [currentChoiceIndex, setCurrentChoiceIndex] = useState(0);
    const [currentChoiceId, setCurrentChoiceId] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    if (location.state != null) {
        localStorage.setItem("phaseId", location.state.phaseId)
    }

    const phaseId = localStorage.getItem("phaseId");

    const handleClickOpenErrorDialog = () => {
        setOpenErrorDialog(true);
    };

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    const handleClickOpenConfirmationDialog = (questionId) => {
        setCurrentQuestionId(questionId)
        setOpenConfirmationDialog(true)
    }

    const handleClickCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false)
    }

    const handleClickOpenAddFilterLogicDialog = (questionIndex) => {
        setCurrentQuestionId(questionData[questionIndex].id);
        setCurrentQuestionIndex(questionIndex);
        setOpenAddFilterLogicDialog(true);
    };

    const handleCloseAddFilterLogicDialog = () => {
        setOpenAddFilterLogicDialog(false);
    };
    const handleClickOpenAddChoiceFilterLogicDialog = (questionIndex, choiceIndex) => {
        setCurrentQuestionIndex(questionIndex)
        setCurrentChoiceIndex(choiceIndex);
        setOpenAddChoiceFilterLogicDialog(true);
    };

    const handleCloseAddChoiceFilterLogicDialog = () => {
        setOpenAddChoiceFilterLogicDialog(false);
    };


    const handleClickOpenDeleteFilterLogicDialog = (questionIndex) => {
        setCurrentQuestionId(questionData[questionIndex].id);
        setCurrentQuestionIndex(questionIndex);
        setDeleteFilterLogicDialog(true);
    };

    const handleCloseDeleteFilterLogicDialog = () => {
        setDeleteFilterLogicDialog(false);
    };

    const handleClickOpenDeleteChoiceFilterLogicDialog = (questionIndex, choiceIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setCurrentChoiceIndex(choiceIndex);
        setCurrentChoiceId(questionData[questionIndex].choices[choiceIndex].id);
        setDeleteChoiceFilterLogicDialog(true);
    };

    const handleCloseDeleteChoiceFilterLogicDialog = () => {
        setDeleteChoiceFilterLogicDialog(false);
    };
    const loadQuestions = () => {
        const token = localStorage.getItem('token');
        axios
            .get(url + "api/v1/question", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    phaseId: phaseId
                }
            })
            .then((response) => {
                if (response.data.length !== 0) {
                    response.data.sort((a, b) => a.serial - b.serial);
                    setQuestionData(response.data)
                    setIsQuestionsLoaded(true)
                } else {
                    setIsQuestionsLoaded(false);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const deleteQuestion = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/question/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: currentQuestionId
                }
            })
            .then(() => {
                handleClickCloseConfirmationDialog();
                const newQuestionData = questionData.filter(function (element) {
                    return element.id !== currentQuestionId
                })
                setQuestionData(newQuestionData);
                if (newQuestionData.length === 0) {
                    setIsQuestionsLoaded(false)
                }
            })
            .catch((e) => {
                handleClickCloseConfirmationDialog();
                setErrorMessage("Unable to delete question, please check if you have added this question in a filter of another question. Delete that filter and try again.")
                handleClickOpenErrorDialog()
                console.log(e);
            })
    }

    function parseExpression(expression) {
        const getQuestionIndex = (expression, index) => {
            if (expression[index.val] !== 'Q') return -1;
            else {
                index.val++;
                let val = 0;
                while (index.val < expression.length && expression[index.val] >= '0' && expression[index.val] <= '9') {
                    val = val * 10 + (expression[index.val] - '0');
                    index.val++;
                }
                return val - 1;
            }
        }

        const getChoiceId = (expression, index, qIndex) => {
            if (expression[index.val] !== 'C') return -1;
            else {
                index.val++;
                let val = 0;
                while (index.val < expression.length && expression[index.val] >= '0' && expression[index.val] <= '9') {
                    val = val * 10 + (expression[index.val] - '0');
                    index.val++;
                }
                val = val - 1;
                if (index.val < expression.length && expression[index.val] !== 'Q') {
                    let subVal = expression.charCodeAt(index.val) - 65;
                    index.val++;
                    if (val >= questionData[qIndex].choices.length || val < 0) return -1;
                    else {
                        if (questionData[qIndex].choices[val].choices && subVal < questionData[qIndex].choices[val].choices.length) return questionData[qIndex].choices[val].choices[subVal].id;
                        else return -1;
                    }

                } else {
                    if (val >= questionData[qIndex].choices.length) return -1;
                    else return questionData[qIndex].choices[val].id;
                }

            }
        }

        let index = {
            val: 0
        };
        let parsedExpression = "";
        while (index.val < expression.length) {
            if (expression[index.val] !== 'Q') {
                parsedExpression = parsedExpression + expression[index.val];
                index.val++;
            } else {
                let qIndex = getQuestionIndex(expression, index);
                if (qIndex === -1 || qIndex >= questionData.length) return null;
                let qId = questionData[qIndex].id;
                let cId = getChoiceId(expression, index, qIndex);
                if (cId === -1) return null;
                if(questionData[qIndex].serial >= questionData[currentQuestionIndex].serial) return null;
                parsedExpression = parsedExpression + "Q" + qId + "C" + cId;
            }
        }
        return parsedExpression;
    }

    const onAddFilterLogic = () => {
        const parsedExpression = parseExpression(filterLogicRef.current.value);
        if (!parsedExpression) {
            handleCloseAddFilterLogicDialog()
            setErrorMessage("Error adding filter. Expression is not valid")
            handleClickOpenErrorDialog();
        } else {
            const token = localStorage.getItem('token');
            axios
                .post(url + "api/v1/question-filter/add-expression", {
                    questionId: currentQuestionId,
                    expressionToEvaluate: parsedExpression,
                    expressionToShow: filterLogicRef.current.value
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    handleCloseAddFilterLogicDialog()
                    if (response.data === false) {
                        setErrorMessage("Error adding filter. Expression is not valid")
                        handleClickOpenErrorDialog();
                    } else {
                        questionData[currentQuestionIndex].questionFilterExpression = filterLogicRef.current.value
                    }
                })
                .catch((e) => {
                    handleCloseAddFilterLogicDialog();
                    setErrorMessage("Error adding filter. Expression is not valid")
                    handleClickOpenErrorDialog();
                })
        }
    }

    const onAddChoiceFilterLogic = () => {
        const parsedExpression = parseExpression(filterLogicRef.current.value);
        if (!parsedExpression) {
            handleCloseAddChoiceFilterLogicDialog()
            setErrorMessage("Error adding filter. Expression is not valid")
            handleClickOpenErrorDialog();
        } else {
            const token = localStorage.getItem('token');
            axios
                .post(url + "api/v1/choice-filter/add", {
                    choiceId: questionData[currentQuestionIndex].choices[currentChoiceIndex].id,
                    expressionToEvaluate: parsedExpression,
                    expressionToShow: filterLogicRef.current.value
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    handleCloseAddChoiceFilterLogicDialog()
                    if (response.data === false) {
                        setErrorMessage("Error adding filter. Expression is not valid")
                        handleClickOpenErrorDialog();
                    } else {
                        questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression = filterLogicRef.current.value
                    }
                })
                .catch((e) => {
                    handleCloseAddChoiceFilterLogicDialog();
                    setErrorMessage("Error adding filter. Expression is not valid")
                    handleClickOpenErrorDialog();
                })
        }
    }

    const onDeleteFilterLogic = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/question-filter/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: currentQuestionId
                }
            })
            .then((response) => {
                handleCloseDeleteFilterLogicDialog();
                questionData[currentQuestionIndex].questionFilterExpression = "";
            })
            .catch((e) => {
                handleCloseDeleteFilterLogicDialog();
                setErrorMessage("Error deleting filter.Try again.")
                handleClickOpenErrorDialog();
            })

    }

    const onDeleteChoiceFilterLogic = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/choice-filter/delete", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    choiceId: currentChoiceId
                }
            })
            .then((response) => {
                handleCloseDeleteChoiceFilterLogicDialog();
                questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression = "";
            })
            .catch((e) => {
                handleCloseDeleteChoiceFilterLogicDialog();
                setErrorMessage("Error deleting filter.Try again.")
                handleClickOpenErrorDialog();
            })

    }

    const handleOnAddQuestionClick = () => {
        navigate('/question-add');
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    function ConfirmationDialog() {
        return (
            <Dialog open={openConfirmationDialog} onClose={handleClickCloseConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Confirm</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="info"> Are you sure you want to delete this
                        question?</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseConfirmationDialog}>Cancel</Button>
                    <Button onClick={() => {
                        deleteQuestion()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function AddChoiceFilterLogicDialog() {
        return (
            <Dialog open={openAddChoiceFilterLogicDialog} onClose={handleCloseAddChoiceFilterLogicDialog}>
                <DialogTitle>Add Filter Logic In C{currentChoiceIndex + 1} of Q{currentQuestionIndex + 1}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Filter logic will filter out this choice during survey based on the answers given to
                        particular questions added by you here. Adding a new filter will delete existing one.
                    </DialogContentText>
                    <MDBox mt={2} mb={2}>
                        {
                            currentQuestionIndex < questionData.length && currentChoiceIndex < questionData[currentQuestionIndex].choices.length && questionData[currentQuestionIndex].choices && questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression ?
                                <MDTypography fontSize="small" color="info"> Current
                                    Filter: {questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression }</MDTypography> : null
                        }
                    </MDBox>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Filter Logic Expression"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={filterLogicRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddChoiceFilterLogicDialog}>Cancel</Button>
                    <Button onClick={onAddChoiceFilterLogic}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function DeleteChoiceFilterLogicDialog() {
        return (
            <Dialog open={openDeleteChoiceFilterLogicDialog} onClose={handleCloseDeleteChoiceFilterLogicDialog}>
                <DialogTitle>Delete Filter Logic From C{currentChoiceIndex + 1} of Q{currentQuestionIndex + 1}</DialogTitle>
                <DialogContent>
                    {
                        currentQuestionIndex < questionData.length && currentChoiceIndex < questionData[currentQuestionIndex].choices.length && questionData[currentQuestionIndex].choices && questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression ?
                            <MDBox>
                                <DialogContentText>
                                    Are you sure you want to delete this filter logic?
                                </DialogContentText>
                                <MDBox mt={2} mb={2}>
                                    <MDTypography fontSize="medium" color="info"> Curren
                                        Filter: {questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression }</MDTypography>
                                </MDBox>
                            </MDBox> : <MDBox>
                                <DialogContentText>
                                    This Choice doesn't have any filter
                                </DialogContentText>
                            </MDBox>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteChoiceFilterLogicDialog}>Cancel</Button>
                    {
                        currentQuestionIndex < questionData.length && currentChoiceIndex < questionData[currentQuestionIndex].choices.length && questionData[currentQuestionIndex].choices && questionData[currentQuestionIndex].choices[currentChoiceIndex].choiceFilterExpression ?
                            <Button onClick={onDeleteChoiceFilterLogic}>Yes</Button> : null
                    }
                </DialogActions>
            </Dialog>
        );
    }

    function AddFilterLogicDialog() {
        return (
            <Dialog open={openAddFilterLogicDialog} onClose={handleCloseAddFilterLogicDialog}>
                <DialogTitle>Add Filter Logic In Q{currentQuestionIndex + 1}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Filter logic will filter out this question during survey based on the answers given to
                        particular questions added by you here. Adding a new filter will delete existing one.
                    </DialogContentText>
                    <MDBox mt={2} mb={2}>
                        {
                            currentQuestionIndex < questionData.length && questionData[currentQuestionIndex].questionFilterExpression ?
                                <MDTypography fontSize="small" color="info"> Current
                                    Filter: {questionData[currentQuestionIndex].questionFilterExpression}</MDTypography> : null
                        }
                    </MDBox>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Filter Logic Expression"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={filterLogicRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddFilterLogicDialog}>Cancel</Button>
                    <Button onClick={onAddFilterLogic}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function DeleteFilterLogicDialog() {
        return (
            <Dialog open={openDeleteFilterLogicDialog} onClose={handleCloseDeleteFilterLogicDialog}>
                <DialogTitle>Delete Filter Logic From Q{currentQuestionIndex + 1}</DialogTitle>
                <DialogContent>
                    {
                        currentQuestionIndex < questionData.length && questionData[currentQuestionIndex].questionFilterExpression ?
                            <MDBox>
                                <DialogContentText>
                                    Are you sure you want to delete this filter logic?
                                </DialogContentText>
                                <MDBox mt={2} mb={2}>
                                    <MDTypography fontSize="medium" color="info"> Curren
                                        Filter: {questionData[currentQuestionIndex].questionFilterExpression}</MDTypography>
                                </MDBox>
                            </MDBox> : <MDBox>
                                <DialogContentText>
                                    This question doesn't have any filter
                                </DialogContentText>
                            </MDBox>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteFilterLogicDialog}>Cancel</Button>
                    {
                        currentQuestionIndex < questionData.length && questionData[currentQuestionIndex].questionFilterExpression ? <Button onClick={onDeleteFilterLogic}>Yes</Button> : null
                    }
                </DialogActions>
            </Dialog>
        );
    }

    function ErrorDialogue() {
        return (
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                <DialogTitle color="red"><Icon fontSize="small">error</Icon> &nbsp; Error</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error"> {errorMessage}</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function QuestionBox() {
        return (
            <Card>
                <MDBox pt={3} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                        Questions
                    </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        {
                            questionData.map((option, index) => {
                                    option.choices.sort((a, b) => a.serial - b.serial);

                                    return (
                                        <Question
                                            id={option.id}
                                            serial={index}
                                            description={option.description}
                                            language={option.language}
                                            questionType={option.questionType}
                                            choices={option.choices}
                                            onDeleteClick={handleClickOpenConfirmationDialog}
                                            onAddFilterLogic={handleClickOpenAddFilterLogicDialog}
                                            onDeleteFilterLogic={handleClickOpenDeleteFilterLogicDialog}
                                            onAddChoiceFilterLogic={handleClickOpenAddChoiceFilterLogicDialog}
                                            onDeleteChoiceFilterLogic={handleClickOpenDeleteChoiceFilterLogicDialog}
                                        />
                                    )
                                }
                            )
                        }
                    </MDBox>
                </MDBox>
            </Card>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <ErrorDialogue/>
            <ConfirmationDialog/>
            <AddFilterLogicDialog/>
            <DeleteFilterLogicDialog/>
            <AddChoiceFilterLogicDialog/>
            <DeleteChoiceFilterLogicDialog/>
            <MDBox py={3} mb={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleActionCard
                                title="Add Question"
                                description="Add a question to this phase"
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
                </Grid>
            </MDBox>
            <MDBox>
                {
                    isQuestionsLoaded ? <QuestionBox/> : null
                }
            </MDBox>
        </DashboardLayout>
    );
}

export default PhaseDetails;