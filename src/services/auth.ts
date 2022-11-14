import {buildAppsURL, client} from './api-client';

// login user
export const loginUser = async (userDetails: any) => {
  const url = buildAppsURL(`/auth/login`);
  const response = await client(url, {
    method: 'POST',
    data: userDetails,
  });

  console.log('response from auth service', response);
  return response;
};
