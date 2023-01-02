import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "../shared/baseURL";

const interceptor = axios.create({ baseURL });

export const request = async ({ ...options }: AxiosRequestConfig) :Promise<AxiosResponse>  => {
  interceptor.defaults.headers.common.Authorization = `Bearer token`; //from local storage or cookies

  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error : unknown) => {
    // optionaly catch errors and add additional logging here
    throw error;
  };

  try {
    const response = await interceptor(options);
    return onSuccess(response);
  }
  catch (error ) {
    return onError(error);
  }
};
