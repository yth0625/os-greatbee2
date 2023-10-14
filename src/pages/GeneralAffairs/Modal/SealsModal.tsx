import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import StampImportModal from './StampImportModal';
import StampExportModal from './StampExportModal';

const MENU_ITEMS = [
  { path: '/generalaffairs/stamp-import-request', label: '인감 날인 요청' },
  { path: '/generalaffairs/stamp-export-request', label: '인감 반출 요청' },
  { path: '', label: '' },
  { path: '', label: '' },
  { path: '', label: '' },
  { path: '', label: '' },
  { path: '', label: '' },
  { path: '', label: '' },
];

type SealsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SealsModal: FC<SealsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(isOpen ? slideIn : slideOut);
  const [isModalOpen, setModalOpen] = useState('');

  const handleItemClick = (path: string) => {
    if (path === '/generalaffairs/stamp-import-request') {
      setModalOpen('StampImportModal');
    } else if (path === '/generalaffairs/stamp-export-request'){
      setModalOpen('StampExportModal');
    } else {
      navigate(path);
    }
  };


  return (
    <>
      <ModalContainer animate={animation}>
        <div className="h-[85px] flex justify-between">
          <div className="w-full h-full text-[#D8D8D8] bg-[#232325] flex items-center pl-[30px] text-[18px]">
            <span className="pr-[40px]">일반 총무</span>
            <span className="pr-[15px]">&gt;</span>
            <span className="text-[#FFC73C]">인감</span>
          </div>
          <div className="w-[200px] h-full bg-[#FFC73C]"></div>
        </div>
        <MenuItemContainer>
          {MENU_ITEMS.map((item, index) => (
            <>
            {item.label.length > 0 ? <MenuItem key={index} onClick={() => handleItemClick(item.path)}>
              {item.label}
              </MenuItem>
                : <EmptyItem><img src="/src/pages/GeneralAffairs/asset/big-plus.svg" alt="" /></EmptyItem>
            }
            </>

          ))}
        </MenuItemContainer>
      </ModalContainer>
      {isModalOpen === 'StampImportModal' && (
        <StampImportModal
          onModalClose={() => onClose()} onClose={() => setModalOpen('')} />
      )}
      {isModalOpen === 'StampExportModal' && (
        <StampExportModal
          onModalClose={() => onClose()} onClose={() => setModalOpen('')} />
      )}
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
  z-index: 1000;
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

const EmptyItem = styled.div`
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

  &:hover {
    background-color: #ffc73c; // 추가
  }

  @media screen and (max-width: 768px) {
    width: 130px;
  }
`;

export default SealsModal;
