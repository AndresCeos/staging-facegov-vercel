/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

const getPoliticalFigure = async (): Promise<Api.Response<Api.PoliticalFigure[]>> => axios.get('/political-figures');
const getPoliticalFigureById = async (id: number): Promise<Api.Response<Api.PoliticalFigure>> => axios.get(`/political-figures/${id}`);
const getPoliticalFigureComments = async (id: number): Promise<Api.Response<Api.Comment[]>> => axios.get(`/political-figures/${id}/comments`);

const usePoliticalFigures = () => useQuery('political-figures', () => getPoliticalFigure());
const usePoliticalFigureById = (id: number) => useQuery(['political-figures', id], () => getPoliticalFigureById(id));
const usePoliticalFigureComments = (id: number) => useQuery(['political-figures', id, 'comments'], () => getPoliticalFigureComments(id));

export {
  usePoliticalFigureById,
  usePoliticalFigureComments,
  usePoliticalFigures
};
