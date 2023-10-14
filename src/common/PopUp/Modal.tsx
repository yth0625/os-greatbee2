import React, { useEffect } from 'react';
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

const Modal = ({ children, confirm, title, hasNoClose = false }: IProps) => {
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
      <ModalBox onClick={(e) => e.stopPropagation()} title={title}>
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
          {!hasNoClose ? (
            <Close onClick={() => handleClick.close()}>
              <Icon iconName="close" />
            </Close>
          ) : null}
        </TitleBox>
        {children}
      </ModalBox>
    </Container>
  );
};

export default Modal;

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

const ModalBox = styled.div<{ title: string | undefined }>`
  padding: 20px 30px;
  background-color: white;
  border-radius: 10px;
  max-width: 95%;
  max-height: 95vh;
  overflow-y: scroll;

  @media screen and (max-width: 1280px) {
    padding: 20px 0;
  }
`;

const Close = styled.div`
  width: 24px;
  height: 24px;
  color: #999;
  font-size: 24px;
  font-weight: 600;
  z-index: 100;

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
