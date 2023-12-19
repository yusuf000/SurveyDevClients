import Question from "../question";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, {useEffect} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useLocation, useNavigate} from "react-router-dom";

function Survey(){
    const location = useLocation();
    const navigate = useNavigate();

    if (location.state != null) {
        localStorage.setItem("project", location.state.project);
    }

    const project = JSON.parse(localStorage.getItem('project'));
    const user = localStorage.getItem('user');

    useEffect(() => {
        //loadData();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
        </DashboardLayout>
    )
}
export default Survey;