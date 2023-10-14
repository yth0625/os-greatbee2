// core
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// style
import styled from '@emotion/styled';
// component
import ActionBar from './component/common/ActionBar';
import Product from './Product';
// img
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import WishList from './WishList';
import { IProductItemRes } from '../../interfaces/eprocurement';
import { AxiosResponse } from 'axios';
import {
  getProductListApi,
  searchProductListApi,
  useGetBestProductListByClientApi,
} from '../../api/useEprocurementApi';
import { openAlert } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';
import HorizontalCarousel from 'common/Carousel/HorizontalCarousel';
import RecentPurchaseHistory from './RecentPurchaseHistory';
import { debounce } from '../../utils/utils';

interface ISortOrder {
  value: number;
  label: string;
  order: string;
}

const sortOrders: ISortOrder[] = [
  { value: 0, label: '최신 등록 순', order: 'insDESC' },
  { value: 1, label: '높은 가격 순', order: 'amtDESC' },
  { value: 2, label: '낮은 가격 순', order: 'amtASC' },
];

const defaultPageCnt = 48;

const getTargetCategoryIdx = (
  category1: string | null,
  category2: string | null,
  category3: string | null,
): number => {
  if (category3 && category3 !== '') return 3;
  if (category2 && category2 !== '') return 2;
  if (category1 && category1 !== '') return 1;

  return 0;
};

