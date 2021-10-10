const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose
    .connect(url)
    .then((result) => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(`Error occured connecting to MongoDB: ${error}`);
    });

const numberSchema = new mongoose.Schema({ name: String, number: String });

numberSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("number", numberSchema);
