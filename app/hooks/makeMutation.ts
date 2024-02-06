import {
  MutationFunction, QueryKey, useMutation, useQueryClient,
} from 'react-query';

/**
 * Creates a mutation function that can be used with React Query.
 *
 * @template T - The type of the mutation parameters.
 * @template R - The type of the mutation result.
 * @param {QueryKey} key - The key used to identify the query to invalidate after the mutation is successful.
 * @param {MutationFunction<R, T>} mutation - The mutation function to be executed.
 * @param {string[]} [queryDependencies] - An optional array of query keys to invalidate after the mutation is successful.
 * @returns {() => MutationResult<R, unknown, T>} - The mutation function.
 */

function makeMutation<T, R = unknown>(key: QueryKey, mutation: MutationFunction<R, T>, queryDependencies?: string[]) {
  return () => {
    const queryClient = useQueryClient();

    return useMutation<R, unknown, T>(mutation, {
      onSuccess() {
        queryClient.invalidateQueries(key);
        if (queryDependencies) {
          queryDependencies.forEach((k) => queryClient.invalidateQueries(k));
        }
      },
      retry: false,
    });
  };
}

export default makeMutation;
