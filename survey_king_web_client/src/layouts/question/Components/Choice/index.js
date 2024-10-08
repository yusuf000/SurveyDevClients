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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import {useMaterialUIController} from "context";

function Choice({name, id, serial, noGutter, onDeleteClick, subChoices}) {
    const [controller] = useMaterialUIController();
    const {darkMode} = controller;

    return (
        <MDBox
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor={darkMode ? "transparent" : "grey-100"}
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
        >
            <MDBox width="100%" display="flex" flexDirection="column">
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{xs: "flex-start", sm: "center"}}
                    flexDirection={{xs: "column", sm: "row"}}
                    mb={2}
                >
                    <MDBox>
                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                            {serial + ". " +name}
                        </MDTypography>
                    </MDBox>
                    <MDBox display="flex" alignItems="center" mt={{xs: 2, sm: 0}} ml={{xs: -1.5, sm: 0}}>
                        <MDBox mr={1}>
                            <MDButton variant="text" color="error" onClick={() => onDeleteClick(id)}>
                                <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
            <MDBox>
                {
                    subChoices.map((option, index) => {
                        return (
                            <MDBox>
                                <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                                    {(index + 1) + ". "+ option.value}
                                </MDTypography>
                            </MDBox>
                        )
                    })
                }
            </MDBox>
        </MDBox>
    );
}

// Setting default values for the props of Bill
Choice.defaultProps = {
    noGutter: false,
};

// Typechecking props for the Bill
Choice.propTypes = {
    name: PropTypes.string.isRequired
};

export default Choice;
