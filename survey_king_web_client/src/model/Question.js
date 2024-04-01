export class Question{
    id;
    serial;
    questionType;
    description;
    phaseId;
    constructor(data) {
        this.id = data.id;
        this.serial = data.serial;
        this.questionType = data.questionType;
        this.description = data.description;
        this.phaseId = data.phaseId;
    }
}
