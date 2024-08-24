import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import React from 'react';
import { getComments } from '../services/getComments';
import { Comments } from '../components/Comments';

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments />
    </HydrationBoundary>
  );
};

export default page;
