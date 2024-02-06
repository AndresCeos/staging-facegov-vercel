/* eslint-disable @typescript-eslint/comma-dangle */
import { useQuery } from 'react-query';
import { axios } from './axios';

import makeMutation from '@/hooks/makeMutation';

const getMe = () => axios.get<{ authenticated: boolean }>('/auth/me');
const useIsSignedIn = () => {
  const query = useQuery('auth/me', getMe, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};

const postLogout = () => axios.post('/auth/logout');
const mutateLogout = makeMutation(['auth/me'], postLogout);

const postSignIn = (body: { email: string, password: string }) => axios.post<{ authInfo: Api.User, token: string }>('/auth/sign-in', body);
const mutateSignIn = makeMutation(['auth/me'], postSignIn);

export {
  mutateLogout,
  mutateSignIn,
  useIsSignedIn
};
