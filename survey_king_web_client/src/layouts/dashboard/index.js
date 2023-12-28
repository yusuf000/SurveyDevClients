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

const url = `http://localhost:8080/api/v1/project`


function Dashboard() {
    const [totalRunningProject, setTotalRunningProject] = useState(0);
    const navigate = useNavigate();

    function loadData() {
        const token = localStorage.getItem('token');
        axios
            .get(url + "/running", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setTotalRunningProject(response.data);
            })
            .catch((e) => {
                if(e.response.status === 403){
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    useEffect(() => {
        loadData();
    },[]);


    return (
        <DashboardLayout>
            <DashboardNavbar/>

            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <DefaultInfoCard
                                icon="folder"
                                title="Total Running Projects"
                                description="Running projects can still take answers"
                                value={totalRunningProject + ""}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );

}

export default Dashboard;
