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


// Images
import bgImage from "assets/images/bg4.jpg";
import axios from "axios";
import React, {useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BasicLayout from "../components/BasicLayout";
import {BarWave, BouncingBalls, FadingBalls, Hypnosis} from "react-cssfx-loading";
import MDTypography from "../../../components/MDTypography";
import MDBox from "../../../components/MDBox";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const url = `http://203.161.57.194:8080/api/v1/auth/change-password`


function ChangePassword() {
    const [queryParams] = useSearchParams()
    const passwordRef = useRef();
    const repeatedPasswordRef = useRef();
    const [errorMessage, setErrorMessage] = useState(null);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const navigate = useNavigate();

    if(!queryParams.get("token")){
        navigate("/")
    }

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
        handleClickOpenLoadingDialog();
        setErrorMessage(null);
        axios
            .post(url, {
                password: passwordRef.current.value,
                token: queryParams.get("token")
            }, {})
            .then((response) => {
                handleClickCloseLoadingDialog();
                if (response.data) {
                    navigate("/authentication/sign-in")
                } else {
                    setErrorMessage("Password change failed,please try again");
                }
            })
            .catch((error) => {
                handleClickCloseLoadingDialog();
                setErrorMessage("Password change failed,please try again");
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
