import styled from '@emotion/styled';
import { css } from '@emotion/react';

// 입력 UI 스타일 지정
const StyleTheme = css`
  background: none;
  background-color: #fff;
  font-size: inherit;
  &:focus{
    border-color: var(--primary-color);
  }
  &.error{
    border-color: var(--error-color);
  }
  &:disabled{
    background-color: var(--disabled-color);
    border-color: var(--border-color-default);
  }
`

const InputStyle = styled.input`
  ${StyleTheme}
`

const TextareaStyle = styled.textarea`
  ${StyleTheme}
`

const SelectStyle = styled.select`
  ${StyleTheme}
`


export { InputStyle, TextareaStyle, SelectStyle }
