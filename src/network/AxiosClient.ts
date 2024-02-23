import axios from 'axios'
import * as Auth from 'aws-amplify/auth'

const AxiosClient = axios.create()

const onRequest = async (request: any) => {
  const { tokens } = await Auth.fetchAuthSession()
  if (tokens && tokens.idToken) {
    request.headers.Authorization = `${tokens.idToken.toString()}`
  } else {
    // console.log('axios auth token not found', request.)
  }
  return request
}

const onRequestError = (error: any) => {
  console.log(`Axios request interceptor error`, error)
  return Promise.reject(error)
}

const onResponse = (response: any) => {
  return response
}

const onResponseError = async (error: any) => {
  console.log(`API response error`, error)
  if (error.response.status === 401) {
    console.log('FOUND 401 Error')
    window.location['pathname'] = '/'
  }
  return Promise.reject(error)
}

AxiosClient.interceptors.request.use(onRequest, onRequestError)
AxiosClient.interceptors.response.use(onResponse, onResponseError)

export { AxiosClient }
