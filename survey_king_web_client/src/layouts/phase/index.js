import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import Card from "@mui/material/Card";
import Choice from "../question/Components/Choice";
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
function PhaseDetails(){
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openAddFilterLogicDialog, setOpenAddFilterLogicDialog] = React.useState(false);
    const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false)
    const [questionData, setQuestionData] = useState([])
    const filterLogicRef = useRef();
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
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

    const handleClickOpenAddFilterLogicDialog = (questionId) => {
        setCurrentQuestionId(questionId);
        setOpenAddFilterLogicDialog(true);
    };

    const handleCloseAddFilterLogicDialog = () => {
        setOpenAddFilterLogicDialog(false);
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
                    response.data.sort((a,b) => a.serial - b.serial);
                    setQuestionData(response.data)
                    setIsQuestionsLoaded(true)
                }else{
                    handleClickOpenErrorDialog();
                    setIsQuestionsLoaded(false);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const deleteQuestion = (questionId) => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/question/delete", {},{
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: questionId
                }
            })
            .then(() => {
                const newQuestionData = questionData.filter(function (element) {
                    return element.id !== questionId
                })
                setQuestionData(newQuestionData);
                if(newQuestionData.length === 0){
                    handleClickOpenErrorDialog();
                    setIsQuestionsLoaded(false)
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const onAddFilterLogic = () => {
        const token = localStorage.getItem('token');
        axios
            .post(url + "api/v1/question-filter/add-expression", {},{
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: currentQuestionId
                }
            })
            .then(() => {
                handleCloseAddFilterLogicDialog()
            })
            .catch((e) => {
                handleClickOpenErrorDialog();
            })
    }

    const handleOnAddQuestionClick = () => {
        navigate('/question-add');
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    function AddFilterLogic() {
        return (
            <Dialog open={openAddFilterLogicDialog} onClose={handleCloseAddFilterLogicDialog}>
                <DialogTitle>Add Filter Logic</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Filter logic will filter out this question during survey based on the answers given to particular questions added by you here.
                    </DialogContentText>
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

    function ErrorDialogue() {
        return (
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                <DialogTitle color="red"><Icon fontSize="small">error</Icon> &nbsp; Error</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error"> No questions to display in this phase</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function QuestionBox(){
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
                                    option.choices.sort((a,b) => a.serial - b.serial);

                                    return (
                                        <Question
                                            id={option.id}
                                            serial={index + 1}
                                            description={option.description}
                                            language={option.language}
                                            questionType={option.questionType}
                                            choices={option.choices}
                                            onDeleteClick={deleteQuestion}
                                            onAddFilterLogic={handleClickOpenAddFilterLogicDialog}
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
           <AddFilterLogic/>
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