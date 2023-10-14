import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';
import styled from '@emotion/styled';
import tw from 'twin.macro';

type StampImportModalProps = {
  onClose: () => void;
  nextStep: any;
};

const StampImportModalThree: React.FC<StampImportModalProps> = ({
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
              <div className='row-wrapper'>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-1.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-2.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
              </div>
              <div className='row-wrapper'>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-3.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-4.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
              </div>
              <div className='row-wrapper'>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-5.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
                <div className='content-wrapper'>
                  <div className='img-wrapper'>
                    <img src="/src/pages/GeneralAffairs/asset/seal-6.svg" alt="" />
                  </div>
                  <div className='text-wrapper'>
                    <span>Text</span>
                  </div>
                </div>
              </div>
              
            </ModalContent1>
            <ModalContent2>
              <img src="/src/pages/GeneralAffairs/asset/seal-7.svg" alt="" />
            </ModalContent2>
          </ContentWrapper>
        </ModalBox>
        <BtnWrapper>
          <button>임시 저장</button>
          <button onClick={() => nextStep(3)} >확인</button>
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
  justify-content: space-between;
  width: 100%;
  height: 590px;
`

const ModalContent1 = styled.div`
  ${tw`flex flex-col items-center w-full h-full border border-solid rounded-xl`}
  border-color: #D1D1D1;
  width: 340px;
  height: 600px;
  padding: 25px;

  .row-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;

    .content-wrapper {
      width: 140px;

      .img-wrapper {
        display: flex;
        align-items: center;
        height: 140px;
        justify-content: center;
        border: 1px solid #232323;
        background: var(--ui-color-white, #FFF);

        img {
          width: 120px;
          height: 120px;
        }
      }

      .text-wrapper {
        width: 140px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--ui-color-white, #FFF);
        border-radius: 0px 0px 10px 10px;
        border: 1px solid #232323;
        color: #1A1E27;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
`;

const ModalContent2 = styled.div`
  ${tw`flex flex-col w-full h-full border border-solid rounded-xl`}
  width:792px;
  height: 600px;
  padding: 0 20px;
  border-radius: 16px;
  border: 1px solid #D0D0D0;
  background: #F1F1F1;
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

export default StampImportModalThree;
