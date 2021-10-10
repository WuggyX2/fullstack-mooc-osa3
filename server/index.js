require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT;

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));
app.use(errorHandler);

app.get("/api/persons/", (request, response) => {
    Person.find({}).then((results) => {
        response.json(results);
    });
});

app.post("/api/persons", (request, response, next) => {
    const requestData = request.body;

    if (!requestData.name || !requestData.number) {
        const errorbody = { error: "request is missing name or number" };
        response.status(400).json(errorbody);
    }

    const newPerson = new Person({ ...requestData });
    newPerson.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
    const requestData = request.body;

    if (!requestData.name || !requestData.number) {
        const errorbody = { error: "request is missing name or number" };
        response.status(400).json(errorbody);
    }

    const newPersonData = {
        number: requestData.number,
        name: requestData.name,
    };

    Person.findByIdAndUpdate(request.params.id, newPersonData, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => {
            next(error);
        });
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((result) => {
            if (result) {
                response.json(result);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            if (result) {
                response.status(200).end();
            } else {
                const errorBody = {
                    error: "Person does not exist",
                };
                response.status(400).json(errorBody);
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.get("/info", (request, response) => {
    Person.find({}).then((results) => {
        response.send(`<p>Phonebook has info for ${results.length} people</p> <p>${new Date()}</p>`);
    });
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
