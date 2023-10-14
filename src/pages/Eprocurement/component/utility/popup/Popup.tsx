// core
import { useState, useEffect, lazy, Suspense,  } from 'react'
// router
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
// style
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ScreenFilter from '../../style/ScreenFilter'

// component
import Loading from '../Loading';
import Icon from 'styles/Icon';
const Recommend = lazy(() => import('../../../BestProduct'));
const QNA = lazy(() => import('./qna/QNA'));

const PopupContainer = styled.section<{
  whichPopup: string | null;
  isQnA: boolean;
}>`
  z-index: 999;
  position: fixed;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 110rem;
  padding: var(--border-radius-large) 0; // 스크롤바 때문에 좌우 패딩은 여기서 안줌
  background-color: #fff;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  @media screen and (max-width: 480px) {
    top: auto;
    bottom: 0;
    left: 0;
    transform: translate(0, 0);
    width: 100%;
    height: 90%;
    max-height: 90rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .btn_close {
    z-index: 100;
    position: absolute;
    top: 26px;
    right: 38px;
    width: 3.2rem;
    height: 3.2rem;
    svg {
      width: 24px;
      height: 24px;
    }

    @media screen and (max-width: 1280px) {
      right: 20px;
    }
  }
  .popup_content {
    height: 100%;
    max-height: 80vh;
    overflow: hidden;
    scrollbar-color: #ccc transparent; /* firefox */
    ::-webkit-scrollbar {
      background: transparent;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0px;
    top: 50%;
    border-radius: ${(props) =>
      props.isQnA ? '0px' : 'var(--border-radius-large)'};

    .popup_content {
      max-height: 100vh;
    }

    .btn_close {
      display: ${(props) => (props.isQnA ? 'none' : 'block')};
    }
  }

  /* whichPopup에 따라 추가로 스타일 커스텀 */
  ${(props) => {
    if (props.whichPopup === 'recommend') {
      return `${TitleFixedStyle} ${RecommendPopupStyle}`;
    } else if (props.whichPopup === 'confirm-delivery') {
      return `${ConfirmDeliveryPopupStyle}`;
    }
  }}
`;
const ConfirmDeliveryPopupStyle = css`
  .popup_content {
    overflow-y: hidden;
  }
`;

const TitleFixedStyle = css`
  // c_section_title 상단 고정 스타일
  padding-top: calc(4rem + 3.2rem);
  .c_section_title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(4rem + 3.2rem);
    padding: 0;
    background-color: #fff;
  }
`;
const RecommendPopupStyle = css`
  // recommendPopup 스타일
  max-width: 50rem;
  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
  .popup_content {
    .c_section_title {
      padding-left: 2.5rem;
      @media screen and (max-width: 480px) {
        padding-left: 2rem;
      }
    }
  }
`;

export function useOpenPopup() {
  // url searchParams로 popup 열기
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  return function (params = {}, option = {}) {
    // 뒤로가기로 modal창 닫기 위해 url search값 사용

    setSearchParams(params, {
      ...option,
      // @ts-ignore
      state: { ...option?.state, prevPath: location.pathname },
    });
  };
}

function Popup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const whichPopup = searchParams.get('popup');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // url search값 중 popup으로 팝업 열기
    if (whichPopup) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
    }
  }, [location, whichPopup]);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('c_overflow_hidden');
    } else {
      document.body.classList.remove('c_overflow_hidden');
    }
  }, [isPopupOpen]);

  function closePopup() {
    // 뒤로가기로 modal창 닫기
    if (location.state?.prevPath === location.pathname) {
      navigate(-1);
    } else {
      navigate(`${location.pathname}`, { replace: true });
    }
  }

  return (
    <>
      {isPopupOpen && <ScreenFilter zIndex={999} filterColor=""></ScreenFilter>}
      {isPopupOpen && (
        <PopupContainer
          className="popup_container"
          whichPopup={whichPopup}
          isQnA={searchParams.get('popup') === 'qna'}
        >
          <button className="btn_close" onClick={closePopup}>
            <Icon iconName="close" />
          </button>
          <div className="popup_content">
            <Suspense fallback={<Loading type="dot" />}>
              {whichPopup === 'recommend' && (
                <>
                  <h2 className="c_section_title">
                    <Icon iconName="recommend" />
                    추천 상품
                  </h2>
                  <Recommend />
                </>
              )}
              {/* {whichPopup === 'product-info' && <ProductInfo />} */}
              {/* {whichPopup === 'product-detail' && <ProductDetail />} */}
              {/*{whichPopup === 'qna' && <QNABoard />}*/}
              {/*{whichPopup === 'qna-detail' && <QNADetail />}*/}
              {whichPopup === 'inquiry' && <QNA />}
              {/* {whichPopup === 'inquiry-order' && <CancelOrder />} */}
            </Suspense>
          </div>
        </PopupContainer>
      )}
    </>
  );
}

export default Popup;
