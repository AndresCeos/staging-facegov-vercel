/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

const getPoliticalFigure = async (pagination: Pagination.Config & { search?: string }): Promise<Api.Response<Api.PoliticalFigure[]>> => {
  return axios.get('/political-figures', { params: { offset: pagination.offset, limit: pagination.limit, ...(pagination.search && { search: pagination.search }) } });
};
export const getPoliticalFigureById = async (id: number): Promise<Api.Response<Api.PoliticalFigure>> => axios.get(`/political-figures/${id}`);
// eslint-disable-next-line arrow-body-style
const getPoliticalFigureComments = async (id: number, sortConfig: Pagination.SortConfig): Promise<Api.Response<Api.Comment[]>> => {
  return axios.get(`/political-figures/${id}/comments`, { params: { key: sortConfig.key, direction: sortConfig.direction } });
};

const usePoliticalFigures = (pagination: Pagination.Config & { search?: string }) => useQuery({
  queryKey: ['political-figures', pagination.offset, pagination.limit, pagination?.search],
  queryFn: () => getPoliticalFigure(pagination),
  keepPreviousData: true,
});
const usePoliticalFigureById = (id: number) => useQuery(['political-figures', id], () => getPoliticalFigureById(id));
const usePoliticalFigureComments = (id: number, sortConfig: Pagination.SortConfig) => useQuery(['political-figures', id, 'comments', sortConfig], () => getPoliticalFigureComments(id, sortConfig));

export {
  usePoliticalFigureById,
  usePoliticalFigureComments,
  usePoliticalFigures
};
