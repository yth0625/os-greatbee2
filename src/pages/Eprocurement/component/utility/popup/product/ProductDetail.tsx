// core
import { useCallback, useRef, useState } from 'react';
// style
import styled from '@emotion/styled';
import { useGetProdDetailApi } from '../../../../../../api/useEprocurementApi';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

const ProductDetailContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  position: relative;

  @media screen and (max-width: 600px) {
    padding: 2rem;
  }

  .product_detail {
    .detail_box {
      .product_info_detail {
        width: 100%;
        margin-top: 0;
        border-radius: 0;
        position: relative;
        flex-direction: column;
        z-index: 1;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        -moz-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        .product_name {
          font-size: var(--font-size-xx-large);
          font-weight: var(--font-w-semi);
          text-align: center;
        }
        .product_img {
          width: 100%;
          object-fit: contain;
          position: relative;
        }
        .detail_img {
          img {
            width: 100%;
          }
        }
      }
      .detail_info {
        background-color: #fff;
        padding: 4rem;
        position: relative;
        z-index: 1;
        .detail_section {
          margin-bottom: 6rem;
          .detail_title {
            text-align: center;
            font-size: var(--font-size-xx-large);
            font-weight: var(--font-w-semi);
            padding: 3rem 0;
            border-bottom: 1px solid var(--border-color-light);
          }
          .detail_content {
            display: flex;
            gap: 2rem 3rem;
            padding: 4rem 0;
            color: var(--font-color-sub);
            border-bottom: 1px solid var(--border-color-light);
            line-height: 1.2;
            @media screen and (max-width: 600px) {
              flex-direction: column;
            }
            .noti_content,
            .content_name {
              font-weight: var(--font-w-bold);
              font-size: var(--font-size-large);
              flex-grow: 1;
            }
            .content_name {
              min-width: 10rem;
              word-break: keep-all;
              flex-basis: 0;
            }
            .content_description {
              flex-basis: 60%;
              line-height: 1.5;
              flex-grow: 1;
              max-width: 75%;
              @media screen and (max-width: 600px) {
                max-width: 100%;
              }
              p + p {
                margin-top: 0.8em;
              }
              li {
                list-style: disc;
                line-height: 1.8;
                margin-left: 0.7em;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1280px) {
    width: 82%;
    min-width: 768px;
  }
`;

function ProductDetail({ productNo }: { productNo: string }) {
  const [whichMenu, setWhichMenu] = useState('세부상세정보');
  const { data: prodInfo } = useGetProdDetailApi(productNo);
  const prodInfoData = prodInfo && prodInfo.length > 0 ? prodInfo[0] : null;

  const detailRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const onClickLeftMenu = (menu: string) => {
    setWhichMenu(menu);
  };

  const onClickScrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  return (
    <ProductDetailContainer ref={containerRef}>
      <LeftNavigation>
        <button
          className={whichMenu === '세부상세정보' ? 'active' : ''}
          onClick={() => {
            onClickLeftMenu('세부상세정보');
            detailRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
        >
          세부상세정보
        </button>
        {whichMenu === '배송정보' && (
          <div
            style={{
              width: 1,
              height: 36,
              background: colors.bg.gray02,
            }}
          ></div>
        )}
        <button
          className={whichMenu === '고시정보' ? 'active' : ''}
          onClick={() => {
            onClickLeftMenu('고시정보');
            infoRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          style={{ marginLeft: 1 }}
        >
          고시정보
        </button>
        {whichMenu === '세부상세정보' && (
          <div
            style={{ width: 1, height: 36, background: colors.bg.gray02 }}
          ></div>
        )}
        <button
          className={whichMenu === '배송정보' ? 'active' : ''}
          onClick={() => {
            onClickLeftMenu('배송정보');
            deliveryRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          style={{ borderRight: 'none', marginLeft: 1 }}
        >
          배송정보
        </button>
      </LeftNavigation>
      {!prodInfoData && <div>정보가 없습니다</div>}
      {prodInfoData && (
        <div className="product_detail">
          <div className="detail_box">
            <div className="product_info product_info_detail" ref={detailRef}>
              {/* <h3 className="product_name">{prodInfoData.productName}</h3> */}
              <img
                className="product_img"
                src={prodInfoData.imgMain}
                alt={prodInfoData.productName}
              />
              <div
                className="detail_img"
                dangerouslySetInnerHTML={{ __html: prodInfoData.imgDetail }}
              ></div>
            </div>
            <div className="detail_info">
              <div
                className="detail_section"
                style={{ marginBottom: 0 }}
                ref={infoRef}
              >
                <h3 className="detail_title">상품고시정보</h3>
                <div
                  className="detail_content"
                  style={{ borderBottom: 'none', paddingBottom: 0 }}
                >
                  <div
                    className="noti_content"
                    dangerouslySetInnerHTML={{ __html: prodInfoData.notice }}
                  ></div>
                </div>
              </div>
              <div className="detail_section" ref={deliveryRef}>
                <h3 className="detail_title">배송 교환 반품</h3>
                <div className="detail_content">
                  <h4 className="content_name">배송안내</h4>
                  {prodInfoData.vendorShippingNotice01 &&
                  prodInfoData.vendorShippingNotice01.length > 0 ? (
                    <div
                      className="content_description"
                      dangerouslySetInnerHTML={{
                        __html: prodInfoData.vendorShippingNotice01,
                      }}
                    ></div>
                  ) : (
                    <div className="content_description">
                      <p>
                        주문하신 상품은 상품 종류 및 배송지역에 따라 직배송,
                        택배, 업체 직납등의 방식으로 진행됩니다. (단 일부
                        도서산간지역 및 인근에 체인점이 없는 경우는 택배로
                        발송되며 2~3일 정도 더 소요될 수 있습니다.)
                      </p>
                      <p>
                        배송 기간은 배송조건에 따라 당일에서 3일 가량
                        소요됩니다.
                      </p>
                      <p>
                        주문하신 금액이 30,000원의 배송료가 추가되며, 도서산간
                        지역은 항공료 혹은 도선료가 추가됩니다.
                      </p>
                      <p>서비스 상품군의 경우 배송료가 별도로 청구됩니다.</p>
                    </div>
                  )}
                </div>
                <div className="detail_content">
                  <h4 className="content_name">교환 및 반품 안내</h4>
                  {prodInfoData.vendorShippingNotice01 &&
                  prodInfoData.vendorShippingNotice02.length > 0 ? (
                    <div
                      className="content_description"
                      dangerouslySetInnerHTML={{
                        __html: prodInfoData.vendorShippingNotice02,
                      }}
                    ></div>
                  ) : (
                    <div className="content_description">
                      <p>
                        반품 신청은 &apos;포장처리&apos;, &apos;배송처리&apos;,
                        &apos;배송완료&apos; 상태에서만 가능합니다.
                      </p>
                      <p>
                        주문취소는 &apos;배송대기&apos; 상태에서만 가능합니다.
                      </p>
                      <p>
                        반품신청은 &apos;주문/배송조회&apos; 메뉴에서
                        가능합니다.
                      </p>
                    </div>
                  )}
                </div>

                <div className="detail_content">
                  <h4 className="content_name">반품접수시 유의사항</h4>
                  {prodInfoData.vendorShippingNotice03 &&
                  prodInfoData.vendorShippingNotice03.length > 0 ? (
                    <div
                      className="content_description"
                      dangerouslySetInnerHTML={{
                        __html: prodInfoData.vendorShippingNotice03,
                      }}
                    ></div>
                  ) : (
                    <div className="content_description">
                      <p>
                        반품 접수, 요청 시에는 주문자의 성명 또는 회사명,
                        주문번호를 정확히 명기하셔야 처리 가능합니다. (정보가
                        상이하거나 고객정보 미기재 경우 반품처리가 지연될 수
                        있습니다
                      </p>
                      <p>
                        프로모션 상품(증정품 및 상품권)이 증정된 경우 반품접수
                        된 상품과 함께 동봉하셔야 합니다.
                      </p>
                      <p>
                        반품을 요청하신 경우 반품사유에 따라 배송비를 고객님께서
                        부담하실 수 있습니다.
                      </p>
                    </div>
                  )}
                </div>

                <div className="detail_content">
                  <h4 className="content_name">교환 및 반품이 불가능한 경우</h4>
                  {prodInfoData.vendorShippingNotice04 &&
                  prodInfoData.vendorShippingNotice04.length > 0 ? (
                    <div
                      className="content_description"
                      dangerouslySetInnerHTML={{
                        __html: prodInfoData.vendorShippingNotice04,
                      }}
                    ></div>
                  ) : (
                    <div className="content_description">
                      <p>
                        상품 수령 후 개봉 및 사용흔적이 있거나 포장(케이스)
                        상태불량, 상품손상(훼손), 봉인라벨 제거
                        <li>
                          컴퓨터, 카메라 테크 및 보안기, 잉크&토너, 외장하드
                        </li>
                      </p>
                      <p>
                        유통기한 경과 상품
                        <li>식음료, 잉크&토너 등 유통기한 표기 상품</li>
                      </p>
                      <p>
                        상품 및 케이스에 송장(택배송장 등 스티커류)이 부착이
                        되어있는 경우(별도포장 후 발송)
                      </p>
                      <p>
                        그 외 반품처리 불가상품
                        <li>화이트보드, 제작상품</li>
                        <li>복사용지 및 색지류 등의 지류상품 및 폼보드류</li>
                        <li>시트지류 및 아스테이지</li>
                        <li>
                          고가의 필기류, 각인, 인쇄 및 주문제작 (회사 로고 인쇄
                          등) 사무용품
                        </li>
                        <li>주문 접수 시 반품불가 안내 상품</li>
                      </p>
                    </div>
                  )}
                </div>

                <div className="detail_content">
                  <h4 className="content_name">기타 교환 및 반품 관련 안내 </h4>
                  {prodInfoData.vendorShippingNotice05 &&
                  prodInfoData.vendorShippingNotice05.length > 0 ? (
                    <div
                      className="content_description"
                      dangerouslySetInnerHTML={{
                        __html: prodInfoData.vendorShippingNotice05,
                      }}
                    ></div>
                  ) : (
                    <div className="content_description">
                      <p>
                        색상, 사이즈 등 고객 변심 혹은 고객 과실로 인한 제품의
                        교환/ 반품을 원하시는 경우, 교환/반품에 소요되는
                        배송비는 고객이 부담합니다.
                      </p>
                      <p>
                        반품 사유에 적합하지 않은 경우 반품처리 불가하며, 반품된
                        상품이 고객님께 재반송 될 수 있음을 양해 부탁드립니다.
                      </p>
                      <p>
                        상품 불량 혹은 하자로 인한 교환/반품의 경우 당사에서
                        배송료를 부담합니다.
                      </p>
                      <p>
                        기타 교환/반품과 관련된 문의사항은 고객센터 혹은 1:1
                        문의를 이용하여 주시기 바랍니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef}></div>
      <FloatingBtn
        style={{
          bottom: 100,
        }}
      >
        <Icon
          width={50}
          height={50}
          iconName="floatingBtnUp"
          onPress={() => window.scrollTo(0, 0)}
        />
      </FloatingBtn>
      <FloatingBtn
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
      </FloatingBtn>
    </ProductDetailContainer>
  );
}

export default ProductDetail;

const LeftNavigation = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  background-color: white;
  position: sticky;
  top: var(--header-height);
  z-index: 50;

  button {
    width: 100%;
    height: 5rem;
    background-color: white;
    font-weight: var(--font-w-mid);
    font-size: var(--font-size-mid);
    color: #222;
    border-bottom: 1px solid ${colors.primary.basic};

    @media screen and (max-width: 768px) {
      border-width: 1px;
      &:first-child {
        margin-right: -0.5px;
      }
      &:last-child {
        margin: 0 -0.5px;
      }
      &:last-child {
        margin-left: -0.5px;
      }
    }
    &.active {
      border-bottom: 0;
      background-color: var(--primary-color);
    }
  }

  @media screen and (max-width: 1440px) {
    top: 80px;
    padding-right: 1rem;
  }

  @media screen and (max-width: 1280px) {
    padding-left: 20px;
    padding-right: 20px;

    button {
      border-bottom: 1px solid ${colors.primary.basic};
    }
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
    background-color: white;
    top: 50px;
  }
`;

const FloatingBtn = styled.div`
  position: fixed;
  right: 20px;
  background-color: #ffc74c;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
`;
