import {client} from './api-client';
import {buildAppsURL} from './api-client';

// get user profile
export const getProfile = async (params: {
  q?: string;
  organisationId: string;
}) => {
  const url = buildAppsURL(`/auth/view/${params?.organisationId}`);
  return await client(url, {
    params: params,
  });
};

//get organisation
export const getOrganisations = async (payload: any) => {
  const url = buildAppsURL(`/organisations`);

  return await client(url, {
    params: payload,
    url: url,
  });
};

//update profile
export const updateProfile = async (payload: any, params: any) => {
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
