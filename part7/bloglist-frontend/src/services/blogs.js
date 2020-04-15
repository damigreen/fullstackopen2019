import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, blogObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObj);
  return response.data;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token }
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { 
  getAll,
  create,
  setToken,
  update,
  del
};
