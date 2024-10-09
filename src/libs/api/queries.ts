import {useQuery} from '@tanstack/react-query';
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
