/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */
import { useQuery } from 'react-query';
import { axios } from './axios';

import makeMutation from '@/hooks/makeMutation';
import formatNameSlug from '@/utils/formatNameSlug';

const postUserProfile = (profile: { firstName: string, lastName: string }) => {
  const formData = new FormData();

  formData.append('firstName', profile.firstName);
  formData.append('lastName', profile.lastName);
  return axios.post('/profile', formData, {
  });
};
const mutateUserProfile = makeMutation(['profile'], postUserProfile, ['auth/me']);

const postUserImageProfile = (formData: FormData) => axios.post('/profile/upload-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
const mutateUserImageProfile = makeMutation(['/upload-image'], postUserImageProfile, ['auth/me']);

const getUserComments = (pagination: Pagination.Config): Promise<Api.Response<Api.UserComment[]>> => axios.get('/profile/comments', { params: { offset: pagination.offset, limit: pagination.limit } });
const useUserComments = (pagination: Pagination.Config) => useQuery({
  queryKey: ['profile', 'comments', pagination.offset, pagination.limit],
  queryFn: () => getUserComments(pagination),
  keepPreviousData: true,
});
const getUserCommentData = (comment: Api.UserComment): Promise<Api.Response<Api.Comment[]>> => axios.get(`political-figures/${formatNameSlug(`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`)}/comments`);

const getUserCommentUtilities = (pagination: Pagination.Config): Promise<Api.Response<Api.UserCommentUtility[]>> => axios.get('/profile/utilities', { params: { offset: pagination.offset, limit: pagination.limit } });
const useUserCommentUtilities = (pagination: Pagination.Config) => useQuery({
  queryKey: ['profile', 'utilities', pagination.offset, pagination.limit],
  queryFn: () => getUserCommentUtilities(pagination),
  keepPreviousData: true,
});

export {
  getUserCommentData, mutateUserImageProfile, mutateUserProfile, useUserComments, useUserCommentUtilities
};
