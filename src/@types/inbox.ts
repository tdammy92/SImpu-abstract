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

export type InboxType = {
  name: string;
  uuid: string;
  is_pinned?: boolean;
  color: string | null;
  unassign_inactive?: boolean;
  created_datetime: string;
  description?: string | null;
  show_report?: boolean | null;
  type?: 'shared' | 'personal';
  updated_datetime: string | null;
  time_to_inactive?: number | null;
  credentials?: InboxTypeCredentials[];
};
