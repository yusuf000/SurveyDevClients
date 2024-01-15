/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

// Images
import bgImage from "assets/images/bg4.jpg";
import axios from "axios";
import {useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BasicLayout from "../components/BasicLayout";

const url = `http://localhost:8080/api/v1/auth/change-password`

function ChangePassword() {
    const [queryParams] = useSearchParams()
    const passwordRef = useRef();
    const repeatedPasswordRef = useRef();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const checkIfMatch = () => {
        return passwordRef.current.value === repeatedPasswordRef.current.value;
    }
    const changePassword = () => {
        if (!passwordRef.current || !repeatedPasswordRef.current) {
            setErrorMessage("password change failed,please give valid information");
            return;
        }
        if (!checkIfMatch(passwordRef.current.value, repeatedPasswordRef.current.value)) {
            setErrorMessage("passwords don't match");
            return;
        }
        setErrorMessage(null);
        axios
            .post(url, {
                password: passwordRef.current.value,
                token: queryParams.get("token")
            }, {})
            .then((response) => {
                if (response.data) {
                    navigate("/authenticate/sign-in")
                } else {
                    setErrorMessage("Password change failed,please try again");
                }
            })
            .catch((error) => {
                setErrorMessage("Password change failed,please try again");
            })
    }

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    py={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                        Change Password
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={1}>
                            <MDInput type="password" label="Password" variant="standard" fullWidth
                                     inputRef={passwordRef}/>
                        </MDBox>
                        <MDBox mb={1}>
                            <MDInput type="password" label="Confirm Password" variant="standard" fullWidth
                                     inputRef={repeatedPasswordRef}/>
                        </MDBox>
                        {
                            errorMessage ?
                                <MDBox mb={4}>
                                    <MDTypography variant={"button"} color={"error"}>{errorMessage}</MDTypography>
                                </MDBox> : null
                        }
                        <MDBox mt={6} mb={1}>
                            <MDButton variant="gradient" color="info" fullWidth onClick={changePassword}>
                                Confirm
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    )
        ;
}

export default ChangePassword;
