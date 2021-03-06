import axios from 'axios';

const baseUrl = '/api/login';
console.log(baseUrl);


const login = async (credentials) => {
  const response = await axios({
    method: 'post',
    url: baseUrl,
    data: credentials
  });
  return response.data;
};

export default { login };
