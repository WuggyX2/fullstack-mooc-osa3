import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import { Filter, PersonForm, PersonsList, Message } from "./components/index";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [message, setMessage] = useState({ message: null, type: null });

    const effectHook = () => {
        personService
            .getPersons()
            .then((personData) => {
                setPersons(personData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(effectHook, []);

    const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filterTerm.toLowerCase()));

    const handleOnClick = (event) => {
        event.preventDefault();

        if (!persons.some((person) => person.name === newName)) {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            personService
                .createPerson(newPerson)
                .then((response) => {
                    setPersons(persons.concat(response));
                    showMessage({ message: `Added ${response.name}`, type: "success" });
                })
                .catch((error) => {
                    showMessage({
                        message: `Add Operation failed: ${error.message}`,
                        type: "error",
                    });
                });
        } else {
            const confirmResult = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            );

            if (confirmResult) {
                const existingPerson = persons.find((person) => person.name === newName);
                const changedPerson = { ...existingPerson, number: newNumber };

                personService
                    .updatePerson(changedPerson)
                    .then((response) => {
                        setPersons(persons.map((person) => (person.id !== changedPerson.id ? person : changedPerson)));
                        showMessage({ message: `Updated ${changedPerson.name}'s number`, type: "success" });
                    })
                    .catch((error) => {
                        showMessage({
                            message: `Update Operation failed: ${changedPerson.name} was already removed`,
                            type: "error",
                        });
                    });
            }
        }

        setNewName("");
        setNewNumber("");
    };

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage({ message: null, type: null });
        }, 4000);
    };

    const handleOnChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleOnChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleOnChangeFilter = (event) => {
        setFilterTerm(event.target.value);
    };

    const handleDeleteClick = (event) => {
        const numberId = event.target.dataset.id;
        const confirmResponse = window.confirm(`Delete ${event.target.dataset.name}?`);
        if (confirmResponse) {
            personService
                .deletePerson(numberId)
                .then(() => {
                    const updatedPersonArray = persons.filter((person) => {
                        return person.id !== numberId;
                    });
                    showMessage({ message: `Removed ${event.target.dataset.name}`, type: "success" });
                    setPersons(updatedPersonArray);
                })
                .catch((error) => {
                    showMessage({
                        message: `Error: ${error}`,
                        type: "error",
                    });
                });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Message message={message.message} type={message.type} />
            <Filter filterTerm={filterTerm} onChange={handleOnChangeFilter} />
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                onChangeName={handleOnChangeName}
                onChangeNumber={handleOnChangeNumber}
                onClickAdd={handleOnClick}
            />
            <PersonsList persons={personsToShow} onDeleteClick={handleDeleteClick} />
        </div>
    );
};

export default App;
