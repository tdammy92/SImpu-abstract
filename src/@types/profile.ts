export type senderIdsType = {
  bind_id: string;
  id: string;
  is_default: boolean;
  name: string;
};

export type organisation = {
  id: string | null;
  name?: string;
  image?: string;
  sender_ids?: senderIdsType[];
};

export type organisationStore = {
  details: organisation;
};

export type deviceType = {
  brand: string;
  created_datetime: string;
  fcm_token: string;
  id: string;
  imei: string;
  is_deleted: false;
  model: string;
  name: string;
  os: string;
  os_api_level: string;
  os_version: string;
  updated_datetime: null;
  user_id: string;
};

export type deviceStore = {
  details: deviceType;
};
