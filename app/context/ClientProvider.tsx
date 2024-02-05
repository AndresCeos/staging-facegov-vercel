'use client';

import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import QueryClientWrapper from '../libs/QueryClientWrapper';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientWrapper>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientWrapper>
  );
}

export default ClientProvider;
