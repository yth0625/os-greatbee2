import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import { closeModal, openAlert } from 'redux/popUpReducer';
import ComplateModal from 'pages/GeneralAffairs/Modal/ComplatePopup';

const ModalContentWrapper = styled.div`
  padding: 0 20px;
`;

const PopupButton = styled.button`
  width: 135px;
  height: 48px;
  background-color: #ffc73c;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 24px;
`;

const ModalContent = ({ receiver }: { receiver: string }) => {
  const dispatch = useDispatch();

  const openComplateModal = () => {
    dispatch(closeModal());
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <ComplateModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
      }),
    );
  };

  return (
    <ModalContentWrapper>
      <div className="flex flex-col text-center space-y-6 items-center">
        <span>선택한 퀵서비스 (수신자 : {receiver})의 예약을</span>
        <span>취소하시겠어요?</span>
        <PopupButton onClick={() => openComplateModal()}>확인</PopupButton>
      </div>
    </ModalContentWrapper>
  );
};

export default ModalContent;
