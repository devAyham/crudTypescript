import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { request } from "../lib/axios";

const fetcher = (options: {}) => {
  return request({ ...options });
};

export function useFetchQuery(
  queryName: (string | any)[],
  { ...fetcherOption },
  options?:
    | Omit<
        UseQueryOptions<unknown, unknown, unknown, any[]>,
        "queryKey" | "queryFn"
      >
    | undefined
): UseQueryResult<any,any> {
  return useQuery(queryName, () => fetcher(fetcherOption), { ...options });
}
