import {getOrganisations} from './profile';
import {useInfiniteQuery, useQuery} from 'react-query';
import {InboxType} from 'src/@types/inbox';
import {
  getInboxeList,
  getTags,
  getThreadFiltersUnreadCount,
  getPersonalThreads,
  getMeThreads,
  getSharedThreads,
  getQuickReplies,
  getMessageList,
  getThreadInfo,
  getMemberList,
  searchCustomers,
  searchConversations,
  searchConversationsByCustomer,
  getUserChannelAccounts,
  getMessageContent,
} from './inbox';
import {getProfile} from './profile';
import {getNotificationTrayItems} from './notification';

/*
profile queries
*/

//fetch User profile
export const useProfile = (queryKey: any, queryParams: any, options: any) => {
  return useQuery<any>(queryKey, () => getProfile(queryParams), options);
};

//fetch side bar tags
export const useSidebarTags = (queryParams: any, options?: any) => {
  return useInfiniteQuery(
    ['pinned-shared-tags', 'shared', `${queryParams?.organisationId}`],
    ({pageParam = 1}) => getTags(queryParams, pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage.data.meta.page < lastPage.data.meta.page_count
          ? lastPage.data.meta.page + 1
          : undefined;
      },
    },
  );
};

// fetch sidebar  shared inbox list
export const useSidebarInboxes = (queryParams: any, options?: any) => {
  return useQuery<any>(
    ['Inbox list', `${queryParams.type}`, `${queryParams.organisationId}`],
    () => getInboxeList(queryParams),
    options,
  );
};

//fectch sideBar unread count
export const useSidebarUnreadCount = (queryParams: any, options?: any) => {
  return useQuery(
    [`filters-unread-count`, 'threads', `${queryParams?.organisationId}`],
    () => getThreadFiltersUnreadCount(queryParams),
    options,
  );
};

//fetch personal threads
export const usePersonalThreads = (queryParams: any, options: any) => {
  const {filter, sort, page, start_date, end_date} = queryParams;
  return useInfiniteQuery(
    [
      `threads`,
      filter,
      sort,
      page,
      start_date,
      end_date,
      `${queryParams?.organisationId}`,
    ],
    ({pageParam = 1}) => getPersonalThreads(queryParams, pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage.data.meta.page < lastPage.data.meta.page_count
          ? lastPage.data.meta.page + 1
          : undefined;
      },
    },
  );
};
//fetch threads for open | assigned | mentions | closed | draft
export const useMessageThreads = (queryParams: any, options: any) => {
  const {filter, sort, page, start_date, end_date} = queryParams;

  return useInfiniteQuery(
    [
      'threads',
      filter,
      sort,
      page,
      start_date,
      end_date,
      queryParams?.organisationId,
    ],
    ({pageParam = 1}) => getMeThreads(queryParams, pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage.data.meta.page < lastPage.data.meta.page_count
          ? lastPage.data.meta.page + 1
          : undefined;
      },
    },
  );
};

export const useSharedThreads = (queryParams: any, options: any) => {
  const {threadType, filter, sort, start_date, end_date, organisationId} =
    queryParams;

  return useInfiniteQuery(
    ['threads', threadType, filter, sort, start_date, end_date, organisationId],
    ({pageParam = 1}) => getSharedThreads(queryParams, pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage.data.meta.page < lastPage.data.meta.page_count
          ? lastPage.data.meta.page + 1
          : undefined;
      },
    },
  );
};

//get all user organisations
export const useGetOrganisations = (queryParams: any, options: any) => {
  return useQuery(
    `organisations`,
    () => getOrganisations(queryParams),
    options,
  );
};

/*
notification queries
*/

export const useNotificationTrayQuery = (queryParams: any, options: any) => {
  const {status, page, organisationId} = queryParams;
  return useInfiniteQuery(
    ['notification-tray-items', status, organisationId, page],
    ({pageParam = 1}) => getNotificationTrayItems(queryParams, pageParam),
    {
      getNextPageParam: lastPage => {
        return lastPage?.meta?.page < lastPage?.meta?.page_total
          ? lastPage.meta.page + 1
          : undefined;
      },
      refetchOnWindowFocus: true,
      ...options,
    },
  );
};

//Message list
export const useMessageListQuery = (queryParams: any, options: any) => {
  const {threadID, page, type, organisationId} = queryParams;
  return useInfiniteQuery(
    ['conversations', threadID, type, organisationId, page],
    ({pageParam = 1}) => getMessageList(queryParams, pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage?.data?.meta?.page < lastPage?.data?.meta?.page_count
          ? lastPage?.data?.meta?.page + 1
          : undefined;
      },
      refetchOnWindowFocus: true,
      ...options,
    },
  );
};

