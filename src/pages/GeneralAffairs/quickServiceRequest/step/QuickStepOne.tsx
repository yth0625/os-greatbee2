import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

type QuickServiceRequestProps = {
  onClose: () => void;
  handleNextStep: () => void;
};

interface ModalInputProps {
  borderBottom?: boolean;
  placeholder: string;
  className: string;
  onFocus: () => void;
}

interface ModalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  borderBottom?: boolean;
}

const QuickStepOne: React.FC<QuickServiceRequestProps> = ({
  onClose,
  handleNextStep,
}) => {
  const dispatch = useDispatch();

  const [showSenderModal, setShowSenderModal] = useState(false);
  const [showReceiverModal, setShowReceiverModal] = useState(false);
  const [showKindModal, setShowKindModal] = useState(false);
  const [showTonModal, setShowTonModal] = useState(false);

  const senderRef = useRef(null);
  const receiverRef = useRef(null);
  const kindRef = useRef(null);
  const tonRef = useRef(null);

  const handleClose = () => {
    dispatch(closeModal());
    onClose();
  };

  useEffect(() => {
    const handleDocumentClick = (e: React.MouseEvent) => {
      handleClickOutside(e, senderRef, setShowSenderModal);
      handleClickOutside(e, receiverRef, setShowReceiverModal);
      handleClickOutside(e, kindRef, setShowKindModal);
      handleClickOutside(e, tonRef, setShowTonModal);
    };

    document.addEventListener(
      'mousedown',
      handleDocumentClick as unknown as EventListener,
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleDocumentClick as unknown as EventListener,
      );
    };
  }, []);

  const handleClickOutside = (
    e: React.MouseEvent | MouseEvent,
    ref: React.RefObject<HTMLInputElement>,
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      toggleModal(false);
    }
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
            <ModalInputWrap>
              {/*  */}
              <div ref={senderRef}>
                <ModalInput
                  borderBottom
                  placeholder="보내는 사람"
                  className="px-[30px]"
                  onFocus={() => setShowSenderModal(true)}
                />
                {showSenderModal && (
                  <div
                    className="absolute top-[70px] left-0 w-full h-[280px] bg-[#fff] border-solid border-[1px] border-[#D8D8D8] shadow-lg rounded-lg z-[100] p-7 text-[18px]"
                    onClick={(e) =>
                      handleClickOutside(e, senderRef, setShowSenderModal)
                    }
                  >
                    <div className="border-solid border-[1px] border-[#d1d1d1] rounded-lg w-[70px] py-2 text-center mb-[10px]">
                      주소록
                    </div>
                    <div className="">
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">회사</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">집</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-[22px] left-[30px]">
                  <img
                    src="/src/pages/GeneralAffairs/asset/location.svg"
                    alt="location"
                  />
                </div>
              </div>
              {/*  */}
              <div ref={receiverRef}>
                <ModalInput
                  placeholder="받는 사람"
                  className="px-[30px]"
                  onFocus={() => setShowReceiverModal(true)}
                />
                {showReceiverModal && (
                  <div
                    className="absolute top-[140px] left-0 w-full h-[280px] bg-[#fff] border-solid border-[1px] border-[#D8D8D8] shadow-lg rounded-lg z-[100] p-7 text-[18px]"
                    onClick={(e) =>
                      handleClickOutside(e, receiverRef, setShowReceiverModal)
                    }
                  >
                    <div className="border-solid border-[1px] border-[#d1d1d1] rounded-lg w-[70px] py-2 text-center mb-[10px]">
                      주소록
                    </div>
                    <div className="">
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">회사</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">집</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                      <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                        <div className="w-[7%]">
                          <img
                            src="/src/pages/GeneralAffairs/asset/location.svg"
                            alt="location"
                          />
                        </div>
                        <div className="w-[13%]">김효진</div>
                        <div className="w-[65%]">서울 마포구 서교동 394-2</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-[94px] left-[30px]">
                  <img
                    src="/src/pages/GeneralAffairs/asset/location_fill.svg"
                    alt="location_fill"
                  />
                </div>
              </div>
              <div className="absolute top-[53px] right-[0px] border-[1px] border-solid border-[#d1d1d1] rounded-lg cursor-pointer w-[32px] h-[32px] flex items-center justify-center z-10 bg-white">
                <img
                  src="/src/pages/GeneralAffairs/asset/location_exchange.svg"
                  alt="location_exchange"
                />
              </div>
            </ModalInputWrap>
            <div className="flex w-full space-x-5 mt-10">
              <div ref={kindRef} className="w-full cursor-pointer relative">
                <div className="absolute top-[11px] left-[20px]">
                  <img
                    src="/src/pages/GeneralAffairs/asset/mingcute_car-fill.svg"
                    alt="mingcute_car-fill"
                  />
                </div>
                <ModalSelect onClick={() => setShowKindModal(!showKindModal)}>
                  <span className="ml-10">종류</span>
                  <div className="flex space-x-10">
                    <span className="text-[#FFC73C] font-bold">라보</span>
                    <img
                      src="/src/pages/GeneralAffairs/asset/select-arrow.svg"
                      alt="mingcute_car-fill"
                    />
                  </div>
                </ModalSelect>
                {showKindModal && (
                  <div
                    className="absolute top-[50px] left-0 w-[100%] h-[250px] bg-[#fff] border-solid border-[1px] border-[#D8D8D8] shadow-lg rounded-lg z-[100] p-5"
                    onClick={(e) =>
                      handleClickOutside(e, kindRef, setShowKindModal)
                    }
                  >
                    <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-4">
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <img
                          src="/src/pages/GeneralAffairs/asset/truck.png"
                          alt="truck"
                        />
                        <span className="text-[16px] font-semibold mt-3 text-[#6D6D6D]">
                          다마스
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <img
                          src="/src/pages/GeneralAffairs/asset/truck.png"
                          alt="truck"
                        />
                        <span className="text-[16px] font-semibold mt-3 text-[#6D6D6D]">
                          라보
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <img
                          src="/src/pages/GeneralAffairs/asset/truck.png"
                          alt="truck"
                        />
                        <span className="text-[16px] font-semibold mt-3 text-[#6D6D6D]">
                          오토바이
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <img
                          src="/src/pages/GeneralAffairs/asset/truck.png"
                          alt="truck"
                        />
                        <span className="text-[16px] font-semibold mt-3 text-[#6D6D6D]">
                          트럭
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={tonRef} className="w-full cursor-pointer relative">
                <div className="absolute top-[11px] left-[20px]">
                  <img
                    src="/src/pages/GeneralAffairs/asset/icon-park.png"
                    alt="icon-park"
                  />
                </div>
                <ModalSelect onClick={() => setShowTonModal(!showTonModal)}>
                  <span className="ml-10">톤수</span>
                  <div className="flex space-x-10">
                    <span className="text-[#FFC73C] font-bold">1톤 미만</span>
                    <img
                      src="/src/pages/GeneralAffairs/asset/select-arrow.svg"
                      alt="mingcute_car-fill"
                    />
                  </div>
                </ModalSelect>
                {showTonModal && (
                  <div
                    className="absolute top-[50px] left-0 w-[100%] h-[370px] bg-[#fff] border-solid border-[1px] border-[#D8D8D8] shadow-lg rounded-lg z-[100] p-5"
                    onClick={(e) =>
                      handleClickOutside(e, tonRef, setShowTonModal)
                    }
                  >
                    <div className="grid grid-cols-2 h-full w-full gap-4">
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          1톤 미만
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          1톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          1.4톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          2.5톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          3.5톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          5톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          8톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          11톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          14톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          18톤
                        </span>
                      </div>
                      <div className="border-solid border-[1px] border-[#D8D8D8] rounded-lg flex flex-col items-center justify-center">
                        <span className="text-[16px] font-semibold text-[#6D6D6D]">
                          25톤
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center w-full h-[70px] mt-5">
              <div>품목정보</div>
              <div>
                {/* radio text-[20px]으로*/}
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="파렛트"
                    control={<Radio />}
                    label="파렛트"
                  />
                  <FormControlLabel
                    value="박스"
                    control={<Radio />}
                    label="박스"
                  />
                  <FormControlLabel
                    value="기타"
                    control={<Radio />}
                    label="기타"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="w-full mt-8">
              <div>내용물 및 수량,요청사항 입력</div>
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="내용물 및 수량,요청사항을 입력하세요"
                  className="h-[50px]"
                />
              </div>
            </div>
          </ModalContent>
          <NextButton onClick={handleNextStep}>운임료 미리보기</NextButton>
        </ModalWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`fixed top-0 left-0 z-[10001] flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
`;

const ModalWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center bg-white rounded-lg px-[40px] pb-[50px] text-[18px]`}
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
  ${tw`flex items-center justify-between w-full h-[85px] mt-[30px] mb-[10px]`}
`;

const Title = styled.h2`
  ${tw`text-[24px] font-bold`}
`;

const ModalContent = styled.div`
  ${tw`flex flex-col items-center w-full h-full border border-solid rounded-xl px-[35px] py-[40px]`}
  border-color: #D1D1D1;
`;

const ModalInputWrap = styled.div`
  ${tw`w-full border-[1px] border-solid border-[#D1D1D1] rounded-[12px] px-[30px] relative`}
`;

const ModalInput = styled.input<ModalInputProps>`
  ${tw`w-full h-[56px] border-none outline-none py-[35px]`}
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? '1px solid #d1d1d1' : 'none'};
`;

const ModalSelect = styled.div`
  ${tw`border-solid border-[1px] border-[#d1d1d1] w-full rounded-[12px] py-5 px-10 flex justify-between items-center`}
`;

const NextButton = styled.div`
  ${tw`w-full h-[80px] bg-[#FFC73C] rounded-[12px] text-white mt-8 flex items-center justify-center cursor-pointer`}
`;

export default QuickStepOne;
