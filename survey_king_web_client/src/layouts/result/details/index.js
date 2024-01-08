import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import Result from "../index";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import MDTypography from "../../../components/MDTypography";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import DataTable from "../component/DataTable";

const url = `http://localhost:8080/`

function ResultDetails() {
    const [answerData, setAnswerData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const location = useLocation();
    const navigate = useNavigate();

    if (location.state != null) {
        localStorage.setItem("question", location.state.question)
    }

    const question = JSON.parse(localStorage.getItem('question'));

    function onBackward(){
        if(currentPage === 0) return
        const index = currentPage;
        setCurrentPage(index - 1);
        loadResponsesList(index - 1);
    }

    function onForward(){
        if(currentPage === totalPage - 1) return
        const index = currentPage;
        setCurrentPage(index + 1);
        loadResponsesList(index + 1);
    }

    const prepareTabledata = (data) => {
        let tableData = [];
        for (let i in data) {
            let item = data[i];
            tableData.push({
                "date": item.date,
                "userName": item.id.userId,
                "answer": item.answers[0].description
            });

        }
        return tableData;
    }

    const loadResponsesList = (pageNo) => {
        const token = localStorage.getItem('token');
        axios
            .get(url + "api/v1/analytics/responses", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: question.id,
                    pageNo: pageNo
                }
            })
            .then((response) => {
                if (response.data.content.length !== 0) {
                    setTotalPage(response.data.totalPages);
                    setAnswerData(prepareTabledata(response.data.content));
                }
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    const loadResponsesChart = (pageNo) => {
        /*const token = localStorage.getItem('token');
        axios
            .get(url + "api/v1/analytics/responses", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    questionId: question.id,
                    pageNo: pageNo
                }
            })
            .then((response) => {
                if (response.data.content.length !== 0) {
                    setTotalPage(response.data.totalPages);
                    setAnswerData(prepareTabledata(response.data.content));
                }
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })*/
    }

    function Descriptive() {
        return (
            <MDBox>
                {
                    answerData ? <MDBox mt={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                {
                                    <Card>
                                        <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3}
                                                      mx={3}>
                                            {question.description}
                                        </MDTypography>
                                        <DataTable
                                            entriesPerPage={
                                                {
                                                    defaultValue: 10, entries: [5, 10, 15, 20, 25]
                                                }
                                            }
                                            index={currentPage + 1}
                                            total={totalPage}
                                            onForward={onForward}
                                            onBackward={onBackward}
                                            table={{
                                                columns: [
                                                    {Header: "date", accessor: "date"},
                                                    {Header: "user", accessor: "userName"},
                                                    {Header: "answer", accessor: "answer", width: "50%"}
                                                ],
                                                rows: answerData
                                            }}/>
                                    </Card>
                                }
                            </Grid>
                        </Grid>
                    </MDBox> : null
                }
            </MDBox>
        )
    }

    function NonDescriptive() {

    }

    useEffect(() => {
        if (question.questionType.name === "descriptive") {
            loadResponsesList(0);
        }else{
            loadResponsesChart();
        }
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {
                question.questionType.name === "descriptive" ? <Descriptive/> : <NonDescriptive/>
            }
        </DashboardLayout>
    )
}

export default ResultDetails;