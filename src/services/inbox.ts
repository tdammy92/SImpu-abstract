import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {InboxType} from 'src/@types/inbox';
import {buildConversationUrl, client} from './api-client';

// for sidebar to get tags
const getTags = async (payload: any) => {
  const {type, ...rest} = payload;

  const {data} = await client('', {
    params: rest,
    url: buildConversationUrl(`tags/list/${type}`),
  });

  return data.tags;
};

// for sidebar unread count
const getThreadFiltersUnreadCount = async () => {
  const response = await client('', {
    url: buildConversationUrl(`threads/filter/count`),
  });
  return response.data.count;
};

// for sidebar to get pinned team inboxes
const getInboxes = async (params: {
  q?: string;
  members?: boolean;
  is_pinned?: boolean;
  credentials?: boolean;
  show_report?: boolean;
  type: InboxType['type'];
}) => {
  const {type, ...rest} = params;

  const {data} = await client('', {
    params: rest,
    url: buildConversationUrl(`inbox/list/${type}`),
  });

  return data.inboxes;
};

export {getTags, getThreadFiltersUnreadCount, getInboxes};
