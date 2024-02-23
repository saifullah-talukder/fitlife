import axios from 'axios'
import * as Auth from 'aws-amplify/auth'

const AxiosClient = axios.create()

const onRequest = async (request: any) => {
  const { tokens } = await Auth.fetchAuthSession()
  if (tokens && tokens.idToken) {
    request.headers.Authorization = `${tokens.idToken.toString()}`
  } else {
    Promise.reject('auth token not found')
  }
  return request
}

const onRequestError = (error: any) => {
  return Promise.reject(error)
}

const onResponse = (response: any) => {
  return response
}

const onResponseError = async (error: any) => {
  if (error.response.status === 401) {
    window.location['pathname'] = '/'
  }
  return Promise.reject(error)
}

AxiosClient.interceptors.request.use(onRequest, onRequestError)
AxiosClient.interceptors.response.use(onResponse, onResponseError)

export { AxiosClient }
