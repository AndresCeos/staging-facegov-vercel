/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const getPoliticalFigure = async (): Promise<Api.Response<Api.PoliticalFigure[]>> => axios.get('/political-figures');
const getPoliticalFigureById = async (id: number): Promise<Api.Response<Api.PoliticalFigure>> => axios.get(`/political-figures/${id}`);
// eslint-disable-next-line arrow-body-style
const getPoliticalFigureComments = async (id: number, sortConfig: SortConfig): Promise<Api.Response<Api.Comment[]>> => {
  return axios.get(`/political-figures/${id}/comments`, { params: { key: sortConfig.key, direction: sortConfig.direction } });
};

const usePoliticalFigures = () => useQuery('political-figures', () => getPoliticalFigure());
const usePoliticalFigureById = (id: number) => useQuery(['political-figures', id], () => getPoliticalFigureById(id));
const usePoliticalFigureComments = (id: number, sortConfig: SortConfig) => useQuery(['political-figures', id, 'comments', sortConfig], () => getPoliticalFigureComments(id, sortConfig));

export {
  usePoliticalFigureById,
  usePoliticalFigureComments,
  usePoliticalFigures
};
