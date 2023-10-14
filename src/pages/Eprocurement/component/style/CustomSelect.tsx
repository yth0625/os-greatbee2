// core
import { useRef, useState } from "react"
// style
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

const CustomSelectContainer = styled.button`
  position: relative;
  text-align: left;
  width: 100%;
  padding: 0.5em 1em;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color-light);
  outline: none;
  color: var(--font-color-default);
  cursor: pointer;
  user-select: none;
  transition: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:focus {
    border-color: var(--primary-color);
  }
  .selected_value {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .options {
    position: absolute;
    z-index: 9;
    bottom: -1.5px;
    left: 0;
    width: 100%;
    padding: 0.5em;
    transform: translateY(100%);
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border-color-light);
    background-color: #fff;
    overflow: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar-track {
      margin-top: var(--border-radius-large);
      margin-bottom: var(--border-radius-large);
    }
    max-height: 20rem;
    > * {
      padding: 0.5em;
      border-radius: 0.4rem;
      &:hover {
        background-color: rgb(241, 241, 241, 0.5);
      }
    }
  }

  @media screen and (max-width: 1280px) {
    border-radius: 8px;
  }
`;

function CustomSelect({ children, className, value, hasIcon, ...props }: any) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const containerEl = useRef();

  function toggleCustomeSelect(setValue: any) {
    if (isSelectOpen) {
      // @ts-ignore
      containerEl.current && containerEl.current.blur();
    }
    setIsSelectOpen(typeof setValue == 'boolean' ? setValue : !isSelectOpen);
  }

  return (
    <CustomSelectContainer
      ref={containerEl}
      className={`${className}`}
      onClick={() => toggleCustomeSelect(!isSelectOpen)}
      onBlur={() => setIsSelectOpen(false)}
      {...props}
    >
      <span className="selected_value">{value}</span>

      {isSelectOpen && (
        <div className="options" onClick={() => toggleCustomeSelect(false)}>
          {children}
        </div>
      )}
      {hasIcon && isSelectOpen ? (
        <Icon
          iconName="arrowup"
          color={colors.font.gray01}
          width={20}
          height={20}
        />
      ) : (
        <Icon
          iconName="arrowdown"
          color={colors.font.gray01}
          width={20}
          height={20}
        />
      )}
    </CustomSelectContainer>
  );
}

export default CustomSelect
