import React from 'react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/popUpReducer';
import Icon from 'styles/Icon';

type IProps = {
  children: JSX.Element;
  confirm?: () => void;
  title?: string;
  hasNoClose?: boolean;
};

const ApprovalLineModal = ({ children, confirm, title }: IProps) => {
  const dispatch = useDispatch();

  const handleClick = {
    confirm: () => {
      confirm && confirm();
    },
    close: () => {
      dispatch(closeModal());
    },
  };

  return (
    <Container onClick={() => handleClick.close()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <TitleBox>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
          >
            {title && <Title>{title}</Title>}
          </div>
          <Close onClick={() => handleClick.close()}>
            <Icon iconName="close" />
          </Close>
        </TitleBox>
        {children}
      </ModalBox>
    </Container>
  );
};

export default ApprovalLineModal;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000070;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background-color: white;
  border-radius: 16px;
`;

const Close = styled.div`
  width: 24px;
  height: 24px;
  color: #999;
  font-size: 24px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  margin-top: 7px;
`;
