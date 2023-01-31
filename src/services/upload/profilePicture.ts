import {Platform} from 'react-native';
import {buildAppsURL} from 'src/services/api/api-client';

export const uploadProfilePicture = async (file: any, header: any) => {
  let res;

  console.log(`${Platform.OS}`);

  const url = buildAppsURL('/profile/save_image');

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
        //  'Content-Type': 'multipart/form-data',
        Authorization: header?.token,
        organisationID: header?.organisationId,
      },
      body: file,
    });
    console.log('inside call', response);
    return response;
  } catch (error) {
    console.log('error from picture upload', error);
  }
};
