/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import makeMutation from '@/hooks/makeMutation';
import { axios } from './axios';

const postComment = async (args: Pick<Api.Comment, 'text' | 'rating'> & { politicalFigureId: number }): Promise<Api.Response<Api.Comment>> => axios.post(`/political-figures/${args.politicalFigureId}/comments`, { text: args.text, rating: args.rating });
const putCommentUtility = async (args: { commentId: number; utility: 'true' | 'false', politicalFigureId: number }): Promise<Api.Response<Api.Comment>> => axios.put(`/political-figures/${args.politicalFigureId}/comments/${args.commentId}/utility`, { utility: args.utility });

const mutateComment = makeMutation(['/comment'], postComment, ['political-figures']);
const mutateCommentUtility = makeMutation(['/comment', '/utility'], putCommentUtility, ['political-figures']);

export {
  mutateComment,
  mutateCommentUtility
};
