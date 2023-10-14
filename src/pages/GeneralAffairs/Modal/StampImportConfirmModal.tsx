import React from 'react';
import { useDispatch } from 'react-redux';
import { openToastMessage,  closeToastMessage, closeModal } from 'redux/popUpReducer';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

type StampImportModalProps = {
  onClose: () => void;
  onModalClose: () => void;
};

const StampImportConfirmModal: React.FC<StampImportModalProps> = ({
  onClose,
  onModalClose,
}) => {
  const dispatch = useDispatch();

  const openConfirmed = () => {
        dispatch(
            openToastMessage({
                text: '신청 되었습니다.',
            }),
        );
    onClose();
    onModalClose()
        setTimeout(() => {
            dispatch(closeToastMessage());
        }, 2500);

  }

  return (
    <Container>
      <ModalWrapper>
        <Header>
          <button onClick={onClose}>
            <img src="/src/pages/GeneralAffairs/asset/cancel.svg" alt="" />
          </button>
        </Header>
        <ModalBox>
          <span>법인인감증명서도</span>
          <span>추가 신청하시겠어요?</span>
        </ModalBox>
          
        <BtnWrapper>
          <button>아니요</button>
          <button onClick={openConfirmed}>예</button>
        </BtnWrapper>
      </ModalWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${tw`fixed top-0 left-0 z-[10001] flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
`;

const ModalWrapper = styled.div`
  ${tw`flex flex-col items-center bg-white rounded-lg text-[18px]`}
  justify-content: flex-start;
  width: 394px;
  height: 224px;
  padding: 14px 18px 25px 18px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ModalBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: #565660;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
  }
`

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;

  button:nth-child(1){
    width: 134px;
    height: 56px;
    border-radius: 16px;
    border: 2px solid #FFC73C;
    color: #232323;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-right: 11px;
  }

  button:nth-child(2){
    width: 135px;
    height: 56px;
    border-radius: 16px;
    background: #FFC73C;
    color: #232323;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`

export default StampImportConfirmModal;
