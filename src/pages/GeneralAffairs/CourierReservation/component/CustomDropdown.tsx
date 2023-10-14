import styled from '@emotion/styled';
import React, { useState } from 'react';
interface CustomProps {
  label: string;
  optionsString: string[];
}

function CustomDropdown({ label, optionsString }: CustomProps) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴 열림/닫힘 상태
  const [selectedValue, setSelectedValue] = useState(''); // 선택한 값을 저장할 상태
  const options = optionsString;

  const handleOptionClick = (option: any) => {
    setSelectedValue(option);
    setIsOpen(false); // 옵션을 선택하면 드롭다운 메뉴를 닫습니다.
  };

  return (
    <Inputbox>
      <div
        className={`flex justify-between ${
          isOpen ? 'open' : ''
        } w-full h-full flex items-center px-6`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || label}</span>
        <InputText>∨</InputText>
      </div>
      <div className="relative">
        {isOpen && (
          <UlElement className="absolute left-0 top-0 border border-solid border-[#ADADAD] w-full bg-[#fff] z-50">
            {options.map((option, index) => (
              <LiElement
                className=" hover:bg-[#FFC73C]"
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                <span className="flex items-center border-t border-solid border-[#ADADAD] h-full w-full mx-6">
                  {option}
                </span>
              </LiElement>
            ))}
          </UlElement>
        )}
      </div>
    </Inputbox>
  );
}

const InputText = styled.span`
  font-size: 20px;
  line-height: 23px;
  color: #6d6d6d;
`;
const UlElement = styled.ul`
  li:first-of-type span {
    border-top: 0px !important;
  }
`;

const LiElement = styled.li`
  display: flex;
  height: 38px;
  align-items: center;
`;

const Inputbox = styled.div`
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: 1px solid #adadad;
  margin: 10px 0;
`;

export default CustomDropdown;
