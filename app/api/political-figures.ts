/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

const getPoliticalFigure = async (pagination: Pagination.Config & { search?: string, filter?: string }): Promise<Api.Response<Api.PoliticalFigure[]>> => {
  return axios.get('/political-figures', {
    params: {
      offset: pagination.offset,
      limit: pagination.limit,
      ...(pagination.search && { search: pagination.search }),
      ...(pagination.filter && { filter: pagination.filter }),
    }
  });
};
export const getPoliticalFigureBySlug = async (slug: string): Promise<Api.Response<Api.PoliticalFigure>> => axios.get(`/political-figures/${slug}`);
// eslint-disable-next-line arrow-body-style
const getPoliticalFigureComments = async (slug: string, sortConfig: Pagination.SortConfig): Promise<Api.Response<Api.Comment[]>> => {
  return axios.get(`/political-figures/${slug}/comments`, { params: { key: sortConfig.key, direction: sortConfig.direction } });
};

const usePoliticalFigures = (pagination: Pagination.Config & { search?: string, filter?: string }) => useQuery({
  queryKey: ['political-figures', pagination.offset, pagination.limit, pagination?.search, pagination?.filter],
  queryFn: () => getPoliticalFigure(pagination),
  keepPreviousData: true,
});
const usePoliticalFigureById = (slug: string) => useQuery(['political-figures', slug], () => getPoliticalFigureBySlug(slug));
const usePoliticalFigureComments = (slug: string, sortConfig: Pagination.SortConfig) => useQuery(['political-figures', slug, 'comments', sortConfig], () => getPoliticalFigureComments(slug, sortConfig));

export {
  usePoliticalFigureById,
  usePoliticalFigureComments,
  usePoliticalFigures
};
