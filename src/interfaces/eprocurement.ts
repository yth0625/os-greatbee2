export interface IProductItem {
  productNo: number;
  productName: string;
  sellingPrice: number;
  imgSumnail: string;
  wishYn: string;
  shoppingBasketYn: string;
}

export interface IProductItemRes {
  data: IProductItem[];
}

export interface IProdCategory {
  cateNo: number;
  cateNm: string;
}

export interface IProdCategoryRes {
  data: IProdCategory[];
}

export interface IProdDetailRes {
  productNo: number;
  productName: string;
  sellingPrice: number;
  imgSumnail: string;
  imgMain: string;
  imgDetail: string;
  notice: string;
  exrtNotice: string;
  categoryMain: number;
  categorySub: string;
  wishYn: string;
  shoppingBasketYn: string;
  vendorShippingNotice01: string;
  vendorShippingNotice02: string;
  vendorShippingNotice03: string;
  vendorShippingNotice04: string;
  vendorShippingNotice05: string;
}

export interface IAddingToCartReq {
  productNo: number;
  sellingCount: number;
}

export interface ICartRes {
  productName: string;
  productNo: number;
  sellingCount: number;
  sellingPrice: number;
  addDttm: string;
  imgSumnail: string;
  vendorNo: string;
}

export interface IAddingToWishListReq {
  productNo: number;
}

export interface IDeletingFromWishListReq {
  productNo: number;
}

export interface IInsertingPaymentProductInfoReq {
  productNo: number;
  sellingCount: number;
  sellingAmount: number;
}

export interface IProdAskListRes {
  prodAskNo: number;
  prodAskCategory: number;
  prodAskTitle: string;
  prodAskQuestion: string;
  prodAskStatus: string;
  prodAskDttm: string;
  membName: string;
}

export interface IProdAskDetailRes {
  prodAskNo: number;
  prodAskCategory: number;
  prodAskTitle: string;
  prodAskQuestion: string;
  prodAskStatus: string;
  prodAskDttm: string;
  membName: string;
  prodAskAnswer: string;
}

export interface IAddingToAskReq {
  prodAskCategory: number;
  prodAskQuestion: string;
  prodAskTitle: string;
  productNo: number;
}

export interface IShippingAddressListRes {
  shippingAddrNo: number;
  membNo: number;
  bizSeq: number;
  shippingAddrNm: string;
  recipientNm: string;
  phoneNo01: string;
  phoneNo02: string;
  shippingAddr: string;
  shippingAddrDtl: string;
  deliverPostNo: string;
  reqIdx: number;
  reqTxt: string;
}

export interface ISavingShippingAddrInfoReq {
  deliverPostNo: string;  //우편번호
  phoneNo01: string; //연락처1
  // phoneNo02: string; //연락처2
  recipientNm: string;  //주문인
  reqIdx: number;
  reqTxt: string; //메모내용
  shippingAddrNm: string;	//수신인
  shippingAddr: string; //주소
  shippingAddrDtl: string; //상세주소
}

export interface IDeletingShippingAddrInfoReq {
  shippingAddrNo: number;
}

export interface IPaymentProductInfoRes {
  rgtDttm: string;
  paymentNo: string;
  productNo: string;
  vendorNo: string;
  productNm: string;
  sellingAmount: number;
  sellingCount: number;
  shippingStatusCode: string;
  productImg: string;

}

export interface IUpdatingPaymentResultReq {
  paymentNo: string;
  amount: string;
  shippingAddrNo: string;
  paymentStatus: string;
  paymentCode: string;
  receiptURL: string;
  itemNm: string;
  email?: string;
  payMethod : string;
}

export interface IPaymentInfoRes {
  rgtDttm: string;
  paymentNo: string;
  amount: number;
  paymentStatus: number;
  paymentCode: string;
  itemNm: string;
  receiptURL: string;
  shippingAddrNo: number;
}

export interface IVehicleInfos {
  carType: string;
  carNum: string;
  year: number;
  reg: number;
  distance: number;
  drivingAge: number;
  rental: string;
  insurance: string;
  owner: string;
  department: string;
  contact: string;
}

export interface ITrackingInfo {
  trackingNo: string
  postCompCode: string;
  trackingUrl: string;
}

export interface ITrackingInfoRes {
  data: ITrackingInfo[]
}

export interface ICancelingOrderReq {
  paymentNo: string;
  productNo: string;
  sellingAmount: number;
  sellingCount: number;
  reasonForCancelIdx: number;
  shippingStatusCode: string;
}

export interface IPaymentBillInfoRes {
  paymentNo: string;
  productNo: number;
  productNm: string;
  sellingAmount: number;
  sellingCount: number;
  taxAmount: number;
  supplyAmount: number;
  unitPrice: number;
  buyer: string;
  buyDttm: string;
}

export interface IUpdatePropertyYnInfoReq {
  paymentNo: string;
  propertyYn: string;
}
