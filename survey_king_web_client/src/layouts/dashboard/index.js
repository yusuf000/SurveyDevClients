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
import Icon from "@mui/material/Icon";

import {useNavigate} from "react-router-dom";

const url = `http://localhost:8080/api/v1/project`



function Dashboard() {
    const [projectData, setProjectData] = useState(null);
    const [totalRunningProject, setTotalRunningProject] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();
    const data = { name: "John", age: 30 };

    const getTotalRunningProject = (data)=>{
        let count= 0;
        data.forEach((project)=>{
            if(project.status === 'running'){
                count++;
            }
        })
        return count;
    }

    const onDelete = ({sasCode})=>{
        const token = localStorage.getItem('token');
        axios
            .post(url+"/delete", {},{
                headers: {
                    'Authorization': 'Bearer '+token
                },
                params:  {
                    'sasCode': sasCode
                }
            })
            .then(() => {
                loadData()
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const onExpand = ({item})=>{
        navigate('/project-details', { state: item });
    }

    const prepareTableData = (data)=>{
        let tableData = [];
        for(let i in data){
            let item = data[i];
            let sasCode = item.sasCode;
            tableData.push({
                "name" : item.name,
                "clientName" : item.clientName,
                "startDate" : item.startDate,
                "endDate" : item.endDate,
                "delete" : <MDTypography component="a" href="#" role="button" onClick={()=>onDelete({sasCode})} color="text">
                    <Icon>delete</Icon>
                </MDTypography>,
                "expand" : <MDTypography component="a" href="#" role="button" onClick={()=>onExpand({item})} color="text">
                    <Icon>arrow_outward</Icon>
                </MDTypography>
            });
        }
        return tableData;
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
                    setProjectData(prepareTableData(response.data));
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
                                    route: "/project-create",
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
                                                {Header: "delete", accessor: "delete"},
                                                {Header: "expand", accessor: "expand"}
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
