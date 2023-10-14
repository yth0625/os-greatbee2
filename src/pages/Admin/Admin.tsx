import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import './Admin.css';
import Icon from 'styles/Icon';
import { Link } from 'react-router-dom';
import colors from 'styles/colors';

const Admin = () => {
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState<number>(0);

  const refineData = (index: number) => {
    setIndex(index);
    let array = new Array(150).fill(1);
    // array.splice(37, 1, {
    //   icon: 'organize',
    //   text: '조직도 관리',
    //   path: '/organization',
    // });
    // array.splice(38, 1, {
    //   icon: 'stamp',
    //   text: '인감관리',
    //   path: '/',
    // });
    // array.splice(52, 1, {
    //   icon: 'manageAssets',
    //   text: '자산관리',
    //   path: '/admin/assets',
    // });
    array.splice(index, 1, {
      icon: 'mgpurchase',
      text: '구매 진행 현황',
      path: '/admin/purchase',
    });
    array.splice(index + 1, 1, {
      icon: 'purchasehistory',
      text: '구매 내역 관리',
      path: '/admin/purchasehistory',
    });
    // array.splice(55, 1, {
    //   icon: 'authorization',
    //   text: '권한관리',
    //   path: '/',
    // });
    // array.splice(56, 1, {
    //   icon: 'admin',
    //   text: '계정관리',
    //   path: '/admin/account',
    // });
    // array.splice(70, 1, {
    //   icon: 'cartfill',
    //   text: '구매관리',
    //   path: '/admin/purchase',
    // });
    // array.splice(71, 1, {
    //   icon: 'authorization',
    //   text: '권한관리',
    //   path: '/',
    // });
    setData(array);
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      refineData(45);
    } else if (window.innerWidth <= 1280) {
      refineData(31);
    } else if (window.innerWidth <= 1536) {
      refineData(32);
    } else {
      refineData(28);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        refineData(45);
      } else if (window.innerWidth <= 1280) {
        refineData(31);
      } else if (window.innerWidth <= 1536) {
        refineData(32);
      } else {
        refineData(28);
      }
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <Box>
      <AdminContainer>
        <GridMain>
          <Container className="container">
            {data.length > 0
              ? data.map((item: any, i: number) => {
                  // TODO 구매만 남겨두고 모두 삭제 (2023.05.14)
                  if (i === index || i === index + 1) {
                    return (
                      <Link to={item.path} key={i}>
                        <div className="hascontent" key={i}>
                          <div className="itemicon">
                            <Icon
                              iconName={item.icon}
                              style={{ position: 'absolute', zIndex: 999 }}
                              width={70}
                              height={70}
                              color={'white'}
                            />
                          </div>
                          <span className="itemtext">{item.text}</span>
                        </div>
                      </Link>
                    );
                  } else {
                    return <div className="hasnocontent" key={i} />;
                  }
                })
              : null}
          </Container>
        </GridMain>
      </AdminContainer>
    </Box>
  );
};

export default Admin;

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
  display: flex;
  width: 120%;
  margin-top: -95px;
  margin-left: -200px;

  @media screen and (max-width: 1536px) {
    margin-top: -115px;
  }

  @media screen and (max-width: 1280px) {
    margin-top: -95px;
  }

  @media screen and (max-width: 768px) {
    margin-top: -160px;
  }
`;

const Container = styled.div`
  font-size: 0;
`;
