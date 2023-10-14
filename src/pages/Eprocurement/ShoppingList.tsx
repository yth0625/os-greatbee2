// style
import styled from '@emotion/styled'
// utils
import { numberFormat } from './utils/formatting/numberFormat'
import { dateFormat } from './utils/formatting/dateFormat'
// img
import CloseSvg from 'assets/svgs/close'
import { useDeleteItemFromCartApi } from '../../api/useEprocurementApi';
import { openAlert } from '../../redux/popUpReducer';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from 'styles/Icon';
import { ICartData } from './Cart';

const ShoppingListContainer = styled.div`
  display: flex;
  justify-content: center;
  .pc_shopping_list {
    width: 100%;
    @media screen and (max-width: 1280px) {
      width: 95%;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-size-small);
      text-align: center;

      &.list_header {
        height: 4rem;
        color: var(--font-color-sub);
        font-weight: var(--font-w-semi);
        border-bottom: 1px solid #e5e5e5;
        > *:nth-child(1) {
          padding-left: 4px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        > *:nth-child(5) {
          visibility: hidden;
        }

        .list_header_title {
          padding-right: 150px;
        }
        .checkbox_container {
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
            cursor: pointer;
          }
        }

        .check_box {
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }

        @media screen and (max-width: 1280px) {
          color: #222222;
          font-weight: 700;
          .checkbox_container {
            span {
              margin-left: 4px;
              text-decoration: underline;
              color: var(--font-color-sub);
            }
          }
          .list_header_title {
            padding-right: 80px;
          }

          > *:nth-child(5) {
            display: none;
          }
        }
      }
      &.list_body {
        border-top: 1px solid #f1f1f1;
        padding: 2rem 0;
        position: relative;

        &:last-child {
          border-bottom: 1px solid var(--border-color-light);
        }

        .count_box {
          flex-shrink: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2.5rem;
          .order_count {
            display: flex;
            align-items: center;
            font-size: var(--font-size-small);
            > * {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 28px;
              background-color: var(--base-color-dark);
              text-align: center;
              vertical-align: middle;
            }
            span {
              font-size: var(--font-size-x-small);
              width: 4rem;
            }
            input {
              border: none;
              width: 40px;
              font-size: 12px;
            }
          }
          .order_price {
            max-width: 140px;
            font-size: var(--font-size-x-small);
            span {
              font-size: var(--font-size-small);
              font-weight: var(--font-w-mid);
            }
          }
        }

        @media screen and (max-width: 768px) {
          .order_date {
            font-size: 15px;
          }

          .order_price {
            font-size: 15px;
          }

          .order_cancel {
            display: block;
            position: absolute;
            top: 10px;
            right: 0;
          }
        }
      }
      > * {
        :nth-child(1) {
          text-align: left;
          width: 48%;
        }
        :nth-child(2) {
          width: 12%;
        }
        :nth-child(3) {
          width: 10%;
        }
        :nth-child(4) {
          width: 14%;
        }
        :nth-child(5) {
          width: 2%;
          max-width: 20px;
        }
      }

      @media screen and (max-width: 1280px) {
        > * {
          :nth-child(1) {
            text-align: left;
            width: 48%;
          }
          :nth-child(2) {
            width: 12%;
          }
          :nth-child(3) {
            width: 20%;
          }
          :nth-child(4) {
            width: 20%;
          }
        }
      }

      .order_product {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 1rem;

        > input[type='checkbox'] {
          margin-left: 5px;
          -ms-transform: scale(1.3); /* IE */
          -moz-transform: scale(1.3); /* FF */
          -webkit-transform: scale(1.3); /* Safari and Chrome */
          -o-transform: scale(1.3); /* Opera */
        }
        .product_img_text {
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          img {
            cursor: pointer;
            width: 46%;
            min-width: 220px;
            aspect-ratio: 4/3;
            max-height: 13rem;
            object-fit: contain;
            margin-left: -1rem;
            max-width: 220px;
          }
        }

        .text_box {
          cursor: pointer;
          line-height: 1.2;
          flex: 1;
          .product_name {
            font-weight: var(--font-w-semi);
            margin-bottom: 40px;
          }
          .product_option {
            margin-top: 0.8rem;
            font-size: var(--font-size-x-small);
            span {
              color: var(--font-color-default);
              font-weight: var(--font-w-semi);
            }
          }
        }

        @media screen and (max-width: 1536px) {
          .product_img_text {
            img {
              cursor: pointer;
              width: 30%;
              min-width: 150px;
              aspect-ratio: 4/3;
              max-height: 13rem;
              object-fit: contain;
              margin-left: -1rem;
            }
          }

          .text_box {
            width: 100%;
            .product_name {
              width: 60%;
              min-width: 180px;
              margin-bottom: 0;
              font-size: 16px;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        @media screen and (max-width: 1440px) {
          .product_img_text {
            img {
              cursor: pointer;
              width: 30%;
              min-width: 150px;
              aspect-ratio: 4/3;
              max-height: 13rem;
              object-fit: contain;
              margin-left: -1rem;
            }
          }

          .text_box {
            width: 100%;
            .product_name {
              width: 50%;
              min-width: 150px;
              margin-bottom: 0;
              font-size: 16px;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        @media screen and (max-width: 1280px) {
          .product_img_text {
            padding-left: 2vw;
            flex-direction: column;
            align-items: flex-start;
            min-width: 260px;
            min-height: 145px;

            img {
              min-height: 100px;
            }
          }

          .text_box {
            width: 85%;
            .product_name {
              width: 100%;
              margin-bottom: 0;
              font-size: 16px;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        @media screen and (max-width: 1024px) {
          .product_img_text {
          }
        }
      }
      .order_cancel {
        svg {
          width: 100%;
          height: 100%;
        }
      }

      @media screen and (max-width: 1280px) {
        .order_cancel {
          display: none;
        }
      }
    }
  }
`;

