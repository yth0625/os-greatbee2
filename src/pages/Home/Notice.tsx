import React from 'react';
import Icon from 'styles/Icon';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetNoticeApi } from '../../api/useMainApi';
import colors from '../../styles/colors';
import { openAlert, openModal } from '../../redux/popUpReducer';
import AnnouncementModal from './AnnouncementModal';

// test data (나중에 삭제하기)
// const noticedata = [
//   {
//     image:
//       'https://thumbs.dreamstime.com/z/heavy-rain-tropical-rainforest-55108490.jpg',
//     title: '신규 입사자 교육 날짜 일정 안내드립니다.',
//     subtext:
//       '오늘은 신규 입사자 교육하는 날입니다. 관련 자료를 미리 올려드립니다. 업무에 참고하시길 바랍니다.',
//     createdAt: '10분전',
//   },
//   {
//     image:
//       'https://thumbs.dreamstime.com/z/heavy-rain-tropical-rainforest-55108490.jpg',
//     title: '신규 입사자 교육 날짜 일정 안내드립니다.',
//     subtext:
//       '오늘은 신규 입사자 교육하는 날입니다. 관련 자료를 미리 올려드립니다. 업무에 참고하시길 바랍니다.',
//     createdAt: '10분전',
//   },
//   {
//     image:
//       'https://thumbs.dreamstime.com/z/heavy-rain-tropical-rainforest-55108490.jpg',
//     title: '신규 입사자 교육 날짜 일정 안내드립니다.',
//     subtext:
//       '오늘은 신규 입사자 교육하는 날입니다. 관련 자료를 미리 올려드립니다. 업무에 참고하시길 바랍니다.',
//     createdAt: '10분전',
//   },
// ];

function Notice() {
  const dispatch = useDispatch();

  // const { data } = useGetNoticeApi();

  const data: any[] = [];

  const openAnnounceModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '공지사항',
          content: <AnnouncementModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  return (
    <NoticeConainer>
      <div>
        <span>공지사항</span>
        {/*<Link to="/notice">*/}
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
      <NoticeList>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <li key={i} onClick={openAnnounceModal}>
              <img src={item.membImgUrl} alt="avatar" />
              <div className="notice_content">
                <span className="notice_title">{item.subject}</span>
                <span className="notice_sub">{item.content}</span>
              </div>
              <div className="notice_createdAt">{item.notiDttm}</div>
              <Icon
                iconName="arrowright"
                width={20}
                height={20}
                color="#949494"
                style={{ position: 'absolute', top: 25, right: 10 }}
              />
            </li>
          ))
        ) : (
          <Empty>
            <img src="/images/notice_empty.png" alt="empty" />
            <span>등록된 공지사항이 없어요.</span>
          </Empty>
        )}
      </NoticeList>
    </NoticeConainer>
  );
}

const NoticeConainer = styled.div`
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 16px;
  position: relative;
  span {
    width: 100%;
    text-align: center;
    color: ${colors.font.gray01};
  }
  img {
    position: absolute;
    width: 50%;
    height: 60%;
    top: 0;
    left: 10px;
  }
`;

const NoticeList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  height: 23rem;
  @media screen and (max-width: 1440px) {
    height: 24rem;
  }

  li {
    border-radius: 1.6rem;
    background: ${colors.bg.white};
    padding: 1.2rem 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    position: relative;
    box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);

    .notice_content {
      display: flex;
      flex-direction: column;
      width: 80%;
      margin-left: 10px;
      height: 40px;

      .notice_title {
        margin-top: 4px;
        font-weight: 600;
        width: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.3rem;
        white-space: nowrap;
        color: ${colors.font.gray04};
      }

      .notice_sub {
        margin-top: 10px;
        width: 100%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1rem;
        color: ${colors.font.gray02};
      }
    }

    .notice_createdAt {
      font-size: 0.8rem;
      position: absolute;
      right: 50px;
      color: ${colors.font.gray02};
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  }
`;

export default Notice
