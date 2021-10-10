const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackUser:${password}@cluster0.cdgme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const numberSchema = new mongoose.Schema({ name: String, number: String });
const Person = mongoose.model("number", numberSchema);

const paramAmount = process.argv.length;

switch (paramAmount) {
    case 5:
        createNewNumber();
        break;
    case 3:
        listRecords();
        break;
    default:
        console.log("No operations executed");
        mongoose.connection.close();
        break;
}

function createNewNumber() {
    const newName = process.argv[3];
    const newNumber = process.argv[4];
    const newNumberRecord = new Person({ name: newName, number: newNumber });

    newNumberRecord
        .save()
        .then((resp) => {
            console.log(`added ${resp.name} number ${resp.number} to phonebook`);
        })
        .finally(() => {
            mongoose.connection.close();
        });
}

function listRecords() {
    Person.find({})
        .then((resp) => {
            console.log("phonebook:");
            resp.forEach((person) => {
                console.log(`${person.name} ${person.number}`);
            });
        })
        .finally(() => {
            mongoose.connection.close();
        });
}
