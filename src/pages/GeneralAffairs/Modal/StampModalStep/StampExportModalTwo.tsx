import React, {useState} from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

type StampImportModalProps = {
  onClose: () => void;
  nextStep: any;
};

const StampExportModalTwo: React.FC<StampImportModalProps> = ({
  onClose,
  nextStep,
}) => {
  const [isFirstOn, setIsFirstOn] = useState(false);
  const [isSecondOn, setIsSecondOn] = useState(false);

  return (
    <Container>
      <ModalWrapper>
        <Header>
          <button onClick={onClose}>
            <img src="/src/pages/GeneralAffairs/asset/cancel.svg" alt="" />
          </button>
        </Header>
        <ModalTitle>
          <span>인감 증명은 필요하지 않으세요?</span>
          <span>(사용인감계는 법인인감증명서와 함께 사용됩니다.)</span>
        </ModalTitle>
        <ModalContent>
          <div className='toggle-box-1'>
            <span className='t-box-text'>1. 법인인감증명서도 추가 신청하시겠어요?</span>
            <ToggleContainer
                onClick={() => setIsFirstOn(prev => !prev)}
              >
              <div className={`toggle-container ${isFirstOn ? "toggle--checked" : null}`}>
                {isFirstOn ? <span className='y-text'>Yes</span> :
                <span className='n-text'>No</span>}
              </div>
              <div className={`toggle-circle ${isFirstOn ? "toggle--checked" : null}`}>
              </div>
            </ToggleContainer>
          </div>
          <div className='toggle-box-2'>
            <span className='t-box-text'>2. 사용인감계도 추가 신청하시겠어요?</span>
            <ToggleContainer
                onClick={() => setIsSecondOn(prev => !prev)}
              >
              <div className={`toggle-container ${isSecondOn ? "toggle--checked" : null}`}>
                {isSecondOn ? <span className='y-text'>Yes</span> :
                <span className='n-text'>No</span>}
              </div>
              <div className={`toggle-circle ${isSecondOn ? "toggle--checked" : null}`}>
              </div>
            </ToggleContainer>
          </div>
        </ModalContent>
        <BtnWrapper>
          <button>취소</button>
          <button onClick={() => nextStep(2)}>확인</button>
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
  width: 833px;
  height: 401px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 19px 22px 0px 22px;
`;

const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 22px;
  align-items: center;

  span:nth-child(1){
    color: #565660;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
  }

  span:nth-child(2){
    color: #565660;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 34px;
  }
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 673px;
  height: 148px;
  border-radius: 8px;
  border: 1px solid #E5E5E5;
  background: #EEE;

  .toggle-box-1 {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 33px;
    margin-bottom: 22px;

    .t-box-text {
      color: #565660;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      margin-right: 71px;
    }
  }

  .toggle-box-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .t-box-text {
      color: #565660;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      margin-right: 106px;
    }
  }
`

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 31px;

  button:nth-child(1){
    width: 134px;
    height: 56px;
    border-radius: 16px;
    border: 2px solid #FFC73C;
    color: #232323;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    margin-right: 11px;
  }

  button:nth-child(2){
    width: 135px;
    height: 56px;
    border-radius: 16px;
    background: #FFC73C;
    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
`

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  .y-text {
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 13px;
  }

  .n-text {
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 53px;
  }

  > .toggle-container {
    width: 90px;
    height: 39px;
    border-radius: 30px;
    background-color: #909090;
    display: flex;
    align-items: center;
  }
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    display: flex;
    align-items: center;
    background-color: #D1D1D1;
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 4px;
    left: 5px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 53px;
    transition : 0.5s
  }
`;



export default StampExportModalTwo;
