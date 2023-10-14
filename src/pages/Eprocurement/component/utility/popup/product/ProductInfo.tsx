// core
import React, { useEffect, useState } from 'react';
// router
import { useLocation, useNavigate } from 'react-router-dom';
// style
import styled from '@emotion/styled';
// utility
import { useOpenPopup } from '../Popup'; // 팝업
// utils
import { numberFormat } from '../../../../utils/formatting/numberFormat';
// img
import {
  useAddItemToCartApi,
  useDeleteItemFromWishListApi,
  useGetProdDetailApi,
  useInsertPaymentProductInfo,
  useSaveItemToWishListApi,
} from '../../../../../../api/useEprocurementApi';
import Icon from 'styles/Icon';

import Button from 'common/Button/Button';
import colors from 'styles/colors';
import { useDispatch } from 'react-redux';
import {
  closeAlert,
  closeWishPopup,
  openAlert,
  openWishPopup,
} from '../../../../../../redux/popUpReducer';
import ProductDetail from './ProductDetail';
import ActionBar from 'pages/Eprocurement/component/common/ActionBar';
import {
  IInsertingPaymentProductInfoReq,
  IProdDetailRes,
} from '../../../../../../interfaces/eprocurement';
import { getDeliveryChargeInfo, ITotalItem } from '../../../../Cart';
import { isEmptyObj } from '../../../../../../utils/utils';
import RecentPurchaseHistory from 'pages/Eprocurement/RecentPurchaseHistory';

const ProductInfoContainer = styled.div`
  margin-top: var(--header-height);
  display: flex;
  flex-direction: row;
  padding: 3rem;
  justify-content: space-between;
  gap: 3rem;

  .product_info_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 68%;

    .product_info_action_bar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1440px) {
    padding: 3rem;
  }

  @media screen and (max-width: 600px) {
    padding: 2rem;
  }

  .c_section_title {
    margin-top: 33px;
  }

  .product_info {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    gap: 40px;
    background: #fff;
    padding: 2.8vw 8vw;
    border-radius: 16px 16px 0 0;
    position: relative;
    z-index: 2;

    .product_img {
      position: sticky;
      top: 1rem;
      width: 50%;
      max-height: 45rem;
      aspect-ratio: 5/5;
      border-bottom: 1px solid #f1f1f1;
      overflow: hidden;
      @media screen and (max-width: 768px) {
        top: auto;
        width: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .info_box {
      width: 50%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 420px;

      .heart {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        max-width: 5rem;
        aspect-ratio: 1;
        background-color: white;
        color: #a9a9a9;
        border-radius: 50%;

        svg {
          width: 100%;
          height: 100%;
        }
      }

      > div {
        padding: 1.6rem 0;
        border-bottom: 1px solid ${colors.bg.gray01};
      }

      > div:nth-of-type(3) {
        border-bottom: none;
      }

      > div:nth-of-type(4) {
        border-bottom: none;
      }

      .text_box {
        padding-top: 0;
        padding-bottom: 0;
        > * {
          // max-width: 40rem;
        }

        .product_name {
          font-weight: var(--font-w-semi);
          font-size: 24px;
          margin-bottom: 1rem;
          width: 94%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product_categorySub {
          margin-top: 8px;
          margin-bottom: 11px;
          color: ${colors.font.gray01};
        }
      }

      .price_box {
        font-size: 16px;
        font-weight: var(--font-w-mid);
        padding-top: 16px;
        padding-bottom: 16px;

        > div {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem 2rem;
          padding: 0.8rem 0;

          p:first-child {
            flex-shrink: 0;
          }

          p:last-child {
            min-width: 20rem;
          }
        }

        .code {
          p:last-child {
            color: var(--font-color-sub);
            font-size: var(--font-size-mid);
          }
        }

        .price {
          margin-top: 0.6rem;
          p:last-child {
            font-size: var(--font-size-mid);

            span {
              font-size: var(--font-size-x-large);
            }
          }
        }
      }

      .option_box {
        flex-grow: 1;
        @media screen and (max-width: 480px) {
          border-bottom: none;
        }

        > div {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 0;

          > p {
            width: 7.5rem;
          }

          > :last-child {
            flex-shrink: 0;
          }

          select {
            font-size: var(--font-size-small);
          }
        }

        .count {
          p {
            width: 78px;
          }
          .updown {
            display: flex;
            align-items: center;
            font-size: var(--font-size-small);

            > * {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border: 1px solid var(--border-color-light);
              background-color: var(--base-color-dark);
              text-align: center;
              vertical-align: middle;
            }

            span {
              width: 4rem;
            }
          }
        }
      }

      .etc_action_box {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        gap: 1.5rem;
        @media screen and (max-width: 480px) {
          flex-direction: column;
          flex-wrap: nowrap;
        }

        .product_button {
          width: 20rem;
          min-width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 48px;
          @media screen and (max-width: 1680px) {
            padding-left: 0.8rem;
            padding-right: 0.8rem;
          }
          @media screen and (max-width: 900px) {
            padding-left: 0.4rem;
            padding-right: 0.4rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    .product_info {
      padding: 2.5vw 3vw 2.5vw 2vw;
    }
  }

  @media screen and (max-width: 1536px) {
    .product_info {
      padding: 2.5vw 7vw 2.5vw 4vw;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 24px 18px;
    gap: 18px;
    width: 100%;

    .product_info_box {
      width: calc(100% - 190px);
      .product_info_action_bar {
        width: 100%;
      }
    }

    .product_info {
      margin-top: 16px;
      width: 82%;
      min-width: 768px;
      padding: 40px 24px;
      border-radius: 0px;
      gap: 24px;

      .product_img {
        border: none;
      }

      .info_box {
        height: 384px;
        width: 322px;
        .text_box {
          .product_name {
            font-size: 20px;
          }
        }

        .price_box {
          padding: 8px 0px;
          .price {
            margin-top: 4px;
          }
        }

        .option_box {
          padding-top: 8px;
        }
      }

      .product_categorySub {
        font-size: 16px;
        letter-spacing: -0.5px;
        margin-bottom: 18px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 10px 24px;
    .product_info_box {
      width: 100%;
      .product_info_action_bar {
        width: 100%;
      }
    }

    .product_info {
      padding: 20px 24px;
      .product_img {
        position: sticky;
        top: 1rem;
        width: 48%;
        max-height: 344px;
      }
    }
  }
`;

