import {buildNotificationURL, client} from '../api/api-client';

export const getNotificationTrayItems = async (param: any, page: any) => {
  const url = buildNotificationURL(`/tray?status=${param.status}&page=${page}`);
  const response = await client(url, {
    params: param,
  });
  return response;
};
