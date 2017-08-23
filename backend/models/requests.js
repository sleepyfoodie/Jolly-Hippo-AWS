const mongoose = require("mongoose"),
      Schema = mongoose.Schema;
      ObjectId = Schema.Types.ObjectId;

const requestSchema = new Schema({
    name: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    hourS: {type: String, required: true},
    minS: {type: String, required: true},
    amSpm: {type: String, required: true},
    hourE: {type: String, required: true},
    minE: {type: String, required: true},
    amEpm: {type: String, required: true},
    postal: {type: String, required: true},
    boy: {type: String, required: true},
    girl: {type: String, required: true},
    specialRequest: {type: String, required: true}
    // dealership_id: ObjectId
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;

