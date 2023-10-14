import React from 'react';
import styled from '@emotion/styled';

import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/popUpReducer';
// import { TableTitle } from 'components/Typography';

type IProps = {
  children: JSX.Element;
  confirm?: () => void;
  title?: string;
};

const ConfirmModal = ({ children, confirm, title }: IProps) => {
  const dispatch = useDispatch();

  const handleClick = {
    confirm: () => {
      confirm && confirm();
      dispatch(closeModal());
    },
    close: () => {
      dispatch(closeModal());
    },
  };

  return (
    <Container onClick={() => handleClick.close()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: '30px',
          }}
        >
          {title && <div>{title}</div>}
        </div>
        {children}
        <ButtonContainer>
          <Button
            hasCircleIcon={false}
            onClick={() => handleClick.close()}
            outterStyles={{
              backgroundColor: 'white',
              borderColor: '#ddd',
            }}
            textStyles={{ color: 'black' }}
          >
            취소
          </Button>
          <Button hasCircleIcon={false} onClick={() => handleClick.confirm()}>
            확인
          </Button>
        </ButtonContainer>
      </ModalBox>
    </Container>
  );
};

export default ConfirmModal;

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
  padding: 30px 30px 20px 30px;
  background-color: white;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;
