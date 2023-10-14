import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';
import Icon from 'styles/Icon';

type IProps = {
  children: JSX.Element;
  confirm?: () => void;
  title: string;
  hasNoClose?: boolean;
};

const DeliveryModal = ({
  children,
  confirm,
  title,
  hasNoClose = false,
}: IProps) => {
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
        <Header title={title}>
          <Title>{title}</Title>
          {!hasNoClose && (
            <Icon
              iconName="close"
              onPress={() => handleClick.close()}
              style={{ position: 'absolute', top: 14, right: 20, zIndex: 99 }}
              width={26}
              height={26}
            />
          )}
        </Header>
        {children}
      </ModalBox>
    </Container>
  );
};

export default DeliveryModal;

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
  min-width: 650px;
  max-width: 70vw;
  min-height: 583px;
  max-height: 95vh;
`;

const Title = styled.div`
  text-align: center;
  font-size: 21px;
  font-weight: 700;
  padding: 20px 10px;
`;

const Header = styled.div<{ title: string }>`
  height: ${(props) => (props.title === '' ? '24px' : '60px')};
  width: 100%;
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
