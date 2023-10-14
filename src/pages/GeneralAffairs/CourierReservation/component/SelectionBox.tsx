import styled from '@emotion/styled';
import React, { useState } from 'react';
import Icon from 'styles/Icon';

function NumberCounter(props: any) {
  const [number, setNumber] = useState(0);

  const increaseNumber = () => {
    setNumber(number + 1);
  };

  const decreaseNumber = () => {
    setNumber(number - 1);
  };

  return (
    <SelectionBoxSize>
      <Icon width={64} height={64} iconName="checkone" />
      <ContentWrap>
        <span>{props.title}</span>
        <hr className="border-t border-solid border-[#D1D1D1] my-[16px]" />
        <span
          className="leading-10"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></span>
      </ContentWrap>
      <CountWrap>
        <CountBtn onClick={decreaseNumber}>-</CountBtn>
        <span className="w-[64px] text-center">{number}</span>
        <CountBtn onClick={increaseNumber}>+</CountBtn>
      </CountWrap>
    </SelectionBoxSize>
  );
}

const ContentWrap = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  padding: 0 40px;
  @media screen and (max-width: 1536px) {
    padding: 0 16px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const CountWrap = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-items: center;
  margin-left: auto;
  margin-right: 70px;
  @media screen and (max-width: 1536px) {
    font-size: 16px;
    margin-right: 30px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const CountBtn = styled.button`
  display: flex;
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e5e5e5;
  background: #eee;
  @media screen and (max-width: 1536px) {
    width: 28px;
    height: 28px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const SelectionBoxSize = styled.div`
  display: flex;
  width: 825px;
  align-items: center;
  border-radius: 8px;
  border: 2px solid rgba(144, 144, 144, 0.7);
  background: #fff;
  padding: 24px;
  color: #6d6d6d;

  @media screen and (max-width: 1536px) {
    width: 560px;
    font-size: 14px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

export default NumberCounter;
