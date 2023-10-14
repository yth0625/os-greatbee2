import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from 'redux/popUpReducer';

const ModalContentWrapper = styled.div`
  padding: 0 20px;

  @media screen and (max-width: 1920px) {
    width: 595px;
    height: 842px;
  }

  @media screen and (max-width: 1536px) {
    width: 595px;
    height: 680px;
  }

  @media screen and (max-width: 1280px) {
    width: 595px;
    height: 550px;
  }
`;

const PopupButton = styled.button`
  width: 125px;
  height: 40px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  color: black;
  border: 1px solid var(--main, #ffc73c);
  font-size: 14px;
  font-weight: 600;
`;

const ConfirmButton = styled.button`
  width: 125px;
  height: 40px;
  border-radius: 12px;
  background-color: #ffc73c;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

const StyledList = styled.ul`
  text-align: start;
  margin-top: 1em;
  margin-left: 0.5em;
`;
const ListItem = styled.li`
  margin-bottom: 1em;
`;
const Bullet = styled.span`
  margin-right: 0.25rem;
`;

const ModalContent = () => {
  const dispatch = useDispatch();

  const confirmModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalContentWrapper>
      <div className="flex flex-col h-full text-center space-y-6 items-center">
        <img src="/images/StatementSampleImage.png"></img>
        <div className="!mt-auto space-x-4">
          <PopupButton onClick={() => confirmModal()}>다운로드</PopupButton>
          <PopupButton onClick={() => confirmModal()}>출력</PopupButton>
          <ConfirmButton onClick={() => confirmModal()}>확인</ConfirmButton>
        </div>
      </div>
    </ModalContentWrapper>
  );
};

export default ModalContent;
