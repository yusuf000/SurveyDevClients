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
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg4.jpg";
import BasicLayout from "../../components/BasicLayout";
import axios from "axios";
import React, {useRef, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {BouncingBalls} from "react-cssfx-loading";

const url = `http://203.161.57.194:8080/api/v1/auth/reset-password`



function ForgotPassword() {
    const emailRef = useRef();
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const resetPassword = () => {
        if (!emailRef.current) {
            setSuccessMessage(null)
            setErrorMessage("Registration failed,please give valid information");
            return;
        }
        handleClickOpenLoadingDialog();
        setSuccessMessage(null)
        setErrorMessage(null)
        axios
            .post(url, {}, {
                params: {
                    email: emailRef.current.value
                }
            })
            .then((response) => {
                handleClickCloseLoadingDialog();
                if (response.data) {
                    setErrorMessage(null)
                    setSuccessMessage("Password reset mail sent to " + emailRef.current.value);
                    emailRef.current.value = "";
                } else {
                    setSuccessMessage(null)
                    setErrorMessage("Password reset failed,please give valid information");
                }
            })
            .catch((error) => {
                handleClickCloseLoadingDialog();
                setErrorMessage("Password reset failed,please try again");
            })
    }

    const handleClickOpenLoadingDialog = () => {
        setOpenLoadingDialog(true);
    }

    const handleClickCloseLoadingDialog = () => {
        setOpenLoadingDialog(false);
    }

    function LoadingDialog({}) {
        return (
            <Dialog open={openLoadingDialog} onClose={handleClickCloseLoadingDialog}>
                <DialogContent>
                    <BouncingBalls color="#2882eb" width="35px" height="10px" duration="1s"/>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <BasicLayout image={bgImage}>
            <LoadingDialog/>
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
                        Reset Password
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        You will receive an e-mail in maximum 60 seconds
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={1}>
                            <MDInput type="email" label="Email" variant="standard" fullWidth inputRef={emailRef}/>
                        </MDBox>
                        {
                            errorMessage ?
                                <MDBox mb={4}>
                                    <MDTypography variant={"button"} color={"error"}>{errorMessage}</MDTypography>
                                </MDBox> : null
                        }
                        {
                            successMessage ? <MDBox mb={4}>
                                <MDTypography variant={"button"} color={"success"}>{successMessage}</MDTypography>
                            </MDBox> : null
                        }
                        <MDBox mt={6} mb={1}>
                            <MDButton variant="gradient" color="info" fullWidth onClick={resetPassword}>
                                reset
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default ForgotPassword;
