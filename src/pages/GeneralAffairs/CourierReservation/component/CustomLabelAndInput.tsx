import styled from '@emotion/styled';
import React, { useState } from 'react';
import Icon from 'styles/Icon';

function NumberCounter(props: any) {
  let { label, content, type } = props;

  if (type == 'textarea') {
    return (
      <div className={'flex justify-center items-start pt-4'}>
        <LabelText className="pl-4">{label}</LabelText>
        <InputWrap>
          <InputTextArea
            className="w-full border border-solid border-[#ADADAD] rounded-[8px] p-[10px] h-[120px]"
            value={content}
          ></InputTextArea>
        </InputWrap>
      </div>
    );
  } else {
    return (
      <div className={'flex justify-center items-center '}>
        <LabelText className="pl-4">{label}</LabelText>
        <InputWrap>
          <InputText
            type="text"
            className="w-full border border-solid border-[#ADADAD] !rounded-[8px] p-[10px]"
            value={content}
          />
        </InputWrap>
      </div>
    );
  }
}

export default NumberCounter;

const LabelText = styled.span`
  width: 10%;
  @media screen and (max-width: 1536px) {
    width: 20%;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const InputWrap = styled.div`
  width: 90%;
  @media screen and (max-width: 1536px) {
    width: 80%;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const InputText = styled.input`
  @media screen and (max-width: 1536px) {
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const InputTextArea = styled.textarea`
  @media screen and (max-width: 1536px) {
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;
