import {Question} from "model/Question";
import MDBox from "../components/MDBox";
import TextField from "@mui/material/TextField";
import React from "react";
export class DescriptiveQuestion extends Question{
    answerDescription;
    constructor(data, answerDescription) {
        super(data);
        this.answerDescription = answerDescription;
    }

    getView() {
        return <MDBox m={2}>
            <TextField
                label="Answer"
                multiline
                rows={3}
                fullWidth
                inputRef={this.answerDescription}
            />
        </MDBox>
    }
}
