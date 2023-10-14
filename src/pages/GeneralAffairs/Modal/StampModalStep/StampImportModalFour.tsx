import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';
import styled from '@emotion/styled';
import tw from 'twin.macro';

type StampImportModalProps = {
  onClose: () => void;
  nextStep: any;
};

const StampImportModalFour: React.FC<StampImportModalProps> = ({
  onClose,
  nextStep,
}) => {

  return (
    <Container>
      <ModalWrapper>
        <Header>
          <button onClick={onClose}>
            <img src="/src/pages/GeneralAffairs/asset/cancel.svg" alt="" />
          </button>
        </Header>
        <ModalBox>
          <BoxTitle>
            <span>날인 요청</span>
            <button>임시저장 목록</button>
          </BoxTitle>
          <ContentWrapper>
            <ModalContent1>
              <div className='flex-box'>
                <span>신청 일자</span>
                <div>
                  <input className="input-1" type="" placeholder='날짜를 선택해주세요'/>
                </div>
              </div>
              <div className='flex-box'>
                <span>신청자</span>
                <div>
                  <input className="input-2" type="" placeholder='내용을 입력해 주세요' />
                </div>
                </div>
              <div className='flex-box'>
                <span>제출처</span>
                <div>
                  <input className="input-2" type="" placeholder='내용을 입력해 주세요'/>
                </div>
                </div>
              <div className='flex-box'>
                  <span>제출 사유</span>
                    <div className='textarea-box'>
                  <textarea className="input-3" placeholder='내용을 입력해 주세요' />
                    <div className="textarea-text">0/1000</div>
                    </div>
                  </div>
              <div className='flex-box'>
                <span>날인 문서</span>
                <div>
                  <input className="input-2" type="" placeholder='내용을 입력해 주세요' />
                  <button>파일 첨부</button>
                </div>
              </div>
            </ModalContent1>
            <ModalContent2>
              <span className='c-title'>결제선</span>
              <hr className='c-hr'/>
              <div className='c-box'>
                <div className='text-box'>
                  <span>홍꿀벌 팀장</span>
                  <span>(개발 2팀)</span>
                </div>
                <div className='text-box'>
                  <span>정꿀벌 팀장</span>
                  <span>(지원팀)</span>
                </div>
                <hr />
                <div className='text-box-2'>
                  <span>참조</span>
                  <span>윤꿀벌 팀장</span>
                  <span>(지원팀)</span>
                </div>
              </div>
              <div className='c-box'>
                <div className='text-box'>
                  <span>공유 범위</span>
                </div>
                <hr />
                <div className='radio-box'>
                    <div className='radio-div'>
                      <label htmlFor={'전체'} className="radio-button b1">
                        {'전체'}
                        <div>
                          <input
                            type="radio"
                            id={'전체'}
                            name="period"
                          />
                          <span className="custom-radio"></span>
                        </div>
                      </label>
                  </div>
                  <div className='radio-div'>
                      <label htmlFor={'팀'} className="radio-button b2">
                        {'팀'}
                        <div>
                          <input
                            type="radio"
                            id={'팀'}
                            name="period"
                          />
                          <span className="custom-radio"></span>
                        </div>
                      </label>
                  </div>
                  <div className='radio-div'>
                      <label htmlFor={'비공개'} className="radio-button b3">
                        {'비공개'}
                        <div>
                          <input
                            type="radio"
                            id={'비공개'}
                            name="period"
                          />
                          <span className="custom-radio"></span>
                        </div>
                      </label>
                    </div>
                </div>
              </div>
              <span className='c-title'>결재자 의견</span>
              <textarea className="text-area" placeholder='결재자 의견을 입력해주세요' />
              <div className='submit-box'>
                <button className='submit-btn'>수정</button>
              </div>
            </ModalContent2>
          </ContentWrapper>
        </ModalBox>
        <BtnWrapper>
          <button>임시 저장</button>
          <button onClick={() => nextStep(4)} >확인</button>
        </BtnWrapper>
      </ModalWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${tw`fixed top-0 left-0 z-[10001] flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
`;

const ModalWrapper = styled.div`
  ${tw`flex flex-col items-center bg-white rounded-lg text-[18px]`}
  justify-content: flex-start;
  width: 1295px;
  height: 911px;

  @media screen and (max-width: 1536px) {
    width: 680px;
  }

  @media screen and (max-width: 1280px) {
    width: 680px;
  }

  @media screen and (max-width: 768px) {
    width: 680px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 22px 22px 28px 22px;
`;

const ModalBox = styled.div`
width: 100%;
    display: flex;
    flex-direction: column;
  padding: 0 65px;
`

const BoxTitle = styled.div`
display: flex;
justify-content: space-between;
margin-bottom:24px;

  span {
    color: #232323;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  button {
    width: 136.939px;
    height: 40px; 
    border-radius: 12px;
    background: #232325;
    color: #FFF;

    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 590px;
`

const ModalContent1 = styled.div`
  ${tw`flex flex-col items-center w-full h-full border border-solid rounded-xl`}
  border-color: #D1D1D1;
  width: 692px;
  padding: 40px 49px 39px 48px;

  .flex-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    div {
      max-width: 464px;
      display: flex;
      justify-content: space-around;

      button {
        white-space: nowrap;
        width: 110px;
        display: flex;
        padding: 15px 24px;
        border-radius: 12px;
        background: #EEE;
        color: #232323;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-left: 8px;
      }
    }

    span {
      color: #565660;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px; /* 137.5% */
      text-transform: capitalize;
    }

    .input-1 {
      border-radius: 12px;
      border: 1px solid #CCC;
      background: var(--White, #FFF);
      width: 464px;
      height: 48px;
      background: url("/src/pages/GeneralAffairs/asset/calendar.svg") no-repeat 22px center;
      background-size: 18px;
      padding-left: 48px;
    }

    .input-2 {
      border-radius: 12px;
      border: 1px solid #CCC;
      background: var(--White, #FFF);
      width: 464px;
      height: 48px;
      padding-left: 22px;
    }

    .input-3 {
      border-radius: 12px;
      border: 1px solid #CCC;
      background: var(--White, #FFF);
      width: 464px;
      height: 264px;
      padding-left: 22px;

    }

    .textarea-box {
      position: relative;
    }

    .textarea-text {
      position: absolute;
      right: 20px;
      bottom: 20px;
      color: var(--Secondary, #565660);
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }

  }
`;

const ModalContent2 = styled.div`
  ${tw`flex flex-col w-full h-full border border-solid rounded-xl`}
  border-color: #D1D1D1;
  width:448px;
  padding: 37.369px 34px 22px 34px;

  .c-title {
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    margin-bottom:13px;
  }

  .text-area {
    margin-bottom: 12px;
    height: 121.221px;
    border-radius: 8px;
    border: 1px solid #CCC;
    color: #CCC;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }

  .submit-box {
    display: flex;
    justify-content: flex-end;
  }

  .submit-btn {
    width: 126px;
    height: 47px;
    border-radius: 12px;
    background: #232323;
    text-wrap: nowrap;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .c-hr {
    margin-bottom: 14px;
  }

  .c-box {
    width: 100%;
    padding: 16px 14px;
    border-radius: 8px;
    border: 1px solid #E5E5E5;
    background: #EEE;
    margin-bottom: 20px;

    hr {
      background: #CCC;
      margin-bottom: 12px;
    }

    .text-box {
      margin-bottom: 12px;

      span:nth-child(1){
        color: #565660;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
        margin-right: 8px;
      }

      span:nth-child(2){
        color: #232323;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }
    }

    .text-box-2 {
      display: flex;
      align-items: center;

      span:nth-child(1){
        margin-right: 11px;
        height: 26px;
        padding: 2px 10px;
        border-radius: 8px;
        background: rgba(255, 199, 60, 0.50);
        color: #232323;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }

      span:nth-child(2){
        margin-right: 8px;
        color: #565660;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
      }

      span:nth-child(3){
        color: #232323;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }
    }
    .radio-box {
      display: flex;
      height: 22px;

      .radio-div{
        margin-right: 30px;
        position: relative;

        .b1 {
          margin-right:60px;
        }
        .b2 {
          margin-right:42px;
        }
        .b3 {
          margin-right:74px;
        }
        .radio-button input[type='radio'] {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
        }
        .radio-button .custom-radio {
          position: absolute;
          top: -2px;
          right: 0;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background-color: #fff;
          border: 2px solid #ABABAB;
        }

        .radio-button input[type='radio']:checked ~ .custom-radio {
          border: 1px solid #ffd338;
        }

        .custom-radio:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .radio-button input[type='radio']:checked ~ .custom-radio:after {
          background-color: #ffd338;
        }
      }
    }
  }
`;

const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  margin-top: 31px;
  button:nth-child(1){
    width: 160px;
    height: 56px;
    border-radius: 16px;
    border: 2px solid #FFC73C;
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    margin-right: 7px;
  }

  button:nth-child(2){
    width: 160px;
    height: 56px;
    border-radius: 16px;
    background: #FFC73C;
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
`



export default StampImportModalFour;
