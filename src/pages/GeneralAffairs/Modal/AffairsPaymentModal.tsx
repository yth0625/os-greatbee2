import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, openAlert } from 'redux/popUpReducer';
import CustomCheckbox from '../CourierReservation/component/CustomCheckbox';

import AffairsComplateModal from 'pages/GeneralAffairs/Modal/AffairsComplateModal';

import { Divider } from 'common';

const ModalContentWrapper = styled.div`
  width: 737px;
  @media screen and (max-width: 1536px) {
    width: 666px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const PopupButton = styled.button`
  width: 215px;
  height: 62px;

  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 16px;

  &.cancel {
    border: 2px solid #ffc73c;
  }
  &.confirm {
    background-color: #ffc73c;
  }
`;

const AffairsPaymentModal = () => {
  const dispatch = useDispatch();

  const cancelModal = () => {
    dispatch(closeModal());
  };

  const openComplateModal = () => {
    dispatch(closeModal());
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <AffairsComplateModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
        hasNoClose: true,
      }),
    );
  };

  return (
    <ModalContentWrapper>
      <div className="flex flex-col items-center justify-center px-[32px] py-[8px] my-[65px] rounded-[8px] border border-solid border-[#ADADAD] h-[195px] space-y-5">
        <div className="flex justify-between w-full">
          <span>소형박스</span>
          <span>4,500원</span>
        </div>
        <div className="flex justify-between w-full">
          <span>소형박스</span>
          <span>4,500원</span>
        </div>
        <Divider />
        <div className="flex justify-between w-full">
          <span>총 결제예정 금액</span>
          <span>4,490원</span>
        </div>
      </div>
      <div>
        <div>
          <span className="text-[28px] font-medium">결제수단 선택하기</span>
        </div>
        <div className="flex justify-center my-[64px] border border-solid border-[#D1D1D1] px-[56px] py-[48px] rounded-[8px] bg-[#F1F1F1]">
          <CustomCheckbox label="신용카드" />
          <CustomCheckbox label="무통장 입금" />
          <CustomCheckbox label="세금계산서" />
        </div>
      </div>
      <div>
        <span className="text-[#F00] text-[16px]">
          크롬 일부 사용자 중 결제 오류가 발생되는 경우가 있습니다. 오류가
          발생되는 사용자는 불편하시겠지만 다른 인터넷 브라우저 (ex. Microsoft
          Edge, 네이버 웨일 등)를 이용해 주시기 바랍니다.{' '}
        </span>
      </div>
      <div className="flex justify-center my-[60px] space-x-8">
        <PopupButton className="cancel" onClick={() => cancelModal()}>
          취소
        </PopupButton>
        <PopupButton className="confirm" onClick={() => openComplateModal()}>
          확인
        </PopupButton>
      </div>
    </ModalContentWrapper>
  );
};

export default AffairsPaymentModal;
