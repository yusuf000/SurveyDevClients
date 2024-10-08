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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
 */

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import PhaseDetails from "./layouts/phase"
import ProjectDetails from "./layouts/project/details"
import Projects from "./layouts/project";
import Question from "./layouts/question";
import Survey from "./layouts/survey";
import Author from "./pages/LandingPages/Author";
import AboutUsPage from "./layouts/about-us";
import ContactUsPage from "./layouts/contact-us";
import Result from "./layouts/result";
import ResultDetails from "./layouts/result/details";
import ForgotPassword from "./layouts/authentication/reset-password/cover";
import ChangePassword from "./layouts/authentication/change-password";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },{
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/projects",
    component: <Projects />,
  },
  {
    type: "",
    name: "Project Details",
    key: "project_details",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/project-details",
    component: <ProjectDetails />,
  },
  {
    type: "",
    name: "Result",
    key: "result",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/result",
    component: <Result />,
  },
  {
    type: "",
    name: "Result Details",
    key: "result-details",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/result-details",
    component: <ResultDetails />,
  },
  {
    type: "",
    name: "Phase Details",
    key: "phase_details",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/phase-details",
    component: <PhaseDetails />,
  },
  {
    type: "",
    name: "Question Add",
    key: "question_add",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/question-add",
    component: <Question />,
  },
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  /*{
    type: "",
    name: "AboutUs",
    key: "about-us",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/about-us",
    component: <AboutUsPage />,
  },*/
  {
    type: "",
    name: "Author",
    key: "author",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/author",
    component: <Author />,
  },
  {
    type: "",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "",
    name: "Change Password",
    key: "change-password",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/change-password",
    component: <ChangePassword />,
  },
  {
    type: "",
    name: "ContactUs",
    key: "contact-us",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/contact-us",
    component: <ContactUsPage />,
  },
  {
    type: "",
    name: "Survey",
    key: "survey",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/survey",
    component: <Survey />,
  }
];

export default routes;
