import React from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import { keyframes } from '@emotion/react';

type WishPopUpProps = {
  text: string | JSX.Element;
};

const WishListPopup = ({ text }: WishPopUpProps) => {
  return (
    <Container>
      <div className="popup_box">
        <Icon iconName="heartfill" width={78} height={65} />
        {text}
      </div>
    </Container>
  );
};

export default WishListPopup;

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
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup_box {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 1px solid ${colors.primary.basic};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
  }

  span {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.4;
  }

  animation: ${hide} 2.5s ease-in-out;
`;
