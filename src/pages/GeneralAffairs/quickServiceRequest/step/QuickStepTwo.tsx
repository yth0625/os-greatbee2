import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { closeModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';

type QuickServiceRequestProps = {
  onClose: () => void;
  handleNextStep: () => void;
};

const QuickStepTwo: React.FC<QuickServiceRequestProps> = ({
  onClose,
  handleNextStep,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
    onClose();
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
            <div className="h-full overflow-y-auto">
              <div className="border-b border-solid border-[#d1d1d1]">
                <div className="text-[24px] font-bold mb-5">출발지</div>
                <div className="text-[20px] text-[#6d6d6d] mb-4">
                  서울 마포구 서교동 394-2
                </div>
                <div className="space-y-3 pb-10">
                  <input type="text" placeholder="상세주소(예:층,동/호수)" />
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="연락처" />
                </div>
              </div>
              <div className="border-b border-solid border-[#d1d1d1] py-5">
                <div className="text-[24px] font-bold mb-5">도착지</div>
                <div className="text-[20px] text-[#6d6d6d] mb-4">
                  서울 마포구 서교동 394-2
                </div>
                <div className="space-y-3 pb-10">
                  <input type="text" placeholder="상세주소(예:층,동/호수)" />
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="연락처" />
                </div>
              </div>
              <div className="mt-10 w-full">
                <div className="text-[20px] font-bold text-[#6d6d6d]">
                  물품 크기 선택
                </div>
                {/* Radio group and options */}
              </div>
              <div className="mt-20 w-full">
                <div className="text-[20px] font-bold text-[#6d6d6d]">
                  배송 유의사항
                </div>
                <textarea
                  name=""
                  id=""
                  placeholder="직접 입력하세요"
                  className="w-full mt-5 h-[150px]"
                ></textarea>
              </div>
              <NextButton onClick={handleNextStep}>다음</NextButton>
            </div>
          </ModalContent>
        </ModalWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`fixed top-0 left-0 z-[10001] flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
  overflow-y:auto;
`;

const ModalWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center bg-white rounded-lg px-[40px] pb-[50px] text-[18px] pt-[30px]`}
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
    height: 1100px;
    margin: 20px 0;
  }
`;

const Header = styled.div`
  ${tw`flex items-center justify-between w-full h-[85px] mt-[30px] mb-[10px] py-[10px]`}
`;

const Title = styled.h2`
  ${tw`text-[24px] font-bold`}
`;

const ModalContent = styled.div`
  ${tw`flex flex-col items-center w-full h-full border border-solid rounded-xl px-[35px] py-[40px]`}
  border-color: #D1D1D1;

  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
  .overflow-y-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const NextButton = styled.div`
  ${tw`w-full h-[50px] bg-[#FFC73C] rounded-[12px] text-white mt-12 flex items-center justify-center cursor-pointer`}
`;

export default QuickStepTwo;
