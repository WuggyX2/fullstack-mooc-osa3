const express = require("express");
const app = express();

const PORT = 3001;

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

app.get("/api/persons/", (request, response) => {
    response.json(data.persons);
});

app.get("/api/persons/:id", (request, response) => {
    const personId = parseInt(request.params.id);
    const person = data.persons.find((person) => person.id === personId);
    response.json(person);
});

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${data.persons.length} people</p> <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
