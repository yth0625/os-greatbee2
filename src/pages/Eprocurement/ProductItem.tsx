import React, { useState } from 'react';
import styled from '@emotion/styled';
import { numberFormat } from './utils/formatting/numberFormat';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {
  useAddItemToCartApi, useDeleteItemFromCartApi,
  useDeleteItemFromWishListApi,
  useSaveItemToWishListApi,
} from '../../api/useEprocurementApi';
import { useDispatch } from 'react-redux';
import {
  closeWishPopup,
  openAlert,
  openWishPopup,
} from '../../redux/popUpReducer';
import { IProductItem } from '../../interfaces/eprocurement';
import Icon from '../../styles/Icon';
import { useNavigate } from 'react-router-dom';
import { closeAlert } from '../../redux/popUpReducer';
import colors from 'styles/colors';

interface IProps {
  el: IProductItem;
  refresh?: () => void;
  isListView?: boolean;
}

const ProductItem = (props: IProps) => {
  const { el, refresh, isListView } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync: addBasketApi, isLoading: isShoppingBasketLoading } =
    useAddItemToCartApi();

  const { mutateAsync: deleteBasketApi, isLoading: isDeleteBasketLoading } =
    useDeleteItemFromCartApi();

  const { mutateAsync: saveItemApi, isLoading: isAddingItemLoading } =
    useSaveItemToWishListApi();

  const { mutateAsync: deleteItemApi, isLoading: isDeletingItemLoading } =
    useDeleteItemFromWishListApi();

  const [count, setCount] = useState(1);

  const saveItem = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await saveItemApi({ productNo: el.productNo });
      el.wishYn = 'Y';

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

      // dispatch(
      //   openAlert({
      //     text: (
      //       <div style={{ color: '#565660', textAlign: 'center' }}>
      //         위시리스트에 추가하였습니다.
      //       </div>
      //     ),
      //     hasConfirm: false,
      //     onClick: () => refresh && refresh(),
      //   }),
      // );
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

  const deleteItem = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await deleteItemApi({ productNo: el.productNo });
      el.wishYn = 'N';
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              위시리스트에서 삭제하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => refresh && refresh(),
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

  const shopBasket = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await addBasketApi({ sellingCount: count, productNo: el.productNo });
      el.shoppingBasketYn = 'Y';
      setCount(1);
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
          cancelFn: () => setCount(1),
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

  const deleteBasket = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await deleteBasketApi({ productNo: el.productNo });
      el.shoppingBasketYn = 'N';
      setCount(1);
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니에서 삭제하였습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    } catch (e: any) {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니에서 삭제하지 못했습니다.
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  const onChangeCountValue = (e: any) => {
    const value = e.target.value;
    if (value > 999) {
      setCount(999);
      return;
    } else {
      if (value === '') {
        setCount(1);
      }
      setCount(value);
    }
  };

  return isListView ? (
    <ProductContainer
      onClick={() => {
        navigate(`/eprocurement/product/${el.productNo}`);
        // openPopup({ popup: 'product-info', productNo: el.productNo });
      }}
    >
      <button
        className="heart"
        disabled={isAddingItemLoading || isDeletingItemLoading}
        onClick={async (e) => {
          if (el.wishYn === 'Y') {
            await deleteItem(e, el);
          } else {
            await saveItem(e, el);
          }
        }}
      >
        {el.wishYn === 'Y' ? (
          <Icon
            iconName="heartfill"
            style={{ marginTop: 4 }}
            width={16}
            height={16}
          />
        ) : (
          <Icon
            iconName="heart"
            color={colors.primary.basic}
            style={{ marginTop: 4 }}
            width={16}
            height={16}
          />
        )}
      </button>

      <LazyLoadImage
        className="product_img"
        src={el.imgSumnail} // use normal <img> attributes as props
        alt={el.productName}
        effect="blur"
      />
      <div className="text_box">
        <h4 className="product_name" style={{ fontSize: 16 }}>
          {el.productName}
        </h4>
        <p className="product_price" style={{ marginTop: 6 }}>
          <span>{numberFormat(el.sellingPrice)}</span>원
        </p>
      </div>
      <div className="price_container">
        <div className="count_box">
          <div className="order_count" onClick={(e) => e.stopPropagation()}>
            <button
              className="down"
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                } else {
                  setCount(1);
                }
              }}
            >
              <span className="downbox">-</span>
            </button>
            <input value={numberFormat(count)} onChange={onChangeCountValue} />
            <button
              className="up"
              onClick={() => {
                if (count > 999) {
                  setCount(999);
                } else {
                  setCount(count + 1);
                }
              }}
            >
              <span>+</span>
            </button>
          </div>
          <button
            className="c_btn"
            onClick={async (e) => {
              if (el.shoppingBasketYn === 'Y') {
                await deleteBasket(e, el);
              } else {
                await shopBasket(e, el);
              }
            }}
            disabled={isShoppingBasketLoading || isDeleteBasketLoading}
            style={{
              border:
                el.shoppingBasketYn === 'Y'
                  ? colors.primary.basic
                  : '1px solid #F1F1F1',
              background:
                el.shoppingBasketYn === 'Y' ? colors.primary.basic : '#F1F1F1',
              color: el.shoppingBasketYn === 'Y' ? 'white' : '#ADADAD',
              fontSize: 14,
              padding: '7px 22px',
            }}
          >
            담기
          </button>
        </div>
      </div>
    </ProductContainer>
  ) : (
    <ListItem
      onClick={() => {
        navigate(`/eprocurement/product/${el.productNo}`);
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <LazyLoadImage
          className="product_img"
          src={el.imgSumnail} // use normal <img> attributes as props
          alt={el.productName}
          effect="blur"
        />
        <div className="text_box">
          <h4 className="product_name">{el.productName}</h4>
          <span>{numberFormat(el.sellingPrice)}</span>원
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            justifyContent: 'center',
            width: 120,
          }}
        >
          <div className="order_count" onClick={(e) => e.stopPropagation()}>
            <button
              className="down"
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                } else {
                  setCount(1);
                }
              }}
            >
              <span className="downbox">-</span>
            </button>
            <input value={numberFormat(count)} onChange={onChangeCountValue} />
            <button
              className="up"
              onClick={() => {
                if (count > 999) {
                  setCount(999);
                } else {
                  setCount(count + 1);
                }
              }}
            >
              <span>+</span>
            </button>
          </div>
          <ListButton
            onClick={async (e) => {
              if (el.shoppingBasketYn === 'Y') {
                await deleteBasket(e, el);
              } else {
                await shopBasket(e, el);
              }
            }}
            disabled={isShoppingBasketLoading || isDeleteBasketLoading}
            style={{
              borderColor:
                el.shoppingBasketYn === 'Y' ? colors.primary.basic : '#F1F1F1',
              background:
                el.shoppingBasketYn === 'Y' ? colors.primary.basic : '#F1F1F1',
              color: el.shoppingBasketYn === 'Y' ? 'white' : '#999999',
            }}
          >
            <Icon
              iconName="cart"
              style={{ marginRight: 8 }}
              width={20}
              height={20}
              color={el.shoppingBasketYn === 'Y' ? 'white' : '#999999'}
            />
            장바구니
          </ListButton>
          <ListButton
            onClick={async (e) => {
              if (el.wishYn === 'Y') {
                await deleteItem(e, el);
              } else {
                await saveItem(e, el);
              }
            }}
            disabled={isAddingItemLoading || isDeletingItemLoading}
            style={{
              borderColor: el.wishYn === 'Y' ? colors.primary.basic : '#F1F1F1',
              background: el.wishYn === 'Y' ? colors.primary.basic : '#F1F1F1',
              color: el.wishYn === 'Y' ? 'white' : '#999999',
            }}
          >
            <Icon
              iconName="heart"
              width={20}
              height={20}
              color={el.wishYn === 'Y' ? 'white' : '#999999'}
            />
            <div className="wishlist_text">위시리스트</div>
          </ListButton>
        </div>
      </div>
    </ListItem>
  );
};

