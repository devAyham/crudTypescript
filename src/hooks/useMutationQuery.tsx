import { AxiosInterceptorOptions } from "axios";
import {
  useMutation,
  UseMutationOptions,
} from "react-query";
import { request } from "../lib/axios";


const fetcher = (options: {}) => {
  return request({...options});
};

export function useMutationQuery (
  { ...fetcherOption },
  options?:
    | Omit<UseMutationOptions<{}, unknown, void, unknown>, "mutationFn">
    | undefined
) {
  return useMutation(() => fetcher(fetcherOption), { ...options });
}
