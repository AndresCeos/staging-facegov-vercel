'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function QueryClientWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          refetchOnWindowFocus: false,
          staleTime: 20 * 1000,
        },
      },
    }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryClientWrapper;
