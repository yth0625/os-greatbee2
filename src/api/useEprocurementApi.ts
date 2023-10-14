import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { api, useGetApi } from './api';
import {
  IAddingToAskReq,
  IAddingToCartReq,
  IAddingToWishListReq,
  ICartRes,
  IDeletingFromWishListReq,
  IDeletingShippingAddrInfoReq,
  IProdCategoryRes,
  IInsertingPaymentProductInfoReq,
  IPaymentProductInfoRes,
  IProdAskDetailRes,
  IProdAskListRes,
  IProductItemRes,
  IProdDetailRes,
  ISavingShippingAddrInfoReq,
  IShippingAddressListRes,
  IUpdatingPaymentResultReq,
  IPaymentInfoRes,
  ITrackingInfoRes,
  IProductItem, ICancelingOrderReq, IPaymentBillInfoRes, IUpdatePropertyYnInfoReq,
} from '../interfaces/eprocurement';

const base = '/api/v1';

// 대분류 카테고리 조회
export const getCategory1ListApi = () => {
  const url = base + `/selectLargeCategoryInf`;
  return api.get<IProdCategoryRes>(url)
};

// 중분류, 소분류 카테고리 조회
export const getCategoryListApi = (params: any) => {
  const url = base + `/selectCategoryInf`;
  return api.get<IProdCategoryRes>(url, params)
};

export const searchProductListApi = (keyword: string) => {
  const url = base + `/search`;

  return api.get<IProductItemRes[]>(url, {categoryNo: '', keyword})
}

export const getProductListApi = (params: any) => {
  const url = base + `/selectProdByCategory`;

  return api.get<IProductItemRes[]>(url, params);
};

export const useGetProdDetailApi = (productNo: string) => {
  const url = base + `/prodInformation`
  return useGetApi<IProdDetailRes[]>(url, {prodCode: productNo})
};

export const useAddItemToCartApi = () => {
  const url = base + '/insertShoppingBasket'
  return useMutation<AxiosResponse, AxiosError, IAddingToCartReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

export const useDeleteItemFromCartApi = () => {
  const url = base + '/deleteShoppingBasket'
  return useMutation<AxiosResponse, AxiosError, IDeletingFromWishListReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

export const useGetCartApi = () => {
  const url = base + `/selectProdBasket`
  return useGetApi<ICartRes[]>(url)
};

//결제품목 입력 api
export const useInsertPaymentProductInfo = () => {
  const url = base + '/insertPaymentProductInf'
  return useMutation<AxiosResponse, AxiosError, IInsertingPaymentProductInfoReq[]>({
      mutationFn: (data) => api.put(url, {data: data }),
    },
  );
};

export const useGetProdAskListApi = () => {
  const url = base + `/selectProdAsk`
  return useGetApi<IProdAskListRes[]>(url)
};

export const useGetProdAskDetailApi = (askNo: string) => {
  const url = base + `/selectProdAsk`
  return useGetApi<IProdAskDetailRes[]>(url, {askNo})
};

export const useRegisterAskApi = () => {
  const url = base + '/insertAskInf'
  return useMutation<AxiosResponse, AxiosError, IAddingToAskReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

export const useGetWishListApi = () => {
  const url = base + `/prodBookmark`
  return useGetApi<IProductItem[]>(url)
}

export const useSaveItemToWishListApi = () => {
  const url = base + '/insertProdBookmark'
  return useMutation<AxiosResponse, AxiosError, IAddingToWishListReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

export const useDeleteItemFromWishListApi = () => {
  const url = base + '/deleteProdBookmark'
  return useMutation<AxiosResponse, AxiosError, IDeletingFromWishListReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

export const useGetBestProductListApi = () => {
  const url = base + `/favoriteProduct`
  return useGetApi<IProductItem[]>(url)
}

export const useGetBestProductListByClientApi = () => {
  const url = base + `/favoriteProductByClient`
  return useGetApi<IProductItem[]>(url)
}

// 배송지 조회
export const useGetShippingAddrInfoApi = () => {
  const url = base + `/selectShippingAddrInf`
  return useGetApi<IShippingAddressListRes[]>(url)
}

// 배송지 추가
export const useSaveShippingAddrInfoApi = () => {
  const url = base + '/insertShippingAddrInf'
  return useMutation<AxiosResponse, AxiosError, ISavingShippingAddrInfoReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

// 배송지 삭제
export const useDeleteShippingAddrInfoApi = () => {
  const url = base + '/deleteShippingAddrInf'
  return useMutation<AxiosResponse, AxiosError, IDeletingShippingAddrInfoReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};


// 동의서 조회
export const useGetAgreeInfoApi = () => {
  const url = base + `/selectProductAgreeInf`
  return useGetApi<number>(url)
}

// 동의 api
export const useUpdateAgreeInfoApi = () => {
  const url = base + '/insertProductAgreeInf'
  return useMutation<AxiosResponse, AxiosError>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};


// 결제번호 별 결제품목정보 조회
export const useGetPaymentProductInfByPaymentNoApi = (paymentNo: string) => {
  const url = base + `/selectPaymentProductInfByPaymentNo`
  return useGetApi<IPaymentProductInfoRes[]>(url, {paymentNo})
}

export const getTrackingInfoApi = (paymentNo: string, productNo: string) => {
  const url = base + `/selectTrackingNo`
  return api.get<ITrackingInfoRes>(url, { paymentNo, productNo})
}

// 결제결과 업데이트
export const useUpdatePaymentResultApi = () => {
  const url = base + '/insertPaymentInf'
  return useMutation<AxiosResponse, AxiosError, IUpdatingPaymentResultReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};

/*
 * 결제결과 조회
 - 구매진행현황 : propertyYn = 'N'
 - 구매내역관리 : propertyYn = 'Y'
 */
export const useGetPaymentInfoApi = (startDate: string, endDate: string, propertyYn: string) => {
  const url = base + `/selectPaymentInf`
  return useGetApi<IPaymentInfoRes[]>(url, {startDate, endDate, propertyYn})
}

// 주문취소, 환불요청
export const useCancelOrderApi = () => {
  const url = base + '/insertPaymentProductInfForCancel'
  return useMutation<AxiosResponse, AxiosError, ICancelingOrderReq>({
      mutationFn: (data) => api.put(url, {data: [data]}),
    },
  );
};

// 거래명세서 내역 조회
export const getPaymentBillInfoApi = (paymentNo: string) => {
  const url = base + `/selectPaymentBillInf`;

  return api.get<IPaymentBillInfoRes[]>(url, {paymentNo});
};

// 자산 등록
export const useUpdatePropertyYnInfoApi = () => {
  const url = base + '/updatePropertyYnInf'
  return useMutation<AxiosResponse, AxiosError, IUpdatePropertyYnInfoReq>({
      mutationFn: (data) => api.put(url, data),
    },
  );
};
