import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRegisterAskApi } from 'api/useEprocurementApi';
import CustomSelect from 'pages/Eprocurement/component/style/CustomSelect';
import { askCategory } from '../../../../store/data/askCategory';
import { InputStyle, TextareaStyle } from 'common/Input/FormStyle';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { openAlert } from '../../../../../../redux/popUpReducer';

const QNA = () => {
  const [searchParams] = useSearchParams();
  const productNo = searchParams.get('productNo') || '';
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [prodAskCategory, setProdAskCategory] = useState(1);
  const [prodAskTitle, setProdAskTitle] = useState('');
  const [prodAskTitleError, setProdAskTitleError] = useState(false);
  const [prodAskQuestion, setProdAskQuestion] = useState('');
  const [prodAskQuestionError, setProdAskQuestionError] = useState(false);

  const { mutateAsync: askApi, isLoading: isAskLoading } = useRegisterAskApi();

  const registAsk = async () => {
    setProdAskTitleError(!prodAskTitle);
    setProdAskQuestionError(!prodAskQuestion || prodAskQuestion.length > 1000);
    if (!prodAskTitle || !prodAskQuestion || prodAskQuestion.length > 1000)
      return;

    try {
      await askApi({
        prodAskCategory,
        prodAskTitle,
        prodAskQuestion,
        productNo: Number(productNo),
      });

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              문의사항이 등록되었습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => closePopup(),
        }),
      );
    } catch (error) {
      let message = '문의사항 등록에 실패하였습니다.';
      if (error instanceof AxiosError && error.response) {
        message = error.response.data.error.errMsg;
      }

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              {message}
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }
  };

  function closePopup() {
    // 뒤로가기로 modal창 닫기
    if (location.state?.prevPath === location.pathname) {
      navigate(-1);
    } else {
      navigate(`${location.pathname}`, { replace: true });
    }
  }

  return (
    <QNAContainer>
      <h3>문의하기</h3>
      <div className="fill_area">
        <div className="ask_category">
          <h4>구분</h4>
          <CustomSelect
            className="fill"
            value={askCategory[prodAskCategory - 1]}
            hasIcon={true}
          >
            {askCategory.map((el, i) => (
              <li
                className={`${prodAskCategory === i + 1 ? 'on' : ''}`}
                key={i}
                onClick={() => setProdAskCategory(i + 1)}
              >
                [{el}]
              </li>
            ))}
          </CustomSelect>
        </div>
        <div className="ask_title">
          <h4>제목</h4>
          <InputStyle
            type="text"
            placeholder="제목을 입력하세요"
            className={`fill ${prodAskTitleError ? 'error' : ''}`}
            value={prodAskTitle}
            onChange={(e) => {
              setProdAskTitle(e.currentTarget.value);
              setProdAskTitleError(!e.currentTarget.value);
            }}
          />
        </div>
        <div className="ask_content">
          <h4>내용</h4>
          <div className="fill">
            <TextareaStyle
              placeholder="문의하실 내용을 입력하세요"
              className={`${prodAskQuestionError ? 'error' : ''}`}
              value={prodAskQuestion}
              onChange={(e) => {
                setProdAskQuestion(e.currentTarget.value);
                setProdAskQuestionError(!e.currentTarget.value);
              }}
              maxLength={1000}
            ></TextareaStyle>
            <p className="text_count">{prodAskQuestion.length ?? 0} / 1000</p>
          </div>
        </div>
      </div>
      <div className="submit_container">
        <button className="c_btn-line-primary" onClick={closePopup}>
          취소
        </button>
        <button
          className="c_btn-primary"
          disabled={isAskLoading}
          onClick={registAsk}
        >
          확인
        </button>
      </div>
    </QNAContainer>
  );
};

export default QNA;

const QNAContainer = styled.div`
  padding: 4rem 4rem 0rem;
  width: 822px;
  height: 640px;

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-top: -2.5rem;
  }

  .fill_area {
    margin-top: 2rem;
    > div {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      > h4 {
        width: 10rem;
        padding: calc((4.8rem - var(--font-size-large)) / 2) 0;
        font-weight: var(--font-w-semi);
        font-size: var(--font-size-large);
        color: #565660;
        @media screen and (max-width: 480px) {
          width: 6rem;
        }
        @media screen and (max-width: 360px) {
          display: none;
        }
      }
      .fill {
        width: 100%;
        height: 4.8rem;
        textarea {
          padding-top: 1.4rem;
          line-height: 1.5;
        }
      }

      &.ask_title {
        input[type='text'] {
          border-color: #f1f1f1;
          &::placeholder {
            color: #adadad;
          }
        }
      }
      &.ask_category {
        .fill {
          color: var(--font-color-sub);
          li.on {
            color: var(--primary-color);
          }
        }
        button {
          border-color: #f1f1f1;
          color: #adadad;
        }
      }
      &.ask_content {
        .fill {
          height: 25rem;
          position: relative;
          textarea {
            width: 100%;
            height: 100%;
            border-color: #f1f1f1;
            &::placeholder {
              color: #adadad;
            }
          }
          .text_count {
            position: absolute;
            bottom: 16px;
            right: 16px;
            color: #565660;
            font-size: var(--font-size-small);
          }
        }

        @media screen and (max-width: 1280px) {
          .fill {
            height: 100%;
          }
        }
      }
    }
  }
  .submit_container {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0 auto;
    margin-top: 3rem;
    width: 45%;
    max-width: 50rem;
    @media screen and (max-width: 480px) {
      flex-direction: column;
    }
    > * {
      width: 100%;
      height: 4.8rem;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 20px;
    width: 712px;
    height: 806px;

    h3 {
      font-size: 22px;
      text-align: center;
      padding-top: 20px;
    }

    h4 {
      font-size: 16px;
    }

    .ask_title {
      input[type='text'] {
        border-radius: 8px;
        border-color: #f1f1f1;
      }
    }

    .fill_area {
      flex: 1;
      height: calc(100% - 100px);
    }

    .ask_content {
      height: 50rem;
      .fill {
        textarea {
          border-color: #f1f1f1;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 20px;
      margin-top: -10px;
    }

    .fill_area {
      flex: 1;
      height: calc(100% - 140px);
    }
  }
`;
