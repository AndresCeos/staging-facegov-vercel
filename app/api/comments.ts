/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import makeMutation from '@/hooks/makeMutation';
import { axios } from './axios';

const postComment = async (args: Pick<Api.Comment, 'text' | 'rating'> & { politicalFigureId: number }): Promise<Api.Response<Api.Comment>> => axios.post(`/political-figures/${args.politicalFigureId}/comments`, { text: args.text, rating: args.rating });

const mutateComment = makeMutation(['/comment'], postComment, ['political-figures']);

export default mutateComment;
