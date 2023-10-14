// style
import styled from '@emotion/styled';
// img
import { useGetBestProductListApi } from '../../api/useEprocurementApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IProductItem } from '../../interfaces/eprocurement';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../utils/utils';

const RecommendContainer = styled.div`
  padding: 0 2.5rem;
  height: 100%;

  .recommend_box {
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    cursor: pointer;
    max-height: 180px;

    &:last-child {
      padding-bottom: 1.6rem;
    }

    .recommend_img {
      flex-shrink: 0;
      width: 35%;
      aspect-ratio: 4/3;
      max-height: 160px;
      min-height: 10rem;
      overflow: hidden;
      border-radius: var(--border-radius-large);
      box-shadow: var(--box-shadow01);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-top: 0.5vh;
        margin-left: 1.5vw;
        max-width: 70%;
        max-height: 160px;
        object-fit: contain;
      }
    }

    .text_box {
      overflow: hidden;

      .recommend_name {
        font-weight: var(--font-w-bold);
        margin-bottom: 1.8rem;
        line-height: 1.3;
        font-size: 16px;
      }

      .recommend_description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 1.6rem;
        font-size: var(--font-size-x-small);
        color: var(--font-color-sub);
      }

      .price_container {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: var(--font-size-x-small);
        color: var(--font-color-sub);

        .tag {
          flex-shrink: 0;
          padding: 0.8rem 1.2rem;
          background-color: var(--base-color-light);
          border-radius: var(--border-radius-full);
        }

        .price {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          span {
            font-size: var(--font-size-mid);
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .recommend_box {
      .text_box {
        .recommend_name {
          font-size: 15px;
        }
      }
    }
  }

  @media screen and (max-width: 1280px) {
    .recommend_img {
      width: 100% !important;
      background-color: #fff;
      padding: 8px 16px;

      img {
        margin: 0;
      }
    }

    .text_box {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 0 2rem;
  }
`;

interface IFavoriteItem {
  data: IProductItem[] | undefined;
  isLoading: boolean;
}

export const FavoriteItem = (props: IFavoriteItem) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <RecommendContainer>
      {data &&
        data.map((el, i) => (
          <div
            className="recommend_box"
            key={i}
            onClick={() => navigate(`/eprocurement/product/${el.productNo}`)}
          >
            <div className="recommend_img">
              <LazyLoadImage
                src={el.imgSumnail} // use normal <img> attributes as props
                alt={el.productName}
                effect="blur"
              />
            </div>
            <div className="text_box">
              <h4 className="recommend_name">{el.productName}</h4>
              {/*<p className="recommend_description">*/}
              {/*  2023년형 맥북 프로 16 M2 스페이스그레이*/}
              {/*</p>*/}
              <div className="price_container">
                {/*<p className="tag">사무기기</p>*/}
                <p className="price">
                  <span>{numberWithCommas(el.sellingPrice)}</span>원
                </p>
              </div>
            </div>
          </div>
        ))}
    </RecommendContainer>
  );
};

function Favorite() {
  const { data, isLoading } = useGetBestProductListApi();

  return (
    <FavoriteItem data={data} isLoading={isLoading}/>
  );
}

export default Favorite;
