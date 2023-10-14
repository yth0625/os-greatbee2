import React from 'react';
import { css } from '@emotion/react';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

type Theme = 'dark' | 'light' | 'primary';
type Type = 'fill' | 'outline';
type Size = 'medium' | 'small';
type IconPosition = 'right' | 'left';

interface Props {
  children: JSX.Element | string;
  theme?: Theme;
  type?: Type;
  size?: Size;
  isDisabled?: boolean;
  hasCircleIcon?: boolean;
  iconPosition?: IconPosition;
  outterStyles?: {};
  textStyles?: {};
  onClick?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
  buttonclassName?: string;
  textclassName?: string;
  ref?: any;
}
/**
 * @property {string | JSX.Element} children 태그 내 string text 혹은 element 요소
 * @property {?"dark" | "light" | "primary"} theme: 버튼 색상(기본 스타일)
 * @property {?"fill" | "outline"} type: 버튼 타입
 * @property {?"medium" | "small"} size: 버튼 사이즈
 * @property {?boolean} isDisabled: 이벤트 실행 가능 여부
 * @property {?boolean} hasCircleIcon: Circle 아이콘 생성 여부
 * @property {?"right" | "left"} iconPosition: Circle 아이콘 위치
 * @property {?object} outterStyles: 버튼 스타일
 * @property {?object} textStyles: 텍스트 스타일
 * @property {?function} onClick: 클릭 시 이벤트
 * @property {?string} icon: 버튼 아이콘
 * @property {?number} iconWidth: 아이콘 width
 * @property {?number} iconHeight: 아이콘 height
 */
const Button = React.forwardRef(
  (
    {
      children,
      theme = 'primary',
      isDisabled = false,
      type = 'fill',
      size = 'medium',
      hasCircleIcon = true,
      iconPosition = 'right',
      outterStyles,
      textStyles,
      onClick,
      onKeyDown,
      icon,
      iconWidth,
      iconHeight,
      iconColor,
      buttonclassName,
      textclassName,
    }: Props,
    ref: any,
  ) => {
    const _styles = new Styles({ theme, isDisabled, type, size, iconPosition });

    _styles.applyBackGroundColor();
    _styles.applyBorder();
    _styles.applyTextStyles();
    _styles.applyDisabled();
    _styles.applySize();

    return (
      <div
        ref={ref}
        onClick={onClick}
        css={[..._styles.OUTTER_STYELS, outterStyles]}
        className={buttonclassName}
        onKeyDown={onKeyDown}
        tabIndex={ref?.current ? 0 : -1}
      >
        {hasCircleIcon && iconPosition === 'left' && icon ? (
          <Icon
            iconName={icon}
            width={iconWidth}
            height={iconHeight}
            color={iconColor}
          />
        ) : null}
        <div
          css={[..._styles.TEXT_STYLES, textStyles]}
          className={textclassName}
        >
          {children}
        </div>
        {hasCircleIcon && iconPosition === 'right' && icon ? (
          <Icon
            iconName={icon}
            width={iconWidth}
            height={iconHeight}
            color={iconColor}
          />
        ) : null}
      </div>
    );
  },
);

// ------------------------------------------------------------------------------------
// styles 로직
class Styles {
  theme: Theme | null = null;
  isDisabled: boolean | null = null;
  type: Type | null = null;
  size: Size | null = null;
  iconPosition: IconPosition | null = null;

  OUTTER_STYELS: {}[] = [
    css`
      display: inline-flex;
      padding: 12px 20px;
      border-radius: 12px;
      cursor: pointer;
      flex-direction: row;
      align-items: center;

      &:focus {
        // outline: 1px solid #ffc74c;
        border: 2px solid #ffc74c;
      }
    `,
  ];

  TEXT_STYLES: {}[] = [
    css`
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      width: 100%;
    `,
  ];

  CIRCLE_ICON_STYELS: {}[] = [
    css`
      width: 20px;
      height: 20px;
    `,
  ];

  constructor({
    theme,
    isDisabled,
    type,
    size,
    iconPosition,
  }: {
    theme: Theme;
    isDisabled: boolean;
    type: Type;
    size: Size;
    iconPosition: IconPosition;
  }) {
    this.theme = theme;
    this.isDisabled = isDisabled;
    this.type = type;
    this.size = size;
    this.iconPosition = iconPosition;
  }

  applyDisabled() {
    this.OUTTER_STYELS.push(css`
      opacity: ${this.isDisabled ? 0.5 : 1};
    `);
  }

  applySize() {
    if (this.size === 'small') {
      this.OUTTER_STYELS.push(css`
        padding: 8px 16px;
      `);
    }
  }

  applyBackGroundColor() {
    if (this.type === 'outline') {
      this.OUTTER_STYELS.push(css`
        background-color: 'rgba(0,0,0,0)';
      `);
      return;
    }

    let color;
    switch (this.theme) {
      case 'primary':
        color = colors.primary.basic;
        break;
      case 'light':
        color = '#FCFCFC';
        break;
      case 'dark':
        color = '#272B30';
        break;
      default:
        color = colors.primary.basic;
        break;
    }
    this.OUTTER_STYELS.push(css`
      background-color: ${color};
    `);
  }

  applyBorder() {
    let color;
    switch (this.theme) {
      case 'primary':
        color = colors.primary.basic;
        break;
      case 'light':
        color = '#EFEFEF';
        break;
      case 'dark':
        color = '#272B30';
        break;
      default:
        break;
    }

    this.OUTTER_STYELS.push(css`
      border: solid 2px ${color};
    `);
  }

  applyTextStyles() {
    let color;
    let fontSize;
    switch (this.theme) {
      case 'primary':
        color = this.type === 'outline' ? colors.primary.basic : '#FFFFFF';
        break;
      case 'light':
        color = this.type === 'outline' ? '#EFEFEF' : '#272B30';
        break;
      case 'dark':
        color = this.type === 'outline' ? '#272B30' : '#FFFFFF';
        break;
      default:
        break;
    }

    switch (this.size) {
      case 'small':
        fontSize = 12;
        break;
      case 'medium':
        fontSize = 15;
        break;

      default:
        break;
    }

    this.TEXT_STYLES.push(css`
      color: ${color};
      font-size: ${fontSize}px;
    `);

    this.CIRCLE_ICON_STYELS.push(css`
      background-color: rgba(0, 0, 0, 0);
      border: solid 2px ${color};
      border-radius: 15px;
      margin-right: ${this.iconPosition === 'left' ? 10 : 0}px;
      margin-left: ${this.iconPosition === 'right' ? 10 : 0}px;
    `);
  }
}

export default Button;
