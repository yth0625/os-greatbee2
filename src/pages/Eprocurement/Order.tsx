// core
import React, { useEffect, useMemo, useState } from 'react';
// style
import styled from '@emotion/styled';
// component
import ActionBar from './component/common/ActionBar';
// utils
import {
  useGetPaymentProductInfByPaymentNoApi,
  useGetShippingAddrInfoApi,
  useUpdatePaymentResultApi,
} from '../../api/useEprocurementApi';
import { IShippingAddressListRes } from '../../interfaces/eprocurement';
import { purchaseUsingCard } from '../../utils/utils';
import Button from 'common/Button/Button';
import Icon from 'styles/Icon';
import SelectBasic from 'common/Select/SelectBasic';
import { useDispatch } from 'react-redux';
import { closeModal, openAlert, openModal } from 'redux/popUpReducer';
import ShippingAddressListModal from './ShippingAddressListModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChangeAddressModal from './ChangeShippingAddressModal';
import { numberFormat } from './utils/formatting/numberFormat';
import { useGetUserInfoApi } from '../../api/useMainApi';
import { orderOptions } from '../../utils/utils';
import { ITotalItem } from './Cart';
import colors from 'styles/colors';
import TaxInvoiceModal from './TaxInvoiceModal';
import { AxiosError } from 'axios';


