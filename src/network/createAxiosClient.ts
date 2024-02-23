import axios from 'axios'
import { aws4Interceptor } from 'aws4-axios'

export function createAxiosClient(tokens: any) {
  const AxiosClient = axios.create()

  const interceptor = aws4Interceptor({
    options: {
      region: process.env.CLOUD_REGION,
      service: 'execute-api',
    },
    credentials: {
      accessKeyId: tokens?.credentials.accessKeyId,
      secretAccessKey: tokens?.credentials.secretAccessKey,
      sessionToken: tokens?.credentials.sessionToken,
    },
  })

  AxiosClient.interceptors.request.use(interceptor)

  return AxiosClient
}
