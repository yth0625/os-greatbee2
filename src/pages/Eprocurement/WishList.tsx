import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';

import colors from 'styles/colors';
import { useGetWishListApi } from '../../api/useEprocurementApi';
import Loading from './component/utility/Loading';
import ProductItem from './ProductItem';
import { IProductItem } from '../../interfaces/eprocurement';

// interface IWishListProps {
//   isLoading: boolean;
//   productList: any;
// }

interface IProps {
  wishListUpdatingToggle: boolean
}

const WishList = ({wishListUpdatingToggle}: IProps) => {
  const wishListRef = useRef<null | HTMLDivElement>(null);

  const { data, isLoading, refetch } = useGetWishListApi();

  useEffect(() => {
    wishListRef.current?.scrollIntoView();
  }, [data]);

  useEffect(() => {
    refetch().then(() => {});
  }, [wishListUpdatingToggle])


  return (
    <WishListContainer>
      <Title ref={wishListRef}>
        <Icon
          iconName="heartfill2"
          color={colors.primary.basic}
          width={24}
          height={24}
          style={{ marginTop: 2 }}
        />
        <h1>위시리스트</h1>
      </Title>
      {isLoading && <Loading type="dot" />}
      {data && data.length > 0 ? (
        <ProductContainer>
          {data.map((el: IProductItem, i: number) => {
            el.wishYn = 'Y';
            return (
              <ProductItem
                key={i}
                el={el}
                refresh={refetch}
                isListView={true}
              />
            );
          })}
        </ProductContainer>
      ) : (
        <NoResult>
          <Icon iconName="nodatainwishlist" className="nodatawishlisticon" />
          <h4>위시리스트에 담긴 상품이 없습니다.</h4>
        </NoResult>
      )}
    </WishListContainer>
  );
};

export default WishList;

const WishListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.6rem;
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${colors.primary.basic};
    margin-left: 8px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const NoResult = styled.div`
  text-align: center;
  line-height: 1.2;
  word-break: keep-all;
  padding: 5rem;
  img {
    max-width: 18rem;
    width: 50%;
  }
  h4 {
    margin-top: 20px;
    font-weight: var(--font-w-semi);
    font-size: 28px;
  }

  @media screen and (max-width: 1536px) {
    h4 {
      font-size: 20px;
    }
    .nodatawishlisticon {
      svg {
        width: 100px;
        height: 100px;
      }
    }
  }
`;
