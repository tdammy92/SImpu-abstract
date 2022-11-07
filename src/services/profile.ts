import {DEMO_API} from '@env';
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
  // const values = {};

  console.log('from update profile', payload, params);
  const url = buildAppsURL(`/profile/save`);

  const response = await client(url, {
    method: 'PATCH',
    data: payload,
    params,
  });
  return response.data;
};

// values: Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'organisation_id'>> & {
//   user_id: User['id'];
//   onboard_role?: string;
//   purpose?: 'personal' | 'business';

//update profile
export const updateProfileImage = async (payload: any, params: any) => {
  // const values = {};

  const url = buildAppsURL(`/profile/save_image`);

  const response = await client(url, {
    method: 'POST',
    data: payload,
    params,
  });
  return response.data;
};
