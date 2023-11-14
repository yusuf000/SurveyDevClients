// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import SimpleBlogCard from "../../examples/Cards/BlogCards/SimpleBlogCard";
import DataTable from "../../examples/Tables/DataTable";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import axios from "axios";

const url = `http://localhost:8080/api/v1/project`

function Dashboard() {
    const [projectData, setProjectData] = useState(null);
    const [totalRunningProject, setTotalRunningProject] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const getTotalRunningProject = (data)=>{
        let count= 0;
        data.forEach((project)=>{
            if(project.status === 'running'){
                count++;
            }
        })
        return count;
    }
    const loadData = () => {
        const token = localStorage.getItem('token');
        axios
            .get(url, {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then((response) => {
                if(response.data.length !== 0){
                    setProjectData(response.data);
                    setIsDataLoaded(true);
                    setTotalRunningProject(getTotalRunningProject(response.data))
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleOnClickProject = () => {
        console.log('project clicked');
    }


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <SimpleBlogCard
                                title="Create Project"
                                description="Start right away by creating a project and adding questions"
                                action={{
                                    type: "internal",
                                    route: "/somewhere",
                                    color: "info",
                                    label: "create"
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <DefaultInfoCard
                                icon="folder"
                                title="Total Running Projects"
                                description="Running projects can still take answers"
                                value={totalRunningProject+""}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            {
                                isDataLoaded ? <Card>
                                    <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3} mx={3}>
                                        Your Projects
                                    </MDTypography>
                                    <DataTable
                                        table={{
                                            columns: [
                                                {Header: "project name", accessor: "name", width: "35%"},
                                                {Header: "client", accessor: "clientName"},
                                                {Header: "start date", accessor: "startDate"},
                                                {Header: "end date", accessor: "endDate"},
                                            ],
                                            rows: projectData
                                        }}/>
                                </Card> :null
                            }
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    );

}

export default Dashboard;
