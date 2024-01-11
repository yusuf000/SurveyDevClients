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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/bg6.jpg";
import bgBack from "assets/images/bg4.jpg";

function Information() {
    return (
        <MKBox component="section" py={6} my={6}>
            <Container>
                <Grid container item xs={11} spacing={3} alignItems="center" sx={{mx: "auto"}}>
                    <Grid item xs={12} lg={4} sx={{mx: "auto"}}>
                        <RotatingCard>
                            <RotatingCardFront
                                image={bgFront}
                                icon="touch_app"
                                title={
                                    <>
                                        Powerful visuals
                                        <br/>
                                        for your data
                                    </>
                                }
                                description="Transform raw survey data into powerful visualizations."
                            />
                            <RotatingCardBack
                                image={bgBack}
                                title="Discover More"
                                description="
Intuitive survey builder for easy question and option addition.
Quick and hassle-free survey creation process."
                                action={{
                                    type: "internal",
                                    route: "/authentication/sign-in",
                                    label: "start now",
                                }}
                            />
                        </RotatingCard>
                    </Grid>
                    <Grid item xs={12} lg={7} sx={{ml: "auto"}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <DefaultInfoCard
                                    icon="folder"
                                    title="Project Management"
                                    description="Create distinct projects for different surveys & organize surveys efficiently with project-based structuring"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DefaultInfoCard
                                    icon="lock"
                                    title="Member Management and Access Control"
                                    description="Effortlessly manage team members within your workspace.
Assign specific roles and permissions per project."
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mt: {xs: 0, md: 6}}}>
                            <Grid item xs={12} md={6}>
                                <DefaultInfoCard
                                    icon="alt_route"
                                    title="Custom Logic for Survey Flow"
                                    description="Implement custom logic to dynamically skip questions based on responses.
Tailor the survey experience to individual participant journeys."
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DefaultInfoCard
                                    icon="account_tree"
                                    title="Multi-Level Choice Options"
                                    description="Add multiple layers of choices for comprehensive responses.
Capture nuanced participant feedback with nested options."
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </MKBox>
    );
}

export default Information;