interface IProps {
  data: ICartData[];
  setData: Dispatch<SetStateAction<ICartData[]>>;
  deleteItemFromCart: (productNo: number) => void;
}



function ShoppingList(props: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, setData, deleteItemFromCart } =
    props;

  const [isAllChecked, setIsAllChecked] = useState<boolean>(true);

  const { mutateAsync: deleteItemApi, isLoading: isDeletingItemLoading } =
    useDeleteItemFromCartApi();

  const getSelectedList = useCallback(() => data.filter(item => item.isChecked), [data])

  const checkAllChecked = useCallback(() => {
    return getSelectedList().length === data.length;
  }, [getSelectedList, data])

  const deleteItem = async (e: any, productNoList: number[]) => {
    e.stopPropagation();

    try {

      for (const productNo of productNoList) {
        await deleteItemApi({ productNo: productNo });
        deleteItemFromCart(productNo)
      }

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              장바구니에서 삭제하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => {},
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

  const removeSelectedItem = async (e: any) => {
    const productNoList = getSelectedList().map((el: any) => el.productNo);
    await deleteItem(e, productNoList);
  }

  const changeChecked = (e: any, i: number) => {
    setData(prev => {
      prev[i].isChecked = e.target.checked
      return [...prev]
    })

  }

  const isChecked = (i: number) => data[i].isChecked

  const checkAllItems = (e: any) => {
    setData(prev => {
      for (const item of prev) {
        item.isChecked = e.target.checked
      }

      return [...prev]
    })
  };

  useEffect(() => {
    // 전체 선택 여부 검사 후 체크
    if (checkAllChecked()) {
      setIsAllChecked(true)
    } else {
      setIsAllChecked(false)
    }
  }, [checkAllChecked])

  return (
    <ShoppingListContainer>
      <ul className="pc_shopping_list">
        <li className="list_header">
          <p>
            <div className="checkbox_container">
              <input
                type="checkbox"
                checked={isAllChecked}
                className="check_box"
                onChange={checkAllItems}
              />
              <span onClick={removeSelectedItem}>선택 삭제</span>
            </div>
            <span className="list_header_title">상품명</span>
          </p>
          <p>수량</p>
          <p>주문일자</p>
          <p>금액(단가)</p>
          <p>.</p>
        </li>
        {data?.map((el: any, i: number) => (
          <li className="list_body" key={i}>
            <div className="order_product">
              <input
                type="checkbox"
                checked={isChecked(i)}
                onChange={(e) => changeChecked(e, i)}
              />
              <div className="product_img_text">
                <img
                  src={el.imgSumnail}
                  alt={el.productName}
                  onClick={() => {
                    navigate(`/eprocurement/product/${el.productNo}`);
                  }}
                />
                <div
                  className="text_box"
                  onClick={() =>
                    navigate(`/eprocurement/product/${el.productNo}`)
                  }
                >
                  <p className="product_name">{el.productName}</p>
                </div>
              </div>
            </div>
            <div className="count_box">
              <div className="order_count">
                <button
                  className="down"
                  onClick={() => {
                    if (data[i].sellingCount - 1 >= 1) {
                      data[i].sellingCount = data[i].sellingCount - 1
                    } else {
                      data[i].sellingCount = 1
                    }

                    setData([...data])
                  }}
                >
                  <span className="downbox">-</span>
                </button>
                <input
                  style={{ minWidth: 40 }}
                  value={numberFormat(el.sellingCount)}
                  onChange={(e) => {
                    setData(prev => {
                      prev[i].sellingCount = e.target.value === '' ? 0 : Number(e.target.value);
                      return [...prev]
                    });
                  }}
                />
                <button
                  className="up"
                  onClick={() => {
                    data[i].sellingCount += 1
                    setData([...data])
                  }}
                >
                  <span>+</span>
                </button>
              </div>
            </div>
            <p className="order_date">{dateFormat(el.addDttm)}</p>
            <p className="order_price">{numberFormat(el.sellingPrice)}원</p>
            <button
              className="order_cancel"
              disabled={isDeletingItemLoading}
              onClick={(e) => deleteItem(e, [el.productNo])}
            >
              <CloseSvg />
            </button>
          </li>
        ))}
        {data.length === 0 && (
          <NoResult>
            <Icon iconName="nodataincart" className="nodataincarticon" />
            <h4>장바구니에 상품이 없습니다.</h4>
          </NoResult>
        )}
      </ul>
    </ShoppingListContainer>
  );
}

export default ShoppingList;

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
    .nodataincarticon {
      svg {
        width: 100px;
        height: 100px;
      }
    }
  }
`;
