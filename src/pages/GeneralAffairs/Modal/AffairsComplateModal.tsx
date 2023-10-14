import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, openAlert } from 'redux/popUpReducer';

import Icon from 'styles/Icon';
import AffairsLabelViewModal from 'pages/GeneralAffairs/Modal/AffairsLabelViewModal';

const ModalContentWrapper = styled.div`
  width: 1132px;
  padding: 0 45px;
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
    color: #fff;
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
          content: <AffairsLabelViewModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
        hasNoClose: true,
      }),
    );
  };

  return (
    <ModalContentWrapper>
      <div>
        <div className="flex flex-col justify-center items-center">
          <Icon iconName="checkone_active" width={150} height={150} />
          <span className="text-[28px]">택배 예약이 완료되었습니다.</span>
        </div>
      </div>
      <div className="flex flex-col my-[42px] space-y-5">
        <span>
          예약번호는 <b className="font-semibold">123456789662</b> 입니다
        </span>
        <span>
          택배 배송 및 집하에 관련된 문의는{' '}
          <b className="font-semibold">CJ대한통운 1234-5678</b> 로 문의하여
          주시기 바랍니다.
        </span>
      </div>
      <div className="">
        <div className="my-[25px]">
          <span className="text-[18px] font-semibold">
            물품정보 라벨지 출력안내
          </span>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Icon iconName="checkone_active" width={30} height={30} />
            <span>
              물품정보 라벨 출력하기를 하면, 예약하신 물품정보가 A4용지 당 6개의
              라벨로 출력됩니다.
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Icon iconName="checkone_active" width={30} height={30} />
            <span>
              본 출력서비스는 택배기사의 정확한 수거업무를 지원하기 위한
              목적으로 제공되며,
              <br />
              출력물을 보내실 택배박스에 부착해 놓으시면 안전한 수거에 도움이
              됩니다.
            </span>
          </div>
          <div className="ml-[40px]">
            <span className="text-[#F00] text-[12px]">( 필수사항 아님)</span>
          </div>
          <div className="flex items-center space-x-4">
            <Icon iconName="checkone_active" width={30} height={30} />
            <span>예약확인페이지에서도 라벨출력이 가능합니다.</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-[30px] space-x-8">
        <PopupButton className="cancel" onClick={() => cancelModal()}>
          물품정보 라벨 출력하기
        </PopupButton>
        <PopupButton className="confirm" onClick={() => openComplateModal()}>
          A4 라벨지 구매하기
        </PopupButton>
      </div>
    </ModalContentWrapper>
  );
};

export default AffairsPaymentModal;
