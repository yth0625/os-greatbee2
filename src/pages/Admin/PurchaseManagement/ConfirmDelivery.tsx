import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import colors from 'styles/colors';
import Button from 'common/Button/Button';
import { useOpenPopup } from 'pages/Eprocurement/component/utility/popup/Popup';
import {
  useGetPaymentProductInfByPaymentNoApi,
  getTrackingInfoApi,
  getPaymentBillInfoApi,
} from '../../../api/useEprocurementApi';
import { IPaymentBillInfoRes, IPaymentProductInfoRes, ITrackingInfoRes } from '../../../interfaces/eprocurement';
import { openModal } from '../../../redux/popUpReducer';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import CancelOrder from './CancelOrder';
import Loading from 'pages/Eprocurement/component/utility/Loading';
import PrintInvoice, { InvoiceData } from '../../Eprocurement/PrintInvoice';

interface IProductInfo extends IPaymentProductInfoRes {
  trackingUrl: string;
  canceledCount: number;
}

interface IShippingInfo {
  text: string;
  buttonTrackingShipment: boolean;
  buttonCancelingOrder?: boolean;
  buttonRefunding?: boolean;
  buttonExchangingItem: boolean;
  buttonContact: boolean;
}

interface IModalButtonProps {
  isAvailable: boolean | undefined;
  text: string;
  onClick: () => void;
}

const ModalButton = (props: IModalButtonProps) => {
  const { isAvailable, text, onClick } = props;

  return (
    <Button
      buttonclassName="modal_button"
      textclassName="modal_button_text"
      outterStyles={{
        background: isAvailable ? colors.primary.basic : '#fff',
        borderColor: isAvailable ? '' : '#00000020',
        width: '100%',
        padding: '12px 0px',
      }}
      textStyles={{
        color: isAvailable ? colors.font.white : '#00000030',
      }}
      onClick={() => isAvailable && onClick()}
    >
      {text}
    </Button>
  );
};

const shippingInfo: { [key: string]: IShippingInfo } = {
  '-1': {
    text: '주문 취소',
    buttonTrackingShipment: false,
    buttonCancelingOrder: false,
    buttonExchangingItem: false,
    buttonContact: true,
  },
  '11': {
    text: '배송 준비중',
    buttonTrackingShipment: false,
    buttonCancelingOrder: true,
    buttonExchangingItem: false,
    buttonContact: true,
  },
  '21': {
    text: '배송중',
    buttonTrackingShipment: true,
    buttonCancelingOrder: false,
    buttonExchangingItem: false,
    buttonContact: true,
  },
  '31': {
    text: '배송완료',
    buttonTrackingShipment: true,
    buttonRefunding: true,
    buttonExchangingItem: true,
    buttonContact: true,
  },
  '41': {
    text: '교환 신청중',
    buttonTrackingShipment: true,
    buttonRefunding: false,
    buttonExchangingItem: false,
    buttonContact: true,
  },
  '42': {
    text: '교환 완료',
    buttonTrackingShipment: false,
    buttonRefunding: true,
    buttonExchangingItem: true,
    buttonContact: true,
  },
  '51': {
    text: '환불 신청중',
    buttonTrackingShipment: true,
    buttonRefunding: false,
    buttonExchangingItem: false,
    buttonContact: true,
  },
  '52': {
    text: '환불 완료',
    buttonTrackingShipment: false,
    buttonRefunding: true,
    buttonExchangingItem: true,
    buttonContact: true,
  },
};

interface IProps {
  paymentNo: string;
  receiptURL: string;
  shippingAddrNo: string;
}

