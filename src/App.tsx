import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

// component - layout
import GlobalSidebar from 'common/layout/GlobalSidebar'; // 사이드바
import GlobalHeader from 'common/layout/GlobalHeader'; // 헤더
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Modal from 'common/PopUp/Modal';
import ConfirmModal from 'common/PopUp/ConfirmModal';
import AlertBacis from 'common/PopUp/Alert';
import { RootState } from 'redux/store';
import Popup from 'pages/Eprocurement/component/utility/popup/Popup';
import Footer from './common/Footer';
import {
  useGetAgreeInfoApi,
  useUpdateAgreeInfoApi,
} from './api/useEprocurementApi';
import ScrollToTop from 'hooks/ScrollToTop';
import { ModalType } from 'redux/popUpReducer';
import WishListPopup from 'common/PopUp/WishListPopup';
import DeliveryModal from 'common/PopUp/DeilveryModal';
import ToastMessage from 'common/PopUp/ToastMessage';

const AppContainer = styled.div`
  padding-left: var(--sidebar-width);
  background-color: var(--base-color-light);
  width: 100%;
  height: 100%;

  > main {
    height: 100%;
    position: relative;
  }

  @media screen and (max-width: 768px) {
    background-color: #fff;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000070;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  .info__text {
    padding: 64px 74px 42px 74px;
    background-color: #fff;
    border-radius: 1rem;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 2;
    color: #484848;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    .info__text {
      width: 504px;
      height: 230px;
      padding: 40px;
      font-size: 16px;
    }
  }
`;

const AgreeBox = styled.div`
  padding: 0 20px;
  height: 48px;
  margin-top: 54px;
  width: 60%;
  background: var(--primary-color);
  font-weight: 500;
  color: #000;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;

  input[type='checkbox'] {
    margin-left: 10px;
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
  }
  div {
    margin-left: 20px;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 65%;
    padding: 12px 24px;
    margin-top: 28px;
    div {
      font-size: 16px;
    }
  }
`;

const InfoAlert = ({ refetch }: any) => {
  const { mutateAsync: updateAgreeInfo, isLoading: isUpadingAgreeInfoLoading } =
    useUpdateAgreeInfoApi();

  return (
    <InfoContainer>
      <div className="info__text">
        본 사이트에서 판매하는 상품은 기업 전용(B2B) 상품으로 <br />
        구매 후 일반 소비자(B2C)에 재판매하는 행위를 일체 금지합니다.
        <br />
        이로 인해 민·형사상 책임이 발생할 수 있습니다.
        <br />
        <AgreeBox>
          <input
            type="checkbox"
            onChange={async () => {
              await updateAgreeInfo();
              refetch();
            }}
            disabled={isUpadingAgreeInfoLoading}
          />
          <div>내용을 읽고 이에 동의합니다.</div>
        </AgreeBox>
      </div>
    </InfoContainer>
  );
};

function App() {
  const { alert, modal, wishpopup, toastMessage } = useSelector(
    (state: RootState) => state.popup,
  );
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: agreeInfoData,
    isLoading: isAgreeInfoLoading,
    refetch: refetchAgreeInfo,
  } = useGetAgreeInfoApi();

  const renderModal = (modal: ModalType) => {
    switch (modal.hasConfirm) {
      case '예':
        return (
          <ConfirmModal
            confirm={modal.confirmFunc}
            title={modal.modalMessage && modal.modalMessage.title}
          >
            {modal.modalMessage.content}
          </ConfirmModal>
        );
      case '아니오':
        return (
          <Modal
            confirm={modal.confirmFunc}
            title={modal.modalMessage && modal.modalMessage.title}
            hasNoClose={modal.hasNoClose}
          >
            {modal.modalMessage.content}
          </Modal>
        );
      case '헤더':
        return (
          <DeliveryModal
            confirm={modal.confirmFunc}
            title={modal.modalMessage.title}
            hasNoClose={modal.hasNoClose}
          >
            {modal.modalMessage.content}
          </DeliveryModal>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      location.pathname === '/admin' ||
      location.pathname.startsWith('/workflow')
    ) {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <AppContainer>
        <GlobalSidebar />
        <main>
          <ScrollToTop />
          <GlobalHeader isAdminPage={isAdminPage} />
          <Outlet />
          {/* <Footer /> */}
        </main>
      </AppContainer>
      {alert.isOpenAlert && (
        <AlertBacis
          hasConfirm={alert.hasConfirm}
          confirm={alert.confirmFunc}
          onClick={alert.onClick}
          cancelFn={alert.cancelFn}
          cancelText={alert.cancelText}
          confirmText={alert.confirmText}
        >
          <span>{alert.alertMessage}</span>
        </AlertBacis>
      )}
      {modal.list.length > 0 && renderModal(modal.list[modal.list.length - 1])}
      <Popup />
      {agreeInfoData === 0 && <InfoAlert refetch={() => refetchAgreeInfo()} />}
      {wishpopup.isOpenWishPopup && <WishListPopup text={wishpopup.text} />}
      {toastMessage.isOpenToastMessage && <ToastMessage text={toastMessage.text} />}
    </>
  );
}

export default App;
