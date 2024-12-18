import {
  QueryFunction,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {api} from '.';

export const useTagList = (userId: string, ...queryProps: any) =>
  useQuery(
    {
      queryKey: ['tag-list', {userId}],
      queryFn: async () => {
        const {data} = await api.get(`/content/tag/list/${userId}`);
        return data.result;
      },
    },
    ...queryProps,
  );

export const useGetInfiniteList = (
  apiPath: string,
  query: Record<string, any>,
  options: Partial<UndefinedInitialDataInfiniteOptions<QueryFunction>>,
) => {
  let queryHook = useInfiniteQuery({
    queryKey: [apiPath, {query}],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage?.pagination?.nextPage,
    queryFn: async ({pageParam}) => {
      const queries = Object.entries({...query, _page: pageParam})
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      const {data} = await api.get(`${apiPath}?${queries}`);
      return data.result;
    },
    ...options,
  });
  return {
    ...queryHook,
    flattedData: queryHook?.data?.pages.flatMap(x => x.list),
  };
};
export const useGetUserContents = (query: Record<string, any>) => {
  return useGetInfiniteList(`/content/user/list`, query);
};
