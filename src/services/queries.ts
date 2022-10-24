import {useInfiniteQuery, useQuery} from 'react-query';
import {InboxType} from 'src/@types/inbox';
import {getInboxes, getTags, getThreadFiltersUnreadCount} from './inbox';
import {getProfile} from './auth';

const fetchTags = ({pageParam = 1, queryKey}: any) => {
  const routeType = queryKey[1];
  return getTags({page: pageParam, type: routeType ?? '', is_pinned: true});
};

// const {isLoading: isFetchingPersonalTags, data: allPersonalTags} =
//   useInfiniteQuery(['pinned-personal-tags', 'personal'], fetchTags);

//fetch User profile
export const useProfile = (queryKey: any, queryParams: any, options: any) => {
  return useQuery<any>(queryKey, () => getProfile(queryParams), options);
};

export const useSidebarTags = (options?: any) => {
  return useInfiniteQuery(['pinned-shared-tags', 'shared'], fetchTags, options);
};

export const useSidebarInboxes = (
  queryKey: any,
  queryParams: any,
  options?: any,
) => {
  return useQuery<InboxType[]>(
    queryKey,
    () => getInboxes(queryParams),
    options,
  );
};

export const useSidebarUnreadCount = (options?: any) => {
  return useQuery('filters-unread-count', getThreadFiltersUnreadCount, options);
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
