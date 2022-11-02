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
