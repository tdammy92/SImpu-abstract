import {buildNotificationURL, client} from '../api/api-client';

export const getNotificationTrayItems = async (param: any, page: any) => {
  const url = buildNotificationURL(`/tray?status=${param.status}&page=${page}`);
  const response = await client(url, {
    params: param,
  });
  return response;
};

export const markAllNotificationTrayItems = async (param: any, page: any) => {
  const url = buildNotificationURL(`/tray/mark/all`);
  const response = await client(url, {
    method: 'PUT',
    params: param,
  });
  return response;
};

export const registerDeviceNotification = async (param: any) => {
  const {DeviceDetails, Auth} = param;
  const url = buildNotificationURL(`/device`);
  const response = await client(url, {
    method: 'POST',
    data: JSON.stringify(DeviceDetails),
    params: param,
  });
  return response;
};
export const removeDeviceNotification = async (param: any) => {
  // const {DeviceDetails, Auth} = param;
  const url = buildNotificationURL(`/device/${param?.device_id}`);
  const response = await client(url, {
    method: 'DELETE',
    // data: JSON.stringify(DeviceDetails),
    params: param,
  });
  return response;
};
