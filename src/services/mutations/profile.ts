import {organisation} from './../../@types/profile';
import {buildAppsURL, client} from '../api/api-client';

//update profile
export const updateProfiles = async (payload: {
  data: any;
  Auth: string | null;
  organisationId: string | null;
}) => {
  const url = buildAppsURL(`/profile/save`);

  const {data, Auth, organisationId} = payload;

  const response = await client(url, {
    method: 'PATCH',
    data: data,
    params: {Auth, organisationId},
  });
  return response.data;
};

//update profile image
export const updateProfileImage = async (payload: {
  file: any;
  Auth: string | null;
  organisationId: string | null;
}) => {
  const {file, Auth, organisationId} = payload;
  const url = buildAppsURL(`/profile/save_image`);

  const response = await client(url, {
    method: 'POST',
    data: file,
    params: {Auth, organisationId, contentType: 'multipart/form-data'},
  });
  return response.data;
};

export const changePassword = async (payload: any, params: any) => {
  const url = buildAppsURL(`/auth/change-password`);
  const response = await client(url, {
    data: payload,
    method: 'PATCH',
    params,
  });
  // if (response.status === 401)
  //   throw new Error('Your old password is incorrect');
  return response.data;
};
export const RequestPasswordReset = async (payload: any) => {
  const url = buildAppsURL(`/auth/send_password_reset`);

  // console.log('payload from reset password', JSON.stringify(payload, null, 2));
  const response = await client(url, {
    data: payload,
    method: 'POST',
    // params,
  });

  return response;
};
