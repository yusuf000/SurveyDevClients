import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import Card from "@mui/material/Card";
import MDButton from "../../components/MDButton";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import React, {useEffect, useRef, useState} from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import Choice from "./Components/Choice";
import DialogContentText from "@mui/material/DialogContentText";
import {useLocation, useNavigate} from "react-router-dom";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

const url = `http://localhost:8080`

function Question() {

    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openAddChoiceDialog, setOpenAddChoiceDialog] = React.useState(false);
    const [questionType, setQuestionType] = useState("descriptive");
    const [language, setLanguage] = useState();
    const questionDescriptionRef = useRef(null);
    const [languageData, setLanguageData] = useState();
    const [isLanguageDataLoaded, setIsLanguageDataLoaded] = useState(false);
    const [questionTypeData, setQuestionTypeData] = useState();
    const [isQuestionTypeDataLoaded, setIsQuestionTypeDataDataLoaded] = useState(false);
    const [choiceData, setChoiceData] = useState([]);
    const [isChoiceAdded, setIsChoiceAdded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const choiceValueRef = useRef(null);
    const token = localStorage.getItem('token');
    const [choiceSubChoiceMap,setChoiceSubChoiceMap] = useState(new Map());
    let currentSubChoices = [];
    const [choiceIdSeq, setChoiceIdSeq] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    if (location.state != null) {
        localStorage.setItem("phaseId", location.state.phaseId)
    }

    const phaseId = localStorage.getItem("phaseId");


    function prepareChoices() {
        const choices = [];
        for (let i = 0; i < choiceData.length; i++) {
            const subChoices = [];
            const subChoicesForChoice =  choiceSubChoiceMap.get(choiceData[i].id);
            for (let j = 0; j < subChoicesForChoice.length; j++) {
                subChoices.push({serial: j, value: subChoicesForChoice[j].value});
            }
            choices.push({serial: i, value: choiceData[i].value, choices: subChoices})
        }
        return choices;
    }

    const doCreateQuestion = () => {
        const choices = prepareChoices();
        axios
            .post(url + "/api/v1/question/add", {
                description: questionDescriptionRef.current.value,
                languageCode: language,
                questionType: questionType,
                phaseId: phaseId,
                choices: choices
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(() => {
                handleClickOpenSuccessDialog();
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const loadLanguages = () => {
        axios
            .get(url + "/api/v1/language", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setLanguageData(response.data);
                setIsLanguageDataLoaded(true);
            })
            .catch((e) => {
                if(e.response.status === 403){
                    localStorage.clear();
                    navigate('/authentication/sign-in')
                }
            })
    }

    const loadQuestionTypes = () => {
        axios
            .get(url + "/api/v1/question-type", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setQuestionTypeData(response.data);
                setIsQuestionTypeDataDataLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadData = () => {
        loadLanguages();
        loadQuestionTypes();
    }

    const handleClickOpenSuccessDialog = () => {
        setOpenSuccessDialog(true);
    };

    const handleClickCloseSuccessDialog = () => {
        questionDescriptionRef.current.value = "";
        setChoiceData([])
        setIsChoiceAdded(false)
        setChoiceSubChoiceMap(new Map())
        setChoiceIdSeq(0)
        setOpenSuccessDialog(false);
    };

    const handleClickOpenErrorDialog = () => {
        setOpenErrorDialog(true);
    };

    const handleCloseAddChoiceDialog = () => {
        setOpenAddChoiceDialog(false);
    };

    const handleClickOpenAddChoiceDialog = () => {
        setOpenAddChoiceDialog(true);
    };

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };

    const handleOnLanguageSelect = (event) => {
        setLanguage(event.target.value);
    };

    const handleOnQuestionTypeSelect = (event) => {
        setQuestionType(event.target.value);
    };

    const handleOnAddChoiceClick = () => {
        if (questionType === "descriptive") {
            setErrorMessage("Can't add choice in a descriptive type question");
            handleClickOpenErrorDialog();
        } else {
            handleClickOpenAddChoiceDialog();
        }
    };

    function handleAddChoice() {
        const choiceValue = choiceValueRef.current.value;
        if(choiceValue){
            setChoiceSubChoiceMap(choiceSubChoiceMap.set(choiceIdSeq, currentSubChoices));
            setChoiceData([...choiceData, {value: choiceValue, id: choiceIdSeq}]);
            setChoiceIdSeq(choiceIdSeq + 1);
            currentSubChoices = [];
            setIsChoiceAdded(true)
        }
        handleCloseAddChoiceDialog()
    }

    const validInput = () => {
        if(!questionDescriptionRef.current.value || !language || !questionType){
            setErrorMessage("Please fill up all the details to create question");
            return false;
        }else if(questionType !== "descriptive" && choiceData.length === 0){
            setErrorMessage("Non descriptive type question should have choices to select");
            return false;
        }else{
            return true;
        }
    }


    const handleOnCreateClick = () => {
        if(validInput()){
            doCreateQuestion();
        }else{
            handleClickOpenErrorDialog();
        }
    };


    const onDeleteChoiceClick = (id) => {
        const newChoiceData = choiceData.filter(function (element) {
            return element.id !== id;
        })
        setChoiceData(newChoiceData);
        if(newChoiceData.length === 0){
            setIsChoiceAdded(false)
        }
    }


    useEffect(() => {
        loadData();
    }, []);

    function SuccessDialog() {
        return (
            <Dialog open={openSuccessDialog} onClose={handleClickCloseSuccessDialog}>
                <DialogTitle color="green"><Icon fontSize="medium">check_circle_outline</Icon> &nbsp; Success</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="success"> Question created successfully</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseSuccessDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function ErrorDialogue() {
        return (
            <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                <DialogTitle color="red"><Icon fontSize="small">error</Icon> &nbsp; Error</DialogTitle>
                <DialogContent>
                    <MDTypography fontSize="small" color="error"> {errorMessage}</MDTypography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    function AddChoiceDialog() {
        const subChoiceRef = useRef();
        const [subChoiceIdSeq, setSubChoiceIdSeq] = useState(0);
        const [inputMap, setInputMap] = useState({
            formValues: []
        });

        const addFormFields = ()=> {
            setInputMap(({
                formValues: [...inputMap.formValues, { subChoiceName: subChoiceRef.current.value, subChoiceId: subChoiceIdSeq}]
            }))
            currentSubChoices.push({value: subChoiceRef.current.value, id: subChoiceIdSeq});
            setSubChoiceIdSeq(subChoiceIdSeq + 1);
            subChoiceRef.current.value = "";
        }

        function removeFormFields(i) {
            let formValues = inputMap.formValues;
            currentSubChoices = currentSubChoices.filter(function (element) {
                return element.id !== formValues[i].subChoiceId;
            });
            formValues.splice(i, 1);
            setInputMap({ formValues });
        }

        function SubChoice(){
            return (
                <MDBox>
                    {inputMap.formValues.map((element, index) => (
                        <MDBox mb={2} key={index}>
                            <Grid container spacing={3}>
                                <Grid item >
                                    <MDInput type="email" label="Subchoice value" value={element.subChoiceName} disabled={true}></MDInput>
                                </Grid>
                                <Grid item>
                                    <MDButton  color="error" onClick={() => removeFormFields(index)}>
                                        <Icon>delete</Icon>
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox>
                    ))
                    }
                </MDBox>
            );
        }

        return (
            <Dialog open={openAddChoiceDialog} onClose={handleCloseAddChoiceDialog}>
                <DialogTitle>Add Choice</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a choice fill up the necessary details below.
                    </DialogContentText>
                    <MDBox mb={2}></MDBox>
                    <MDBox mb={2}>
                        <MDInput type="email" label="value" inputRef={choiceValueRef} fullWidth/>
                    </MDBox>
                    <SubChoice/>
                    <MDBox mb={2}>
                        <MDInput type="email" label="Optional Subchoice" inputRef={subChoiceRef} fullWidth/>
                    </MDBox>
                    <MDBox  mb={2}>
                        <MDButton  color="info" onClick={addFormFields} fullWidth>
                             Add Subchoice
                        </MDButton>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddChoiceDialog}>Cancel</Button>
                    <Button onClick={handleAddChoice}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }


    function ChoiceBox(){
        return (
            <Card>
                <MDBox pt={3} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                        Choices
                    </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        {
                            choiceData.map((option, index) => {
                                    return (
                                        <Choice
                                            name={option.value}
                                            id={option.id}
                                            serial={index + 1}
                                            onDeleteClick={onDeleteChoiceClick}
                                            subChoices={choiceSubChoiceMap.get(option.id)}
                                        />
                                    )
                                }
                            )
                        }
                    </MDBox>
                </MDBox>
            </Card>
        );
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <ErrorDialogue/>
            <SuccessDialog/>
            <AddChoiceDialog/>
            <MDBox mb={2}>
                <Card>
                    <MDBox mb={2} mt={2} ml={2} mr={2}>
                        <MDBox mb={2}>
                            <MDTypography variant="h5" fontWeight="medium" color="dark">
                                Please give the necessary information to add a question
                            </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Description" inputRef={questionDescriptionRef} fullWidth/>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth>
                                <InputLabel id="language-label">Language</InputLabel>
                                {
                                    isLanguageDataLoaded ? <Select
                                        labelId="language-label"
                                        id="language-select"
                                        value={language}
                                        label="Language"
                                        onChange={handleOnLanguageSelect}
                                        sx={{minHeight: 45}}
                                    >
                                        {
                                            languageData.map(option => {
                                                    return (
                                                        <MenuItem
                                                            value={option.code}>
                                                            {option.name}
                                                        </MenuItem>
                                                    )
                                                }
                                            )
                                        }
                                    </Select> : null
                                }
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth>
                                <InputLabel id="question-type-label">Question Type</InputLabel>
                                {
                                    isQuestionTypeDataLoaded ? <Select
                                        labelId="question-type-label"
                                        id="question-type-select"
                                        value={questionType}
                                        label="Question type"
                                        onChange={handleOnQuestionTypeSelect}
                                        sx={{minHeight: 45}}
                                    >
                                        {
                                            questionTypeData.map(option => {
                                                return (
                                                    <MenuItem
                                                        value={option.name}>
                                                        {option.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select> : null
                                }
                            </FormControl>
                        </MDBox>
                        <Grid container spacing={2}>
                            <Grid item>
                                <MDBox mb={2}>
                                    <MDButton variant="gradient" color="light" onClick={handleOnAddChoiceClick}>
                                        Add a choice
                                    </MDButton>
                                </MDBox>
                            </Grid>
                            <Grid item>
                                <MDBox mb={2}>
                                    <MDButton variant="gradient" color="info" onClick={handleOnCreateClick}>
                                        Create
                                    </MDButton>
                                </MDBox>
                            </Grid>
                        </Grid>
                    </MDBox>
                </Card>
            </MDBox>
            {
                isChoiceAdded ? <MDBox mb={2}>
                    <ChoiceBox/>
                </MDBox> : null
            }
        </DashboardLayout>
    );
}

export default Question;