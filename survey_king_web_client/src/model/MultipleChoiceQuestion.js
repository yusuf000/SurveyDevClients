import {Question} from "model/Question";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import React from "react";
export class MultipleChoiceQuestion extends Question{
    choices = [];
    handleRadioChange;

    constructor(data, handleRadioChange) {
        super(data);
        this.choices = data.choices;
        this.handleRadioChange = handleRadioChange;
    }

    getView(){
        return <MDBox m={2}>
            <FormControl fullWidth>
                <RadioGroup onChange={this.handleRadioChange}
                >
                    {
                        this.choices.map((choice, index1) => {
                                return (
                                    <MDBox m={1}>
                                        {
                                            choice.choices.length === 0 ?
                                                <FormControlLabel value={choice.id} control={<Radio/>}
                                                                  label={"C" + (index1 + 1) + ". " + choice.value}
                                                                  sx={{'& .MuiFormControlLabel-label': {fontSize: '20px'}}}/> :
                                                <MDBox>
                                                    <MDTypography
                                                        fontWeight={"bold"}>{"C" + (index1 + 1) + ". " + choice.value}</MDTypography>
                                                    {
                                                        choice.choices.map((subChoice, index2) => {
                                                                return (
                                                                    <FormControlLabel value={subChoice.id}
                                                                                      control={<Radio/>}
                                                                                      label={String.fromCharCode(index2 + 65) + ". " + subChoice.value}/>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </MDBox>
                                        }
                                        <hr/>
                                    </MDBox>
                                )
                            }
                        )
                    }
                </RadioGroup>
            </FormControl>
        </MDBox>
    }
}
