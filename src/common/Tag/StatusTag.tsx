import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const StatusTag = ({ text }: { text: string }) => {
  const renderUpdateStatus = (status: string) => {
    switch (status) {
      case '승인요청':
        return (
          <TagStyle type="승인요청">
            <span>승인요청</span>
          </TagStyle>
        );
      case '반려됨':
        return (
          <TagStyle type="반려됨">
            <span>반려됨</span>
          </TagStyle>
        );
      case '승인완료':
        return (
          <TagStyle type="승인완료">
            <span>승인완료</span>
          </TagStyle>
        );
      case '진행중':
        return (
          <TagStyle type="진행중">
            <span>진행중</span>
          </TagStyle>
        );
      case '보류중':
        return (
          <TagStyle type="보류중">
            <span>보류중</span>
          </TagStyle>
        );
      default:
        break;
    }
  };
  return <div>{renderUpdateStatus(text)}</div>;
};

export default StatusTag;

const TagStyle = styled.div<{ type: string }>`
  width: 72px;
  height: 27px;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.type === '보류중'
      ? colors.bg.yellow
      : props.type === '승인완료'
      ? colors.bg.green
      : props.type === '반려됨'
      ? colors.bg.red
      : props.type === '진행중'
      ? colors.bg.blue
      : '#EEEEEE70'};
  border: 1px solid
    ${(props) =>
      props.type === '보류중'
        ? colors.primary.basic
        : props.type === '승인완료'
        ? colors.color.green
        : props.type === '반려됨'
        ? colors.color.red
        : props.type === '진행중'
        ? colors.color.blue
        : '#888888'};
  span {
    color: ${(props) =>
      props.type === '보류중'
        ? colors.primary.basic
        : props.type === '승인완료'
        ? colors.color.green
        : props.type === '반려됨'
        ? colors.color.red
        : props.type === '진행중'
        ? colors.color.blue
        : colors.color.gray};
  }
`;