const ConfirmDelivery = (props: IProps) => {
  const { paymentNo, receiptURL, shippingAddrNo } = props;

  const dispatch = useDispatch();
  const openPopup = useOpenPopup();

  const [productList, setProductList] = useState<IProductInfo[]>([]);


  const [purchaser, setPurchaser] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);
  const [isShowPrintView, setIsShowPrintView] = useState(false);

  const {
    data: productInfoList,
    // isLoading: isProductInfoListLoading,
    // refetch: refetchProductInfoList,
  } = useGetPaymentProductInfByPaymentNoApi(paymentNo);

  const getShippingStatus = (code: string) => {
    if (shippingInfo[code]) {
      return shippingInfo[code].text;
    }
    return '';
  };

  const handleClickReceipt = (url: string) => {
    if (url === '') {
      return;
    }

    const option =
      'width=900, height=600, location=no, status=no, menubar=no, toolbar=no, resizable=yes';
    window.open(url, '카드영수증', option);
  };

  const handleClickStatement = async (paymentNo: string) => {
    const res: AxiosResponse = await getPaymentBillInfoApi(paymentNo)
    const paymentBillInfoList = res.data.data as IPaymentBillInfoRes[];

    if (paymentBillInfoList && paymentBillInfoList.length > 0) {
      setPurchaser(paymentBillInfoList[0].buyer);
      setPurchaseDate(moment(paymentBillInfoList[0].buyDttm).format('YYYY년 MM월 DD일'));

      const newInvoiceData = paymentBillInfoList.map((item: IPaymentBillInfoRes) => {
        return {
          productName: item.productNm,
          count: item.sellingCount,
          unitPrice: item.sellingAmount / item.sellingCount,
          supplyValue: item.supplyAmount,
          taxAmount: item.taxAmount,
        };
      })

      setInvoiceData(newInvoiceData);
      setIsShowPrintView(true);
    }
  };

  const handleClickTrackingInfo = (url: string) => {
    if (url === '') {
      return;
    }
    const option =
      'width=900, height=600, location=no, status=no, menubar=no, toolbar=no, resizable=yes';
    window.open(url, '배송조회', option);
  };

  const updateTrackingUrl = async (productInfoList: IProductInfo[]) => {
    const l: IProductInfo[] = [];
    for (const item of productInfoList) {
      const res: AxiosResponse<ITrackingInfoRes> = await getTrackingInfoApi(
        item.paymentNo,
        item.productNo,
      );

      l.push({ ...item, trackingUrl: res.data.data[0].trackingUrl || '' });
    }

    return l;
  };

  useEffect(() => {
    if (productInfoList) {
      const newList: IProductInfo[] = [];
      const productMap: any = {};

      // 배송비 제거
      const productInfoListWithoutDeliveryCharge = productInfoList.filter(item => ![22276, 22277].includes(Number(item.productNo)))

      // 취소,환불,반품 갯수 그룹핑
      for (const item of productInfoListWithoutDeliveryCharge) {
        if (!productMap[item.productNo]) {
          productMap[item.productNo] = { ...item, canceledCount: 0 };
        }

        if (item.sellingCount < 0) {
          productMap[item.productNo].canceledCount += Math.abs(item.sellingCount)
        }
      }

      for (const key in productMap) {
        newList.push(productMap[key]);
      }

      updateTrackingUrl(newList).then((l) => {
        setProductList(l);
      });
    }
  }, [productInfoList]);

  return (
    <ProductInfoContainer>
      <h2 className="c_section_title">배송 확인</h2>
      <div className="delivery_container">
        <TopButtonContainer>
          <Button
            onClick={() => handleClickReceipt(receiptURL)}
            buttonclassName="card_receipt"
            textclassName="card_receipt_text"
          >
            카드영수증
          </Button>
          <Button
            buttonclassName="trading_statement"
            textclassName="trading_statement_text"
            onClick={() => handleClickStatement(paymentNo)}
          >
            거래명세표
          </Button>
        </TopButtonContainer>
        {productList.length > 0 ? (
          productList.map((item: IProductInfo, i) => (
            <Contents key={i}>
              <OrderInfo>
                <SubTitle>
                  주문일 : {moment(item.rgtDttm).format('YYYY.MM.DD')}
                </SubTitle>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 20,
                  }}
                >
                  <ContentContainer
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.productImg}
                      alt={item.productNm}
                      style={{ objectFit: 'contain' }}
                    />
                  </ContentContainer>
                  <ContentContainer className="product_info_box">
                    <ProductInfo className="product_info_name">
                      {item.productNm}
                    </ProductInfo>
                    <ProductInfo className="product_info_price">
                      {(
                        item.sellingAmount / item.sellingCount
                      ).toLocaleString()}
                      원
                    </ProductInfo>
                    <ProductInfo className="product_info_total_count">
                      <div className="total_count_box">
                        <div className="total_count_nm">
                          x {item.sellingCount}개
                        </div>
                        <div className="cancel_count_nm">
                          (취소: {item.canceledCount})
                        </div>
                      </div>
                      <div className="total_count">
                        <span style={{ marginRight: 30 }}>최종 금액</span>
                        <span>{item.sellingAmount.toLocaleString()}원</span>
                      </div>
                    </ProductInfo>
                  </ContentContainer>
                </div>
              </OrderInfo>
              <Product>
                <SubTitle
                  style={{ fontSize: 20, textAlign: 'center', fontWeight: 700 }}
                >
                  {getShippingStatus(item.shippingStatusCode)}
                </SubTitle>
                <ContentContainer>
                  <ButtonContainer>
                    <ModalButton
                      isAvailable={
                        shippingInfo[item.shippingStatusCode]
                          ?.buttonTrackingShipment
                      }
                      text={'배송 조회'}
                      onClick={() =>
                        shippingInfo[item.shippingStatusCode]
                          ?.buttonTrackingShipment &&
                        handleClickTrackingInfo(item.trackingUrl)
                      }
                    />

                    {shippingInfo[item.shippingStatusCode]
                      ?.buttonCancelingOrder !== undefined && (
                      <ModalButton
                        isAvailable={
                          shippingInfo[item.shippingStatusCode]
                            .buttonCancelingOrder &&
                          item.sellingCount > item.canceledCount
                        }
                        text={'주문 취소'}
                        onClick={() =>
                          shippingInfo[item.shippingStatusCode]
                            ?.buttonCancelingOrder &&
                          dispatch(
                            openModal({
                              modalMessage: {
                                title: '',
                                content: (
                                  <CancelOrder
                                    type={'cancel'}
                                    productInfo={item}
                                    shippingAddrNo={shippingAddrNo}
                                    receiptURL={receiptURL}
                                  />
                                ),
                              },
                              hasConfirm: '헤더',
                              confirmFn: () => {},
                            }),
                          )
                        }
                      />
                    )}
                    {shippingInfo[item.shippingStatusCode]?.buttonRefunding !==
                      undefined && (
                      <ModalButton
                        isAvailable={
                          shippingInfo[item.shippingStatusCode]
                            .buttonRefunding &&
                          item.sellingCount > item.canceledCount
                        }
                        text={'환불 요청'}
                        onClick={() =>
                          shippingInfo[item.shippingStatusCode]
                            ?.buttonRefunding &&
                          dispatch(
                            openModal({
                              modalMessage: {
                                title: '',
                                content: (
                                  <CancelOrder
                                    type={'refund'}
                                    productInfo={item}
                                    shippingAddrNo={shippingAddrNo}
                                    receiptURL={receiptURL}
                                  />
                                ),
                              },
                              hasConfirm: '헤더',
                              confirmFn: () => {},
                            }),
                          )
                        }
                      />
                    )}
                    <ModalButton
                      isAvailable={
                        shippingInfo[item.shippingStatusCode]
                          ?.buttonExchangingItem &&
                        item.sellingCount > item.canceledCount
                      }
                      text={'교환 요청'}
                      onClick={() =>
                        shippingInfo[item.shippingStatusCode]
                          ?.buttonExchangingItem &&
                        dispatch(
                          openModal({
                            modalMessage: {
                              title: '',
                              content: (
                                <CancelOrder
                                  type={'exchange'}
                                  productInfo={item}
                                  shippingAddrNo={shippingAddrNo}
                                  receiptURL={receiptURL}
                                />
                              ),
                            },
                            hasConfirm: '헤더',
                            confirmFn: () => {},
                          }),
                        )
                      }
                    />
                    <ModalButton
                      isAvailable={
                        shippingInfo[item.shippingStatusCode]?.buttonContact
                      }
                      text={'판매자 문의'}
                      onClick={() =>
                        shippingInfo[item.shippingStatusCode]?.buttonContact &&
                        openPopup(
                          { popup: 'inquiry', productNo: item.productNo },
                          { state: { productInfo: item, shippingInfo } },
                        )
                      }
                    />
                  </ButtonContainer>
                </ContentContainer>
              </Product>
            </Contents>
          ))
        ) : (
          <LoadingContainer>
            <div className="loading_area">
              <Loading type="dot" />
            </div>
          </LoadingContainer>
        )}
      </div>
      {isShowPrintView && (
        <div style={{ display: 'none' }}>
          <PrintInvoice
            title={"거래명세표"}
            purchaser={purchaser}
            purchaseDate={purchaseDate}
            data={invoiceData}
            setIsShowPrintView={setIsShowPrintView}
          />
        </div>
      )}
    </ProductInfoContainer>
  );
};

