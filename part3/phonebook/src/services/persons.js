import axios from 'axios';

// const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = 'api/persons';

const createPerson = (newPersonObj) => {
  const request = axios.post(baseUrl, newPersonObj);
  return request.then(response => response.data);
};

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const replacePerson = (id, newPersonObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObj);
  return request.then(response => response.data);
};

export default {
  createPerson,
  getPersons,
  deletePerson,
  replacePerson
};