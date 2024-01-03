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
import {useRef, useState} from "react";
import axios from "axios";
import BasicLayout from "../components/BasicLayout";

const registerURL = `http://localhost:8080/api/v1/auth/register`

function Cover() {
  const fullNameRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const retypePasswordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const navigate = useNavigate();

  const doRegister = ({fullName, userName, password}) => {
    axios
        .post(registerURL, {
          name: fullName,
          userId: userName,
          password: password
        })
        .then((response) => {
          if (response.data) {
            navigate('/authentication/sign-in');
          } else {
            setErrorMessage("Registration failed,please give valid information");
          }
        })
        .catch(() => {
          setErrorMessage("Registration failed,please give valid information");
        })
  }

  const isValidInput = ({fullName, userName, password, retypePassword}) => {
    if (fullName === "" || userName === "" || password === "" || retypePassword === "") {
      setErrorMessage("Please enter valid information")
      return false;
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

  return (
    <BasicLayout image={bgImage} errorMessage={errorMessage}>
      <Card>
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
              <MDInput type="text" label="Name" variant="standard" inputRef={fullNameRef} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" inputRef={userNameRef} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" inputRef={passwordRef} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Re-enter password" variant="standard" inputRef={retypePasswordRef} fullWidth />
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
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
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
