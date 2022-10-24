import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {InboxType} from 'src/@types/inbox';
import {buildConversationUrl, client} from './api-client';

// for sidebar to get tags
const getTags = async (payload: any) => {
  console.log(payload?.page);
  const url = buildConversationUrl(
    `tags/list/${payload?.type}?/page=${payload?.page}`,
  );
  return await client(url, {
    params: payload,
    url: url,
  });
};

// for sidebar unread count
const getThreadFiltersUnreadCount = async (queryParams: any) => {
  // console.log('count', queryParams);
  const url = buildConversationUrl(`threads/filter/count`);
  return await client(url, {
    params: queryParams,
  });
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
  const url = buildConversationUrl(
    `inbox/list/${params?.type}?is_pinned=${params?.is_pinned}`,
  );

  const {data} = await client(url, {
    params: params,
    url: url,
  });

  return data.inboxes;
};

export {getTags, getThreadFiltersUnreadCount, getInboxes};
