import axios from "axios";
const serverUrl = "/api/persons";

const getPersons = () => {
    const getRequest = axios.get(serverUrl);
    return getRequest.then((response) => {
        return response.data;
    });
};

const createPerson = (newPerson) => {
    const postRequest = axios.post(serverUrl, newPerson);
    return postRequest.then((response) => {
        return response.data;
    });
};

const deletePerson = (personId) => {
    const deleteRequest = axios.delete(`${serverUrl}/${personId}`);
    return deleteRequest.then((response) => {
        return response.data;
    });
};

const updatePerson = (newPerson) => {
    const putRequest = axios.put(`${serverUrl}/${newPerson.id}`, newPerson);
    return putRequest.then((response) => {
        return response.data;
    });
};

const defaultExport = { getPersons, createPerson, deletePerson, updatePerson };
export default defaultExport;
