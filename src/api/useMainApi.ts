import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { api, useGetApi } from './api';
import {
  IChangingPasswordReq,
  ICheckingPasswordReq,
  IFavoriteRes,
  INoticeRes,
  IProfileRes,
  IRecentDocumentRes,
  IRegisteringInquiryReq,
  IRegisteringInquiryRes,
  ISavingUserInfoReq,
  IUpdatedDocumentRes,
  IUserInfoRes,
} from '../interfaces/main';

const base = '/api/cm'

export const useGetProfileApi = () => {
  const url = base + '/mainPage/profile';
  return useQuery<AxiosResponse, AxiosError, IProfileRes>({
      queryKey: ['profile'],
      queryFn: () => api.get(url),
      select: (res) => res.data.data,
    },
  );
};

export const useGetUserInfoApi = () => {
  const url = base + '/mainPage/userInfo';
  return useGetApi<IUserInfoRes>(url);
};

export const useSaveUserInfoApi = () => {
  const url = base + '/mainPage/userInfo/update'
  return useMutation<AxiosResponse, AxiosError, ISavingUserInfoReq>({
      mutationFn: (data) => api.patch(url, data),
    },
  );
};

export const useCheckPasswordApi = () => {
  const url = base + '/mainPage/userInfo/update'
  return useMutation<AxiosResponse, AxiosError, ICheckingPasswordReq>({
      mutationFn: (data) => api.patch(url, data),
    },
  );
};

export const useChangePasswordApi = () => {
  const url = base + '/mainPage/userInfo/update'
  return useMutation<AxiosResponse, AxiosError, IChangingPasswordReq>({
      mutationFn: (data) => api.patch(url, data),
    },
  );
};

export const useGetFavoriteListApi = () => {
  const url = base + '/mainPage/favorite';
  return useQuery<AxiosResponse, AxiosError, IFavoriteRes[]>({
      queryKey: ['favorite'],
      queryFn: () => api.get(url),
      select: (res) => res.data.data,
    },
  );
};

export const useGetNoticeApi = () => {
  const url = base + '/mainPage/notification';
  return useQuery<AxiosResponse, AxiosError, INoticeRes[]>({
      queryKey: ['notification'],
      queryFn: () => api.get(url),
      select: (res) => res.data.data,
    },
  );
};

export const useGetRecentDocumentListApi = () => {
  const url = base + '/mainPage/recentDocs';
  return useQuery<AxiosResponse, AxiosError, IRecentDocumentRes[]>({
      queryKey: ['recentDocs'],
      queryFn: () => api.get(url),
      select: (res) => res.data.data,
    },
  );
};

export const useGetUpdateListApi = () => {
  const url = base + '/mainPage/updateDocs';
  return useQuery<AxiosResponse, AxiosError, IUpdatedDocumentRes[]>({
      queryKey: ['updateDocs'],
      queryFn: () => api.get(url),
      select: (res) => res.data.data,
    },
  );
};

export const useRegisterInquiryApi = () => {
  const url = base + '/mainPage/inquiryReg'
  return useMutation<IRegisteringInquiryRes, AxiosError, IRegisteringInquiryReq>({
      mutationFn: (data) => api.post(url, data),
    },
  );
};