function Eprocurement() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const paramQuery = searchParams.get('query') || '';
  const paramCategory1 = searchParams.get('category1') || '';
  const paramCategory2 = searchParams.get('category2') || '';
  const paramCategory3 = searchParams.get('category3') || '';
  const paramPage = searchParams.get('page') || '';
  const paramSortOrder = searchParams.get('sortOrder') || '0';
  const paramViewType = searchParams.get('viewType') || 'card';
  const paramIsShowWishList = searchParams.get('isShowWishList') || 'N';

  const bottomRef = useRef<HTMLDivElement>(null);

  const [isShowWishList, setIsShowWishList] = useState<boolean>(false);

  const [productList, setProductList] = useState<IProductItemRes[]>([]);

  const [wishListUpdatingToggle, setWishListUpdatingToggle] = useState<boolean>(false);

  const { data: bestItem } = useGetBestProductListByClientApi();

  const scrollToScrollY = useMemo(() => debounce(() => {
    const scrollY = sessionStorage.getItem('scrollY');

    if (scrollY && scrollY !== '') {
      window.scrollTo(0, Number(scrollY));
    }
  }, 200), [])

  const saveScrollY = useMemo(() => debounce((scrollY: number) => {
    sessionStorage.setItem('scrollY', scrollY.toString());
  }, 200), [])


  const getProductListWith = async (
    categoryType: string,
    categoryNo: number,
    pageNo: number,
    orderKind: string,
  ) => {
    const params: any = {
      pageNo,
      perCnt: defaultPageCnt,
      orderKind,
    };

    if (categoryType === 'large') {
      // 대분류
      if (categoryNo > 1) {
        params['lCateNo'] = categoryNo;
      }
    } else if (categoryType === 'middle') {
      params['mCateNo'] = categoryNo;
    } else if (categoryType === 'small') {
      params['sCateNo'] = categoryNo;
    }

    return getProductListApi(params).then(
      (res: AxiosResponse) => res.data.data,
    );
  };

  const getProductListWithIdx = useCallback(async (idx: number, value: number, page: number, sortOrder: string) => {
    let productList: IProductItemRes[] = [];

    if (idx === 1) {
      // 대분류 상품 리스트 가져오기
      productList = await getProductListWith('large', value, page, sortOrder);
    } else if (idx === 2) {
      // 중분류 상품 리스트 가져오기
      productList = await getProductListWith(
        'middle',
        value,
        page,
        sortOrder,
      );
    } else if (idx === 3) {
      // 소분류 상품 리스트 가져오기
      productList = await getProductListWith('small', value, page, sortOrder);
    }

    return productList;
  }, [])

  const updateProductList = useCallback(
    async (idx: number, value: number, page: number, sortOrder: string) => {
      let productList: IProductItemRes[] = await getProductListWithIdx(idx, value, page, sortOrder)

      const productListLength = productList.length
      if (productListLength > 0) {
        if (page === 1) {
          setProductList(productList);
        } else {
          setProductList((prev) => [...prev, ...productList]);
        }

        if (productListLength > 0) {
          sessionStorage.setItem(
            'productListLength',
            productListLength.toString(),
          );
        }
      } else {
        console.log('empty list!!!')
        setProductList([]);
        sessionStorage.removeItem('productListLength');
      }

      return productListLength;
    },
    [getProductListWithIdx],
  );

  const updateSortOrder = async (sortOrder: number) => {
    const idx = getTargetCategoryIdx(
      paramCategory1,
      paramCategory2,
      paramCategory3,
    );

    if (idx === 1) {
      navigate(`/eprocurement?category1=${paramCategory1}&sortOrder=${sortOrder.toString()}&viewType=${paramViewType}&page=1`);
    } else if (idx === 2) {
      navigate(`/eprocurement?category2=${paramCategory2}&sortOrder=${sortOrder.toString()}&viewType=${paramViewType}&page=1`);
    } else if (idx === 3) {
      navigate(`/eprocurement?category3=${paramCategory3}&sortOrder=${sortOrder.toString()}&viewType=${paramViewType}&page=1`);
    }
  };

  const updateViewType = (type: string) => {
    const idx = getTargetCategoryIdx(
      paramCategory1,
      paramCategory2,
      paramCategory3,
    );

    if (idx === 1) {
      navigate(`/eprocurement?category1=${paramCategory1}&sortOrder=${paramSortOrder}&viewType=${type}&page=1`);
    } else if (idx === 2) {
      navigate(`/eprocurement?category2=${paramCategory2}&sortOrder=${paramSortOrder}&viewType=${type}&page=1`);
    } else if (idx === 3) {
      navigate(`/eprocurement?category3=${paramCategory3}&sortOrder=${paramSortOrder}&viewType=${type}&page=1`);
    }

  }

  const onClickScrollToTop = useCallback(() => {
    const topElement = document.getElementById('scrolltop');
    topElement && topElement.scrollIntoView();
    window.scrollTo(0, 0);
  }, []);

  const onClickScrollToBottom = () => {
    bottomRef?.current && bottomRef.current.scrollIntoView();
  };

  const updateProductListWithCategory1 = useCallback(
    async (category: number, page: number, sort: number) => {
      setIsShowWishList(false);

      return updateProductList(1, category, page, sortOrders[sort].order);
    },
    [updateProductList],
  );

  const updateProductListWithCategory2 = useCallback(
    async (category: number, page: number, sort: number) => {
      setIsShowWishList(false);

      return updateProductList(2, category, page, sortOrders[sort].order);
    },
    [updateProductList],
  );

  const updateProductListWithCategory3 = useCallback(
    async (category: number, page: number, sort: number) => {
      setIsShowWishList(false);

      return updateProductList(3, category, page, sortOrders[sort].order);
    },
    [updateProductList],
  );

  const updateProductListWithCategory = useCallback(
    async (page: number, sortOrder: number) => {
      const idx = getTargetCategoryIdx(
        paramCategory1,
        paramCategory2,
        paramCategory3,
      );

      console.log('idx:', idx)

      if (idx === 3) {
        return updateProductListWithCategory3(
          Number(paramCategory3),
          page,
          sortOrder,
        );
      }

      if (idx === 2) {
        return updateProductListWithCategory2(
          Number(paramCategory2),
          page,
          sortOrder,
        );
      }

      if (idx === 1) {
        return updateProductListWithCategory1(
          Number(paramCategory1),
          page,
          sortOrder,
        );
      }

      return 0;
    },
    [
      paramCategory1,
      paramCategory2,
      paramCategory3,
      updateProductListWithCategory1,
      updateProductListWithCategory2,
      updateProductListWithCategory3,
    ],
  );

  const updateNextPage = useCallback(async () => {
    // 키워드 검색은 페이지네이션 없음
    if (paramQuery && paramQuery.length > 0) {
      return;
    }

    const page = Number(paramPage) + 1;

    const idx = getTargetCategoryIdx(
      paramCategory1,
      paramCategory2,
      paramCategory3,
    );

    let productList: IProductItemRes[] = [];
    if (idx === 1) {
      productList = await getProductListWithIdx(1, Number(paramCategory1), page, paramSortOrder)
      if (productList.length > 0) {
        navigate(`/eprocurement?category1=${paramCategory1}&sortOrder=${paramSortOrder}&viewType=${paramViewType}&page=${page}`);
      }

    } else if (idx === 2) {
      productList = await getProductListWithIdx(2, Number(paramCategory2), page, paramSortOrder)
      if (productList.length > 0) {
        navigate(`/eprocurement?category2=${paramCategory2}&sortOrder=${paramSortOrder}&viewType=${paramViewType}&page=${page}`);
      }

    } else if (idx === 3) {
      productList = await getProductListWithIdx(3, Number(paramCategory3), page, paramSortOrder)
      if (productList.length > 0) {
        navigate(`/eprocurement?category3=${paramCategory3}&sortOrder=${paramSortOrder}&viewType=${paramViewType}&page=${page}`);
      }

    }
  }, [getProductListWithIdx, navigate, paramCategory1, paramCategory2, paramCategory3, paramPage, paramQuery, paramSortOrder, paramViewType]);

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
    // console.log('searchParams:', searchParams);
    // for (const item of searchParams.entries()) {
    //   console.log('param:', item[0], ' / ', item[1]);
    // }

    const paramQuery = searchParams.get('query') || '';
    const paramPage = searchParams.get('page') || '1';
    const paramSortOrder = searchParams.get('sortOrder') || '0';
    const paramIsShowWishList = searchParams.get('isShowWishList') || '';

    // 위시리스트 보여주기
    if (paramIsShowWishList && paramIsShowWishList === 'Y') {
      setIsShowWishList(true);

      return;
    }

    // 키워드 검색 결과 보여주기
    if (paramQuery && paramQuery !== '') {
      searchProductListApi(paramQuery).then((res: AxiosResponse) => {
        setProductList(res.data.data);
      });

      return;
    }

    // 카테고리 검색 결과 보여주기
    const callNextPage = async (page: number) => {
      console.log('callNextPage:', page)
      for (let i = 1; i <= page; i++) {
        await updateProductListWithCategory(i, Number(paramSortOrder)).then(
          () => {},
        );
      }
    };

    const page = Number(paramPage);
    const productListLength = sessionStorage.getItem('productListLength');
    if (productListLength && Number(productListLength) > 0) {
      // 새로운 페이지를 불러오는 경우
      updateProductListWithCategory(Number(paramPage), Number(paramSortOrder)).then(() => {})

    } else {
      console.log('뒤로 가기로 돌아온 경우!!!', page)

      // 뒤로 가기로 들어온 경우 여러 페이지를 불러와야 함
      callNextPage(page).then(() => {
        console.log('move to y!!!', sessionStorage.getItem('scrollY'))

        scrollToScrollY()
      })
    }
  }, [scrollToScrollY, searchParams, updateProductListWithCategory, updateProductListWithCategory1, updateProductListWithCategory2, updateProductListWithCategory3])


  useEffect(() => {
    if (
      location?.state?.prevPath === '/eprocurement' ||
      location.search === ''
    ) {
      navigate(`/eprocurement?category1=1&sortOrder=0&viewType=card&page=1`)
    }
  }, [location, location?.state, navigate, updateProductListWithCategory1]);

  useEffect(() => {
    console.log('useEffect init');

    console.log('paramQuery:', paramQuery)
    console.log('paramIsShowWishList:', paramIsShowWishList)
    console.log('paramCategory1:', paramCategory1)

    if (paramQuery && paramQuery !== '') {
      console.log('first param query:', paramQuery)
    } else if (paramIsShowWishList && paramIsShowWishList === 'Y') {
      console.log('first wishlist:', paramIsShowWishList)
    } else if (paramCategory1 && paramCategory1 !== '') {
      console.log('first category1:', paramCategory1)
    } else if (paramCategory2 && paramCategory2 !== '') {
      console.log('first category2:', paramCategory2)
    } else if (paramCategory3 && paramCategory3 !== '') {
      console.log('first category3:', paramCategory3)
    } else {
      // 처음 들어온 경우
      console.log('first access!!!!!')
      navigate(`/eprocurement?category1=1&sortOrder=0&viewType=card&page=1`)
    }

    const restrictClickContainer = document.getElementById('restrictClick');
    restrictClickContainer?.addEventListener('contextmenu', (e) => restrictClickEvent(e));

    function handleScroll() {
      if (window.location.pathname === '/eprocurement') {
        const scrollY =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;

        const productListLength = sessionStorage.getItem('productListLength');
        if (productListLength && Number(productListLength) > 0) {
          console.log('save scrollY:', scrollY)
          saveScrollY(scrollY)
        }
      }
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      restrictClickContainer?.removeEventListener('contextmenu', (e) =>
        restrictClickEvent(e),
      );

      window.removeEventListener('scroll', handleScroll);

      sessionStorage.removeItem('productListLength');
    };
  }, []);

  return (
    <HomeContainer id="restrictClick">
      <div className="home_left">
        <section className="action_bar_container">
          <ActionBar isShowSearchBar={true} />
        </section>

        <ScrollView>
          <section className="category_container" id="scrolltop">
            <h2 className="c_section_title bestitem">BEST 상품</h2>
            <div style={{ minHeight: 244 }}>
              <HorizontalCarousel data={bestItem} setWishListUpdatingToggle={setWishListUpdatingToggle} />
            </div>
          </section>
          <section className="product_container">
            {isShowWishList ? (
              <WishList wishListUpdatingToggle={wishListUpdatingToggle}/>
            ) : (
              <>
                <div className="selectbox_container">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h2 className="c_section_title">
                      {/* <CategoryOfficeSvg /> */}
                      {/* {selectedCategoryTitle?.label} */}
                      상품리스트
                    </h2>
                  </div>

                  {(paramQuery === null || paramQuery === '') && (
                    <div className="more_btn">
                      {['최신 등록순', '높은 가격순', '낮은 가격순'].map(
                        (item, idx) => (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <OrderBtn
                              onClick={() => updateSortOrder(idx)}
                              isSelected={Number(paramSortOrder) === idx}
                            >
                              {item}
                            </OrderBtn>
                            {idx !== 2 && <Divider />}
                          </div>
                        ),
                      )}
                      <Icon
                        width={20}
                        height={20}
                        onPress={() => updateViewType('list')}
                        iconName="list"
                        color={
                          paramViewType === 'card'
                            ? '#ADADAD'
                            : colors.primary.basic
                        }
                        style={{
                          cursor: 'pointer',
                          marginRight: 6,
                          marginLeft: '1.5rem',
                        }}
                      />
                      <Icon
                        width={20}
                        height={20}
                        onPress={() => updateViewType('card')}
                        iconName="thumbnail"
                        color={
                          paramViewType === 'list'
                            ? '#ADADAD'
                            : colors.primary.basic
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  )}
                </div>

                <Product
                  isListView={paramViewType === 'list'}
                  productList={productList}
                  updateNextPage={updateNextPage}
                />
              </>
            )}
          </section>
          <div ref={bottomRef}></div>
        </ScrollView>
        <div
          className="floating_btn"
          style={{
            bottom: 100,
          }}
        >
          <Icon
            width={50}
            height={50}
            iconName="floatingBtnUp"
            onPress={() => onClickScrollToTop()}
          />
        </div>
        <div
          className="floating_btn"
          style={{
            bottom: 30,
          }}
        >
          <Icon
            width={50}
            height={50}
            iconName="floatingBtnDown"
            onPress={() => onClickScrollToBottom()}
          />
        </div>
      </div>
      <RecentPurchaseHistory />
    </HomeContainer>
  );
}

