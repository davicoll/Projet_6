const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    //validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6}$/,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
