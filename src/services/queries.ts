import {useInfiniteQuery, useQuery} from 'react-query';
import {InboxType} from 'src/@types/inbox';
import {getInboxes, getTags, getThreadFiltersUnreadCount} from './inbox';
import {getProfile} from './auth';

const fetchTags = (queryParams: any) => {
  return getTags(queryParams);
};

// const {isLoading: isFetchingPersonalTags, data: allPersonalTags} =
//   useInfiniteQuery(['pinned-personal-tags', 'personal'], fetchTags);

//fetch User profile
export const useProfile = (queryKey: any, queryParams: any, options: any) => {
  return useQuery<any>(queryKey, () => getProfile(queryParams), options);
};

//fetch side bar tags
export const useSidebarTags = (queryParams: any, options?: any) => {
  // console.log('queryParams', queryParams);
  return useInfiniteQuery(
    ['pinned-shared-tags', 'shared'],
    () => fetchTags(queryParams),
    options,
  );
};

export const useSidebarInboxes = (
  queryKey: any,
  queryParams: any,
  options?: any,
) => {
  return useQuery<any>(queryKey, () => getInboxes(queryParams), options);
};

export const useSidebarUnreadCount = (queryParams: any, options?: any) => {
  return useQuery(
    'filters-unread-count',
    () => getThreadFiltersUnreadCount(queryParams),
    options,
  );
};

// const {isLoading: isFetchingPersonalnboxes, data: personalInboxes} = useQuery<
//   InboxType[]
// >(`personal-inboxes`, () => getInboxes({type: 'personal'}));

// const {isLoading: isFetchingSharedInboxes, data: sharedInboxes} = useQuery<
//   InboxType[]
// >(`member-shared-inboxes`, () => getInboxes({type: 'shared', is_pinned: true}));

// const {data: filtersUnreadCount} = useQuery(
//   'filters-unread-count',
//   getThreadFiltersUnreadCount,
// );
