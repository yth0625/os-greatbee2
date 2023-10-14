// style
import styled from "@emotion/styled"
import { useDispatch } from 'react-redux';

import { dateFormat } from '../../../../utils/formatting/dateFormat'
import { useGetProdAskDetailApi } from '../../../../../../api/useEprocurementApi';
import { closeModal } from '../../../../../../redux/popUpReducer';

const QNADetailContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 1rem;
  max-width: 1210px;
  width: 80vw;
  height: 840px;
  padding: 22px 130px 50px; // 수치 변경할때 Popup의 패딩과 맞게 조정 필요

  @media screen and (max-width: 600px) {
    padding: 2rem;
  }
  .c_section_title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 0px;
  }
  .qna_detail {
    margin-top: 3rem;
    color: var(--font-color-dark);
    .qna_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem 3rem;
      flex-wrap: wrap;
      padding: 1.6rem 0;
      border-top: 1px solid var(--border-color-light);
      border-bottom: 1px solid var(--border-color-light);
      text-align: center;
      @media screen and (max-width: 480px) {
        flex-wrap: nowrap;
        gap: 1rem;
      }
      .qna_title {
        flex-grow: 1;
        text-align: left;
        @media screen and (max-width: 480px) {
          width: 80%;
        }
        h3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .qna_date-mobile {
          display: none;
          gap: 1rem;
          margin-top: 1rem;
          @media screen and (max-width: 480px) {
            display: flex;
            font-size: var(--font-size-small);
          }
          > span:first-child {
            color: var(--font-color-light);
          }
        }
      }
      .qna_info {
        display: flex;
        align-items: center;
        gap: 1rem;
        .qna_date {
          font-size: var(--font-size-small);
          margin-top: 1px;
          @media screen and (max-width: 480px) {
            display: none;
          }
        }
        .qna_writer {
          max-width: 12rem;
          min-width: 7rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          @media screen and (max-width: 480px) {
            display: none;
          }
        }
        .qna_state {
          flex-shrink: 0;
          @media screen and (max-width: 480px) {
            font-size: var(--font-size-small);
          }
        }
      }
    }
    .qna_content {
      padding: 1.6rem 0;
      border-bottom: 1px solid var(--border-color-light);
      .question,
      .answer {
        display: flex;
        align-items: flex-start;
        gap: 1.6rem;
        .qna_tag {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
          font-weight: var(--font-w-semi);
          font-size: var(--font-size-large);
          background-color: var(--font-color-light);
          color: #fff;
        }
        p {
          line-height: 1.4;
        }
      }
      .answer {
        margin-top: 3rem;
      }
    }
    .to_list {
      display: block;
      margin: 3rem auto 0;
      width: 100%;
      max-width: 25rem;
      height: 5rem;
      @media screen and (max-width: 480px) {
        max-width: 100%;
      }
    }
  }

  @media screen and (max-width: 1536px) {
    width: 822px;
    height: 657px;
    padding: 0px 57px 30px;
    position: relative;

    .c_section_title {
      font-size: 28px;
      text-align: center;
    }
  }

  @media screen and (max-width: 1280px) {
    width: 768px;
    margin-top: -20px;
    margin-bottom: 20px;
    position: relative;

    .c_section_title {
      font-size: 16px;
      text-align: center;
    }
  }
`;

interface IProps {
  askNo: number;
  prevPage: number;
}

function QNADetail(props: IProps){
  const dispatch = useDispatch();
  const { askNo, prevPage} = props;

  const { data: askDetail } = useGetProdAskDetailApi(askNo.toString())

  const askDetailData = (askDetail && askDetail?.length > 0) ? askDetail[0] : null;

  function toList(){
    // Todo: prevPage 를 넘겨서 해당 목록으로 넘어가는 기능 필요
    dispatch(closeModal())
  }

  return (
    <QNADetailContainer>
      <h2 className="c_section_title">문의 내용</h2>
      {!askDetailData && <div>데이터가 없습니다</div>}
      {askDetailData && (
        <div className="qna_detail">
          <div className="qna_header">
            <div className="qna_title">
              <h3>{askDetailData.prodAskTitle}</h3>
              <p className="qna_date-mobile">
                <span>작성일</span>
                <span>{dateFormat(askDetailData.prodAskDttm)}</span>
              </p>
            </div>
            <div className="qna_info">
              <p className="qna_date">
                {dateFormat(askDetailData.prodAskDttm)}
              </p>
              <p className="qna_writer">{askDetailData.membName}</p>
              <p className="qna_state">
                {askDetailData.prodAskStatus !== 'N' ? '답변완료' : '답변대기'}
              </p>
            </div>
          </div>
          <div className="qna_content">
            <div className="question">
              <div className="qna_tag">Q</div>
              <p>{askDetailData.prodAskQuestion}</p>
            </div>
            <div className="answer">
              <div className="qna_tag">A</div>
              <p>
                {askDetailData.prodAskAnswer ?? '답변이 없습니다.'}
              </p>
            </div>
          </div>
          <button className="c_btn-primary to_list" onClick={toList}>
            목록보기
          </button>
        </div>
      )}
    </QNADetailContainer>
  );
}

export default QNADetail
