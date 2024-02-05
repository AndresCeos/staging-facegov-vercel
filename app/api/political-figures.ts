'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

async function getPoliticalFigure(): Promise<Api.Response<Api.PoliticalFigure[]>> {
  return axios.get('/political-figures');
}

const usePoliticalFigures = () => useQuery('political-figures', () => getPoliticalFigure());

export default usePoliticalFigures;
