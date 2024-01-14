/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/contact.jpg";
import Container from "@mui/material/Container";
import * as emailjs from "emailjs-com";
import Footer from "../../../layouts/authentication/components/Footer";
import React from "react";

function ContactUs() {
    const sendMail = (e)=>{
        e.preventDefault();

        emailjs.sendForm('survey_devs', 'template_qz8s41j', e.target, 'DXUSxL8zeD4XsUAwL')
            .then((result) => {
                window.location.reload()
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <>
            <DefaultNavbar
                routes={routes}
                sticky
            />
            <MKBox minHeight="100vh"
                   width="100%"
                   sx={{
                       backgroundImage: ({functions: {linearGradient, rgba}, palette: {gradients}}) =>
                           `${linearGradient(
                               rgba(gradients.dark.main, 0.6),
                               rgba(gradients.dark.state, 0.6)
                           )}, url(${bgImage})`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       display: "grid",
                       placeItems: "center",
                   }}>
                <Container>
                    <MKBox
                        bgColor="white"
                        borderRadius="xl"
                        shadow="lg"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        mt={{xs: 20, sm: 18, md: 20}}
                        mb={{xs: 20, sm: 18, md: 20}}
                        mx={3}
                    >
                        <MKBox
                            variant="gradient"
                            bgColor="info"
                            coloredShadow="info"
                            borderRadius="lg"
                            p={2}
                            mx={2}
                            mt={-3}
                        >
                            <MKTypography variant="h3" color="white">
                                Contact us
                            </MKTypography>
                        </MKBox>
                        <MKBox p={3}>
                            <MKTypography variant="body2" color="text" mb={3}>
                                For further questions, including partnership opportunities, please email
                                osmansazid13@gmail.com / yusufst000@gmail.com or contact using our contact form.
                            </MKTypography>
                            <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={sendMail}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MKInput
                                            variant="standard"
                                            label="Full Name"
                                            InputLabelProps={{shrink: true}}
                                            name="full_name"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MKInput
                                            type="email"
                                            variant="standard"
                                            label="Email"
                                            InputLabelProps={{shrink: true}}
                                            name="email"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MKInput
                                            variant="standard"
                                            label="What can we help you?"
                                            placeholder="Describe your problem in at least 250 characters"
                                            InputLabelProps={{shrink: true}}
                                            multiline
                                            fullWidth
                                            rows={6}
                                            name="message"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                                    <MKButton type="submit" variant="gradient" color="info">
                                        Send Message
                                    </MKButton>
                                </Grid>
                            </MKBox>
                        </MKBox>
                    </MKBox>
                </Container>
            </MKBox>
            <Footer light />
        </>
    );
}

export default ContactUs;
