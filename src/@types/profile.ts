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

export type customertype = {
  uuid: string;
  names: [];
  image_url: string | null;
  contact_id: null;
  channel_name: string;
  platform_name: string | null;
  platform_nick: string;
  channel_id: string;
  type: string;
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