function ProductInfo() {
  const dispatch = useDispatch();
  const openPopup = useOpenPopup();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split('/').pop() || '';

  const [sellingCount, setSellingCount] = useState(1);
  const [showFavorite, setShowFavorite] = useState(true);
  const [searchText, setSearchText] = useState<string>('');

  const { data: prodInfo, refetch: refetchProdInfo } =
    useGetProdDetailApi(productId);
  const prodInfoData: IProdDetailRes | null =
    prodInfo && prodInfo.length > 0 ? prodInfo[0] : null;

  const { mutateAsync: shoppingBasketApi, isLoading: isShoppingBasketLoading } =
    useAddItemToCartApi();

  const {
    mutateAsync: insertPaymentProductInfo,
    isLoading: isInsertingPaymentProductInfoLoading,
  } = useInsertPaymentProductInfo();

  const {
    mutateAsync: addToWishListApi,
    isLoading: isAddingToWishlistLoading,
  } = useSaveItemToWishListApi();

  const {
    mutateAsync: deleteFromWishListApi,
    isLoading: isDeletingFromWishlistLoading,
  } = useDeleteItemFromWishListApi();

  const addToWishList = async (e: any, productNo: number) => {
    e.stopPropagation();

    try {
      await addToWishListApi({ productNo });
      if (prodInfoData) prodInfoData.wishYn = 'Y';

      dispatch(
        openWishPopup({
          text: (
            <span>
              위시리스트에
              <br />
              저장했습니다.
            </span>
          ),
        }),
      );

      setTimeout(() => {
        dispatch(closeWishPopup());
      }, 2000);
    } catch (e: any) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              위시리스트에 추가하지 못했습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  const deleteFromWishList = async (e: any, productNo: number) => {
    e.stopPropagation();

    try {
      await deleteFromWishListApi({ productNo });
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              위시리스트에서 삭제하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => refetchProdInfo(),
        }),
      );
    } catch (e: any) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              위시리스트에서 삭제하지 못했습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  const shopBasket = async () => {
    try {
      await shoppingBasketApi({ sellingCount, productNo: Number(productId) });
      if (prodInfoData) prodInfoData.shoppingBasketYn = 'Y';

      dispatch(
        openAlert({
          text: (
            <div
              style={{
                color: '#565660',
                textAlign: 'center',
                lineHeight: '24px',
                fontWeight: '600',
                width: 457,
                height: 158,
                fontSize: 24,
              }}
            >
              <Icon
                iconName="popupcart"
                style={{ marginTop: 2, marginBottom: 8 }}
              />
              장바구니에 상품을 담았습니다. <br />
            </div>
          ),
          hasConfirm: true,
          confirmFn: () => {
            navigate('/eprocurement/cart');
            dispatch(closeAlert());
          },
          cancelFn: () => setSellingCount(1),
          cancelText: '계속 쇼핑',
          confirmText: '장바구니로',
        }),
      );
    } catch (e: any) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니 등록에 실패하였습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  const purchase = async (e: any, el: IProdDetailRes) => {
    e.stopPropagation();

    try {
      const reqBody: IInsertingPaymentProductInfoReq[] = [
        {
          productNo: el.productNo,
          sellingCount: sellingCount,
          sellingAmount: el.sellingPrice * sellingCount,
        },
      ];

      // todo: vendorNo 추가되면 나중에 바꾸기 (api 요청했다고 함)
      if (
        el.productName.slice(0, 2) === 'Ⅰ.' ||
        el.productName.slice(0, 2) === 'Ⅴ.'
      ) {
        // 배송비 추가

        let vendorNo = '1';
        if (el.productName.slice(0, 2) === 'Ⅴ.') vendorNo = '5';

        const chargeInfo = getDeliveryChargeInfo(
          [
            {
              vendorNo,
              productName: el.productName,
              productNo: el.productNo,
              sellingCount,
              sellingPrice: el.sellingPrice * sellingCount,
            },
          ],
          vendorNo,
        );

        if (!isEmptyObj(chargeInfo)) {
          const deliveryCharge = chargeInfo as ITotalItem;
          reqBody.push({
            productNo: deliveryCharge.productNo,
            sellingCount: deliveryCharge.sellingCount,
            sellingAmount: deliveryCharge.sellingPrice,
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
    <ProductInfoContainer id="restrictclick">
      <div className="product_info_box">
        <div className="product_info_action_bar">
          <ActionBar isShowSearchBar={true} />
        </div>
        <HomeLeft>
          {!prodInfoData && <div>정보가 없습니다</div>}
          {prodInfoData && (
            <>
              <div className="product_info">
                <div className="product_img">
                  <img src={prodInfoData.imgMain} alt="" />
                </div>
                <div className="info_box">
                  <button
                    className="heart"
                    disabled={
                      isAddingToWishlistLoading || isDeletingFromWishlistLoading
                    }
                    onClick={async (e) => {
                      if (prodInfoData.wishYn === 'Y') {
                        await deleteFromWishList(e, prodInfoData.productNo);
                      } else {
                        await addToWishList(e, prodInfoData.productNo);
                      }
                    }}
                  >
                    {prodInfoData.wishYn === 'Y' ? (
                      <Icon iconName="heartfill" width={24} height={24} />
                    ) : (
                      <Icon iconName="heart" color={colors.font.gray01} />
                    )}
                  </button>
                  <div className="text_box">
                    <h3 className="product_name">{prodInfoData.productName}</h3>
                    <p className="product_categorySub">
                      {prodInfoData.categorySub}
                    </p>
                  </div>
                  <div className="price_box">
                    <div className="code">
                      <Label>상품코드</Label>
                      <p style={{ fontSize: 16 }}>{prodInfoData.productNo}</p>
                    </div>
                    <div className="price">
                      <Label>판매가격</Label>
                      <p>
                        <span style={{ fontSize: 16 }}>
                          {numberFormat(prodInfoData.sellingPrice)}
                        </span>
                        원
                      </p>
                    </div>
                  </div>
                  <div className="option_box" style={{ paddingBottom: 0 }}>
                    {/* <div className="color">
                <p>컬러</p>
                <select>
                  <option value="스페이스 그레이">스페이스 그레이</option>
                  <option value="스페이스 그레이2">스페이스 그레이2</option>
                </select>
              </div>
              <div className="size">
                <p>사이즈</p>
                <select>
                  <option value="16인치">16인치</option>
                  <option value="17인치">17인치</option>
                </select>
              </div> */}
                    <div className="count">
                      <p>수량</p>
                      <div className="updown">
                        <button
                          className="down"
                          onClick={() =>
                            setSellingCount(
                              sellingCount - 1 >= 1 ? sellingCount - 1 : 1,
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          style={{ width: 60 }}
                          value={sellingCount}
                          onChange={(e) => {
                            if (Number(e.target.value) < 1000) {
                              setSellingCount(Number(e.target.value));
                            } else {
                              setSellingCount(999);
                            }
                          }}
                        />
                        <button
                          className="up"
                          onClick={() => setSellingCount(sellingCount + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="etc_action_box">
                    <Button
                      buttonclassName="product_button"
                      outterStyles={{
                        background: colors.bg.white,
                      }}
                      textStyles={{
                        color: colors.font.basic,
                        fontSize: '1.4rem',
                      }}
                      onClick={() =>
                        openPopup({
                          popup: 'inquiry',
                          productNo: productId,
                          inquiry: true,
                        })
                      }
                    >
                      문의하기
                    </Button>
                    <Button
                      buttonclassName="product_button"
                      outterStyles={{ background: colors.bg.white }}
                      textStyles={{
                        color: colors.font.basic,
                        textAlign: 'center',
                        fontSize: '1.4rem',
                      }}
                      onClick={shopBasket}
                      isDisabled={isShoppingBasketLoading}
                    >
                      <div>장바구니</div>
                    </Button>
                    <Button
                      buttonclassName="product_button"
                      textStyles={{
                        fontSize: '1.4rem',
                      }}
                      onClick={(e: any) => purchase(e, prodInfoData)}
                      isDisabled={isInsertingPaymentProductInfoLoading}
                    >
                      바로구매
                    </Button>
                  </div>
                </div>
              </div>
              <ProductDetail productNo={productId} />
            </>
          )}
        </HomeLeft>
      </div>
      <RecentPurchaseHistory />
    </ProductInfoContainer>
  );
}

export default ProductInfo;

const HomeLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 1280px) {
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
  @media screen and (max-width: 600px) {
    padding: 3rem 0;
  }
`;

const Label = styled.p`
  font-size: 16px;
  color: #313131;
  margin-right: 1rem;
`;
