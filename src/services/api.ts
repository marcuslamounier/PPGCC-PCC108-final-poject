import axios from 'axios'
import axiosRetry from 'axios-retry'

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000
  const randomMs = 1000 * Math.random()
  return seconds + randomMs
}

axiosRetry(api, {
  retries: 5,
  retryDelay,
  retryCondition: axiosRetry.isRetryableError
})

export default api
