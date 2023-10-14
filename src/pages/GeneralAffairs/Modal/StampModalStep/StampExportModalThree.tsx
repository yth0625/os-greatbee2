import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, closeToastMessage, openToastMessage } from 'redux/popUpReducer';
import { InputStyle } from 'common/Input/FormStyle';
import Icon from 'styles/Icon';
import styled from '@emotion/styled';
import tw from 'twin.macro';

type StampImportModalProps = {
  onClose: () => void;
  onModalClose: () => void;
  nextStep: any;
};

const StampExportModalThree: React.FC<StampImportModalProps> = ({
  onClose,
  nextStep,
  onModalClose
}) => {

  const dispatch = useDispatch();

  const openConfirmed = () => {
        dispatch(
            openToastMessage({
                text: '신청 되었습니다.',
            }),
        );
    onClose();
    onModalClose()
        setTimeout(() => {
            dispatch(closeToastMessage());
        }, 2500);

  }

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
            <span>조직도</span>
          </BoxTitle>
          <ContentWrapper>
            <ModalContent1>
              <SearchContainer>
                <div style={{ position: 'relative', marginRight: '14px' }}>
                  <Icon
                    iconName="search"
                    width={20}
                    height={20}
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                    }}
                  />
                  <InputStyle
                    style={{
                      background: 'rgba(238, 238, 238, 0.50)',
                      paddingLeft: 40,
                      border: '1px solid rgba(144, 144, 144, 0.50)',
                      width: '236px',
                      color: '#909090'
                    }}
                    placeholder="검색하세요"
                  />
                </div>
              </SearchContainer>
              <hr />
              <div className='title-1 flex-box'>
                <img src="/src/pages/GeneralAffairs/asset/minus.svg" alt="" />
                <span>솔루션 사업부</span>
              </div>
              <div className='content-1 flex-box f1'>
                <img src="/src/pages/GeneralAffairs/asset/filled-box.svg" alt="" />
                <span>왕꿀벌 부장 (솔루션 사업부)</span>
              </div>
              <div className='content-1 flex-box f2'>
                <img src="/src/pages/GeneralAffairs/asset/plus.svg" alt="" />
                <span>개발 1팀</span>
              </div>
              <div className='content-1 flex-box f2'>
                <img src="/src/pages/GeneralAffairs/asset/minus.svg" alt="" />
                <span>개발 2팀</span>
              </div>
              <div className='content-2'>
                <div className='flex-box'>
                  <img src="/src/pages/GeneralAffairs/asset/filled-box.svg" alt="" />
                  <span>김꿀벌 부장 (개발2팀)</span>
                </div>
                <div className='flex-box'>
                  <img src="/src/pages/GeneralAffairs/asset/blanck-box.svg" alt="" />
                  <span>이꿀벌 책임 (개발2팀)</span>
                </div>
                <div className='flex-box'>
                  <img src="/src/pages/GeneralAffairs/asset/blanck-box.svg" alt="" />
                  <span>권꿀벌 부장 (개발2팀)</span>
                </div>
                <div className='flex-box'>
                  <img src="/src/pages/GeneralAffairs/asset/blanck-box.svg" alt="" />
                  <span>박꿀벌 부장 (개발2팀)</span>
                </div>
                <div className='flex-box'>
                  <img src="/src/pages/GeneralAffairs/asset/blanck-box.svg" alt="" />
                  <span>박꿀벌 부장 (개발2팀)</span>
                </div>
              </div>
              <div className='btn-wrapper'>
                <button>결재선 추가</button>
                <button>참조 추가</button>
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
                <button className='submit-btn' onClick={openConfirmed}>확인</button>
              </div>
            </ModalContent2>
          </ContentWrapper>
        </ModalBox>
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
  height: 634px;
  padding: 17px 48px 48px 37px;
  align-items: flex-start;

  hr {
    width: 100%;
    background: #CCC;
    margin-left: 11px;
  }
  .flex-box {
    display: flex;
    align-items: center;
  }

  .title-1 {
    img {
      margin-right: 8px;
    }
    
    margin-bottom: 20px;
    color: #232323;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

    .f1 {
      color: #232323;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; 
    }
    .f2 {
      color: #565660;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    }

  .content-1 {
    img {
      margin-right: 16px;
    }

    margin-left: 32px;
    margin-bottom: 16px
  }

  .content-2 {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 545px;
    height: 279px;
    padding: 29px 0 34px 34px;
    margin-left: 32px;
    border-radius: 8px;
    background: #EEE;
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 16px;

    img {
      margin-right: 12px;
    }
  }

  .btn-wrapper {
    width: 100%;
    padding-right: 30px;
    display: flex;
    justify-content: flex-end;
    color: #232323;
    text-align: right;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    button:nth-child(1){
      width: 135px;
      height: 55px;
      border-radius: 12px;
      border: 1px solid #979797;
      margin-right: 16px;
    }

    button:nth-child(2){
      width: 119px;
      height: 55px;
      border-radius: 12px;
      background: #EEE;
    }
  }


`;

const ModalContent2 = styled.div`
  ${tw`flex flex-col w-full h-full border border-solid rounded-xl`}
  border-color: #D1D1D1;
  width:448px;
  height:634px;
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: 30px;
  gap: 6px;
  margin-bottom: 16px;

`

export default StampExportModalThree;
