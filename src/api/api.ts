import axios, { AxiosError, AxiosResponse } from 'axios';
import { signOut } from '../utils/utils';
import { useQuery, UseQueryOptions } from 'react-query';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const {
//       response: { status },
//     } = error;
//     if (status === 403) {
//       signOut();
//       return;
//     }

//     return Promise.reject(error);
//   },
// );

const getAccessToken = () => {
  const localStorageToken = localStorage.getItem('accessToken');
  const sessionStorageToken = sessionStorage.getItem('accessToken');

  if (sessionStorageToken !== null) {
    return sessionStorageToken;
  }

  if (localStorageToken !== null) {
    return localStorageToken;
  }

  return '';
};

export const api = {
  get: <T>(url: string, params?: object) =>
    instance.get<T>(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      params,
    }),
  post: <T>(url: string, data: any, config?: any) =>
    instance.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      ...config,
    }),
  put: <T>(url: string, data: any) =>
    instance.put<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  patch: <T>(url: string, data: any) =>
    instance.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  delete: <T>(url: string, params?: object) =>
    instance.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      params,
    }),
};

export const useGetApi = <T>(
  url: string,
  params?: object,
  config?: UseQueryOptions<AxiosResponse, AxiosError, T>,
) => {
  return useQuery<AxiosResponse, AxiosError, T>(
    [url, params],
    () => api.get(url, params),
    {
      refetchOnWindowFocus: false,
      select: (res) => res.data.data,
      staleTime: 0, // default 0, 나중에 조정하기
      cacheTime: 1000 * 60 * 5, // default 5 minutes, 나중에 조정하기
      ...config,
    },
  );
};
