import axios from 'axios'

const baseUrl = 'http://localhost:3004/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, vote: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}

export default {
  getAll,
  createNew,
  update
}
