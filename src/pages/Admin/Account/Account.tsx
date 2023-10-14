import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import './Account.css';
import { Link } from 'react-router-dom';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import Button from 'common/Button/Button';

import TableBasic from 'common/Table/TableBasic';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { openAlert, openModal } from 'redux/popUpReducer';
import AccountModal from './AccountModal';
import AccountEditModal from './AccountEditModal';
import RegistAccount from './RegistAccount';
import colors from 'styles/colors';

const columns: GridColDef[] = [
  {
    field: 'email',
    headerName: '계정',
    width: 200,
    sortable: false,
    headerClassName: 'gridheader',
  },
  {
    field: 'firstName',
    headerName: '이름',
    width: 70,
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {params.row.firstName.name}
          <img
            src={params.row.firstName.img}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              objectFit: 'cover',
              marginLeft: 3,
            }}
          ></img>
        </div>
      );
    },
  },
  {
    field: 'department',
    headerName: '부서',
    width: 70,
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
  },
  {
    field: 'position',
    headerName: '직책',
    type: 'number',
    width: 70,
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
  },
  {
    field: 'level',
    headerName: '레벨',
    sortable: false,
    headerAlign: 'center',
    width: 60,
    headerClassName: 'gridheader',
    align: 'center',
    renderCell: (params) => {
      return <LevelTag>{params.row.level}</LevelTag>;
    },
  },
];

const rows = [
  {
    id: 1,
    email: 'steven@greatbee.kr',
    department: '총무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '팀장',
    level: 1,
  },
  {
    id: 2,
    email: 'steven@greatbee.kr',
    department: '총무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '연구원',
    level: 2,
  },
  {
    id: 3,
    email: 'steven@greatbee.kr',
    department: '재무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '팀장',
    level: 3,
  },
  {
    id: 4,
    email: 'steven@greatbee.kr',
    department: '재무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '사원',
    level: 1,
  },
  {
    id: 5,
    email: 'steven@greatbee.kr',
    department: '인사팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '연구원',
    level: 3,
  },
  {
    id: 6,
    email: 'steven@greatbee.kr',
    department: '총무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '사원',
    level: 4,
  },
  {
    id: 7,
    email: 'steven@greatbee.kr',
    department: '재무팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '사원',
    level: 2,
  },
  {
    id: 8,
    email: 'steven@greatbee.kr',
    department: '인사팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '팀장',
    level: 3,
  },
  {
    id: 9,
    email: 'steven@greatbee.kr',
    department: '인사팀',
    firstName: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    position: '팀장',
    level: 1,
  },
];

