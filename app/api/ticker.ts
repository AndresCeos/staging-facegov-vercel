/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/comma-dangle */

'use client';

import { useQuery } from 'react-query';

import { axios } from './axios';

const getTickers = async (): Promise<Api.Ticker[]> => {
  return axios.get('/tickers');
};

const useTickers = () => useQuery({
  queryKey: ['tickers'],
  queryFn: getTickers,
  keepPreviousData: true,
});

export default useTickers;
