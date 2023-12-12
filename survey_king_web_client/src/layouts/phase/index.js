import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import Card from "@mui/material/Card";
import Choice from "../question/Components/Choice";
import Question from "./components/question";

const url = `http://localhost:8080/`
function PhaseDetails(){
    const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false)
    const [questionData, setQuestionData] = useState([])
    const location = useLocation();

    if (location.state != null) {
        localStorage.setItem("phaseId", location.state.phaseId)
    }

    const phaseId = localStorage.getItem("phaseId");

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
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        loadQuestions();
    }, []);

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
                            questionData.map(option => {
                                    option.choices.sort((a,b) => a.serial - b.serial);
                                    return (
                                        <Question
                                            id={option.id}
                                            serial={option.serial}
                                            description={option.description}
                                            language={option.language}
                                            questionType={option.questionType}
                                            choices={option.choices}
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
           <MDBox>
               {
                   isQuestionsLoaded ? <QuestionBox/> : null
               }
           </MDBox>
       </DashboardLayout>
    );
}

export default PhaseDetails;