export default ConfirmDelivery;

const SubTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  width: 100%;
  padding: 20px 20px 0;

  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

const Contents = styled.div`
  width: 100%;
  border: 1px solid ${colors.border.dark};
  border-radius: 16px;
  padding: 20px 20px 50px 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  gap: 1rem;

  @media screen and (max-width: 1280px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const TopButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 10px;

  .trading_statement {
    margin-left: 5px;
    background: #fff;
    border-color: #00000020;
  }

  .trading_statement_text {
    color: #00000040;
  }

  @media screen and (max-width: 768px) {
    margin: 16px 0px 10px;

    .card_receipt {
      height: 36px;
      border-radius: 8px;
    }

    .card_receipt_text {
      font-size: 14px;
    }

    .trading_statement {
      height: 36px;
      border-radius: 8px;
      background: ${colors.bg.gray01};
      border: none;
    }

    .trading_statement_text {
      font-size: 14px;
      color: ${colors.font.gray03};
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 200px;
    margin-left: 20px;
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 150px;
      height: 150px;
    }
`;

const ProductInfo = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  color: #222;
  padding: 22px 18px 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    color: #222;
  }

  .total_count_box {
    .total_count_nm {
      font-weight: 700;
      margin-bottom: 4px;
      font-size: 18px;
    }

    .cancel_count_nm {
      margin-top: 2px;
    }
  }

  .total_count {
    span {
      font-weight: 700;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 10px;
    font-size: 14px;

    .total_count_box {
      .total_count_nm {
        display: none;
      }

      .cancel_count_nm {
        margin-top: 2px;
      }
    }

    .total_count {
      span {
        font-weight: 700;
      }
    }
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;

  .product_info_box {
    width: 68%;

    .product_info_total_count {
      margin-bottom: 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 0px;
    }
  }

  @media screen and (max-width: 1280px) {
    width: 100%;
    .product_info_box {
      width: 100%;

      .product_info_name {
        padding: 22px 18px 0px 0px;
      }
      .product_info_price {
        padding: 3px 18px 40px 0px;
      }
      .product_info_total_count {
        padding: 10px 18px 0px 0px;
      }
    }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 20%;
  height: 100%;

  @media screen and (max-width: 1280px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  height: 100%;

  @media screen and (max-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .modal_button {
      height: 36px;
      border-radius: 8px;
    }

    .modal_button_text {
      font-size: 14px;
    }
  }
`;

const ProductInfoContainer = styled.div`
  min-width: 1100px;
  min-height: 500px;
  padding: 0px 10px;

  .c_section_title {
    font-size: 28px;
    font-weight: 700;
  }

  .delivery_container {
    max-height: 806px;
    overflow: scroll;
    padding-right: 10px;
  }

  @media screen and (max-width: 1280px) {
    min-width: 638px;

    .c_section_title {
      font-size: 20px;
      font-weight: 700;
    }

    .delivery_container {
      max-height: 620px;
      overflow: scroll;
      padding-right: 10px;
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  padding: 3rem;
  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 3rem 0;
  }
  .loading_area {
    position: relative;
    width: 100%;
    min-height: 25rem;
    border-radius: var(--border-radius-large);
    overflow: hidden;
  }
`;
