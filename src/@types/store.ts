import {organisationStore} from './profile';
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  country_code: number;
  email: string | null;
  phone: number;
  organisation_id: string;
  purpose?: string | null;
  image: string | null;
  user_id?: string;
  onboard_stage?: string | null;
  created_datetime?: string;
  updated_datetime?: string | null;
  roles_id?: string;
  permissions?: string[];
  roles_page_access?: string[];
  page_access?: string[];
  onboard_role_value?: string | null;
  onboard_role?: string | null;
}

export interface LoadingState {
  Isloading: boolean;
}

export interface UserStore {
  profile: User;
  isloggedIn: boolean;
  token: string | null;
  onFirstLaunch: boolean;
}

export interface InboxId {
  pins: {};
  members: {};
  uuid: string;
  created_datetime: string;
  name: string;
  color: string;
  description: string;
  show_report: boolean;
  time_to_inactive: number;
  unassign_inactive: boolean;
  type: string;
  member_type: string;
  creator_id: string;
  organisation_id: string;
  credentials: [];
  updated_datetime: null;
}

export interface Channel {
  id: number;
  uuid: string;
  is_approved: boolean;
  auth_type: string;
  name: string;
  group_id: string;
  urls: null;
  supported_events: [];
  updated_datetime: null;
  created_datetime: string;
}

export interface InboxStoreState {
  inbox: InboxId;
  channels?: Channel[];
}

export interface StoreState {
  loader?: LoadingState;
  user: UserStore;
  inbox: InboxStoreState;
  organisation: organisationStore;
}
