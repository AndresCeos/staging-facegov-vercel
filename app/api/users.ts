/* eslint-disable @typescript-eslint/comma-dangle */
import { axios } from './axios';

import makeMutation from '@/hooks/makeMutation';

const postUserProfile = (profile: { firstName: string, lastName: string }) => axios.post('/profile', profile);
const mutateUserProfile = makeMutation(['profile'], postUserProfile, ['auth/me']);

export default mutateUserProfile;
