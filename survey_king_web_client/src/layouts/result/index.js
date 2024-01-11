import Projects from "../project";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "../../examples/Tables/DataTable";
import MDBox from "../../components/MDBox";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const url = `http://203.161.57.194:8080/`


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Result() {
    const [questionData, setQuestionData] = useState([])
    const location = useLocation();
    const navigate = useNavigate();

    if (location.state != null) {
        localStorage.setItem("project", location.state.project)
    }

    const project = JSON.parse(localStorage.getItem('project'));

    const onExpand = ({item}) => {
        navigate('/result-details', {state: {question: JSON.stringify(item)}});
    }

    const prepareTabledata = (data) => {
        let tableData = [];
        for (let i in data) {
            let item = data[i];
            tableData.push({
                "serial": item.serial,
                "questionType": item.questionType.name,
                "description": item.description,

                "expand": <MDTypography component="a" href="" role="button" onClick={() => onExpand({item})}
                                        color="info">
                    <Icon>arrow_outward</Icon>
                </MDTypography>,
            });

        }
        return tableData;
    }

    const loadQuestions = (phaseId) => {
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
                    response.data.sort((a, b) => a.serial - b.serial);
                    setQuestionData(prepareTabledata(response.data))

                }
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        loadQuestions(project.phases[newValue].id)
    };

    useEffect((e) => {
        handleChange(e, 0);
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {
                questionData ? <MDBox>
                    <MDBox>
                        <Box sx={{width: '100%'}}>
                            <Box>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    {
                                        project.phases.map((phase, index) => {
                                            return (
                                                <Tab label={phase.name} {...a11yProps(index)} />
                                            )
                                        })
                                    }
                                </Tabs>
                            </Box>
                        </Box>
                    </MDBox>
                    <MDBox mt={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                {
                                    <Card>
                                        <MDTypography variant="h5" fontWeight="medium" color="dark" mt={1} my={3}
                                                      mx={3}>
                                            Questions
                                        </MDTypography>
                                        <DataTable
                                            entriesPerPage={
                                                {
                                                    defaultValue: 10, entries: [5, 10, 15, 20, 25]
                                                }
                                            }
                                            table={{
                                                columns: [
                                                    {Header: "serial", accessor: "serial"},
                                                    {Header: "questionType", accessor: "questionType"},
                                                    {Header: "description", accessor: "description", width: "50%"},
                                                    {Header: "expand__", accessor: "expand"}
                                                ],
                                                rows: questionData
                                            }}/>
                                    </Card>
                                }
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox> : null
            }
        < /DashboardLayout>
    )
}

export default Result;