import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {InboxType} from 'src/@types/inbox';
import {buildConversationUrl, client} from './api-client';

const perPageFetch = 15;

// for sidebar to get tags
export const getTags = async (queryParams: any, pageParams: any) => {
  // /tags/list/:type?per_page=15&page=3&is_pinned=true
  const url = buildConversationUrl(
    `tags/list/${queryParams?.type}?per_page=15&page=${pageParams}&is_pinned=${queryParams.is_pinned}`,
  );

  return await client(url, {
    params: queryParams,
    url: url,
  });
};

// for sidebar unread count
export const getThreadFiltersUnreadCount = async (queryParams: any) => {
  const url = buildConversationUrl(`threads/filter/count`);
  const response = await client(url, {
    params: queryParams,
  });

  //@ts-ignore
  return response?.data?.count;
};

// for sidebar to get pinned team inboxes
export const getInboxeList = async (params: {
  is_pinned?: boolean;
  credentials?: boolean;
  type: InboxType['type'];
}) => {
  // /inbox/list/:type?is_pinned=true
  const url = buildConversationUrl(
    `inbox/list/${params?.type}?is_pinned=${params?.is_pinned}`,
  );

  const {data} = await client(url, {
    params: params,
    url: url,
  });

  return data;
};

//threads

//get personal  inbox threads
async function getInboxThreads(
  params?: AxiosRequestConfig['params'],
): Promise<AxiosResponse<any>> {
  const {inbox_id, filter = 'open', ...rest} = params;
  return client('', {
    params: rest,
    url: buildConversationUrl(`threads/inbox/${filter}/${inbox_id}`),
  });
}

async function getTagThreads(
  params?: AxiosRequestConfig['params'],
): Promise<AxiosResponse<any>> {
  const {tag_id, filter = 'open', ...rest} = params;
  return client('', {
    params: rest,
    url: buildConversationUrl(`threads/tag/${filter}/${tag_id}`),
  });
}

async function getTypeThreads(
  params?: AxiosRequestConfig['params'],
): Promise<AxiosResponse<any>> {
  const {filter = 'open', ...rest} = params;
  return client('', {
    params: rest,
    url: buildConversationUrl(`threads/me/${filter}`),
  });
}

//get personal threads
export const getPersonalThreads = async (
  params: AxiosRequestConfig['params'],
  pageParam: any,
): Promise<AxiosResponse<any>> => {
  const {filter = 'open', page, sort, ...rest} = params;

  const url = buildConversationUrl(
    `threads/personal/${filter}?per_page=${perPageFetch}&page=${pageParam}&sort=${sort}`,
  );
  return client(url, {
    params: rest,
    url: url,
  });
};

//get personal threads
export const getSharedThreads = async (
  params: AxiosRequestConfig['params'],
  pageParam: any,
): Promise<AxiosResponse<any>> => {
  const {filter = 'open', threadType, threadId, page, sort, ...rest} = params;

  // console.log('params from shared inbox tags and inbox', params);
  // }/threads/inbox/:filter/:inbox_id?per_page=15&page=1&sort=oldest
  const url = buildConversationUrl(
    `threads/${threadType}/${filter}/${threadId}?per_page=${perPageFetch}&page=${pageParam}&sort=${sort}`,
  );
  return client(url, {
    params: rest,
    url: url,
  });
};

//get threads me
export const getMeThreads = async (
  params: AxiosRequestConfig['params'],
  pageParams: any,
): Promise<AxiosResponse<any>> => {
  const {filter = 'open', page, sort, ...rest} = params;

  const url = buildConversationUrl(
    `threads/me/${filter}?per_page=${perPageFetch}&page=${pageParams}&sort=${sort}`,
  );
  return client(url, {
    params: rest,
    url: url,
  });
};