export default ProductItem;

const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow03);
  cursor: pointer;
  overflow: hidden;
  height: 279px;
  width: 213px;

  .heart {
    z-index: 1;
    position: absolute;
    top: 11px;
    right: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background-color: var(--base-color-dark);
    border-radius: 50%;
  }
  .product_img {
    width: 100%;
    aspect-ratio: 1/1;
    height: 140px;
    object-fit: contain;
  }
  .text_box {
    margin-top: 11px;

    .product_price {
      color: #000;
    }
    .product_name {
      font-weight: bold;
      overflow: hidden;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.6;
    }
    .product_description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 1em;
      font-size: 16px;
      font-weight: 600;
      color: var(--font-color-sub);
      line-height: 1.3;
    }
  }
  .price_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 13px;
    gap: 1rem 0.5rem;
    .count_box {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      .order_count {
        display: flex;
        align-items: center;
        font-size: var(--font-size-small);
        > * {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background-color: #d9d9d9;
          text-align: center;
          vertical-align: middle;
        }
        button {
          padding: 0.5rem 1rem;
        }
        span {
          font-size: var(--font-size-x-small);
          width: 1rem;
        }
        input {
          width: 40px;
          border: none;
          background-color: #d9d9d9;
          font-size: 12px;
        }
      }
      .order_price {
        font-size: var(--font-size-x-small);
        span {
          font-size: var(--font-size-small);
          font-weight: var(--font-w-mid);
        }
      }
    }
    .product_price {
      color: var(--font-color-sub);
      font-size: 16px;
      span {
        font-weight: 600;
        color: var(--font-color-default);
        font-size: 16px;
      }
    }
    button {
      flex-grow: 1;
      flex-shrink: 0;
      font-weight: var(--font-w-semi);
      font-size: var(--font-size-x-small);
      padding: 0.8rem 2.4rem;
      border-color: currentColor;
    }
  }

  @media screen and (max-width: 768px) {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    .heart {
      background: white;

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
`;

const ListItem = styled.div`
  position: relative;
  gap: 1.6rem;
  padding: 20px 24px 20px 24px;
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow03);
  cursor: pointer;
  height: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;

  .product_img {
    width: 100%;
    min-width: 180px;
    aspect-ratio: 4/3;
    max-height: 130px;
    object-fit: contain;
  }
  .text_box {
    flex-grow: 1;
    border-right: 1px solid #f1f1f1;
    margin: 0px 10px;
    span {
      font-size: 19px;
      font-weight: 500;
    }
    .product_name {
      font-weight: 600;
      font-size: 21px;
      margin: 2rem 0 13px;
      min-width: 100px;
      line-height: 1.3;
    }
    .product_description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 1em;
      font-size: var(--font-size-x-small);
      color: var(--font-color-sub);
      line-height: 1.3;
    }
  }
  .order_count {
    display: flex;
    align-items: center;
    font-size: 12px;
    > * {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 28px;
      background-color: #d9d9d9;
      text-align: center;
      vertical-align: middle;
    }
    button {
      padding: 0.5rem 1.5rem;
    }
    span {
      color: #434343;
      font-size: 1.6rem;
      width: 1rem;
    }
    input {
      width: 40px;
      border: none;
      background-color: #d9d9d9;
      font-size: 12px;
    }
  }
  .order_price {
    font-size: var(--font-size-x-small);
    span {
      font-size: var(--font-size-small);
      font-weight: var(--font-w-mid);
    }
  }
  .product_price {
    color: var(--font-color-sub);
    font-size: 1.4rem;
    font-weight: var(--font-w-mid);
    margin-right: 3rem;
    min-width: 120px;
    span {
      color: var(--font-color-default);
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 1536px) {
    .text_box {
      span {
        font-size: 18px;
        font-weight: 500;
      }

      .product_name {
        font-size: 20px;
      }
    }

    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
  }

  @media screen and (max-width: 768px) {
    .text_box {
      width: 372px;
      padding-right: 10px;
      .product_name {
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
    padding-bottom: 40px;
  }
`;

const ListButton = styled.button`
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: semi-bold;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  max-height: 32px;

  .wishlist_text {
    min-width: 67px;
  }
`;
