import {Profile, user, UserStore} from 'src/@types/store';

const initialState: UserStore = {
  profile: {
    id: '',
    first_name: '',
    last_name: '',
    country_code: 0,
    email: '',
    phone: 0,
    organisation_id: '',
    purpose: '',
    image: '',
    user_id: '',
    onboard_stage: '',
    created_datetime: '',
    updated_datetime: '',
    roles_id: '',
    permissions: [],
    roles_page_access: [],
    page_access: [],
    onboard_role_value: '',
    onboard_role: '',
  } as Profile,

  user: {
    id: '',
    email: '',
    account_type: 0,
    verified: false,
    created_datetime: '',
    last_login: '',
    updated_datetime: '',
  },
  isloggedIn: false,
  onFirstLaunch: false,
  token: '',
};

export default initialState;
