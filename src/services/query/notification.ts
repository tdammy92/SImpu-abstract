import {buildNotificationURL, client} from '../api/api-client';

export const getNotificationTrayItems = async (param: any, page: any) => {
  const url = buildNotificationURL(`/tray?status=${param.status}&page=${page}`);
  const response = await client(url, {
    params: param,
  });
  return response;
};

export const registerDeviceNotification = async (param: any) => {
  // console.log('from auth', param);

  const {DeviceDetails, Auth} = param;
  const url = buildNotificationURL(`/device`);
  const response = await client(url, {
    method: 'POST',
    data: JSON.stringify(DeviceDetails),
    params: param,
  });
  return response;
};
