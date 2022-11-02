import axios from 'axios';
import {DEMO_API, PRODUCTION_API, SECERET_KEY} from '@env';
import {client} from './api-client';

const config = {
  headers: {
    'Content-type': 'application/json',
    // Authorization: SECERET_KEY,
  },
};

// login user
export const loginUser = async (userDetails: any) => {
  return await axios
    .post(`${DEMO_API}/auth/login`, userDetails, config)
    .then(res => res.data);
};
