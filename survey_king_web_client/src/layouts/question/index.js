import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import Card from "@mui/material/Card";
import MDButton from "../../components/MDButton";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import React, {useRef, useState} from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";

const url = `http://localhost:8080/api/v1/question`
function Question(){

    const [openCreateProjectDialog, setOpenCreateProjectDialog] = React.useState(false);
    const [questionType, setQuestionType] = useState("descriptive");
    const [language, setLanguage] = useState("eng");
    const questionDescriptionRef = useRef(null);

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

    function addChoiceCard() {

    }

    const handleOnAddChoiceClick = () => {

        if(questionType === "descriptive"){
            handleClickOpenCreateProjectDialog();
        }else{
            addChoiceCard();
        }
    };

    const doCreateQuestion = () => {
        const token = localStorage.getItem('token');
        const project = JSON.parse(localStorage.getItem('project'))

        axios
            .post(url + "/add", {
                description: questionDescriptionRef.current.value,
                language: language,
                questionType: questionType,
            },{
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then(() => {
                console.log("question created");
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleOnCreateClick = () => {
        //doCreateQuestion();
    };

    function ErrorDialogue(){
        return (
            <Dialog open={openCreateProjectDialog} onClose={handleCloseCreateProjectDialog}>
                <DialogTitle color="red">Error</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error" > <Icon fontSize="medium">error</Icon>&nbsp; Can't add choice in a descriptive type question</MDTypography>
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
                        <MDTypography variant="h5" fontWeight="medium" color="dark" >
                            Please give the necessary information to add a question
                        </MDTypography>
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput type="text" label="Description"  inputRef={questionDescriptionRef} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label">Language</InputLabel>
                            <Select
                                labelId="language-label"
                                id="language-select"
                                value={language}
                                label="Language"
                                onChange={handleOnLanguageSelect}
                                sx={{ minHeight: 45 }}
                            >
                                <MenuItem value={"eng"}>English</MenuItem>
                                <MenuItem value={"ban"}>Bangla</MenuItem>
                            </Select>
                        </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="question-type-label">Question Type</InputLabel>
                            <Select
                                labelId="question-type-label"
                                id="question-type-select"
                                value={questionType}
                                label="Question type"
                                onChange={handleOnQuestionTypeSelect}
                                sx={{ minHeight: 45 }}
                            >
                                <MenuItem value={"descriptive"}>Descriptive</MenuItem>
                                <MenuItem value={"multiple choice"}>Multiple Choice</MenuItem>
                            </Select>
                        </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="phase-label">Phase</InputLabel>
                            <Select
                                labelId="phase-label"
                                id="phase-select"
                                label="Phase"
                                sx={{ minHeight: 45 }}
                            >
                                <MenuItem value={"phase1"}>Phase1</MenuItem>
                                <MenuItem value={"multiple choice"}>Phase2</MenuItem>
                            </Select>
                        </FormControl>
                    </MDBox>
                    <Grid container spacing={2}>
                        <Grid item >
                            <MDBox mb={2}>
                                <MDButton variant="gradient" color="light" onClick={handleOnAddChoiceClick}>
                                    Add a choice
                                </MDButton>
                            </MDBox>
                        </Grid>
                        <Grid item >
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