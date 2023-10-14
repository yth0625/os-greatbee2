import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { keyframes } from '@emotion/react';
import { closeModal, openModal } from 'redux/popUpReducer';
import { useNavigate } from 'react-router-dom';
import QuickServiceRequest from './../quickServiceRequest/QuickServiceRequest';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import Button from 'common/Button/Button';
import OrganizationChart from 'common/Chart/OrganizationChart';
import StampDepartment from './StampDepartment';

const MENU_ITEMS = [
  { path: '/generalaffairs/postal-registration', label: '우편물 등록' },
  { path: '/generalaffairs/courierReservation', label: '택배 발송 신청' },
  { path: '/generalaffairs/parcel-status', label: '택배 발송 현황' },
  {
    path: '/generalaffairs/quick-service-request',
    label: '퀵서비스 발송 신청',
  },
  { path: '/generalaffairs/quick-service-status', label: '퀵서비스 발송 현황' },
];
type chartData = {
  name: string;
  child: chartData[];
}
const mockUpChartItem: chartData = {
  name: 'CEO',
  child: [
    {
      name: '개발1팀',
      child: [
        {
          name: '개발3팀',
          child: []
        },
      ],
    },
    {
      name: '개발2팀',
      child: [
        {
          name: '개발4팀',
          child: [
            {
              name: '개발7팀',
              child: [
                {
                  name: '개발9팀',
                  child: []
                },
                {
                  name: '개발10팀',
                  child: []
                },
              ]
            },
            {
              name: '개발8팀',
              child: []
            }
          ]
        },
        {
          name: '개발6팀',
          child: [
            
          ]
        }
      ]
    },
    {
      name: '개발1팀',
      child: [
        {
          name: '개발3팀',
          child: []
        },
      ],
    },
  ],
}

type AffairsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const StampModal: FC<AffairsModalProps> = ({ isOpen, onClose }) => {
  const [animation, setAnimation] = useState(isOpen ? slideIn : slideOut);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setAnimation(slideIn);
    }
  }, [isOpen]);

  const onOpenModal = () => {
    dispatch(
        openModal({
            modalMessage: {
            title: '',
            content: <StampDepartment />,
            },
            hasConfirm: '아니오',
            confirmFn: () => console.log('click'),
        }),
    );
};

  return (
    <>
      <ModalContainer animate={animation}>
        <div className="h-[85px] flex justify-between">
          <div className="w-full h-full text-[#D8D8D8] bg-[#232325] flex items-center pl-[30px] text-[18px]">
            <span className="pr-[40px]">일반 총무</span>
            <span className="pr-[15px]">&gt;</span>
            <span className="text-[#FFC73C]">조직도</span>
          </div>
          <div className="w-[200px] h-full bg-[#FFC73C]"></div>
        </div>
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
              style={{ background: '#EEEEEE', paddingLeft: 40, width: '236px' }}
              placeholder="검색하세요"
            />
          </div>
          <Button
            hasCircleIcon={false}
            onClick={() => {}}
            outterStyles={{
              backgroundColor: '#EEE',
              borderColor: '#EEE',
            }}
            textStyles={{ color: 'black' }}
          >
            취소
          </Button>
          <Button 
            hasCircleIcon={false} 
            onClick={() => {onOpenModal()}}
            outterStyles={{
              backgroundColor: '#232325',
              borderColor: '#232325',
            }}
            textStyles={{ color: '#FFF' }}
          >
            확인
          </Button>
        </SearchContainer>
        <Divider />
        <OrganizationChart data={mockUpChartItem} isRoot={true} depth={0}/>
      </ModalContainer>
    </>
  );
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ModalContainer = styled.div<{ animate: string }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 776px;
  height: 100%;
  background: white;
  z-index: 999;
  animation: ${(props) => props.animate} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 504px;
  }
`;

const MenuItemContainer = styled.div`
  display: grid;
  padding: 50px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const MenuItem = styled.div`
  position: relative;
  width: 150px;
  height: 210px;
  border-radius: 13.41px;
  box-shadow: 0px 2.24px 2.24px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  padding-bottom: 20px;
  &::after {
    position: absolute;
    bottom: 20px;
    content: '';
    width: 114px;
    height: 1.5px;
    background-color: #5a5a5a;
  }

  &:hover {
    background-color: #ffc73c; // 추가
  }

  @media screen and (max-width: 768px) {
    width: 130px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin: 29px 48px 19.56px 37px;

`

const Divider = styled.div`
  height: 1px;
  background: #ABABAB;;
  z-index: 100;
  margin: 0 41px 20px 35px;
  position: relative;
`;

export default StampModal;
