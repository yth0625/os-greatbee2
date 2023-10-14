import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Icon from 'styles/Icon';

export type Value = {
  value: number;
  label: string;
};

type Props = {
  outterStyle?: {};
  textStyle?: {};
  iconColor?: string;
  options: Value[];
  value: Value;
  setValue: (item: any) => void;
  props?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
};

/**
 * SelectBasic
 * @param outterStyle? 전체 스타일
 * @param textStyle? 텍스트 스타일
 * @param options 옵션
 * @param iconColor? 아이콘 스타일
 * @param value 선택된 값
 * @param setValue 선택된 값 변경 함수
 * @param props? 기타
 */
const SelectBasic = ({
  outterStyle,
  textStyle,
  iconColor,
  options,
  value,
  setValue,
  type,
  className,
  ...props
}: Props) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef(null);

  const openDropBox = (value: boolean) => {
    if (isSelectOpen) {
      // @ts-ignore
      selectRef.current && selectRef.current.blur();
    }
    setIsSelectOpen(value);
  };

  const selectElement = (e: any) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === e.target.value) {
        setValue(options[i]);
        break;
      }
    }
    openDropBox(false);
  };

  return (
    <SelectBox
      ref={selectRef}
      css={[outterStyle]}
      className={className}
      onClick={() => openDropBox(!isSelectOpen)}
      onBlur={() => setIsSelectOpen(false)}
      type={type ? type : 'button'}
      {...props}
    >
      <span css={[textStyle]} className="select_text">
        {value.label}
      </span>
      {isSelectOpen && (
        <ul>
          {options.map((item, i) => (
            <li
              key={i}
              value={item.value}
              className="select_option"
              onClick={selectElement}
              css={[textStyle]}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {isSelectOpen ? (
        <Icon
          width={22}
          height={22}
          iconName="arrowup"
          color={iconColor ? iconColor : colors.primary.basic}
          onPress={() => openDropBox(true)}
          style={{ position: 'absolute', top: 6, right: 12, paddingTop: 2 }}
        />
      ) : (
        <Icon
          width={22}
          height={22}
          iconName="arrowdown"
          color={iconColor ? iconColor : colors.primary.basic}
          onPress={() => openDropBox(false)}
          style={{ position: 'absolute', top: 6, right: 12, paddingTop: 2 }}
        />
      )}
    </SelectBox>
  );
};

export default SelectBasic;

const SelectBox = styled.button`
  text-align: left;
  margin: 0;
  padding: 0;
  position: relative;
  width: 160px;
  height: 48px;
  border: 1px solid ${colors.primary.basic};
  border-radius: 16px;
  background: ${colors.bg.white};
  color: ${colors.font.gray04};

  ul {
    background: ${colors.bg.white};
    border: 1px solid ${colors.border.basic};
    border-radius: 16px;
    margin-top: 4px;
    z-index: 99;
    position: relative;
    overflow: scroll;
    max-height: 230px;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox

    li {
      padding: 14px;
      min-width: 160px;
      &:hover {
        background: ${colors.bg.gray01};
        cursor: pointer;
      }
    }
  }

  .select_text {
    display: block;
    padding: 14px 16px;
    min-width: 160px;
    font-size: 16px;
    color: ${colors.font.gray02};
  }
`;
