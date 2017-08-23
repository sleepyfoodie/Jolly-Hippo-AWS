const mongoose = require("mongoose"),
      Schema = mongoose.Schema;
      ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    first: {type: String, required: true},
    last: {type: String, required: true},
    city: {type: String, required: true},
    postal: {type: String, required: true},
    password: {type: String, required: true},
    passwords: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    occupation: {type: String, required: true},
    boy: {type: String, required: true},
    girl: {type: String, required: true}
    // dealership_id: ObjectId
});

const User = mongoose.model('User', userSchema);

module.exports = User;