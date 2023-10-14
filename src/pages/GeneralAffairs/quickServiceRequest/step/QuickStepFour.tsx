import React, { useState } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { closeModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';

import PureCalendar from 'common/Calendar/Calendar';
// import UpdateCalendar from './UpdateCalendar';

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
  const [date, setDate] = useState<Date>(new Date());

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
          <Header className="relative justify-center">
            <Title>예약하기</Title>
            <button onClick={handleClose} className="absolute right-0 top-0">
              X
            </button>
          </Header>
          <ModalContent>
            <CalendarWrap>
              <div className="w-[60%]">
                <div className="flex w-full justify-center items-center bg-[#F1F1F1] h-[54px] mb-[24px] space-x-4">
                  <span className="text-[18px] font-semibold">7월 11일</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="27"
                    viewBox="0 0 19 27"
                    fill="none"
                  >
                    <path
                      d="M15.7062 5.73251L11.9183 4.44727L6.77733 19.5988L8.02866 22.1354L10.5652 20.8841L15.7062 5.73251Z"
                      stroke="#4F4F4F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.9544 7.28857L14.7423 8.57382"
                      stroke="#4F4F4F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.9183 4.44727L9.34782 12.0231"
                      stroke="#4F4F4F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.7062 5.73291L13.1357 13.3087"
                      stroke="#4F4F4F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <PureCalendar date={date} setValue={setDate} />
              </div>
              <TimeWrap className="flex items-center w-[40%] h-[54px] space-x-4">
                <div className="flex mr-4 flex-col w-[48px] border border-solid rounded-[12px] border-[#CCC] text-[20px] font-medium justify-center items-center text-[rgba(109, 109, 109, 0.50)]">
                  <button className="flex rounded-t-[12px] w-full justify-center focus:bg-[#FFC73C]">
                    오전
                  </button>
                  <hr className="border-t-2 border-dotted border-[#4F4F4F] w-[80%]" />
                  <button className="flex w-full rounded-b-[12px] justify-center focus:bg-[#FFC73C]">
                    오후
                  </button>
                </div>
                <div className="w-[68px] text-[28px]">
                  <input
                    type="text"
                    className="h-[54px] text-center !p-0"
                    value={'11'}
                  />
                </div>
                <span className="text-[34px]">:</span>
                <div className="w-[68px] text-[28px]">
                  <input
                    type="text"
                    className="h-[54px] text-center !p-0"
                    value={'30'}
                  />
                </div>
              </TimeWrap>
            </CalendarWrap>
          </ModalContent>
          <div className="flex w-full space-x-4">
            <NextButton onClick={handleClose} isAgreed={false}>
              예약 취소
            </NextButton>
            <NextButton onClick={handleClose} isAgreed={true}>
              접수
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

const TimeWrap = styled.div`
  margin-left: 40px;
  @media screen and (max-width: 1280px) {
    margin-left: 0px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const CalendarWrap = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
  ${tw`flex items-center w-full h-[60px] pb-[10px] mt-5`}
`;

const Title = styled.h2`
  ${tw`text-[24px] font-bold`}
`;

const ModalContent = styled.div`
  ${tw`flex flex-col items-center w-full h-[460px] px-[30px] py-[40px] mb-10`}
  border-color: #D1D1D1;
`;

const NextButton = styled.button<{ isAgreed: boolean }>`
  ${tw`w-full h-[60px] rounded-[12px] flex items-center justify-center`}
  background-color: ${(props) => (props.isAgreed ? '#FFC73C' : '#EEEEEE')};
  color: ${(props) => (props.isAgreed ? 'white' : '#6D6D6D')};
  cursor: ${(props) => (props.isAgreed ? 'pointer' : 'not-allowed')};
`;

export default QuickStepThree;
