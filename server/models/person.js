const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;
mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(`Error occured connecting to MongoDB: ${error}`);
    });

const numberSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minLength: 3 },
    number: { type: String, required: true, minLength: 8 },
});
numberSchema.plugin(uniqueValidator);

numberSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("number", numberSchema);
