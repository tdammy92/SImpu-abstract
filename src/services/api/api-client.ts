import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  DEMO_API,
  PRODUCTION_API,
  CONVERSATION_API_DEMO,
  INTEGRATIONS_API_DEMO,
  INTEGRATIONS_API_PRODUCTION,
} from '@env';

// base url
export const buildConversationUrl = (url: string) =>
  `${CONVERSATION_API_DEMO}/api/v1/${url}`;

export const buildAppsURL = (url: string) => `${DEMO_API}${url}`;

export const buildNotificationURL = (url: string) =>
  `${INTEGRATIONS_API_DEMO}${url}`;

export async function client(
  url: string,
  {data, method = 'GET', ...customConfig}: AxiosRequestConfig = {},
  tokenProtected = true,
) {
  const headers = {'content-type': 'application/json'} as {
    'content-type': string;
    Authorization: string;
    organisationID: string;
    Simpu_Socket_ID: string;
  };

  headers.Authorization = customConfig?.params?.Auth ?? '';
  headers.organisationID = customConfig?.params?.organisationId ?? '';
  headers['content-type'] =
    customConfig?.params?.contentType ?? 'application/json';

  //   if (pusher?.connection?.socket_id) {
  //     headers['Simpu_Socket_ID'] = pusher.connection.socket_id;
  //   }

  const config = {
    headers,
    method,
    data,
    url: url,
    params: {
      ...customConfig?.params?.queryS,
    },
  } as AxiosRequestConfig;

  // console.log('api-config params', JSON.stringify(config, null, 2));
  try {
    const result = await Axios(config);
    const {data} = result;
    return data;
  } catch (error) {
    // console.log('from axios client', error);
    throw error;
  }
}

Axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response && error.response.data) {
      //@ts-ignore
      if (error.response.data.conversationErrorPayload) {
        return Promise.reject(error.response.data);
      }
      //@ts-ignore
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error.message);
  },
);
