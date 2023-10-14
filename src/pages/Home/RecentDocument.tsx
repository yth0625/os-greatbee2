import styled from '@emotion/styled';

import colors from '../../styles/colors';
import { useGetRecentDocumentListApi } from '../../api/useMainApi';
import { Link } from 'react-router-dom';
import { openAlert } from '../../redux/popUpReducer';
import React from 'react';
import { useDispatch } from 'react-redux';

// test data, 나중에 지우기
// const recentdocudata = [
//   {
//     type: '재고알림',
//     content: 'XXXX개 계약',
//     createdAt: '3분전',
//   },
//   {
//     type: '재고알림',
//     content: '승인완료 / [2022.07.30] XXXXX 프로젝트입니다.',
//     createdAt: '4분전',
//   },
//   {
//     type: '기안알림',
//     content: 'XXXX n개',
//     createdAt: '10분전',
//   },
//   {
//     type: '재고알림',
//     content: '승인완료 / [2022.07.30] XXXXX 프로젝트입니다.',
//     createdAt: '12분전',
//   },
//   {
//     type: '기안알림',
//     content: '승인완료 / [2022.07.30] XXXXX 프로젝트입니다.',
//     createdAt: '21분전',
//   },
//   {
//     type: '기안알림',
//     content: 'XXXX개 계약',
//     createdAt: '30분전',
//   },
// ];

function RecentDocument() {
  // const { data } = useGetRecentDocumentListApi();
  const dispatch = useDispatch();

  const data: any[] = [];

  return (
    <RecentDocu>
      <div>
        <span>최근문서</span>
        {/*<Link to="/workflow">*/}
          <span
            style={{
              fontSize: '12px',
              color: colors.font.gray01,
              marginRight: 20,
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch(
                openAlert({
                  text: (
                    <div style={{ color: '#565660', textAlign: 'center' }}>
                      Coming Soon :D
                    </div>
                  ),
                  hasConfirm: false,
                }),
              );
            }}
          >
            더보기
          </span>
        {/*</Link>*/}
      </div>
      <DocumentList data={data?.length > 0 ? true : false}>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <DocumentItem key={i} type={item.docsType}>
              <div className="docu_type">{item.docsType}</div>
              <div className="docu_content">{item.docsTitle}</div>
              <div className="docu_createdAt">{item.recentDttm}</div>
            </DocumentItem>
          ))
        ) : (
          <Empty>
            <BackgroundImage>
              <img
                src="/images/recent_empty.png"
                alt="empty"
                className="left_empty"
              />
              <img
                src="/images/recent_empty.png"
                alt="empty"
                className="right_empty"
              />
            </BackgroundImage>
            <div className="empty_text">
              <span>최근 문서가 아직 없어요.</span>
              <span>필요하신 문서를 작성해주세요!</span>
            </div>
          </Empty>
        )}
      </DocumentList>
    </RecentDocu>
  );
}

const RecentDocu = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 16px;
  position: relative;
  .empty_text {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    color: ${colors.font.gray01};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin: 5px;
    }
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: transparent;
  overflow: hidden;
  img {
    width: 50%;
  }
`;

const DocumentList = styled.ul<{ data?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1.5rem 0;
  height: 20rem;
  border-radius: 1.6rem;
  background: ${(props) => (props.data ? colors.bg.white : 'transparent')};
  padding: ${(props) => (props.data ? '0.8rem 1rem' : '0px')};
  @media screen and (max-width: 1440px) {
    height: 22rem;
  }
`;

const DocumentItem = styled.li<{ type: string }>`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  position: relative;
  align-items: center;

  .docu_type {
    height: 22px;
    min-width: 70px;
    font-size: 1.2rem;
    padding: 4px 13px;
    background: ${(props) =>
            props.type === '재고알림' ? colors.bg.gray02 : colors.bg.basic};
    border-radius: 1.6rem;
    color: ${(props) =>
            props.type === '재고알림' ? colors.font.white : colors.font.gray03};
  }

  .docu_content {
    font-size: 1.2rem;
    margin-left: 10px;
    width: 60%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${colors.font.gray04};
  }

  .docu_createdAt {
    font-size: 0.8rem;
    position: absolute;
    right: 10px;
    color: ${colors.bg.gray03};
    top: 10px;
  }
`;

export default RecentDocument;
