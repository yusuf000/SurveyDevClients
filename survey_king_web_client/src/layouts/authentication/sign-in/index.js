import React, { useRef, useState } from "react";
// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

//axios to call apis
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDAlert from "../../../components/MDAlert";

const authURL = `api/v1/auth/authenticate`

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState(null)
  const [isInvalidCredentials, setInvalidCredentials] = useState(false)
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  function InvalidInputText() {
    return (
        <div className="invalid-feedback">
          <p>
            Username and/or password didn't match
          </p>
        </div>
    );
  }

  const doLogin = ({userName, password}) => {
    axios
        .post(authURL, {
          email: userName,
          password: password
        })
        .then((response) => {
          setToken(response.data.token)
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
          setInvalidCredentials(true)
        })

  }

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log('login clicked');
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    doLogin({userName, password});
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" ref={userNameRef} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" ref={passwordRef} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleOnClick} color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
