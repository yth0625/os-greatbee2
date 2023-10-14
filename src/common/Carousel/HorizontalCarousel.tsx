import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import './horizontalcss.css';
import './horizoncs.css';
import { useDispatch } from 'react-redux';
import {
  useAddItemToCartApi,
  useDeleteItemFromCartApi,
  useDeleteItemFromWishListApi,
  useSaveItemToWishListApi,
} from 'api/useEprocurementApi';
import {
  closeAlert,
  closeWishPopup,
  openAlert,
  openWishPopup,
} from 'redux/popUpReducer';
import Icon from 'styles/Icon';
import { numberWithCommas } from '../../utils/utils';
import colors from 'styles/colors';

const HorizontalCarousel = ({ data, setWishListUpdatingToggle }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const { mutateAsync: addBasketApi, isLoading: isShoppingBasketLoading } =
    useAddItemToCartApi();

  const { mutateAsync: deleteBasketApi, isLoading: isDeleteBasketLoading } =
    useDeleteItemFromCartApi();

  const { mutateAsync: saveItemApi, isLoading: isAddingItemLoading } =
    useSaveItemToWishListApi();

  const { mutateAsync: deleteItemApi, isLoading: isDeletingItemLoading } =
    useDeleteItemFromWishListApi();

  const shopBasket = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await addBasketApi({ sellingCount: 1, productNo: el.productNo });
      el.shoppingBasketYn = 'Y';
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

  const saveItem = async (e: any, el: any) => {
    e.stopPropagation();

    try {
      await saveItemApi({ productNo: el.productNo });
      setWishListUpdatingToggle((prev: boolean) => !prev);
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
      }, 2500);

      // dispatch(
      //   openAlert({
      //     text: (
      //       <div style={{ color: '#565660', textAlign: 'center' }}>
      //         위시리스트에 추가하였습니다.
      //       </div>
      //     ),
      //     hasConfirm: false,
      //     onClick: () => console.log(''),
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
          onClick: () => {
            setWishListUpdatingToggle((prev: boolean) => !prev);
          },
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

  return (
    <Container>
      <Swiper
        navigation={{
          nextEl: '.review-swiper-button-next',
          prevEl: '.review-swiper-button-prev',
        }}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={5}
        breakpoints={{
          769: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1281: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1470: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
        }}
      >
        {data &&
          data.map((el: any, i: number) => (
            <SwiperSlide key={i}>
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
                    width={20}
                    height={20}
                  />
                ) : (
                  <Icon
                    className="heart_icon"
                    color={colors.primary.basic}
                    iconName="heart"
                    style={{ marginTop: 4 }}
                    width={20}
                    height={20}
                  />
                )}
              </button>
              <Card
                lastcard={i === data.length - 1}
                onClick={() =>
                  navigate(`/eprocurement/product/${el.productNo}`)
                }
              >
                <LazyLoadImage
                  src={el.imgSumnail}
                  alt={el.productName}
                  effect="blur"
                  style={{ maxWidth: 120, aspectRatio: '1' }}
                />
                <div className="text_box">
                  <h4 className="recommend_name">{el.productName}</h4>
                  <div className="price_container">
                    <p className="price">
                      <span>{numberWithCommas(el.sellingPrice)}</span>원
                    </p>
                    <button
                      className="c_btn"
                      onClick={async (e) => {
                        console.log(e, el);
                        if (el.shoppingBasketYn === 'Y') {
                          await deleteBasket(e, el);
                        } else {
                          await shopBasket(e, el);
                        }
                      }}
                      disabled={
                        isShoppingBasketLoading || isDeleteBasketLoading
                      }
                      style={{
                        background:
                          el.shoppingBasketYn === 'Y'
                            ? colors.primary.basic
                            : '#F1F1F1',
                        color:
                          el.shoppingBasketYn === 'Y' ? 'white' : '#ADADAD',
                        fontSize: 14,
                        padding: '5px 22px',
                      }}
                    >
                      담기
                    </button>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="icon-arrow-long-right review-swiper-button-next"></div>
      <div className="icon-arrow-long-left review-swiper-button-prev"></div>
    </Container>
  );
};

export default HorizontalCarousel;

const Container = styled.div`
  position: relative;

  @media screen and (max-width: 1280px) {
    .heart_icon {
      svg {
        fill: #adadad;
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Card = styled.div<{ lastcard: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 18px;
  cursor: pointer;
  padding: 30px 20px 20px;
  height: 100%;
  width: 225px;
  border: none;

  .price_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }

  .recommend_name {
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .c_btn {
    border: none;
  }

  @media screen and (max-width: 1536px) {
    width: 206px;
    padding: 16px;

    img {
      margin-top: 15px;
      padding: 10px;
    }

    .recommend_name {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1469px) {
    width: 225px;
  }

  @media screen and (max-width: 1280px) {
    width: 206px;
    padding: 16px;

    img {
      margin-top: 15px;
      padding: 10px;
    }

    .recommend_name {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 168px;
    padding: 16px;
    border-right: ${(props) => (props.lastcard ? 'none' : '1px solid #f1f1f1')};
    border-radius: 0px;

    .price_container {
      justify-content: center;
      .c_btn {
        display: none;
      }
    }
  }
`;
