import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import React from "react";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import Result from "../index";
import {useLocation, useNavigate} from "react-router-dom";

function ResultDetails() {
    const location = useLocation();

    if (location.state != null) {
        localStorage.setItem("question", location.state.question)
    }

    const question = JSON.parse(localStorage.getItem('question'));

    return (
        <DashboardLayout>
            <DashboardNavbar/>
        </DashboardLayout>
    )
}

export default ResultDetails;