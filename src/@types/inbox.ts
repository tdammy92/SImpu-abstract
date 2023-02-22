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

export type InboxTagType = {
  id?: number;
  name: string;
  uuid: string;
  color: string;
  parent_id?: string;
  creator_id?: string;
  is_pinned?: boolean;
  children: InboxTagType[];
  description?: string;
  organisation_id?: string;
  created_datetime?: string;
  updated_datetime?: string | null;
  parent?: InboxTagType;
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

export type NotificationType = {
  uuid: string;
  id?: number;
  updated_datetime?: string;
  created_datetime?: string;
  user_id: string; // => InboxUserSchma
  message_id: string; // => MessageSchema
  status: 'sent' | 'read' | 'delivered' | 'unsent';
};

export type ThreadType = {
  state: string;
  uuid: string;
  type: string;
  sender: SenderType;
  subject?: string;
  sender_id: string;
  receiver_id: string;
  unread_count?: string;
  created_datetime: string;
  updated_datetime: string;
  integration_name: string;
  assignments: {
    uuid: string;
    assigner_id: string;
    assignee_id: string;
  }[];
  assignees?: {
    uuid?: string;
    name?: string;
    image?: string;
    user_id: string;
    last_name: string;
    first_name: string;
    image_url?: string;
    organisation_id: string;
    created_datetime?: string;
    updated_datetime?: string;
  }[];
  tags: InboxTagType[];
  is_snoozed?: boolean;
  is_favorited: boolean;
  last_message: Partial<messageType>;
  participants?: ThreadParticipantType[];
  receiver: {
    uuid: string;
    status: string;
    user_id: string;
    inbox_id: string;
    integration_id: string;
    organisation_id: string;
    integration_name: string;
    user: SenderType;
  };
  inbox_id?: string;
  inbox?: Partial<InboxType>;
  attachments?: attachemtDataType[];
  notificaitons?: NotificationType[];
  draft?: {content: {body: string; subject?: string}; message_id?: string};
  is_assignee?: boolean;
  channel_id?: string;
  is_read?: boolean;
};

export type contentType = {
  body: string | null;
  subject?: string;
};
export type recipientType = {
  contact_id: String;
  meta?: {
    locale: string;
    history_id: String;
    threads_total: number;
    messages_total: number;
  };
  image_url: string;
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

export type recipientsType = {
  to?: recipientType[];
  from?: recipientType[];
  cc?: recipientType[];
  bcc?: recipientType[];
};

export type entityType = {
  content?: contentType;
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
  recipients?: recipientsType;
};

export type SenderType = {
  uuid: string;
  channel_id: string;
  platform_id: string;
  contact_id?: string;
  name: string | null;
  channel_name: Channel;
  platform_nick: string;
  platform_name?: string;
  image_url: string | null;
  credential_id?: string;
  meta?: {[key: string]: any};
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

export type messageType = {
  type: String;
  author: authorType | null;
  entity: entityType | null;
  id: number;
  uuid: String;
  account_id?: null;
  show_in_thread?: null;
  created_datetime?: String;
  updated_datetime?: string;
  author_id?: String;
  author_type?: String;
  content_id?: String;
  content_type?: String;
};

export type messageOptionType = 'reply' | 'forward' | 'reply all';

export type customerType = {
  uuid: string;
  names: [];
  image_url: string;
  contact_id: null;
  channel_name: string;
  platform_name: string;
  platform_nick: string;
  channel_id: string;
  type: string;
};

export type AssineeType = {
  name: string;
  id: number;
  uuid: string;
  user_id: string;
  image_url: string;
  type: 'profile' | 'team';
};

export type MemberType = {
  id: string;
  profile_id: string;
  first_name: string;
  last_name: string;
  image: null;
  permission_id: string;
  name: string;
  permissions?: ['*'];
  roles_page_access?: ['*'];
  page_access?: ['*'];
};
export type TeamType = {
  id: string;
  name: string;
  organisation_id: string;
  color: string;
  created_datetime: string;
  updated_datetime: string;
  members: MemberType[];
};

export type ThreadParticipantType = {
  name: string;
  last_name?: string;
  first_name?: string;
  uuid: string;
  user_id?: string;
  image?: string;
  type: 'user' | 'team';
  role_page_access: string[];
};
