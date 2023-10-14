import styled from '@emotion/styled';

import colors from '../../styles/colors';
import { useGetUpdateListApi } from '../../api/useMainApi';
import Icon from '../../styles/Icon';
import React from 'react';

// test data, 나중에 지우기
// const UpdateData = [
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '반려됨',
//   },
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '승인완료',
//   },
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '승인요청',
//   },
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '진행중',
//   },
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '보류중',
//   },
//   {
//     date: '23.03.03',
//     title: '기안문 승인 요청드립니다.',
//     status: '승인완료',
//   },
// ];

function Update() {

  const { data } = useGetUpdateListApi();

  const renderUpdateStatus = (status: string) => {
    switch (status) {
      case '승인요청':
        return (
          <TagStyle type='승인요청'>
            <span>승인요청</span>
          </TagStyle>
        );
      case '반려':
        return (
          <TagStyle type='반려'>
            <span>반려</span>
          </TagStyle>
        );
      case '승인완료':
        return (
          <TagStyle type='승인완료'>
            <span>승인완료</span>
          </TagStyle>
        );
      case '진행중':
        return (
          <TagStyle type='진행중'>
            <span>진행중</span>
          </TagStyle>
        );
      case '보류중':
        return (
          <TagStyle type='보류중'>
            <span>보류중</span>
          </TagStyle>
        );
      default:
        break;
    }
  };

  return (
    <UpdateContents>
      <UpdateTitle>
        <span>업데이트 사항</span>
        <Icon iconName='more' />
      </UpdateTitle>
      <Divider />
      <UpdateList>
        {data?.map((item, i) => (
          <li key={i}>
            <div>
              <UpdateItemDate>{item.updateDate}</UpdateItemDate>
              <UpdateItemTitle>{item.docsTitle}</UpdateItemTitle>
            </div>
            <UpdateItemStatus>
              {renderUpdateStatus(item.docsState)}
            </UpdateItemStatus>
          </li>
        ))}
      </UpdateList>
    </UpdateContents>
  );
}

const UpdateContents = styled.section`
  min-height: 200px;
  background: ${colors.bg.white};
  padding: 2rem;
  margin-bottom: 14px;
  border-radius: 1.6rem;

  span {
    font-weight: 700;
  }

  @media screen and (max-width: 1440px) {
    padding: 0.5rem 1rem;
  }
  @media screen and (max-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 0;
  }
`;

const UpdateTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: -8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
`;

const UpdateList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  height: 90%;
  overflow: hidden;

  li {
    margin: 0 3px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1440px) {
      width: 300px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const UpdateItemDate = styled.span`
  font-size: 1.1rem;
  color: ${colors.font.gray02};
`;

const UpdateItemStatus = styled.span``;

const UpdateItemTitle = styled.span`
  font-size: 1.4rem;
  color: ${colors.font.gray04};
  margin-left: 3rem;
  @media screen and (max-width: 1440px) {
    margin-left: 1.5rem;
  }
`;

const TagStyle = styled.div<{ type: string }>`
  width: 72px;
  height: 27px;
  border-radius: 16px;
  font-size: 1.2rem;
  margin-right: 6px;
  background: ${(props) => 
          props.type === '보류중'
                  ? colors.bg.yellow
                  : props.type === '승인완료'
                          ? colors.bg.green
                          : props.type === '반려'
                                  ? colors.bg.red
                                  : props.type === '진행중'
                                          ? colors.bg.blue
                                          : '#EEEEEE70'};
  border: 1px solid ${(props) =>
          props.type === '보류중'
                  ? colors.primary.basic
                  : props.type === '승인완료'
                          ? colors.color.green
                          : props.type === '반려'
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
                            : props.type === '반려'
                                    ? colors.color.red
                                    : props.type === '진행중'
                                            ? colors.color.blue
                                            : colors.color.gray};
    width: 100%;
    text-align: center;
  }
`;

export default Update;