const CartContainer = styled.div`
  display: flex;
  padding-top: var(--header-height);

  @media screen and (max-width: 1280px) {
    flex-direction: column;
    margin-bottom: 50px;
  }

  .c_section_title {
    font-size: var(--font-size-xx-large);
    font-weight: var(--font-w-semi);
    padding-bottom: 2rem;
  }

  .cart_left,
  .cart_right {
    padding: 3rem;

    @media screen and (max-width: 1536px) {
      padding: 20px;
    }

    @media screen and (max-width: 768px) {
      padding: 3rem 2rem;
    }

    @media screen and (max-width: 600px) {
      padding: 3rem 0;
    }

    > section {
      height: auto;
      padding: 2.5rem;
      margin: 3rem 0;
      border-radius: var(--border-radius-large);
      @media screen and (max-width: 600px) {
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 0;
      }
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .cart_left {
    flex-grow: 1;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .action_bar {
      padding: 0;
      width: 100%;
      @media screen and (max-width: 600px) {
        padding: 0 2rem;
      }
    }

    .shopping_container {
      background-color: #fff;
      margin-left: 90px;
      width: calc(100% - 180px);
      margin-right: 90px;
      margin-top: 0;
      border: 1px solid var(--border-color-dark);
      @media screen and (max-width: 600px) {
        border: none;
      }
      .shopping_total {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap-reverse;
        gap: 1.5rem 1rem;
      }
    }

    @media screen and (max-width: 1536px) {
      width: 100%;
      padding-bottom: 0;

      .shopping_container {
        width: 100%;
        padding: 51px 56px;

        .shopping_header {
          border-bottom: 1px solid #00000050;
          margin-bottom: 20px;
        }
      }
    }

    @media screen and (max-width: 1280px) {
      width: 85%;
      padding-bottom: 0;

      .shopping_container {
        width: 93%;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 95%;
    }

    .total_container {
      display: none;
      margin: 20px;

      @media screen and (max-width: 600px) {
        border: none;
        background-color: transparent;
      }

      .total_list {
        padding: 24px;
        border-radius: 16px;
        border: 1px solid #f1f1f1;

        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          text-align: center;
          > * {
            white-space: nowrap;
            :nth-child(1) {
              text-align: left;
              flex-grow: 1;
              width: 20rem;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            :nth-child(2) {
              flex-grow: 1;
              width: 3rem;
              flex-shrink: 0;
            }
            :nth-child(3) {
              flex-shrink: 0;
              flex-grow: 1;
              width: 5rem;
            }
            :nth-child(4) {
              flex-shrink: 0;
              flex-grow: 1;
              text-align: right;
              width: 11rem;
            }
          }
        }
      }
      .total_price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 0 0;
        margin-top: 1rem;
        border-top: 1px solid #f1f1f1;

        h4 {
          font-weight: var(--font-w-semi);
        }
        p {
          font-weight: var(--font-w-mid);
          span {
            font-weight: var(--font-w-semi);
            font-size: var(--font-size-large);
          }
        }
      }
      .drafting {
        width: 100%;
        height: 5rem;
        margin-top: 2rem;
        border: none;
        background-color: ${colors.primary.basic};
        color: #fff;
        font-size: var(--font-size-x-large);
        font-weight: var(--font-w-bold);
      }

      @media screen and (max-width: 1280px) {
        display: block;
      }
    }
  }
  .cart_right {
    flex-shrink: 0;
    width: 30%;
    display: block;
    @media screen and (min-width: 1281px) {
      padding-left: 0;
    }
    @media screen and (max-width: 1280px) {
      width: 100%;
      display: none;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      padding-top: 0;
    }
    .total_container {
      background-color: var(--base-color-dark);
      border: 1px solid var(--border-color-dark);
      @media screen and (max-width: 600px) {
        border: none;
        background-color: transparent;
      }
      .total_list {
        padding: 1.6rem 0;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          text-align: center;
          font-size: 14px;

          .price_number {
            font-size: 16px;
          }

          > * {
            white-space: nowrap;
            :nth-child(1) {
              text-align: left;
              flex-grow: 1;
              width: 20rem;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            :nth-child(2) {
              flex-grow: 1;
              width: 3rem;
              flex-shrink: 0;
            }
            :nth-child(3) {
              flex-shrink: 0;
              flex-grow: 1;
              width: 5rem;
            }
            :nth-child(4) {
              flex-shrink: 0;
              flex-grow: 1;
              text-align: right;
              width: 11rem;
            }
          }
        }
      }
      .total_price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 0;
        h4 {
          font-weight: var(--font-w-semi);
          font-size: 16px;
        }
        p {
          font-weight: var(--font-w-mid);
          span {
            font-weight: var(--font-w-semi);
            font-size: 20px;
          }
        }
      }
      .drafting {
        width: 100%;
        height: 5rem;
        margin-top: 2rem;
        border: none;
        background-color: ${colors.primary.basic};
        color: #fff;
        font-size: var(--font-size-x-large);
        font-weight: var(--font-w-bold);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .cart_left {
      width: 100%;
      padding: 16px 0px 0px;

      .action_bar {
        display: none;
      }

      .shopping_container {
        width: 100%;
        padding: 0px;
        border: none;

        h2 {
          padding: 0px 24px 6px;
          font-size: 20px;
        }

        h3 {
          font-size: 17px;
          font-weight: 600;
        }

        .total_container {
          .c_section_title {
            font-size: 16px;
            padding: 0 0 16px;
            margin-left: 6px;
          }

          .drafting {
            border-radius: 8px;
            font-size: 18px;
          }
        }
      }
    }
  }
`;


type BillWay = {
  type: string;
  value: string;
}