const Account = () => {
  const [data, setData] = useState<any>([]);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([1, 2]);
  const dispatch = useDispatch();

  const clearSelectData = () => {
    setSelectionModel([]);
    setSelected([]);
  };

  const checkRows = (ids: number[]) => {
    setSelected(ids);
    let newarray = [];
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (rows[i].id === ids[j]) {
          newarray.push(rows[i]);
        }
      }
    }
    setSelectionModel(newarray);
  };

  const refineData = () => {
    let array = new Array(160).fill(1);
    array.splice(29, 1, {
      icon: 'organize',
      text: '조직도 관리',
      path: '/',
    });
    array.splice(42, 1, {
      icon: 'stamp',
      text: '인감관리',
      path: '/',
    });
    array.splice(43, 1, {
      icon: 'manageAssets',
      text: '자산관리',
      path: '/',
    });
    array.splice(54, 1, {
      icon: 'cloud',
      text: '워크플로',
      path: '/',
    });
    array.splice(55, 1, {
      icon: 'usecase',
      text: '사용현황',
      path: '/',
    });
    array.splice(56, 1, {
      icon: 'authorization',
      text: '권한관리',
      path: '/',
    });
    array.splice(68, 1, {
      icon: 'admin',
      text: '계정관리',
      path: '/admin/account',
    });
    array.splice(69, 1, {
      icon: 'cartfill',
      text: '구매관리',
      path: '/admin/purchase',
    });
    array.splice(81, 1, {
      icon: 'authorization',
      text: '권한관리',
      path: '/',
    });
    setData(array);
  };

  const openAccountModal = (item: any) => {
    dispatch(
      openModal({
        modalMessage: {
          title: '계정(세부정보)',
          content: <AccountModal item={item.row} />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
      }),
    );
  };

  const openRegistAccountModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '계정등록',
          content: <RegistAccount />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
      }),
    );
  };

  const openEditMultipleItemsModal = () => {
    if (selectionModel.length < 1) {
      return;
    } else {
      dispatch(
        openModal({
          modalMessage: {
            title: '계정수정',
            content: (
              <AccountEditModal
                data={selectionModel}
                clearSelectData={clearSelectData}
              />
            ),
          },
          hasConfirm: '아니오',
          confirmFn: () => console.log(''),
        }),
      );
    }
  };

  const openDeleteAlert = () => {
    if (selectionModel.length < 1) {
      return;
    } else {
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              계정 삭제는 마스터의 승인이 필요합니다.
              <br /> <div style={{ marginTop: 5 }}>삭제 요청하시겠습니까?</div>
            </div>
          ),
          hasConfirm: true,
          confirmFn: () => console.log('confirm'),
          onClick: () => console.log('click'),
        }),
      );
    }
  };

  useEffect(() => {
    refineData();
  }, []);

  return (
    <Container>
      <AccountContainer>
        <GridMain>
          <GridContainer className="accountcontainer">
            {data.length > 0
              ? data.map((item: any, i: number) => {
                  if (
                    i === 29 ||
                    i === 42 ||
                    i === 43 ||
                    i === 54 ||
                    i === 55 ||
                    i === 56 ||
                    i === 68 ||
                    i === 69 ||
                    i === 81
                  ) {
                    return (
                      <Link to={item.path} key={i}>
                        <div
                          className={
                            item.text === '계정관리'
                              ? 'accountselected'
                              : 'accounthascontent'
                          }
                          key={i}
                        >
                          <div className="accountitemicon">
                            <Icon
                              iconName={item.icon}
                              style={{ position: 'absolute', zIndex: 999 }}
                              width={50}
                              height={50}
                              color={'white'}
                            />
                          </div>
                          <span className="accountitemtext">{item.text}</span>
                        </div>
                      </Link>
                    );
                  } else {
                    return <div className="accounthasnocontent" key={i} />;
                  }
                })
              : null}
          </GridContainer>
        </GridMain>
      </AccountContainer>
      <DataContainer>
        <Title>계정 | 854 / 1000</Title>
        <EditBox>
          <EditButtons>
            <Button
              outterStyles={{
                marginRight: 6,
                background: '#EEEEEE',
                border: 'none',
              }}
              textStyles={{ color: '#000' }}
              onClick={openRegistAccountModal}
            >
              등록
            </Button>
            <Button
              outterStyles={{
                marginRight: 6,
                background: '#EEEEEE',
                border: 'none',
              }}
              textStyles={{ color: '#000' }}
              onClick={openEditMultipleItemsModal}
            >
              수정
            </Button>
            <Button
              outterStyles={{
                marginRight: 6,
                background: '#EEEEEE',
                border: 'none',
              }}
              textStyles={{ color: '#000' }}
              onClick={openDeleteAlert}
            >
              삭제
            </Button>
            <Button outterStyles={{ background: '#000', border: 'none' }}>
              다운로드
            </Button>
          </EditButtons>
          <div style={{ position: 'relative', width: '30%' }}>
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
              style={{ background: '#EEEEEE', paddingLeft: 40 }}
              placeholder="검색하세요"
            />
          </div>
        </EditBox>
        <TableContainer>
          <TableBasic
            rows={rows}
            columns={columns}
            onRowClick={openAccountModal}
            setSelectionModel={checkRows}
            selectionModel={selected}
          />
        </TableContainer>
      </DataContainer>
    </Container>
  );
};

export default Account;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const AccountContainer = styled.div`
  // overflow: hidden;
  height: 2000px;
  width: 2200px;
  position: fixed;
`;

const GridMain = styled.div`
  display: flex;
  width: 120%;
  margin-top: -220px;
  margin-left: -170px;
`;

const GridContainer = styled.div`
  font-size: 0;
`;

const DataContainer = styled.div`
  position: absolute;
  background: ${colors.bg.white};
  padding: 2.5rem 3rem;
  margin-top: 88px;
  height: 92vh;
  right: 0;
  box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1440px) {
    margin-top: 80px;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ababab;
`;

const EditBox = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EditButtons = styled.div`
  width: 70%;
  dipslay: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 75vh;
  .gridheader {
    color: ${colors.font.gray03};
  }
`;

const LevelTag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${colors.bg.black};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
