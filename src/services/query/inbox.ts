import {buildAppsURL} from 'src/services/api/api-client';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {InboxType} from 'src/@types/inbox';
import {buildConversationUrl, client} from '../api/api-client';

const perPageFetch = 20;

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

  const queryS = {
    sort: params?.sort,
    start_date: params?.start_date,
    end_date: params?.end_date,
  };

  const url = buildConversationUrl(
    `threads/personal/${filter}?per_page=${perPageFetch}&page=${pageParam}`,
  );
  return client(url, {
    params: {...params, queryS},
    url: url,
  });
};

//get personal threads
export const getSharedThreads = async (
  params: AxiosRequestConfig['params'],
  pageParam: any,
): Promise<AxiosResponse<any>> => {
  const {filter = 'open', threadType, threadId, page, sort, ...rest} = params;

  const queryS = {
    sort: params?.sort,
    start_date: params?.start_date,
    end_date: params?.end_date,
  };

  const url = buildConversationUrl(
    `threads/${threadType}/${filter}/${threadId}?per_page=${perPageFetch}&page=${pageParam}`,
  );
  return client(url, {
    params: {...params, queryS},
    url: url,
  });
};

//get threads me
export const getMeThreads = async (
  params: AxiosRequestConfig['params'],
  pageParams: any,
): Promise<AxiosResponse<any>> => {
  const {filter = 'open', page} = params;

  const queryS = {
    sort: params?.sort,
    start_date: params?.start_date,
    end_date: params?.end_date,
  };

  const url = buildConversationUrl(
    `threads/me/${filter}?per_page=${perPageFetch}&page=${pageParams}`,
  );
  return client(url, {
    params: {...params, queryS},
  });
};

//get messageList
// /conversations/:threadID?page=1&perPage=15
export const getMessageList = async (
  params: AxiosRequestConfig['params'],
  pageParams: number,
): Promise<any> => {
  const {threadID, page} = params;

  const queryS = {
    type: params?.type,
  };

  const url = buildConversationUrl(
    `conversations/${threadID}?page=${pageParams}&per_page=${perPageFetch}`,
  );
  return client(url, {
    params: {...params, queryS},
  });
};

//get messageContent
export const getMessageContent = async (
  params: AxiosRequestConfig['params'],
): Promise<any> => {
  const {contentId} = params;

  // const queryS = {
  //   type: params?.type,
  // };

  const url = buildConversationUrl(
    `conversations/message-content/${contentId}`,
  );
  return client(url, {
    params: {...params},
  });
};

//fetch threadInfo
export const getThreadInfo = async (
  params: AxiosRequestConfig['params'],
): Promise<any> => {
  const {threadID, organisationId} = params;

  const url = buildConversationUrl(`threads/${threadID}?is_full=true`);
  return client(url, {
    params: {...params},
  });
};

/*
Search message screen request
*/
export const searchCustomers = async (QueryParams: any) => {
  // console.log('inside endpoint call', QueryParams);
  const {q, page, per_page, channelId, headers} = QueryParams;

  const queryS = {
    q,
    page,
    channel_id: channelId,
    per_page: perPageFetch,
  };

  const url = buildConversationUrl('search/customers');
  const response = await client(url, {
    params: {...headers, queryS},
  });
  return response?.data;
};

//search conversation
export const searchConversations = async (
  QueryParams?: AxiosRequestConfig['params'],
) => {
  const {q, page, per_page, headers} = QueryParams;

  const queryS = {
    q,
    page,
    per_page: perPageFetch,
  };

  const url = buildConversationUrl(`search`);

  const response = await client(url, {
    params: {...headers, queryS},
  });

  return response?.data;
};

//Advanced search conversation
export const AdvancedSearchConversations = async (
  QueryParams?: AxiosRequestConfig['params'],
) => {
  const {filterQuery, page, per_page, headers} = QueryParams;

  const queryS = {
    ...filterQuery,
    page,
    per_page: perPageFetch,
  };

  const url = buildConversationUrl(`search`);

  const response = await client(url, {
    params: {...headers, queryS},
  });

  return response?.data;
};

//search conversation by customer
export const searchConversationsByCustomer = async (QueryParams: any) => {
  const {customerId, page, per_page, headers} = QueryParams;

  const queryS = {
    page,
    per_page: perPageFetch,
    // customer : 'ddff'
  };

  const url = buildConversationUrl(`search?customer[0]=${customerId}`);

  const response = await client(url, {
    params: {...headers, queryS},
  });

  return response?.data;
};

//get all user's connect channel
export const getUserChannelAccounts = async (params: any) => {
  const url = buildConversationUrl(`channels/accounts/member`);
  const {data} = await client(url, {
    params,
  });
  return data.accounts;
};

//fetch members in a conversation
export const getMemberList = async (
  params: AxiosRequestConfig['params'],
): Promise<any> => {
  const {threadID, page, organisationId} = params;

  const url = buildAppsURL(`/organisations/${organisationId}/members`);
  return await client(url, {
    params: {...params},
  });
};

//fetch List of  teams in an organisation
export const listTeams = async (
  params: AxiosRequestConfig['params'],
): Promise<any> => {
  const {organisationId} = params;

  const url = buildAppsURL(`/teams/${organisationId}`);

  return await client(url, {
    params: {...params},
  });
};

//fetch tags
export const listTags = async (
  params: AxiosRequestConfig['params'],
): Promise<any> => {
  const {organisationId, type} = params;
  const url = buildConversationUrl(`tags/list/${type}`);
  return await client(url, {
    params: {...params},
  });
};

//
export const getInboxes = async (params: {
  q?: string;
  members?: boolean;
  is_pinned?: boolean;
  credentials?: boolean;
  show_report?: boolean;
  Auth: string;
  organisationId: string;
  type: InboxType['type'];
}) => {
  const {type, ...rest} = params;

  const url = buildConversationUrl(`inbox/list/${type}`);

  const {data} = await client(url, {
    params: rest,
  });

  return data.inboxes;
};

//fetch quick reply
export const getQuickReplies = async (
  params: AxiosRequestConfig['params'],
  pageParams: any,
): Promise<AxiosResponse<any>> => {
  const {type = 'me', page} = params;

  const url = buildConversationUrl(
    `quick_replies/list/:${type}?page=${pageParams}&per_page=${perPageFetch}`,
  );
  return client(url, {
    params: params,
  });
};
