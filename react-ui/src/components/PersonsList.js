import React from "react";

const PersonsList = ({ persons, onDeleteClick }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}{" "}
                    <button onClick={onDeleteClick} data-id={person.id} data-name={person.name}>
                        Delete
                    </button>
                </p>
            ))}
        </div>
    );
};

export default PersonsList;
