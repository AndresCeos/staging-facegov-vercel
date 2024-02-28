/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */
import { useQuery } from 'react-query';
import { axios } from './axios';

import makeMutation from '@/hooks/makeMutation';

const postUserProfile = (profile: { firstName: string, lastName: string }) => axios.post('/profile', profile);
const mutateUserProfile = makeMutation(['profile'], postUserProfile, ['auth/me']);

const getUserComments = (pagination: Pagination.Config): Promise<Api.Response<Api.UserComment[]>> => axios.get('/profile/comments', { params: { offset: pagination.offset, limit: pagination.limit } });
const useUserComments = (pagination: Pagination.Config) => useQuery({
  queryKey: ['profile', 'comments', pagination.offset, pagination.limit],
  queryFn: () => getUserComments(pagination),
  keepPreviousData: true,
});

const getUserCommentUtilities = (pagination: Pagination.Config): Promise<Api.Response<Api.UserCommentUtility[]>> => axios.get('/profile/utilities', { params: { offset: pagination.offset, limit: pagination.limit } });
const useUserCommentUtilities = (pagination: Pagination.Config) => useQuery({
  queryKey: ['profile', 'utilities', pagination.offset, pagination.limit],
  queryFn: () => getUserCommentUtilities(pagination),
  keepPreviousData: true,
});

export {
  mutateUserProfile,
  useUserCommentUtilities,
  useUserComments
};
