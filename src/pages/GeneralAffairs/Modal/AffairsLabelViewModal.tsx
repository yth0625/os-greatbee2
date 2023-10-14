import React from 'react';
import styled from '@emotion/styled';
import { Grid, Divider, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import { closeModal, openAlert } from 'redux/popUpReducer';
import ComplateModal from 'pages/GeneralAffairs/Modal/ComplatePopup';

const ModalContentWrapper = styled.div`
  width: 731px;
  @media screen and (max-width: 1536px) {
    width: 666px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const PopupButton = styled.button`
  width: 135px;
  height: 48px;
  background-color: #ffc73c;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 18px;
`;

const LabelViewModal = () => {
  const dispatch = useDispatch();
  const openComplateModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalContentWrapper>
      <div className="flex flex-col text-center space-y-6 items-center">
        <div className="flex w-full space-x-5">
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
        </div>
        <div className="flex w-full space-x-5">
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
        </div>
        <div className="flex w-full space-x-5">
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
          <div className="w-[50%] text-left">
            <div className="my-[10px]">
              <span>CJ대한통운 집하요청 물품정보</span>
            </div>
            <Divider />
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">받는분</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">김효진님</span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">배송지</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[24px]">
                  서울특별시 강남구
                </span>
              </div>
            </div>
            <div className="flex text-left items-center text-[#232323] my-[10px]">
              <div className="w-[30%]">
                <span className="font-medium text-[18px]">예약번호</span>
              </div>
              <div className="w-[70%]">
                <span className="font-medium text-[18px]">
                  1234567890387948
                </span>
              </div>
            </div>
            <ul className="text-left ml-[20px]">
              <li className="list-disc">본 물품은 ‘착지신용물품'입니다.</li>
              <li className="list-disc">
                본 라벨 위에 운송장을 부착해주세요 !
              </li>
              <li className="list-disc">CJ대한통운 기사님 감사합니다.</li>
            </ul>
          </div>
        </div>
        <PopupButton onClick={() => openComplateModal()}>확인</PopupButton>
      </div>
    </ModalContentWrapper>
  );
};

export default LabelViewModal;