export default Eprocurement;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: var(--header-height);

  .floating_btn {
    position: fixed;
    background-color: #ffc74c;
    border-radius: 30px;
    right: 20px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .c_section_title {
    margin-left: 20px;
  }

  .bestitem {
    margin-left: 23px;
  }

  .selectbox_container {
    display: flex;
    flexdirection: row;
    width: 100%;
    justify-content: space-between;
    padding-right: 2.5rem;
    margin-bottom: 20px;

    @media screen and (max-width: 1280px) {
      padding-right: 53px;
    }

    > .c_section_title {
      @media screen and (max-width: 786px) {
        width: 30%;
      }
    }

    > .more_btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
  }

  @media screen and (max-width: 786px) {
    .selectbox_container {
      padding-right: 24px;
    }
    .c_section_title {
      margin-left: 0;
    }

    .bestitem {
      margin-left: 0;
    }

    > .more_btn {
      flex-grow: 1;
      width: 70%;
      justify-content: flex-end;
    }
  }

  .home_left,
  .home_right {
    padding: 3rem;

    @media screen and (max-width: 1536px) {
      padding: 33px 18px 18px;
    }

    @media screen and (max-width: 1280px) {
      padding: 20px 0px 20px 20px;
    }

    @media screen and (max-width: 768px) {
      padding: 0px;
    }
    @media screen and (max-width: 600px) {
      padding: 3rem 0;
    }

    > section {
      position: relative;
      padding: 2.5rem;
      border-radius: var(--border-radius-large);
      @media screen and (max-width: 600px) {
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 0;
      }
    }
  }

  .home_left {
    flex-grow: 1;
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media screen and (max-width: 1280px) {
      max-width: 1000px;
    }

    .action_bar_container {
      padding: 33px 0 20px;
      position: fixed;
      top: var(--header-height);
      width: calc(70% - 11.5rem);
      background: ${colors.bg.basic};
      z-index: 70;
      border-radius: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      @media screen and (max-width: 1280px) {
        width: calc(100% - 31rem);
        padding-top: 24px;
        padding-bottom: 20px;
      }
      @media screen and (max-width: 1024px) {
        width: calc(100% - 22rem);
      }

      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 16px 20px;
        background: ${colors.bg.white};
      }
      @media screen and (max-width: 600px) {
        padding: 20px;
        width: 100%;
      }

      .btn_recommend {
        display: none;
        @media screen and (max-width: 1440px) {
          display: block;
        }
      }
    }

    .favorite_container {
      position: relative;
      padding: 0;
      @media screen and (max-width: 600px) {
        padding-left: 2rem;
      }

      .c_section_title {
        padding-bottom: 0;
        padding-left: 2.5rem;

        @media screen and (max-width: 600px) {
          padding-left: 0;
        }

        > .more_btn {
          @media screen and (max-width: 600px) {
            padding-right: 2rem;
          }
        }
      }
    }

    .category_container {
      background: var(--base-color-mid);

      @media screen and (max-width: 768px) {
        background: ${colors.bg.white};
        border-bottom: 10px solid var(--base-color-light);
        border-radius: 0;
        padding-bottom: 20px;

        .bestitem {
          margin-top: 10px;
        }

        .c_section_title {
          font-size: 16px;
        }
      }
    }

    .product_container {
      position: relative;
      padding-right: 0;
      background-color: var(--base-color-mid);

      @media screen and (max-width: 768px) {
        background: ${colors.bg.white};

        .c_section_title {
          font-size: 16px;
        }
      }

      @media screen and (max-width: 600px) {
        border: none;
      }
    }

    .floating_btn {
      position: fixed;
      background-color: #ffc74c;
      border-radius: 30px;
      right: 20px;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 100;
    }
  }

  .home_right {
    display: block;
    width: 30%;
    flex-shrink: 0;
    padding-left: 0;

    .c_section_title {
      padding-bottom: 1.5rem;
    }

    .sticky_box {
      padding: 3rem 2rem;
      position: sticky;
      top: calc(var(--header-height) + 3rem);
      background-color: #fff;
      height: calc(100vh - var(--header-height) - 3rem * 2);
      width: 100%;
      overflow: hidden;
      border-radius: var(--border-radius-large);

      .sticky_title {
        padding-top: 22px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        background-color: ${colors.primary.basic};
        font-size: 18px;
        font-weight: 700;
        color: ${colors.font.basic};
      }
    }

    .recommend_container {
      background-color: #fff;
      height: calc(100% - 5rem);
      width: 100%;
      border: 1px solid ${colors.bg.gray01};
      padding: 1rem 1rem 0;

      .scroll_box {
        box-sizing: content-box;
        width: calc(100% + 5rem); /* box-shadow 안짤리게 */
        height: 100%;
        margin: 0 -2.5rem; /* box-shadow 안짤리게 */
        overflow-y: auto;
        scrollbar-width: none; /* firefox */

        ::-webkit-scrollbar {
          display: none;
        }
      }
    }

    @media screen and (max-width: 1280px) {
      width: 192px;
      padding: 0 16px;

      .sticky_box {
        padding: 0;
        background-color: transparent;
        top: calc(var(--header-height) + 24px);

        .sticky_title {
          height: 48px;
          padding: 14px 26px;
          border-radius: 16px;
        }
      }

      .recommend_container {
        background-color: transparent;
        padding: 0;
      }
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const ScrollView = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow-y: auto;
  margin-top: 75px;
  section {
    position: relative;
    padding: 30px 26px;
    border-radius: 8px;

    @media screen and (max-width: 1280px) {
      border-radius: 8px;
    }

    @media screen and (max-width: 768px) {
      padding: 0 20px 0 24px;
    }

    @media screen and (max-width: 600px) {
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 0;
  }
  
  @media screen and (max-width: 768px) {
    gap: 0;
  }
`;

const OrderBtn = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isSelected ? '#00000080' : '#99999980')};

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 1.6rem;
  background-color: #99999980;
  margin: 0 1rem;
`;
