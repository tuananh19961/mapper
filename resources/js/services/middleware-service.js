import axios from 'axios'

import baseURL from './../constants/baseURL';

const tokenMock = localStorage.getItem("access_token")

export const headersUploadFile = {
  "Content-Type": "multipart/form-data"
}

const genarateConfig = (defaultOptions = {}, options = { headers: {} }) => {
  const { headers, ...rest } = options
  const config = { ...defaultOptions, ...rest }
  config.headers = { ...config.headers, ...headers }
  return config
}

export const api = (options = {}) => {
  const defaultOption = {
    baseURL: baseURL.API_HOST,
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenMock
    }
  }

  axios.interceptors.request.use(
    config => {
      // loading toggle
      console.log("loading...")
      return config
    },
    error => {
      console.log("[api-error-request]", error)
    }
  )

  axios.interceptors.response.use(
    response => {
      // check error auth
      // check error role
      // loading toggle
      // redirect to Login page
      return response
    },
    error => {
        throw error
    }
  )

  return {
    get: (url, options = { headers: {} }) => axios.get(url, { ...genarateConfig(defaultOption, options) }),
    post: (url, data, options = { headers: {} }) => axios.post(url, data, { ...genarateConfig(defaultOption, options) }),
  }

}

export default api
