// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import React, {useEffect, useState} from "react";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import reportsBarChartData from "./data/reportsBarChartData";
import ReportsBarChart from "../../examples/Charts/BarCharts/ReportsBarChart";
import MDButton from "../../components/MDButton";
import Icon from "@mui/material/Icon";
import MDTypography from "../../components/MDTypography";

const url = `http://localhost:8080`


function Dashboard() {
    const [totalRunningProject, setTotalRunningProject] = useState(0);
    const [runningProjectData, setRunningProjectData] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responseBarChartData, setResponseBarChartData] = useState();
    const navigate = useNavigate();

    function loadResponseCountForProject(sasCode) {
        const token = localStorage.getItem('token');
        axios
            .get(url + "/api/v1/analytics/response_count", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'sasCode': sasCode
                }
            })
            .then((response) => {
                if (response.data) {
                    setResponseBarChartData(response.data)
                }
            })
            .catch((e) => {
                if (e.response && e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    function loadData() {
        const token = localStorage.getItem('token');
        axios
            .get(url + "/api/v1/project/running", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setTotalRunningProject(response.data.length);
                if(response.data.length !== 0){
                    setRunningProjectData(response.data);
                    setCurrentIndex(0)
                    loadResponseCountForProject(response.data[currentIndex].sasCode);
                }
            })
            .catch((e) => {
                if (e.response && e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    function onBackward(){
        if(currentIndex === 0) return
        const index = currentIndex;
        setCurrentIndex(index - 1);
        loadResponseCountForProject(runningProjectData[index - 1].sasCode)
    }

    function onForward(){
        if(currentIndex === runningProjectData.length - 1) return
        const index = currentIndex;
        setCurrentIndex(index + 1);
        loadResponseCountForProject(runningProjectData[index + 1].sasCode)
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>

            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <DefaultInfoCard
                                icon="folder"
                                title="Total Running Projects you own"
                                description="Running projects can still take answers"
                                value={totalRunningProject + ""}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                {
                    responseBarChartData ? <MDBox mt={4.5}>
                        <Grid container spacing={1}>
                            <Grid item lg={15}>
                                <Grid container spacing={1} justifyContent="left" alignItems="center">
                                    <Grid item xs={12} md={6} lg={12}>
                                        <MDBox mb={3}>
                                            <ReportsBarChart
                                                color="info"
                                                title={runningProjectData[currentIndex].projectName}
                                                description="Submission count for last 7 days"
                                                date={"project started " + runningProjectData[currentIndex].startedFor + " days ago"}
                                                count={"Total "+ responseBarChartData.total+ " responses received"}
                                                chart={responseBarChartData}
                                                index={currentIndex + 1}
                                                onForward={onForward}
                                                onBackward={onBackward}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MDBox> : null
                }
            </MDBox>

        </DashboardLayout>
    );

}

export default Dashboard;
