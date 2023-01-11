import {deviceType, deviceStore} from './../../@types/profile';

const initialState: deviceStore = {
  details: {
    brand: '',
    created_datetime: '',
    fcm_token: '',
    id: '',
    imei: '',
    is_deleted: false,
    model: '',
    name: '',
    os: '',
    os_api_level: '',
    os_version: '',
    updated_datetime: null,
    user_id: '',
  } as deviceType,
};

export default initialState;
