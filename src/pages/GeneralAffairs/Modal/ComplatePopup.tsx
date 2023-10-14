import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from 'redux/popUpReducer';

const ModalContentWrapper = styled.div`
  padding: 0 20px;
  width: 400px;
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
      <div className="flex flex-col text-center space-y-6 items-center">
        <span>퀵 서비스 예약이 취소되었습니다.</span>
        <span>취소 및 환불아내는 아래와 같습니다.</span>
        <div className="flex flex-col w-[295px] items-start w-full p-4 border border-solid border-[#F1F1F1] rounded-[8px]">
          <span className="text-[16px] color-[#565660] font-semibold">
            방문택배
          </span>
          <StyledList>
            <ListItem>
              <Bullet>•</Bullet> 마감전 취소시 즉시 환불
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet> 마감후 취소시 2일이내 환불
            </ListItem>
          </StyledList>
        </div>
        <span className="text-[14px]">
          퀵 서비스 예약 취소 후 물품 발송 시 운임환불이 불가합니다.
        </span>
        <PopupButton onClick={() => confirmModal()}>확인</PopupButton>
      </div>
    </ModalContentWrapper>
  );
};

export default ModalContent;
