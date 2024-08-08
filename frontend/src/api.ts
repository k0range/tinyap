import axios from 'axios';
import router from './router'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return refreshAccessToken()
        .then(() => {
          return api(error.config)
        })
        .catch((error: any) => {
          if (error.response.status === 401 || error.response.status === 403) {
            console.error("Login required")
            router.push({"path": "/login", "query": {"to": location.pathname + location.search + location.hash}})
          } else {
            console.error(`Refresh token failed: ${error}`)
          }
        })
    }
  }
)

async function refreshAccessToken() {
  await axios.post('http://localhost:3000/api/refresh', {})
  return
}

export default api;