import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

import { api } from './api';
import { ISignInReq, ISignInRes, ISignUpReq, ISignUpRes } from '../interfaces/auth';

const base = '/api/cm'

export const useSignInApi = () => {
  const url = base + '/login'
  return useMutation<ISignInRes, AxiosError, ISignInReq>({
      mutationFn: (data) => api.post(url, data),
    },
  );
};

export const useSingUpApi = () => {
  const url = base + '/login/signUp'
  return useMutation<ISignUpRes, AxiosError, ISignUpReq>({
      mutationFn: (data) => api.post(url, data),
    },
  );
};
