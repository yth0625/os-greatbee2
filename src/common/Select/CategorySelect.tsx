import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Icon from 'styles/Icon';
import { useSearchParams } from 'react-router-dom';

type Value = {
  value: number;
  label: string;
};

type Props = {
  outterStyle?: {};
  textStyle?: {};
  iconColor?: string;
  firstOptions: Value[];
  secondOptions: Value[];
  thirdOptions: Value[];
  firstValue: Value;
  setFirstValue: (item: any) => void;
  secondValue: Value;
  setSecondValue: (item: any) => void;
  thirdValue: Value;
  setThirdValue: (item: any) => void;
  sortOrder: string;
  viewType: string;
  updateProductListWithCategory1: (category: number) => void;
  updateProductListWithCategory2: (category: number) => void;
  updateProductListWithCategory3: (category: number) => void;
  props?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

/**
 * CategorySelect
 * @param outterStyle? 전체 스타일
 * @param textStyle? 텍스트 스타일
 * @param options 옵션
 * @param iconColor? 아이콘 스타일
 * @param secondOptions
 * @param thirdOptions
 * @param secondValue
 * @param setSecondValue
 * @param thirdValue
 * @param setThirdValue
 * @param type
 * @param props? 기타
 */
const CategorySelect = ({
  outterStyle,
  textStyle,
  iconColor,
  firstOptions,
  secondOptions,
  thirdOptions,
  firstValue,
  setFirstValue,
  secondValue,
  setSecondValue,
  thirdValue,
  setThirdValue,
  sortOrder,
  viewType,
  type,
  updateProductListWithCategory1,
  updateProductListWithCategory2,
  updateProductListWithCategory3,
  ...props
}: Props) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [openSecondValue, setOpenSecondValue] = useState<boolean>(false);
  const [openThirdValue, setOpenThirdValue] = useState<boolean>(false);
  const selectRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const openDropBox = (value: boolean) => {
    if (isSelectOpen) {
      // @ts-ignore
      selectRef.current && selectRef.current.blur();
      setOpenSecondValue(false);
      setOpenThirdValue(false);
    }
    setIsSelectOpen(value);
  };

  const selectElement = (e: any, idx: number) => {
    if (idx === 1) {
      for (let i = 0; i < firstOptions.length; i++) {
        if (firstOptions[i].value === e.target.value) {
          setFirstValue(firstOptions[i]);
          break;
        }
      }
    } else if (idx === 2) {
      for (let i = 0; i < secondOptions.length; i++) {
        if (secondOptions[i].value === e.target.value) {
          setSecondValue(secondOptions[i]);
          break;
        }
      }
    } else if (idx === 3) {
      for (let i = 0; i < thirdOptions.length; i++) {
        if (thirdOptions[i].value === e.target.value) {
          setThirdValue(thirdOptions[i]);
          break;
        }
      }
    }
  };

  return (
    <Container>
      <SelectBox
        ref={selectRef}
        css={[outterStyle]}
        onClick={() => openDropBox(!isSelectOpen)}
        onBlur={() => setIsSelectOpen(false)}
        type={type ? type : 'button'}
        {...props}
      >
        <span css={[textStyle]} className="select_text">
          카테고리
        </span>
        {isSelectOpen ? (
          <Icon
            width={28}
            height={28}
            iconName="arrowup"
            color={iconColor ? iconColor : colors.primary.basic}
            onPress={() => openDropBox(true)}
            style={{ position: 'absolute', top: 3, right: 12, paddingTop: 2 }}
          />
        ) : (
          <Icon
            width={28}
            height={28}
            iconName="arrowdown"
            color={iconColor ? iconColor : colors.primary.basic}
            onPress={() => openDropBox(false)}
            style={{ position: 'absolute', top: 3, right: 12, paddingTop: 4 }}
          />
        )}
      </SelectBox>
      {isSelectOpen && (
        <CategoryContainer>
          <ul>
            {firstOptions.map((item, i) => (
              <ListItem
                isSelected={item.value === firstValue.value}
                onMouseOver={(e) => {
                  selectElement(e, 1);
                  setOpenSecondValue(true);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  updateProductListWithCategory1(item.value)
                }}
                key={i}
                value={item.value}
                className="select_option"
                css={[textStyle]}
              >
                {item.label}
                {firstValue.value !== 1 && item.value === firstValue.value && (
                  <Icon iconName="triRight" />
                )}
              </ListItem>
            ))}
          </ul>
          {firstValue.value !== 1 && openSecondValue && <Divider />}
          {firstValue.value !== 1 && openSecondValue && (
            <ul style={{ borderLeft: 5, borderLeftColor: '#D9D9D9' }}>
              {secondOptions.map((item, i) => (
                <ListItem
                  key={i}
                  isSelected={item.value === secondValue.value}
                  onMouseOver={(e) => {
                    selectElement(e, 2);
                    setOpenThirdValue(true);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    updateProductListWithCategory2(item.value)
                  }}
                  value={item.value}
                  className="select_option"
                  css={[textStyle]}
                >
                  {item.label}
                  {secondValue.value !== 0 &&
                    item.value === secondValue.value && (
                      <Icon iconName="triRight" />
                    )}
                </ListItem>
              ))}
            </ul>
          )}
          {secondValue.value !== 0 && openThirdValue && <Divider />}
          {secondValue.value !== 0 && openThirdValue && (
            <ul>
              {thirdOptions.map((item, i) => (
                <ListItem
                  key={i}
                  isSelected={item.value === thirdValue.value}
                  value={item.value}
                  className="select_option"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    updateProductListWithCategory3(item.value)

                    setOpenSecondValue(false);
                    setOpenThirdValue(false);
                  }}
                  css={[textStyle]}
                >
                  {item.label}
                </ListItem>
              ))}
            </ul>
          )}
        </CategoryContainer>
      )}
    </Container>
  );
};

export default CategorySelect;

const SelectBox = styled.button`
  text-align: left;
  margin: 0;
  padding: 0;
  position: relative;
  min-width: 160px;
  height: 44px;
  border: 1px solid ${colors.primary.basic};
  border-radius: 10px;
  color: ${colors.font.gray04};

  .select_text {
    display: block;
    margin: 12px 50px 12px 14px;
    padding: 1px;
    font-size: 1.5rem;
    min-width: 160px;
  }
`;

const CategoryContainer = styled.ul`
  position: absolute;
  left: 4px;
  min-width: 160px;
  display: flex;
  flex-direction: row;
  padding: 16px;
  background: ${colors.bg.white};
  border: 1px solid ${colors.primary.basic};
  border-radius: 10px;
  z-index: 99;
  ul {
    background: ${colors.bg.white};
    position: relative;
    overflow: scroll;
    min-width: 160px;
    max-height: 722px;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
  }
`;

const Container = styled.div`
  position: relative;
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  padding: 14px;
  min-width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  background: ${(props) => (props.isSelected ? '#ffc74c21' : 'white')};
  &:hover {
    background: #ffc74c21;
    cursor: pointer;
  }
`;

const Divider = styled.div`
  max-height: 722px;
  width: 1px;
  background: #d9d9d9;
  z-index: 100;
  margin: 0 16px;
`;
