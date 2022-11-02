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
} from './inbox';
import {getProfile} from './profile';

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
    `filters-unread-count  ${queryParams?.organisationId}`,
    () => getThreadFiltersUnreadCount(queryParams),
    options,
  );
};

//fetch personal threads
export const usePersonalThreads = (queryParams: any, options: any) => {
  const {filter, sort, page} = queryParams;
  return useInfiniteQuery(
    `threads ${filter} ${sort} ${page} ${queryParams?.organisationId}`,
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
  const {filter, sort, page} = queryParams;

  return useInfiniteQuery(
    `threads ${filter} ${sort} ${page}  ${queryParams?.organisationId}`,
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

//fetch thread for shared inbox/tags  /threads/inbox/:filter/:inbox_id?per_page=15&page=1&sort=newest
export const useSharedThreads = (queryParams: any, options: any) => {
  const {threadType, filter, sort, organisationId} = queryParams;

  return useInfiniteQuery(
    `threads ${threadType} ${filter} ${sort}  ${organisationId}`,
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
