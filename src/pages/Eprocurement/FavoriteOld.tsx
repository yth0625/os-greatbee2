// style
import styled from "@emotion/styled"
// utility
import { useOpenPopup } from './component/utility/popup/Popup' // 팝업
// utils
import { numberFormat } from './utils/formatting/numberFormat'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
// img
import Product01Img from 'assets/image/sample/product01.jpg'
import Product02Img from 'assets/image/sample/product02.jpg'
import Product03Img from 'assets/image/sample/product03.jpg'
import Product04Img from 'assets/image/sample/product04.jpg'
import Product05Img from 'assets/image/sample/product05.jpg'
import { useGetWishListApi } from '../../api/useEprocurementApi';

const FavoriteContainer = styled.div`
  .favorite_swiper{
    padding: 2rem 16px;
    user-select: none;
    .favorite_slide{
      height: 20rem;
      width: 22rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
      padding: 2rem;
      border-radius: var(--border-radius-large);
      text-align: left;
      cursor: pointer;
      &.swiper-slide-visible{
        box-shadow: var(--box-shadow02);
      }
      img{
        width: 100%;
        height: 70%;
        object-fit: contain;
        user-select: none;
      }
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .product_name{
        font-weight: var(--font-w-bold);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .product_price{
        color: var(--font-color-sub);
      }
    }
    .swiper-button-prev,
    .swiper-button-next{
      border-radius: 50%;
      width: 4.4rem;
      height: 4.4rem;
      box-shadow: rgba(0, 0, 0, 0.15) 2px 4px 4px 0px;;
      &::after{
        content: none;
      }
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
    .swiper-button-prev{
      left: 4px;
      background: #fff url('/images/arrow_left.svg') no-repeat 45% 50% / 2.4rem;
    }
    .swiper-button-next{
      right: 4px;
      background: #fff url('/images/arrow_right.svg') no-repeat 55% 50% / 2.4rem;
    }
  }
`
function FavoriteOld(){
  const ImgArr = [Product01Img, Product02Img, Product03Img, Product04Img, Product05Img]
  const openPopup = useOpenPopup()

  const {
    data: favorites,
    isLoading: isFavoritesLoading
  } = useGetWishListApi();

  return (
    <FavoriteContainer>
      {
        favorites && favorites?.length > 0 &&
        <Swiper className="favorite_swiper"
          modules={[ Navigation, Autoplay ]}
          navigation={true}
          slidesPerView={'auto'}
          spaceBetween={16}
          speed={500}
          watchSlidesProgress={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            769: {
              slidesPerView: 4,
            },
            1025: {
              slidesPerView: 5,
            },
          }}
        >
          {
            favorites?.map((el:any, i: number) =>
              <SwiperSlide className="favorite_slide" key={i}
                onClick={()=>openPopup({ popup: 'product-info', productNo: el.productNo })}
              >
                <img src={el.imgSumnail} alt={el.productName} />
                <h4 className="product_name">{el.productName}</h4>
                <p className="product_price">{numberFormat(el.sellingPrice)}원</p>
              </SwiperSlide>
            )
          }
        </Swiper>
      }
      { favorites?.length === 0 &&
        <div className='favorite_swiper'>즐겨찾기한 제품이 없습니다</div>
      }
    </FavoriteContainer>
  )
}

export default FavoriteOld
