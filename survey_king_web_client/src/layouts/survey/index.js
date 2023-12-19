import Question from "../question";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const url = `http://localhost:8080/`

function Survey(){
    const navigate = useNavigate();
    const project = JSON.parse(localStorage.getItem('project'));
    const phase = JSON.parse(localStorage.getItem('phase'));
    const isStarted = localStorage.getItem('isStarted');
    const previousQuestion = JSON.parse(localStorage.getItem('previousQuestion'));
    const [currentQuestion, setCurrentQuestion] = useState(null);
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

    function getNextQuestion() {
        const token = localStorage.getItem('token');
        axios
            .get(url + 'api/v1/question/next', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: previousQuestion.id
                }
            })
            .then((response) => {
                setCurrentQuestion(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        if(isStarted){
            //getNextQuestion();
        }else{
            startPhase();
        }
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
        </DashboardLayout>
    )
}
export default Survey;