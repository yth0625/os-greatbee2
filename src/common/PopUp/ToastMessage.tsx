import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type ToastMessageProps = {
  text: string | JSX.Element;
};

const ToastMessage = ({ text }: ToastMessageProps) => {
  return (
    <Container>
      <div className="popup_box">
        {text}
      </div>
    </Container>
  );
};

export default ToastMessage;

const hide = keyframes`
  0% {
    display: 1;
  } 50% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background: #00000070;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup_box {
    display: flex;
    position: absolute;
    bottom: 17px;

    width: 204px;
    
    flex-shrink: 0;

    padding: 15px;
    justify-content: center;

    border-radius: 16px;
    background: #FFF;

    color: #565660;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 140% */
    text-transform: capitalize;
  }

  animation: ${hide} 2.5s ease-in-out;
`;
