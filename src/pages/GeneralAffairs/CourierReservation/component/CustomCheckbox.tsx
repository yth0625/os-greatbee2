import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-components를 사용하여 커스텀 체크박스를 스타일링합니다.
const CustomCheckboxWrapper = styled.label`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
`;

const CustomCheckboxCircle = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 2px solid #000;
  background-color: #fff;
  border-radius: 50%; /* 원형 모양으로 변경 */
  margin-right: 10px;
  position: relative;

  &:after {
    content: '\u2713'; /* 체크 모양 아이콘 (유니코드) */
    font-size: 18px;
    position: absolute;
    top: 1px;
    left: 3px;
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

const CustomCheckbox = (props: any) => {
  const [isChecked, setIsChecked] = useState(false);
  let { label } = props;
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CustomCheckboxWrapper>
      <HiddenCheckbox checked={isChecked} onChange={toggleCheckbox} />
      <CustomCheckboxCircle checked={isChecked} readOnly />
      {label}
    </CustomCheckboxWrapper>
  );
};

export default CustomCheckbox;