const billWay: BillWay[] = [
  {
    type: 'creditCard',
    value: '신용카드'
  },
  {
    type: 'taxInvoice',
    value: '세금계산서'
  },
]

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const paymentNo = searchParams.get('paymentNo') || '';

  const [shippingAddr, setShippingAddr] = useState<IShippingAddressListRes>({
    bizSeq: 0,
    deliverPostNo: '',
    membNo: 0,
    phoneNo01: '',
    phoneNo02: '',
    recipientNm: '',
    reqIdx: 0,
    reqTxt: '',
    shippingAddr: '',
    shippingAddrDtl: '',
    shippingAddrNm: '',
    shippingAddrNo: 0,
  });

  const [selectedOrderOption, setSelectedOrderOption] = useState<any>(
    orderOptions[0],
  );
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [totalList, setTotalList] = useState<ITotalItem[][]>([]);
  const [selectedWaybill, setSelectedWaybill] = useState<BillWay>(billWay[0]);

  const {
    data: shippingAddrList,
    isLoading: isShippingAddrInfoLoading,
    refetch: refetchShippingAddrInfo,
  } = useGetShippingAddrInfoApi();

  const { data: paymentProductList } =
    useGetPaymentProductInfByPaymentNoApi(paymentNo);

  const { data: userInfo } = useGetUserInfoApi();

  const { mutateAsync: updatePaymentResult } = useUpdatePaymentResultApi();

  const purchase = () => {
    // if (shippingAddr.shippingAddr === '') {
    //   dispatch(
    //     openAlert({
    //       text: (
    //         <div style={{ color: '#565660', textAlign: 'center' }}>
    //           배송지를 추가해주세요.
    //         </div>
    //       ),
    //       hasConfirm: false,
    //     }),
    //   );
    //   return;
    // }
    //
    // if (selectedOrderOption.value === orderOptions[0].value) {
    //   dispatch(
    //     openAlert({
    //       text: (
    //         <div style={{ color: '#565660', textAlign: 'center' }}>
    //           배송 요청사항을 선택해주세요.
    //         </div>
    //       ),
    //       hasConfirm: false,
    //     }),
    //   );
    //   return;
    // }

    if (!totalPrice) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              금액이 맞지 않습니다. 관리자에게 문의해주세요.
            </div>
          ),
          hasConfirm: false,
        }),
      );
      return;
    }

    let productName = '';
    if (!paymentProductList) return;
    if (paymentProductList.length === 1) {
      productName = paymentProductList[0].productNm;
    } else {
      if (paymentProductList[0].productNm.length > 10) {
        productName = `${paymentProductList[0].productNm.slice(0, 10)}... 외 ${
          paymentProductList.length - 1
        }건`;
      } else {
        productName = `${paymentProductList[0].productNm} 외 ${
          paymentProductList.length - 1
        }건`;
      }
    }

    if (selectedWaybill.type === 'taxInvoice') {
      // open modal
      dispatch(
        openModal({
          modalMessage: {
            title: '',
            content: <TaxInvoiceModal confirm={async (email: string) => {
              try {
                await updatePaymentResult({
                  paymentNo: paymentNo,
                  amount: totalPrice.toString(),
                  shippingAddrNo: shippingAddr.shippingAddrNo.toString(),
                  paymentStatus: '1',
                  paymentCode: 'SUC001',
                  receiptURL: '',
                  itemNm: productName,
                  email: email,
                  payMethod : "3",
                });

                dispatch(
                  openAlert({
                    text: (
                      <div style={{ color: '#565660', textAlign: 'center' }}>
                        완료 되었습니다.
                      </div>
                    ),
                    hasConfirm: false,
                    onClick: () => navigate('/admin/purchase', { replace: true }),
                  }),
                );
              } catch (error) {
                console.log('error:', error)

                let message = '실패했습니다.';
                if (error instanceof AxiosError && error.response) {
                  message = error.response.data.error.errMsg;
                }

                dispatch(
                  openAlert({
                    text: (
                      <div style={{ color: '#565660', textAlign: 'center' }}>
                        {message}
                      </div>
                    ),
                    hasConfirm: false,
                  }),
                );
              }

            }}/>,
          },
          hasConfirm: '아니오',
          confirmFn: async () => {},
        }),
      );

      return
    }

    purchaseUsingCard({
      paymentNo,
      totalPrice: totalPrice,
      userName: userInfo?.membName || '',
      productName,
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      address: shippingAddr?.shippingAddr || '',
      postCode: shippingAddr?.deliverPostNo || '',
      callback: async (res: any) => {
        console.log('portone res', res);

        if (res.success) {
          console.log('updatePaymentResult payload-success:', {
            paymentNo: paymentNo,
            amount: totalPrice.toString(),
            shippingAddrNo: shippingAddr.shippingAddrNo.toString(),
            paymentStatus: '1',
            paymentCode: 'SUC001',
            receiptURL: res.receipt_url,
            itemNm: productName,
            payMethod : "1",
          });

          await updatePaymentResult({
            paymentNo: paymentNo,
            amount: totalPrice.toString(),
            shippingAddrNo: shippingAddr.shippingAddrNo.toString(),
            paymentStatus: '1',
            paymentCode: 'SUC001',
            receiptURL: res.receipt_url,
            itemNm: productName,
            payMethod : "1",
          });

          dispatch(
            openAlert({
              text: (
                <div style={{ color: '#565660', textAlign: 'center' }}>
                  결제가 완료되었습니다.
                </div>
              ),
              hasConfirm: false,
              onClick: () => navigate('/admin/purchase', { replace: true }),
            }),
          );
        } else {
          console.log('updatePaymentResult payload-failure: ', {
            paymentNo: paymentNo,
            amount: totalPrice.toString(),
            shippingAddrNo: shippingAddr.shippingAddrNo.toString(),
            paymentStatus: '1',
            paymentCode: 'SUC001',
            receiptURL: res.receipt_url,
            itemNm: productName,
          });

          await updatePaymentResult({
            paymentNo: paymentNo,
            amount: totalPrice.toString(),
            shippingAddrNo: shippingAddr.shippingAddrNo.toString(),
            paymentStatus: '0',
            paymentCode: 'ERR001',
            receiptURL: res.receipt_url ? res.receipt_url : '',
            itemNm: productName,
            payMethod : "1",
          });

          dispatch(
            openAlert({
              text: (
                <div style={{ color: '#565660', textAlign: 'center' }}>
                  결제가 실패했습니다.
                </div>
              ),
              hasConfirm: false,
              onClick: () => {},
            }),
          );
        }
      },
    });
  };

  const openAddAddressModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: (
            <ChangeAddressModal
              type="modal"
              close={() => {
                refetchShippingAddrInfo();
                dispatch(closeModal());
              }}
            />
          ),
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
      }),
    );
  };

  const openChangeAddressModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: (
            <ShippingAddressListModal
              selectAddress={setShippingAddr}
              close={() => dispatch(closeModal())}
              refetch={() => refetchShippingAddrInfo()}
            />
          ),
        },
        hasConfirm: '헤더',
        confirmFn: () => {},
      }),
    );
  };

  useEffect(() => {
    if (selectedOrderOption.value === 5) {
      setIsShowInput(true);
    } else {
      setIsShowInput(false);
    }
  }, [selectedOrderOption]);

  useEffect(() => {
    if (
      !isShippingAddrInfoLoading &&
      shippingAddrList &&
      shippingAddrList.length > 0
    ) {
      setShippingAddr(shippingAddrList[0]);
    }
  }, [shippingAddrList, isShippingAddrInfoLoading]);

  const totalPrice = useMemo(() => {
    if (totalList.length === 0) return 0;

    let selectedListTotalPrice = 0;
    for (const list of totalList) {
      selectedListTotalPrice += list
        .map((el) => el.sellingPrice)
        .reduce((a, b) => a + b);
    }

    return selectedListTotalPrice;
  }, [totalList]);

  useEffect(() => {
    if (!paymentProductList) return;

    const d: { [key: string]: ITotalItem[] } = {};
    for (const item of paymentProductList) {
      if (!d[item.vendorNo]) {
        d[item.vendorNo] = [];
      }

      d[item.vendorNo].push({
        vendorNo: item.vendorNo,
        productName: item.productNm,
        productNo: Number(item.productNo),
        sellingCount: item.sellingCount,
        sellingPrice: item.sellingAmount,
      });
    }

    const newList: ITotalItem[][] = [];
    for (const key in d) {
      newList.push(d[key]);
    }
    newList.sort((a, b) => Number(a[0].vendorNo) - Number(b[0].vendorNo));

    setTotalList(newList);
  }, [paymentProductList]);

  return (
    <CartContainer>
      {/*{isShippingAddrInfoLoading && (*/}
      {/*  <LoadingContainer>*/}
      {/*    <div className="loading_area">*/}
      {/*      <Loading type="dot" />*/}
      {/*    </div>*/}
      {/*  </LoadingContainer>*/}
      {/*)}*/}
      <div className="cart_left">
        <section className="action_bar">
          <ActionBar isShowSearchBar={true} />
        </section>
        <section className="shopping_container">
          <h2 className="c_section_title">주문결제</h2>
          <Divider />
          <OrderInfo>
            <h3>배송정보</h3>
            {shippingAddr?.shippingAddr !== '' ? (
              <>
                <InfoContainer style={{ marginBottom: 10 }}>
                  <div className="addresses">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Icon iconName="location" />
                        <div style={{ marginLeft: '0.3vw' }}>
                          {shippingAddr?.shippingAddrNm}
                        </div>
                      </div>
                      <Button
                        outterStyles={{
                          background: 'white',
                          borderColor: '#00000020',
                          padding: '0.6rem 0.8rem',
                        }}
                        textStyles={{
                          color: '#000000',
                        }}
                        onClick={openChangeAddressModal}
                      >
                        배송지 변경
                      </Button>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 8,
                      }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 600 }}>
                        {shippingAddr?.recipientNm}
                      </div>
                      <div
                        style={{
                          height: '1.4rem',
                          width: 3,
                          margin: '0px 10px',
                          backgroundColor: '#909090',
                        }}
                      />
                      <div>{shippingAddr?.phoneNo01}</div>
                    </div>
                    <div
                      style={{ marginTop: 12, fontSize: 16, fontWeight: 600 }}
                    >
                      {shippingAddr?.shippingAddr}{' '}
                      {shippingAddr?.shippingAddrDtl}
                    </div>
                  </div>
                </InfoContainer>
                <SelectBasic
                  iconColor="#00000020"
                  outterStyle={{
                    width: '100%',
                    borderColor: '#00000020',
                    borderRadius: '8px',
                  }}
                  options={orderOptions}
                  value={selectedOrderOption}
                  setValue={setSelectedOrderOption}
                />
                {isShowInput && (
                  <InputContainer style={{ marginTop: 10 }}>
                    <textarea placeholder="배송 요청사항" />
                  </InputContainer>
                )}
              </>
            ) : (
              <InfoContainer>
                <div className="no_addresses">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Icon iconName="location" />
                    <div style={{ marginLeft: '0.3vw', marginRight: '4px' }}>
                      배송지
                    </div>
                  </div>
                  <div style={{ color: '#909090' }}>
                    새로운 배송지를 추가해보세요!
                  </div>
                  <Button
                    buttonclassName="add_address_button"
                    textclassName="add_address_text"
                    icon="plus"
                    iconWidth={18}
                    iconHeight={18}
                    iconPosition="left"
                    onClick={openAddAddressModal}
                  >
                    배송지 추가
                  </Button>
                </div>
              </InfoContainer>
            )}
            <h3 style={{ marginTop: 48 }}>결제수단</h3>
            <PaymentContainer>
              <ul>
                {billWay.map((item: BillWay, i) => (
                  <li key={i} onClick={() => setSelectedWaybill(item)}>
                    {selectedWaybill.type === item.type ? (
                      <Icon
                        iconName="radioCircleSelected"
                        className="selected_circle"
                        style={{ cursor: 'pointer' }}
                      />
                    ) : (
                      <NotSelectedCircle />
                    )}
                    <span className="change_waytobill_text">{item.value}</span>
                  </li>
                ))}
              </ul>
            </PaymentContainer>
          </OrderInfo>
          <section className="total_container">
            <h2 className="c_section_title">Total</h2>
            <ul className="total_list">
              {totalList?.map((list, listIndex: number) => {
                return (
                  <div key={listIndex}>
                    {list?.map((el, i: number) => (
                      <li key={i}>
                        <h4>{el.productName}</h4>
                        <p>X</p>
                        <p>{el.sellingCount}</p>
                        <p>
                          <span className="price_number">
                            {numberFormat(el.sellingPrice)}
                          </span>
                          원
                        </p>
                      </li>
                    ))}
                  </div>
                );
              })}
              <div className="total_price">
                <h4>총 합계</h4>
                <p>
                  <span>{numberFormat(totalPrice)}</span>원
                </p>
              </div>
            </ul>
            <button className="c_btn drafting" onClick={purchase}>
              결제하기
            </button>
          </section>
        </section>
      </div>
      <div className="cart_right">
        <section className="total_container">
          <h2 className="c_section_title">Total</h2>
          <ul className="total_list">
            {totalList?.map((list, listIndex: number) => {
              return (
                <div key={listIndex}>
                  {list?.map((el, i: number) => (
                    <li key={i}>
                      <h4>{el.productName}</h4>
                      <p>X</p>
                      <p>{el.sellingCount}</p>
                      <p>
                        <span>{numberFormat(el.sellingPrice)}</span>원
                      </p>
                    </li>
                  ))}
                </div>
              );
            })}
          </ul>
          <div className="total_price">
            <h4>총 합계</h4>
            <p>
              <span>{numberFormat(totalPrice)}</span>원
            </p>
          </div>
          <button className="c_btn drafting" onClick={purchase}>
            결제하기
          </button>
        </section>
      </div>
    </CartContainer>
  );
}