//Message content
export const useMessageContent = (queryParams: any, options?: any) => {
  // console.log('paramaaa', queryParams);
  const {contentId, organisationId} = queryParams;
  return useQuery(
    ['conversations', contentId, organisationId],
    () => getMessageContent(queryParams),
    options,
  );
};

//get thread info
export const useThreadInfo = (queryParams: any, options?: any) => {
  // console.log('paramaaa', queryParams);
  return useQuery(
    ['threadInfo', queryParams?.threadID, queryParams?.organisationId],
    () => getThreadInfo(queryParams),
    options,
  );
};

//get members in a conversation query
export const useMenberList = (queryParams: any, options?: any) => {
  return useQuery(
    ['Members', queryParams?.threadId, queryParams?.organisationId],
    () => getMemberList(queryParams),
    options,
  );
};

// export const useNotificationTrayQuery = (queryParams: any, options: any) => {
//   const {status, page, organisationId} = queryParams;
//   return useInfiniteQuery(
//     ['notification-tray-items', status, organisationId, page],
//     ({pageParam = 1}) => getNotificationTrayItems(queryParams, pageParam),
//     {
//       getNextPageParam: lastPage => {
//         return lastPage?.meta?.page < lastPage?.meta?.page_total
//           ? lastPage.meta.page + 1
//           : undefined;
//       },
//       refetchOnWindowFocus: true,
//       ...options,
//     },
//   );
// };

/*
search screen quries seatch by customer
and search by conversations
*/
export const useSearchThreads = (QueryParams: any, options: any) => {
  const {searchQuery, page} = QueryParams;

  return useInfiniteQuery(
    ['search', 'threads', searchQuery, page],
    ({pageParam = 1}) =>
      searchConversations({
        ...QueryParams,
        per_page: 10,
        page: pageParam ?? 1,
        q: !!searchQuery ? searchQuery : undefined,
      }),

    {
      getNextPageParam: lastPage => {
        // console.log('lastpage details', lastPage?.data?.meta);
        return lastPage?.data?.meta?.page < lastPage?.data?.meta.page_count
          ? lastPage?.data?.meta.page + 1
          : undefined;
      },
      ...options,
    },
  );
};
export const useSearchCustomers = (QueryParams: any, options: any) => {
  const {searchQuery, channelId, page} = QueryParams;

  return useInfiniteQuery(
    ['search', 'customer', channelId, searchQuery, page],
    ({pageParam = 1}) =>
      searchCustomers({
        ...QueryParams,
        per_page: 10,
        page: pageParam ?? 1,
        q: !!searchQuery ? searchQuery : undefined,
      }),

    {
      getNextPageParam: lastPage => {
        // console.log('lastpage details', lastPage?.data?.meta);
        return lastPage?.data?.meta?.page < lastPage?.data?.meta.page_count
          ? lastPage?.data?.meta.page + 1
          : undefined;
      },
      ...options,
    },
  );
};

export const useSearchCustomersMessages = (QueryParams: any, options: any) => {
  const {customerId, page} = QueryParams;

  return useInfiniteQuery(
    ['customer', customerId, page],
    ({pageParam = 1}) =>
      searchConversationsByCustomer({
        ...QueryParams,
        per_page: 10,
        page: pageParam ?? 1,
      }),

    {
      getNextPageParam: lastPage => {
        // console.log('lastpage details', lastPage?.data?.meta);
        return lastPage?.data?.meta?.page < lastPage?.data?.meta.page_count
          ? lastPage?.data?.meta.page + 1
          : undefined;
      },
      ...options,
    },
  );
};

//get user connect channel
// {type: 'all' | 'shared' | 'personal'} = {type: 'all'}
export const UserConnectChanel = (queryParams: any, options?: any) => {
  // console.log('paramaaa', queryParams);
  return useQuery(
    ['user-channel-accounts', queryParams?.organisationId],
    () => getUserChannelAccounts(queryParams),
    options,
  );
};

//quick reply query
// export const useQuickReply = (queryParams: any, options: any) => {
//   const {status, page, organisationId} = queryParams;
//   return useInfiniteQuery(
//     ['notification-tray-items', status, organisationId, page],
//     ({pageParam = 1}) => getQuickReplies(queryParams, pageParam),
//     {
//       getNextPageParam: lastPage => {
//         return lastPage.meta.page < lastPage.meta.page_total
//           ? lastPage.meta.page + 1
//           : undefined;
//       },
//       refetchOnWindowFocus: true,
//       ...options,
//     },
//   );
// };
