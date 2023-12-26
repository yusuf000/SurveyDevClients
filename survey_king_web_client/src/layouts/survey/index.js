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

const url = `http://localhost:8080/`

function Survey() {
    const navigate = useNavigate();
    const project = JSON.parse(localStorage.getItem('project'));
    const phase = JSON.parse(localStorage.getItem('phase'));
    const qIndex = localStorage.getItem('qIndex');
    const previousQuestion = JSON.parse(localStorage.getItem('previousQuestion'));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentChoiceId, setCurrentChoiceId] = useState();
    const answerDescription = useRef(null);
    const user = localStorage.getItem('user');

    function startPhase() {
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
                console.log(e);
            })
    }

    function submitAnswer(){
        const token = localStorage.getItem('token');
        let description = null;
        if(answerDescription.current !== null) description = answerDescription.current.value;
        axios
            .post(url + 'api/v1/answer/submit', {
                questionId: currentQuestion.id,
                sasCode: project.sasCode,
                choiceId: currentChoiceId,
                description: description
            },{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                if(response.data === true){
                    const nextIndex = parseInt(qIndex) + 1;
                    localStorage.setItem('qIndex', nextIndex+"");
                    getNextQuestion();
                }
            })
            .catch((e) => {
                console.log(e);
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
                if(response.data){
                    localStorage.setItem('previousQuestion',JSON.stringify(currentQuestion));
                    setCurrentQuestion(response.data);
                    navigate('/survey');
                }else{
                    navigate('/projects');
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        startPhase();
    }, []);

    function Question() {
        const handleRadioChange = (event) => {
            event.preventDefault();
            setCurrentChoiceId(event.target.value);
        };

        return (
            <MDBox>
                <Card>
                    <MDBox m={2}>
                        <MDTypography  fontWeight={"bold"}>Q{qIndex}. {currentQuestion.description} </MDTypography>
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
                                                        <MDBox m={1} >
                                                            {
                                                                choice.choices.length === 0 ?
                                                                    <FormControlLabel value={choice.id} control={<Radio />} label={"C"+(index1 + 1)+". "+choice.value} sx={{ '& .MuiFormControlLabel-label': { fontSize: '20px' } }}/>:
                                                                    <MDBox>
                                                                        <MDTypography fontWeight={"bold"}>{"C"+(index1 + 1)+". "+choice.value}</MDTypography>
                                                                        {
                                                                            choice.choices.map((subChoice, index2) => {
                                                                                    return (
                                                                                        <FormControlLabel value={subChoice.id} control={<Radio />} label={String.fromCharCode(index2 + 65) + ". " +subChoice.value}/>
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