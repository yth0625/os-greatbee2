import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import { Link, useLocation } from 'react-router-dom';
import colors from 'styles/colors';
import AffairsModal from './Modal/AffairsModal';
import StampModal from './Modal/StampModal';
import SealsModal from './Modal/SealsModal';

const GeneralAffairs = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState('');

  const location = useLocation();

  useEffect(()=>{
    switch (location.hash){
      case '#stampModal': 
        setModalOpen('stampModal');
        break;
      case '#SealsModal': 
        setModalOpen('SealsModal');
        break;
      default:
        break;
    }
  },[location])

  const openModal = (name: string) => {
    setModalOpen(name);
  };
  const closeModal = () => {
    setModalOpen('');
    if(window.location.hash) {
      window.history.replaceState("", document.title, window.location.pathname);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      let newIndex = 0;
      let additionalIndex = 0;
      if (window.innerWidth <= 768) {
        newIndex = 45;
        additionalIndex = 15;
      } else if (window.innerWidth <= 1280) {
        newIndex = 31;
        additionalIndex = 10;
      } else if (window.innerWidth <= 1536) {
        newIndex = 32;
        additionalIndex = 5;
      } else {
        newIndex = 28;
        additionalIndex = 5;
      }

      refineData(newIndex, additionalIndex);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const indexMapping: { [key: string]: number[] } = {
    '768': [-5, -4, -3, 14, 15, 16, 32, 33, 34, 51, 52, 53, 69, 70, 71],
    '1280': [12, 13, 14, 15, 32, 33, 34, 51, 52, 53, 54, 71, 72, 73, 74],
    '1536': [8, 9, 10, 11, 27, 28, 29, 45, 46, 47, 48, 64, 65, 66, 67],
    '1920': [2, 3, 4, 5, 6, 16, 17, 18, 19, 20, 30, 31, 32, 33, 34],
  };

  const refineData = (baseIndex: number, additionalIndex: number) => {
    const width = window.innerWidth;
    let mapping: number[] = [];
    if (width <= 768) {
      mapping = indexMapping['768'];
    } else if (width <= 1280) {
      mapping = indexMapping['1280'];
    } else if (width <= 1536) {
      mapping = indexMapping['1536'];
    } else {
      mapping = indexMapping['1920'];
    }

    setIndex(baseIndex);
    let array = new Array(150).fill(1);
    const items = [
      { icon: 'organize', text: 'Help Desk', path: '/generalaffairs' },
      { icon: 'stamp', text: '조직도', path: '/generalaffairs', modal: 'StampModal' },
      { icon: 'manageAssets', text: '인감', path: '/generalaffairs', modal: 'SealsModal' },
      { icon: 'mgpurchase', text: '도와줘요 119', path: '/generalaffairs' },
      { icon: 'purchasehistory', text: '공지', path: '/generalaffairs' },
      {
        icon: 'authorization',
        text: '업무용 차량 예약',
        path: '/generalaffairs',
      },
      { icon: 'admin', text: '운영현황', path: '/generalaffairs' },
      {
        icon: 'cartfill',
        text: '문서 수발',
        path: '/generalaffairs',
        modal: 'AffairsModal',
      },
      {
        icon: 'authorization',
        text: 'Guest 방문 예약',
        path: '/generalaffairs',
      },
      { icon: 'authorization', text: '출입 신청', path: '/generalaffairs' },
      { icon: 'authorization', text: '공간', path: '/generalaffairs' },
      { icon: 'authorization', text: '주차', path: '/generalaffairs' },
      { icon: 'authorization', text: '회의실 예약', path: '/generalaffairs' },
      { icon: 'authorization', text: '명함 신청', path: '/generalaffairs' },
      { icon: 'authorization', text: '좌석 배치도', path: '/generalaffairs' },
    ];

    items.forEach((item, i) => {
      array.splice(baseIndex + mapping[i], 1, item);
    });

    setData(array);
  };

  return (
    <Box>
      <AdminContainer>
        <GridMain>
          <Container>
            {data.length > 0
              ? data.map((item: any, i: number) => {
                  return item.path ? (
                    <Link to={item.path} key={i}>
                      <HasContent
                        onClick={(e) => {
                          switch (item.modal){
                            case 'AffairsModal': 
                              e.preventDefault();
                              openModal('affairsModal');
                              break;
                            case 'StampModal':
                              e.preventDefault();
                              openModal('stampModal');
                              break;
                            case 'SealsModal':
                              e.preventDefault();
                              openModal('SealsModal');
                              break;
                            default:
                              e.preventDefault();
                              closeModal();
                              break;

                          }
                        }}
                      >
                        <ItemIcon>
                          <Icon
                            iconName={item.icon}
                            style={{ position: 'absolute', zIndex: 999 }}
                            width={70}
                            height={70}
                            color={'white'}
                          />
                        </ItemIcon>
                        <ItemText>{item.text}</ItemText>
                      </HasContent>
                    </Link>
                  ) : (
                    <HasNoContent key={i} />
                  );
                })
              : null}
          </Container>
        </GridMain>
      </AdminContainer>
      {isModalOpen === 'affairsModal' && <AffairsModal isOpen={isModalOpen === 'affairsModal'} onClose={closeModal} />}
      {isModalOpen === 'stampModal' && <StampModal isOpen={isModalOpen === 'stampModal'} onClose={closeModal} />}
      {isModalOpen === 'SealsModal' && <SealsModal isOpen={isModalOpen === 'SealsModal'} onClose={closeModal} />}
    </Box>
  );
};

export default GeneralAffairs;

const Box = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const AdminContainer = styled.div`
  height: 100vh;
  width: 3000px;
  background: ${colors.bg.basic};
`;

const GridMain = styled.div`
  --s: 235px;
  display: flex;
  width: 120%;
  margin-top: -340px;
  margin-left: -200px;

  @media screen and (max-width: 1536px) {
    --s: 180px;
    --m: 0.35rem;
    margin-top: -235px;
    margin-left: -240px;
  }

  @media screen and (max-width: 1280px) {
    --s: 170px;
    --m: 0.35rem;
    margin-top: -220px;
    margin-left: -400px;
  }

  @media screen and (max-width: 768px) {
    --s: 136px;
    --m: 0.2rem;
    width: 90%;
    margin-top: -190px;
    margin-left: -200px;
  }
`;

const Container = styled.div`
  font-size: 0;
  &::before {
    content: '';
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(
      #0000 0 calc(var(--f) - 3px),
      #000 0 var(--f)
    );
  }
`;

const HasContent = styled.div`
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  background-image: url('/images/basepiece.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);

  &:hover {
    transform: scale(1.06);
    transition: transform 500ms;
    cursor: pointer;
  }
`;

const HasNoContent = styled.div`
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  background-image: url('/images/polygon.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
`;

const ItemIcon = styled.div`
  top: 90px;
  right: 64%;
  position: absolute;

  @media screen and (max-width: 1536px) {
    top: 60px;
    right: 67%;
  }
  @media screen and (max-width: 1280px) {
    top: 50px;
    right: 70%;
  }
  @media screen and (max-width: 768px) {
    top: 35px;
    right: 75%;
  }
`;

const ItemText = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 195px;
  font-size: 2rem;
  color: #555;
  font-weight: 700;
  position: absolute;

  @media screen and (max-width: 1536px) {
    margin-top: 145px;
    font-size: 19px;
  }
  @media screen and (max-width: 1280px) {
    margin-top: 135px;
    font-size: 17px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 110px;
    font-size: 13px;
  }
`;
