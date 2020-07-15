import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async (credentials) => {
  const response = await axios({
    method: 'post',
    url: baseUrl,
    data: credentials
  });
  return response.data;
};

export default { login };
