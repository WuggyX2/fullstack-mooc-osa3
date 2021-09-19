const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const data = {
    persons: [
        {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1,
        },
        {
            name: "Ada Lovelace",
            number: "39-44-5323523",
            id: 2,
        },
        {
            name: "Dan Abramov",
            number: "12-43-234345",
            id: 3,
        },
        {
            name: "Mary Poppendieck",
            number: "39-23-6423122",
            id: 4,
        },
    ],
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

app.get("/api/persons/", (request, response) => {
    response.json(data.persons);
});

app.post("/api/persons", (request, response, next) => {
    const requestData = request.body;
    console.log(requestData);

    if (!requestData.name || !requestData.number) {
        const errorbody = { error: "request is missin name or number" };
        response.status(400).json(errorbody);
    }

    const existingPerson = data.persons.find((person) => {
        return person.name === requestData.name;
    });

    if (existingPerson) {
        const errorbody = { error: `A number with the name ${requestData.name} already exists` };
        response.status(400).json(errorbody);
    } else {
        const newPerson = { ...requestData, id: Math.floor(Math.random() * 10000) };
        data.persons = data.persons.concat(newPerson);
        response.json(newPerson);
    }
});

app.get("/api/persons/:id", (request, response) => {
    const personId = parseInt(request.params.id);
    const person = data.persons.find((person) => person.id === personId);
    response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
    const personId = parseInt(request.params.id);
    const personExists = data.persons.find((person) => {
        return person.id === personId;
    });

    if (personExists) {
        data.persons = data.persons.filter((person) => {
            return person.id !== personId;
        });
        response.status(200).send();
    } else {
        const errorBody = {
            error: "Person does not exist",
        };
        response.status(400).json(errorBody);
    }
});

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${data.persons.length} people</p> <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
