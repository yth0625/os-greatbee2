// style
import styled from "@emotion/styled"
// lazy-image
import 'react-lazy-load-image-component/src/effects/blur.css';
// img
import NoResultImg from './assets/image/common/no_result.png'
import React, { useEffect } from 'react';
import { IProductItem } from '../../interfaces/eprocurement';
import ProductItem from './ProductItem';

const ProductContainer = styled.div<{ isListView: boolean }>`
  position: relative;
  min-height: 8rem;
  padding-right: 2.5rem;
  width: 100%;

  .product_list {
    display: flex;
    flex-direction: ${(props) => (props.isListView ? 'row' : 'column')};
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;

    @media screen and (max-width: 1536px) {
      gap: 18px;
    }

    @media screen and (max-width: 768px) {
      gap: 20px 0;
    }
  }

  .no_result {
    text-align: center;
    line-height: 1.2;
    word-break: keep-all;
    padding: 0 1rem 50px;
    img {
      max-width: 18rem;
      width: 50%;
    }
    h4 {
      font-weight: var(--font-w-semi);
      font-size: var(--font-size-xx-large);
    }
    p {
      margin: 2rem 0 1rem;
      font-weight: var(--font-w-semi);
      font-size: var(--font-size-large);
      color: #858585;
    }
    ul {
      max-width: 25rem;
      margin: 0 auto;
      text-align: left;
      color: var(--font-color-sub);
      font-size: var(--font-size-small);
      li {
        margin: 0.3em 0;
        list-style: disc;
      }
    }

    @media screen and (max-width: 1280px) {
      img {
        max-width: 100px;
      }

      h4 {
        font-size: 20px;
        margin-top: 20px;
      }

      p {
        font-size: 16px;
      }

      ul {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding-right: 0px;
    .no_result {
      min-height: 570px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

// @ts-ignore
function Product({ productList, updateNextPage, isListView }) {
  const moreRef = React.useRef<HTMLDivElement>(null);
  const [isMorePage, setIsMorePage] = React.useState<boolean>(false);

  useEffect(() => {
    if (isMorePage) {
      setIsMorePage(false);
      updateNextPage();
    }
  }, [isMorePage, updateNextPage]);

  useEffect(() => {
    if (moreRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsMorePage(true);
        }
      });
      observer.observe(moreRef.current);
    }
  }, [moreRef.current]);

  return (
    <ProductContainer isListView={!isListView}>
      <div id="top" style={{ width: '100%', height: 1 }} />
      {productList && productList.length > 0 && (
        <div className="product_list">
          {productList.map((el: IProductItem, i: number) => (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              <ProductItem el={el} key={i} isListView={!isListView} />
              {!isListView && (i + 1) % 3 !== 0 && <Divider />}
            </div>
          ))}
          <div ref={moreRef} style={{ width: '100%', height: 1 }}></div>
        </div>
      )}
      {productList && productList.length === 0 && (
        <div className="no_result">
          <img src={NoResultImg} alt="" />
          <h4>해당 상품에 대한 검색 결과가 없습니다</h4>
          <p>다른 방식으로 다시 검색해 주세요</p>
          <ul>
            <li>단어의 철자가 정확한지 확인하세요</li>
            <li>다른 검색어를 사용해보세요</li>
            <li>일시적으로 상품이 품절되어있을 수 있습니다</li>
          </ul>
        </div>
      )}
    </ProductContainer>
  );
}

export default Product;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #f1f1f1;
  margin: 0 20px;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
