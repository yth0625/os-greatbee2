// core
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// style
import styled from '@emotion/styled';
// component
import ActionBar from './component/common/ActionBar';
import ShoppingList from './ShoppingList';
// utility
import Loading from './component/utility/Loading'; // 로딩
// utils
import { numberFormat } from './utils/formatting/numberFormat';
import { useGetCartApi, useInsertPaymentProductInfo } from '../../api/useEprocurementApi';
import { ICartRes, IInsertingPaymentProductInfoReq } from '../../interfaces/eprocurement';
import { useNavigate } from 'react-router-dom';
import { openAlert } from '../../redux/popUpReducer';
import { useDispatch } from 'react-redux';
import { isEmptyObj } from '../../utils/utils';
import Button from 'common/Button/Button';
import Icon from 'styles/Icon';
import PrintInvoice, { InvoiceData } from './PrintInvoice';
import colors from 'styles/colors';
import moment from 'moment/moment';
import Decimal from 'decimal.js';
import { useGetUserInfoApi } from '../../api/useMainApi';

const CartContainer = styled.div`
  display: flex;
  margin-top: var(--header-height);
  min-height: calc(100vh - 128px - 88px);

  @media screen and (max-width: 1280px) {
    flex-direction: column;
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
      padding: 0px;
    }
    @media screen and (max-width: 600px) {
      padding: 3rem 0;
    }
    > section {
      height: auto;
      padding: 2.5rem;
      margin: 3rem 0;
      border-radius: var(--border-radius-large);

      @media screen and (max-width: 768px) {
        padding: 0;
      }

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
      display: block;
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .shopping_container {
      background-color: #fff;
      border: 1px solid var(--border-color-dark);
      margin-top: 0px;
      width: 100%;
      padding: 32px;
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
            padding: 12px 0px;
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

      .shopping_header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 2rem;
      }

      .top_header_back {
        display: none;
      }

      .shopping_total {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap-reverse;
        gap: 1.5rem 1rem;
        button {
          flex-grow: 1;
          width: 20rem;
          max-width: 20rem;
          height: 4.8rem;
          @media screen and (max-width: 600px) {
            max-width: 100%;
            width: 14rem;
            height: 4rem;
          }
        }
        p {
          text-align: right;
          flex-shrink: 0;
          flex-grow: 10;
          span {
            font-size: var(--font-size-large);
            font-weight: var(--font-w-semi);
          }
        }
      }
    }
    @media screen and (max-width: 1280px) {
      width: 85%;
      padding-bottom: 0;
      margin-bottom: 30px;

      .shopping_container {
        width: 93%;
        padding: 51px 56px;

        .shopping_header {
          border-bottom: 1px solid #00000050;
          margin-bottom: 10px;
        }
        .shopping_total {
          padding: 0 20px 30px;
        }

        .total_container {
          .drafting {
            border-radius: 8px;
          }
        }
      }
    }

    @media screen and (max-width: 1240px) {
      width: 95%;

      .shopping_container {
        padding: 30px;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 100%;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      padding-bottom: 0;

      .shopping_container {
        width: 93%;
        padding: 10px 0;

        border: none;
        position: relative;

        .shopping_header {
          border-bottom: 1px solid #f1f1f1;
          padding-bottom: 6px;

          .top_header_back {
            display: block;
            position: absolute;
            top: 5px;
            left: -24px;
          }

          .c_section_title {
            padding: 10px 10px 10px 20px;
            font-size: 20px;
          }
        }

        .total_container {
          margin-left: 0;
          margin-right: 0;
        }
        .shopping_total {
          padding: 0 0 30px;
        }
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
      display: flex;
      justify-content: flex-end;
      display: none;

      .total_container {
        width: 55rem;
      }
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
              width: 20rem;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            :nth-child(2) {
              flex-shrink: 0;
            }
            :nth-child(3) {
              flex-shrink: 0;
              width: 5rem;
            }
            :nth-child(4) {
              flex-shrink: 0;
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

export interface ITotalItem {
  vendorNo: string;
  productName: string;
  productNo: number;
  sellingCount: number;
  sellingPrice: number;
}

export interface ICartData extends ICartRes {
  isChecked: boolean;
}

export const getDeliveryChargeInfo = (
  productList: ITotalItem[],
  vendorNo: string,
): ITotalItem | object => {
  let productTotalPrice = 0;
  for (const item of productList) {
    productTotalPrice += item.sellingPrice * item.sellingCount;
  }

  if (vendorNo === vendorNo1) {
    if (productTotalPrice < 50000) {
      return {
        vendorNo: vendorNo1,
        productName: 'Ⅰ.배송비',
        productNo: 22276,
        sellingCount: 1,
        sellingPrice: 3000,
      };
    }
  } else if (vendorNo === vendorNo5) {
    if (productTotalPrice < 50000) {
      return {
        vendorNo: vendorNo5,
        productName: 'Ⅴ.배송비',
        productNo: 22277,
        sellingCount: 1,
        sellingPrice: 3000,
      };
    }
  }

  return {};
};

const vendorNo1 = '1';
const vendorNo5 = '5';

// 20230714 TODO 1280 반응형에서는
// 전체 선택 체크박스 + 선택삭제 버튼이 생기면서
// list item내 삭제버튼(x)이 사라짐
// 따라서 삭제 확인 alert를 이 곳에 추가해야함
// 다만, 1280 이상에서는 삭제버튼(x)이 있으므로
// 삭제 확인 alert를 list item 내부에 남겨둬야함

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartListData, setCartListData] = useState<ICartData[]>([]);
  const [totalList, setTotalList] = useState<ITotalItem[][]>([]);

  const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);
  const [isShowPrintView, setIsShowPrintView] = useState(false);

  const { data: cartData, isLoading: isCartDataLoading } = useGetCartApi();

  const {
    mutateAsync: insertPaymentProductInfo,
    isLoading: isInsertingPaymentProductInfoLoading,
  } = useInsertPaymentProductInfo();

  const { data: userInfo } = useGetUserInfoApi();

  const purchase = async (e: any) => {
    e.stopPropagation();

    if (cartListData.length === 0) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니에 상품이 없습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );

      return;
    }

    if (cartListData.filter(item => item.isChecked).length === 0) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니에서 상품을 선택해주세요.
            </div>
          ),
          hasConfirm: false,
        }),
      );

      return;
    }

    try {
      const reqBody: IInsertingPaymentProductInfoReq[] = [];
      for (const list of totalList) {
        for (const item of list) {
          reqBody.push({
            productNo: item.productNo,
            sellingCount: item.sellingCount,
            sellingAmount: item.sellingPrice * item.sellingCount,
          });
        }
      }

      const res = await insertPaymentProductInfo(reqBody);
      navigate(`/eprocurement/order?paymentNo=${res.data.data}`);
    } catch (e: any) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              구매정보를 업데이트하지 못했습니다. 다시 시도하시거나 운영자에게
              연락주세요.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  const deleteItemFromCart = useCallback((productNo: number) => {
    setCartListData((prev: ICartData[]) =>
      prev.filter((el: ICartRes) => el.productNo !== productNo),
    );
  }, []);

  const totalPrice = useMemo(() => {
    if (totalList.length === 0) return 0;

    let selectedListTotalPrice = 0;
    for (const list of totalList) {
      selectedListTotalPrice += list
        .map((el) => (el.sellingCount ?? 0) * (el.sellingPrice ?? 0))
        .reduce((a, b) => a + b);
    }

    return selectedListTotalPrice;
  }, [totalList]);

  useEffect(() => {
    if (!isCartDataLoading && cartData) {
      const newData: ICartData[] = cartData.map((item: ICartRes) => {
        return { ...item, isChecked: true}
      })
      setCartListData(newData);
    }
  }, [cartData, isCartDataLoading]);

  useEffect(() => {
    const d: { [key: string]: ITotalItem[] } = {};
    for (const item of cartListData) {
      if (!item.isChecked) continue;

      if (!d[item.vendorNo]) {
        d[item.vendorNo] = [];
      }

      d[item.vendorNo].push({
        vendorNo: item.vendorNo,
        productName: item.productName,
        productNo: item.productNo,
        sellingCount: item.sellingCount,
        sellingPrice: item.sellingPrice,
      });
    }

    const newList: ITotalItem[][] = [];
    for (const key in d) {
      newList.push(d[key]);
    }
    newList.sort((a, b) => Number(a[0].vendorNo) - Number(b[0].vendorNo));

    for (const item of newList) {
      const deliveryChargeInfo = getDeliveryChargeInfo(item, item[0].vendorNo);

      if (!isEmptyObj(deliveryChargeInfo)) {
        item.push(deliveryChargeInfo as ITotalItem);
      }
    }

    setTotalList(newList);

    if (newList.length > 0) {
      const newTotalList = newList.reduce((prev, next) => prev.concat(next))

      const newInvoiceData: InvoiceData[] = newTotalList.map((item: ITotalItem) => {
        const price = new Decimal(item.sellingPrice)
        const taxAmount = Number(price.div(11).round())
        const supplyAmount = item.sellingPrice - taxAmount

        return {
          productName: item.productName,
          count: item.sellingCount,
          unitPrice: item.sellingPrice,
          supplyValue: supplyAmount * item.sellingCount,
          taxAmount: taxAmount * item.sellingCount,
        } as InvoiceData;
      })

      setInvoiceData(newInvoiceData);
    }

  }, [cartListData]);

  const restrictClickEvent = (e: any) => {
    e.preventDefault();
    dispatch(
      openAlert({
        text: (
          <div style={{ color: '#565660', textAlign: 'center' }}>
            복사 기능이 금지되어 있습니다.
          </div>
        ),
        hasConfirm: false,
      }),
    );
  };

  useEffect(() => {
    const container = document.getElementById('restrictclick');
    container?.addEventListener('contextmenu', (e) => restrictClickEvent(e));

    return () => {
      container?.removeEventListener('contextmenu', (e) =>
        restrictClickEvent(e),
      );
    };
  }, []);

  return (
    <CartContainer id="restrictclick">
      {isCartDataLoading ? (
        <LoadingContainer>
          <div className="loading_area">
            <Loading type="dot" />
          </div>
        </LoadingContainer>
      ) : (
        cartListData && (
          <>
            <div className="cart_left">
              <section className="action_bar">
                <ActionBar isShowSearchBar={true} isCartPage={true} />
              </section>
              <section className="shopping_container">
                <div className="shopping_header">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Icon
                      iconName="arrowleft"
                      className="top_header_back"
                      onPress={() => navigate(-1)}
                    />
                    <h2 className="c_section_title">장바구니</h2>
                  </div>
                  <div>
                    <Button
                      outterStyles={{
                        background: 'white',
                        borderWidth: '1px',
                      }}
                      onClick={() => setIsShowPrintView(true)}
                      textStyles={{ color: '#000' }}
                    >
                      선택 견적서
                    </Button>
                  </div>
                </div>
                <ShoppingList
                  data={cartListData}
                  setData={setCartListData}
                  deleteItemFromCart={deleteItemFromCart}
                />
                <div className="shopping_total">
                  <button
                    className="c_btn-line-primary"
                    onClick={() => navigate('/eprocurement')}
                  >
                    더 쇼핑하기
                  </button>
                  <p
                    style={{
                      display: cartListData.length > 0 ? 'block' : 'none',
                    }}
                  >
                    총 합계{' '}
                    <span style={{ marginLeft: 10 }}>
                      {numberFormat(totalPrice)}
                    </span>
                    원
                  </p>
                </div>
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
                                  {numberFormat(
                                    el.sellingPrice * el.sellingCount,
                                  )}
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
                  <button
                    className="c_btn drafting"
                    disabled={isInsertingPaymentProductInfoLoading}
                    onClick={purchase}
                  >
                    구매하기
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
                              <span className="price_number">
                                {numberFormat(
                                  el.sellingPrice * el.sellingCount,
                                )}
                              </span>
                              원
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
                <button
                  className="c_btn drafting"
                  disabled={isInsertingPaymentProductInfoLoading}
                  onClick={purchase}
                >
                  구매하기
                </button>
              </section>
            </div>
          </>
        )
      )}
      {isShowPrintView && (
        <div style={{ display: 'none' }}>
          <PrintInvoice
            title={"견적서"}
            purchaser={userInfo?.membName || ''}
            purchaseDate={moment(new Date()).format('YYYY년 MM월 DD일')}
            data={invoiceData}
            setIsShowPrintView={setIsShowPrintView}
          />
        </div>
      )}
    </CartContainer>
  );
}

export default Cart;
