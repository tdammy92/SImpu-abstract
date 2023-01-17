import {buildAppsURL, client} from '../api/api-client';

//update profile
export const updateProfiles = async (payload: any, params: any) => {
  const url = buildAppsURL(`/profile/save`);

  const response = await client(url, {
    method: 'PATCH',
    data: payload,
    params,
  });
  return response.data;
};

//update profile image
export const updateProfileImage = async (payload: any, params: any) => {
  const url = buildAppsURL(`/profile/save_image`);

  const response = await client(url, {
    method: 'POST',
    data: payload,
    params,
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
