//require mongoose
const mongoose = require("mongoose");


const questionDataSchema = mongoose.Schema({
    Question: { type: String, required: true, trim: true },
    OptionA: { type: String, required: true, trim: true },
    OptionB: { type: String, required: true, trim: true },
    OptionC: { type: String, required: true, trim: true },
    OptionD: { type: String, required: true, trim: true },
    CorrectAnswer: { type: String, required: true, trim: true },
    FurtherExplanation: { type: String, required: true, trim: true }
});

//create model
const questionDataModel = mongoose.model("questionData", questionDataSchema);

//export default model
module.exports = questionDataModel;