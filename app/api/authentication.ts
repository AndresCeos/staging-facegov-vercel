/* eslint-disable @typescript-eslint/comma-dangle */
import { useQuery } from 'react-query';
import { axios } from './axios';

import makeMutation from '@/hooks/makeMutation';

const getMe = () => axios.get<Api.AuthStatus>('/auth/me');
const postSendOTP = (phoneNumber: string) => axios.post('/auth', { phoneNumber });
const postVerifyOTP = (otp: { phoneNumber: string, code: string }) => axios.post('/auth/verify', otp);

const useIsSignedIn = () => useQuery('auth/me', getMe);
const mutateSendOTP = makeMutation(['auth/me'], postSendOTP);
const mutateVerifyOTP = makeMutation(['auth/me'], postVerifyOTP, ['auth/me']);

const postLogout = () => axios.post('/auth/logout');
const mutateLogout = makeMutation(['auth/me'], postLogout);

export {
  mutateLogout,
  mutateSendOTP,
  mutateVerifyOTP,
  useIsSignedIn
};
