import React, { useState } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { closeModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';

type QuickServiceRequestProps = {
  onClose: () => void;
  handleNextStep: () => void;
};

const QuickStepThree: React.FC<QuickServiceRequestProps> = ({
  onClose,
  handleNextStep,
}) => {
  const dispatch = useDispatch();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleClose = () => {
    dispatch(closeModal());
    onClose();
  };

  const handleAgreeChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <>
      <Container>
        <ModalWrapper>
          <Header>
            <Title>퀵서비스</Title>
            <button onClick={handleClose}>X</button>
          </Header>
          <ModalContent>
            <div className="flex items-center">
              <div className="w-[160px] text-[16px] font-semibold py-2 text-center text-white bg-[#FFC73C] rounded-lg">
                실시간 예상 운임료
              </div>
              <div className="text-[#6D6D6D] font-semibold text-[16px] ml-3">
                <span className="text-[30px]">47,000</span>원
              </div>
            </div>
            <div className="mt-3 text-[15px] text-[#6d6d6d]">
              접수시점,요청사항(냉장/냉동, 수작업)에 따라 변동가능
            </div>
            <div className="w-full mt-10 space-y-5 flex flex-col">
              <Input type="text" placeholder="접수자 성함" />
              <Input type="text" placeholder="연락처 입력" />
            </div>
            <div className="mt-10 border-[1px] border-solid border-[#d1d1d1] rounded-xl p-10 w-full">
              <input
                type="checkbox"
                id="agree"
                className="mr-4"
                onChange={handleAgreeChange}
              />
              <label htmlFor="agree">약관에 모두 동의합니다</label>
              <div className="grid grid-cols-2 grid-rows-2 mt-8 text-[13px] gap-5">
                <div>
                  V <span className="text-[#FFC73C]">[필수]</span>{' '}
                  <span>서비스 이용약관</span>
                </div>
                <div>
                  V <span className="text-[#FFC73C]">[필수]</span>{' '}
                  <span>화물운송약관 및 화물운송주선약관관</span>
                </div>
                <div>
                  V <span className="text-[#FFC73C]">[필수]</span>{' '}
                  <span>개인정보 수집 및 이용</span>
                </div>
                <div>
                  V <span className="text-[#FFC73C]">[필수]</span>{' '}
                  <span>개인정보 제 3자 제공</span>
                </div>
              </div>
            </div>
          </ModalContent>
          <div className="w-full space-y-5">
            <NextButton
              onClick={handleNextStep}
              disabled={!isAgreed}
              isAgreed={isAgreed}
            >
              예약하기
            </NextButton>
            <NextButton
              onClick={handleNextStep}
              disabled={!isAgreed}
              isAgreed={isAgreed}
            >
              바로 접수
            </NextButton>
          </div>
        </ModalWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`fixed top-0 left-0 z-[10001] flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
`;

const ModalWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center bg-white rounded-lg px-[40px] pb-[40px] text-[18px] pt-[10px]`}
  width: 810px;
  height: 690px;

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
  ${tw`flex items-center justify-between w-full h-[80px] pb-[10px] mt-5`}
`;

const Title = styled.h2`
  ${tw`text-[24px] font-bold`}
`;

const ModalContent = styled.div`
  ${tw`flex flex-col items-center w-full h-[460px] border border-solid rounded-xl px-[30px] py-[40px] mb-10`}
  border-color: #D1D1D1;
`;

const NextButton = styled.button<{ isAgreed: boolean }>`
  ${tw`w-full h-[60px] rounded-[12px] flex items-center justify-center`}
  background-color: ${(props) => (props.isAgreed ? '#FFC73C' : '#EEEEEE')};
  color: ${(props) => (props.isAgreed ? 'white' : '#6D6D6D')};
  cursor: ${(props) => (props.isAgreed ? 'pointer' : 'not-allowed')};
`;

const Input = styled.input`
  ${tw`h-[50px]`}
  height: 70px; !important;
`;

export default QuickStepThree;
