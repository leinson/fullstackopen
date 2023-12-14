import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.data
}

const remove = async id => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
} 

export default { getAll, create, setToken, update, remove }