export default Order;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #00000050;

  @media screen and (max-width: 768px) {
    width: calc(100% - 48px);
    margin-left: 24px;
    background-color: #f1f1f1;
  }
`;

const OrderInfo = styled.div`
  width: 100%;
  padding: 40px 20px;
  h3 {
    font-size: 22px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 24px 0px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  margin-top: 30px;
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #d1d1d1;

  .no_addresses {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.7vw 1.4vw;

    .add_address_button {
      background: white;
      border-color: #00000020;
    }

    .add_address_text {
      color: #000000;
      font-size: 1.6rem;
      margin-left: 0.3vw;
    }

    @media screen and (max-width: 1280px) {
      .add_address_text {
        font-size: 16px;
        margin-left: 10px;
      }

      .add_address_button {
        padding: 8px 12px;
      }
    }
  }

  .addresses {
    background-color: white;
    borderradius: 8px;
    display: flex;
    flex-direction: column;
    padding: 1vw 1.4vw 1.2vw;
    margin: 0 0 1vw;
    border-radius: 8px;
  }

  @media screen and (max-width: 768px) {
    border: 1px solid #f1f1f1;
    margin-top: 14px;
  }
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 32px 56px;
  margin-top: 30px;
  margin-bottom: 40px;
  justify-content: flex-start;
  align-items: center;
  background-color: #f1f1f180;
  border-radius: 8px;
  border: 1px solid #d1d1d1;

  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 25%;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .change_waytobill_text {
      margin-left: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 14px;
    background-color: white;
    border: none;
    padding: 10px 0;

    li {
      .change_waytobill_text {
        margin-left: 6px;
      }
    }
  }
`;

const InputContainer = styled.div`
  border: 1px solid #d1d1d1;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: white;
  div {
    font-size: 1.2rem;
    font-weight: 400;
    color: #00000060;
    padding: 2px 0 5px;
  }
  input {
    border: none;
    color: #6d6d6d;
    width: 100%;
  }
  textarea {
    border: none;
    width: 100%;
    border-radius: 0;
    padding: 0;
    margin-top: 5px;
    height: 5rem;
    color: #6d6d6d;
  }
`;

const NotSelectedCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #d1d1d1;
  margin: 6px;
  cursor: pointer;
`;
