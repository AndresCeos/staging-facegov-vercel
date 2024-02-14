/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

const getPoliticalFigure = async (pagination: Pagination.Config): Promise<Api.Response<Api.PoliticalFigure[]>> => {
  return axios.get('/political-figures', { params: { page: pagination.page, limit: pagination.limit } });
};
const getPoliticalFigureById = async (id: number): Promise<Api.Response<Api.PoliticalFigure>> => axios.get(`/political-figures/${id}`);
// eslint-disable-next-line arrow-body-style
const getPoliticalFigureComments = async (id: number, sortConfig: Pagination.SortConfig): Promise<Api.Response<Api.Comment[]>> => {
  return axios.get(`/political-figures/${id}/comments`, { params: { key: sortConfig.key, direction: sortConfig.direction } });
};

const usePoliticalFigures = (pagination: Pagination.Config) => useQuery(['political-figures', pagination.page, pagination.limit], () => getPoliticalFigure(pagination));
const usePoliticalFigureById = (id: number) => useQuery(['political-figures', id], () => getPoliticalFigureById(id));
const usePoliticalFigureComments = (id: number, sortConfig: Pagination.SortConfig) => useQuery(['political-figures', id, 'comments', sortConfig], () => getPoliticalFigureComments(id, sortConfig));

export {
  usePoliticalFigureById,
  usePoliticalFigureComments,
  usePoliticalFigures
};
