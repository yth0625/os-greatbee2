import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeAlert, openAlert } from '../../redux/popUpReducer';
import colors from 'styles/colors';
import * as buffer from 'buffer';

type IProps = {
  children: JSX.Element;
  confirm?: () => void;
  hasConfirm?: boolean;
  onClick?: () => void;
  cancelFn?: () => void;
  cancelText?: string;
  confirmText?: string;
};

const AlertBacis = ({
  children,
  confirm,
  hasConfirm,
  onClick,
  cancelFn,
  cancelText = '취소',
  confirmText = '확인',
}: IProps) => {
  const dispatch = useDispatch();

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = {
    confirm: () => {
      confirm && confirm();
    },
    close: () => {
      cancelFn && cancelFn();
      dispatch(closeAlert());
    },
  };

  const restrictClickEvent = (e: any) => {
    e.preventDefault();
  };


  useEffect(() => {
    if (buttonRef.current) buttonRef.current.focus()

    const container = document.getElementById('restrict_click');
    container?.addEventListener('contextmenu', (e) => restrictClickEvent(e));

    return () => {
      container?.removeEventListener('contextmenu', (e) =>
        restrictClickEvent(e),
      );
    };

  }, [])


  return (
    <Container id="restrict_click">
      <AlertBox onClick={(e) => e.stopPropagation()}>
        {children}
        {hasConfirm ? (
          <ButtonContainer>
            <Button
              onClick={() => {
                cancelFn && cancelFn();
                handleClick.close();
              }}
              outterStyles={{
                backgroundColor: 'white',
                borderColor: 'var(--primary-color)',
                paddingLeft: 40,
                paddingRight: 40,
                minWidth: confirmText === '장바구니로' ? 174 : 120,
              }}
              textStyles={{ color: 'black', fontWeight: 400 }}
            >
              {cancelText}
            </Button>
            <Button
              outterStyles={{
                backgroundColor: 'var(--primary-color)',
                borderColor: 'var(--primary-color)',
                paddingLeft: 40,
                paddingRight: 40,
                marginLeft: 10,
                minWidth: confirmText === '장바구니로' ? 174 : 120,
              }}
              textStyles={{ color: 'black', fontWeight: 400 }}
              onClick={() => handleClick.confirm()}
            >
              {confirmText}
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
              ref={buttonRef}
              onClick={() => {
                onClick && onClick();
                handleClick.close();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onClick && onClick();
                  handleClick.close();
                }
              }}
              outterStyles={{ backgroundColor: 'white', borderColor: '#ddd' }}
              textStyles={{ color: 'black' }}
            >
              확인
            </Button>
          </ButtonContainer>
        )}
      </AlertBox>
    </Container>
  );
};

export default AlertBacis;

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
  z-index: 1001;
`;

const AlertBox = styled.div`
  padding: 40px 30px 30px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid ${colors.primary.basic};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;
