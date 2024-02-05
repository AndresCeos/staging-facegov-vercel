"use client";

import { PropsWithChildren } from "react";
import QueryClientWrapper from "../libs/QueryClientWrapper";
import { ReactQueryDevtools } from 'react-query/devtools';

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientWrapper>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientWrapper>
  );
};
