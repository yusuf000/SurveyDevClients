import {DescriptiveQuestion} from "model/DescriptiveQuestion";
import {MultipleChoiceQuestion} from "model/MultipleChoiceQuestion"

export class QuestionFactory{
    static getQuestion(data, answerDescription, handleRadioChange){
        switch (data.questionType.name){
            case "descriptive":
                return new DescriptiveQuestion(data, answerDescription);
            case "multiple-choice":
                return new MultipleChoiceQuestion(data, handleRadioChange);
            default:
                return null;
        }
    }
}