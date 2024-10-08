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

// react-router-dom components
import {Link, useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import bgImage from "assets/images/bg6.jpg";
import React, {useRef, useState} from "react";
import axios from "axios";
import BasicLayout from "../components/BasicLayout";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {BouncingBalls} from "react-cssfx-loading";

const registerURL = `http://203.161.57.194:8080/api/v1/auth/register`

function Cover() {
    const fullNameRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const retypePasswordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const navigate = useNavigate();
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleOpenConfirmationDialog = () => {
        setOpenConfirmationDialog(true);
    }

    const handleClickCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    }

    function ConfirmationDialog() {
        return (
            <Dialog open={openConfirmationDialog} onClose={handleClickCloseConfirmationDialog}>
                <DialogTitle color="info"><Icon fontSize="medium">info</Icon> &nbsp; Terms and Conditions of
                    Use</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="black">

                        1. By accessing and using this website, you agree to comply with and be bound by the following
                        terms and conditions. If you do not agree to these terms, please refrain from using the website.

                        2. Users are required to register on the website by providing accurate and complete information,
                        including but not limited to name, username, and password.
                        Users are responsible for maintaining the confidentiality of their account information and
                        password.
                        3. Registered users can create projects on the website, including the ability to formulate and post
                        questions.
                        The question creator may grant access to other registered users to answer the posted questions.
                        4. The website collects and processes personal information in accordance with our Privacy Policy.
                        Users have the option to control the visibility of their projects and responses within the
                        privacy settings.
                        5.  The question creator can visualize responses through charts and graphs generated by the
                        website's features.
                        The website reserves the right to aggregate and anonymize data for statistical purposes.
                        6. Users agree to use the website in compliance with all applicable laws and regulations.
                        Users must not engage in any activity that may disrupt or interfere with the proper functioning
                        of the website.
                        7. Users retain ownership of their content posted on the website.
                        The website reserves the right to use aggregated and anonymized data for research and
                        improvement purposes.
                        8. The website reserves the right to terminate or suspend user accounts without prior notice for
                        violation of these terms.
                        9. The website is provided "as is" without any warranties, expressed or implied.
                        10. The website shall not be liable for any direct, indirect, incidental, special, or consequential
                        damages.
                        11. The website reserves the right to modify these terms and conditions at any time.

                        By using this website, you acknowledge that you have read, understood, and agree to be bound by
                        these terms and conditions.</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseConfirmationDialog}>Ok</Button>

                </DialogActions>
            </Dialog>
        );
    }

    const doRegister = ({fullName, userName, password}) => {
        handleClickOpenLoadingDialog();
        axios
            .post(registerURL, {
                name: fullName,
                userId: userName,
                password: password
            })
            .then((response) => {
                handleClickCloseLoadingDialog();
                if (response.data) {
                    navigate('/authentication/sign-in');
                } else {
                    setErrorMessage("Registration failed,please give valid information");
                }
            })
            .catch(() => {
                handleClickCloseLoadingDialog();
                setErrorMessage("Registration failed,please give valid information");
            })
    }

    const isValidInput = ({fullName, userName, password, retypePassword}) => {
        if (fullName === "" || userName === "") {
            setErrorMessage("Please enter valid information")
            return false;
        } else if (password.length < 5) {
            setErrorMessage("Password length must be more than four characters")
        } else if (password !== retypePassword) {
            setErrorMessage("Passwords don't match, please re enter password")
            return false;
        } else if (termsAgreed === false) {
            setErrorMessage("Agree terms to continue")
            return false;
        } else {
            return true;
        }
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        console.log('register clicked');
        const fullName = fullNameRef.current.value;
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const retypePassword = retypePasswordRef.current.value;
        if (isValidInput({fullName, userName, password, retypePassword})) {
            doRegister({fullName, userName, password});
        }
    }

    function handleChange() {
        setTermsAgreed(!termsAgreed);
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
            <ConfirmationDialog/>
            <Card mb={2}>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Join us today
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Enter your email and password to register
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput type="text" label="Name" variant="standard" inputRef={fullNameRef} fullWidth/>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="email" label="Email" variant="standard" inputRef={userNameRef} fullWidth/>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="password" label="Password" variant="standard" inputRef={passwordRef}
                                     fullWidth/>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="password" label="Re-enter password" variant="standard"
                                     inputRef={retypePasswordRef} fullWidth/>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" ml={-1}>
                            <Checkbox
                                checked={termsAgreed}
                                onChange={handleChange}
                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                sx={{cursor: "pointer", userSelect: "none", ml: -1}}
                            >
                                &nbsp;&nbsp;I agree the&nbsp;
                            </MDTypography>
                            <MDTypography
                                component="a"
                                onClick={handleOpenConfirmationDialog}
                                variant="button"
                                fontWeight="bold"
                                color="info"
                                textGradient
                            >
                                Terms and Conditions
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={1} mb={1}>
                            {
                                errorMessage ? <MDTypography variant={"button"}
                                                             color={"error"}>{errorMessage}</MDTypography> : null
                            }
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" color="info" onClick={handleOnClick} fullWidth>
                                sign Up
                            </MDButton>
                        </MDBox>
                        <MDBox mt={3} mb={1} textAlign="center">
                            <MDTypography variant="button" color="text">
                                Already have an account?{" "}
                                <MDTypography
                                    component={Link}
                                    to="/authentication/sign-in"
                                    variant="button"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                    Sign In
                                </MDTypography>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default Cover;
