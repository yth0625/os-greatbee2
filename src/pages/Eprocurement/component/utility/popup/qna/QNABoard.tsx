// core
import React, { useMemo, useState } from 'react';
// router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// style
import styled from '@emotion/styled';
// utility
import { useOpenPopup } from '../Popup'; // 팝업
// component
import Pagination from '../../../common/board/Pagination';
// utils
import { naturalCheck } from '../../../../utils/checking/naturalCheck';
import { dateFormat } from '../../../../utils/formatting/dateFormat';

import { useGetProdAskListApi } from '../../../../../../api/useEprocurementApi';
import Button from 'common/Button/Button';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '../../../../../../redux/popUpReducer';

import QNADetail from './QNADetail';


const QNABoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1210px;
  width: 80vw;
  height: 840px;
  margin: 0 auto;
  padding: 22px 130px 40px;

  .qna_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .top_header_icon {
      display: none;
    }
  }

  .no_qna_data {
    flex: 1;
    font-size: 28px;
    font-weight: bold;
    color: #999999;
    text-align: center;
    padding-top: 23%;
  }

  .qna_search_box {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    .search_icon {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 2rem;
  }

  .c_section_title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 0px;
  }

  .pc_qna_list,
  .mobile_qna_list {
    color: var(--font-color-dark);
    flex-grow: 1;
    .list_body {
      transition: var(--transition-fast);
      cursor: pointer;
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
  .pc_qna_list {
    @media screen and (max-width: 480px) {
      display: none;
    }
    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 3.2em;
      border-bottom: 1px solid var(--border-color-light);
      text-align: center;
      .qna_title {
        width: 25rem;
        flex-grow: 1;
      }
      .qna_type {
        width: 100px;
      }
      .qna_date {
        width: 9rem;
      }
      .qna_writer {
        flex-shrink: 0.5;
        width: 10rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50%;
        margin-top: 0.7rem;
      }
      .qna_state {
        width: 9rem;
      }
    }
    .list_header {
      border-top: 2px solid var(--border-color-light);
      border-bottom: 2px solid var(--border-color-light);
      font-weight: var(--font-w-semi);
      color: var(--font-color-sub);
      font-size: var(--font-size-small);
    }
    .list_body {
      .qna_title {
        padding-left: 0.8rem;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .qna_type {
        width: 100px;
        color: var(--font-color-light);
      }
      .qna_date {
        font-size: var(--font-size-small);
      }
    }
  }

  @media screen and (max-width: 1536px) {
    width: 822px;
    height: 657px;
    padding: 0px 57px 30px;

    li {
      font-size: 16px;
    }

    .c_section_title {
      font-size: 28px;
    }

    .pc_qna_list {
      .list_body {
        height: 50px;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    width: 768px;
    padding: 0px 0px 16px;
    position: relative;

    .qna_header {
      justify-content: center;
      margin-bottom: 44px;
      margin-top: -20px;
      position: relative;
    }

    .qna_search_box {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      padding: 0px 56px;

      .search_icon {
        position: absolute;
        top: 10px;
        left: 70px;
      }
    }

    .pc_qna_list {
      li {
        border-bottom: 1px solid #f1f1f1;
        padding-left: 20px;
        padding-right: 20px;
      }
      .list_header {
        border-top: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
      }
    }

    .c_section_title {
      font-size: 16px;
    }

    .no_qna_data {
      font-size: 16px;
      padding-top: 45%;
    }

    .qna_button {
      position: absolute;
      bottom: 10px;
      right: 40px;
    }
  }

  @media screen and (max-width: 830px) {
    width: 700px;
  }

  @media screen and (max-width: 768px) {
    height: 1024px;

    .qna_header {
      .top_header_icon {
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
      }

      .qna_button {
        bottom: 50px;
      }
    }
    .pc_qna_list {
      flex-grow: 0.945;
    }
  }
`;

function QNABoard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const openPopup = useOpenPopup();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1)

  const { data: askListData, isSuccess } = useGetProdAskListApi();

  // @ts-ignore
  const currentShowList = useMemo(
    () => askListData?.slice(10 * (page - 1), 10 * page),
    [askListData, page],
  );

  function openDetail(id: number) {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: (
            <QNADetail askNo={id} prevPage={page}/>
          ),
        },
        hasConfirm: '아니오',
        confirmFn: () => {},
      }),
    )
  }

  return (
    <QNABoardContainer>
      <div className="qna_header">
        <Icon
          iconName="arrowleft"
          className="top_header_icon"
          onPress={() => dispatch(closeModal())}
        />
        <h2 className="c_section_title">문의 리스트</h2>
      </div>
      <div className="qna_search_box">
        <Icon
          className="search_icon"
          iconName="search"
          width={20}
          height={20}
        />
        <InputStyle
          style={{
            background: '#EEEEEE',
            paddingLeft: 40,
            border: 'none',
            borderRadius: 8,
          }}
          placeholder="검색하세요"
        />
      </div>
      {!askListData || askListData?.length == 0 ? (
        <li className="no_qna_data">등록된 문의사항이 없습니다.</li>
      ) : (
        <ul className="pc_qna_list">
          <li className="list_header">
            <p className="qna_type">구분</p>
            <p className="qna_title">제목</p>
            <p className="qna_date">작성일</p>
            <p className="qna_writer">작성자</p>
            <p className="qna_state">답변상태</p>
          </li>
          {currentShowList?.map((el) => (
            <li
              className="list_body"
              key={`pc${el.prodAskNo}`}
              onClick={() => openDetail(el.prodAskNo)}
            >
              {/* 20230714 TODO type api 연동필요 */}
              <p className="qna_type">[배송문의]</p>
              <h4 className="qna_title">{el.prodAskTitle}</h4>
              <p className="qna_date">{dateFormat(el.prodAskDttm)}</p>
              <p className="qna_writer">{el.membName}</p>
              <p className="qna_state">
                {el.prodAskStatus !== 'N' ? '답변완료' : '답변대기'}
              </p>
            </li>
          ))}
        </ul>
      )}
      {askListData && askListData?.length > 0 && isSuccess && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(askListData?.length / 10) || 1}
        />
      )}
    </QNABoardContainer>
  );
}

export default QNABoard;
