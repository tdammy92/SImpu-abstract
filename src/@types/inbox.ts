export type Channel =
  | 'whatsapp'
  | 'messenger'
  | 'phone'
  | 'twitter'
  | 'whatsappWeb'
  | 'email'
  | 'instagram'
  | 'livechat';

export type InboxTypeCredentials = {
  uuid: string;
  name?: string;
  channel_id: string;
  channel_name: Channel;
  platform_name: string;
  platform_nick: string;
  image_url: string | null;
  forwarding_address?: string;
  integration_name?: string;
};

export type quotedType = {
  type: string;
  author: {};
  entity: entityType;
  id: number;
  uuid: string;
  account_id: null;
  show_in_thread: null;
  created_datetime: string;
  updated_datetime: null;
  author_id: string;
  author_type: string;
  content_id?: string;
  content_type?: string;
};

export type InboxType = {
  name: string;
  uuid: string;
  is_pinned?: boolean;
  color: string | null;
  unassign_inactive?: boolean;
  created_datetime: string;
  description?: string | null;
  show_report?: boolean | null;
  type?: string;
  updated_datetime: string | null;
  time_to_inactive?: number | null;
  credentials?: InboxTypeCredentials[];
};

export type requestNotificationType = {
  imei?: string;
  fcm_token: string | null;
  name: string | null;
  brand: string | null;
  model: string | null;
  os: string | null;
  os_version: string | null;
  os_api_level: number | string | null;
};

export type entityType = {
  content?: {body?: string} | null;
  id: number;
  pid: string;
  uuid: string;
  meta?: {};
  status: string;
  quoted_id: null;
  author_id: string;
  attachments: attachmentType[] | null;
  mention_ids: null;
  recipient_ids: null;
};

export type authorType = {
  contacts: {};
  meta: {};
  image_url: string | null;
  platform_id: string;
  channel_name: Channel;
  name: string;
  id: number;
  platform_name: string;
  platform_nick: string;
  uuid: string;
  channel_id: string;
  is_valid: boolean;
};

export type attachemtDataType = {
  url: string;
  etag: string;
  tags: [];
  type: string;
  width?: number;
  folder?: string;
  format: string;
  height?: number;
  api_key?: string;
  version?: number;
  asset_id?: string;
  signature?: string;
  version_id?: string;
  placeholder?: boolean;
  resource_type?: string;
};

export type attachmentType = {
  id: string;
  data: attachemtDataType;
  from?: string;
  size: number;
  type?: string;
  mimetype: string;
  created_datetime: string;
};

export type replyType = {
  type: string;
  author: authorType | null;
  entity: entityType | null;
  id?: number;
  uuid: string;
  account_id: null;
  show_in_thread: null;
  created_datetime: string;
  updated_datetime: null;
  author_id: string;
  author_type?: string;
  content_id: string;
  content_type: string;
  quoted: quotedType | null;
};
