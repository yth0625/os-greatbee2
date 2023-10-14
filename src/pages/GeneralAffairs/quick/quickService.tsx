import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import QuickServiceTable from 'common/Table/QuickServiceTable';
import CancelModal from 'pages/GeneralAffairs/Modal/cancelModal';
import StatementPopup from 'pages/GeneralAffairs/Modal/StatementPopup';

import { InputStyle } from 'common/Input/FormStyle';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';

const QuickService = () => {
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState<number>(0);
  const dispatch = useDispatch();

  const [rows, setRows] = useState<any>([]);
  const openCancelModal = (rowData: any) => {
    const { cancel_status, receiver } = rowData;

    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <CancelModal receiver={receiver} />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  const openStatementModal = (rowData: any) => {
    const { cancel_status, receiver } = rowData;

    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <StatementPopup />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: '송장번호',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.4,
      cellClassName: 'gridcell',
    },
    {
      field: 'status',
      headerName: '상태',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'receiver',
      headerName: '수신자',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'receiver_number',
      headerName: '수신자 연락처',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.35,
      cellClassName: 'gridcell',
    },
    {
      field: 'caller',
      headerName: '발신자',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'caller_number',
      headerName: '발신자 연락처',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.35,
      cellClassName: 'gridcell',
    },
    {
      field: 'shipdate',
      headerName: '발송일',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'cancle_wrap',
      headerName: '취소',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
      renderCell: (params) => {
        let { cancel_status } = params.row;
        return (
          <TableButton onClick={() => openCancelModal(params.row)}>
            {cancel_status == 'complate' ? '발송완료' : '예약취소'}
          </TableButton>
        );
      },
    },
    {
      field: 'statement_wrap',
      headerName: '거래명세서',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
      renderCell: (params) => {
        let { cancel_status } = params.row;
        return (
          <TableButton onClick={() => openStatementModal(params.row)}>
            확인
          </TableButton>
        );
      },
    },
  ];

  useEffect(() => {
    let titleFont = 32;

    if (window.innerWidth <= 768) {
    } else if (window.innerWidth <= 1280) {
    } else if (window.innerWidth <= 1536) {
    } else {
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
      } else if (window.innerWidth <= 1280) {
      } else if (window.innerWidth <= 1536) {
      } else {
      }
    });

    // 예시 데이터
    const exampleRows = [
      {
        id: 1,
        number: '20230711141311511',
        status: '배송중',
        receiver: '홍길동',
        receiver_number: '010-1234-5678',
        caller: '김철수',
        caller_number: '010-9876-5432',
        shipdate: '2023-08-27',
        cancel_status: 'complate',
      },
      {
        id: 2,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'complate',
      },
      {
        id: 3,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'complate',
      },
      {
        id: 4,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'cancel',
      },
      {
        id: 5,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'cancel',
      },
      {
        id: 6,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'cancel',
      },
      {
        id: 7,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'cancel',
      },
      {
        id: 8,
        number: '20230711141311511',
        status: '배송완료',
        receiver: '이영희',
        receiver_number: '010-5555-5555',
        caller: '박민수',
        caller_number: '010-7777-7777',
        shipdate: '2023-08-25',
        cancel_status: 'cancel',
      },
    ];

    setRows(exampleRows);

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <Box>
      <AdminContainer>
        <div className="2xl:mb-[1.5em] flex relative items-center mb-0">
          <div className="flex">
            <TitleElem className="text-[32px]">퀵 서비스 발송 현황</TitleElem>
          </div>
          <CloseWarp>
            <Icon iconName="close" width={32} height={32} />
          </CloseWarp>
          <InputWarp className="flex flex-col justify-center items-center ml-auto ">
            <div className="w-[240px] ml-auto mt-[1em] mb-[2em] xl:mt-[.1em] xl:mb-[.5em] xl:mr-[5%] 2xl:mb-0">
              <div style={{ position: 'relative' }} className="w-[100%]">
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
            </div>
          </InputWarp>
        </div>
        <TableContainer>
          <QuickServiceTable
            rows={rows}
            columns={columns}
            checkbox={false}
            onRowClick={() => console.log('')}
          />
        </TableContainer>
      </AdminContainer>
    </Box>
  );
};

export default QuickService;

const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #eeeeee;
`;

const AdminContainer = styled.div`
  background: ${colors.bg.white} !important;
  border-radius: 16px;
  margin: 20px;
  padding: 30px;
  margin-top: 105px;
  height: calc(100% + 105px);

  @media screen and (max-width: 1536px) {
  }

  @media screen and (max-width: 1280px) {
    margin-left: 120px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 120px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 10px;
  width: 100%;

  .gridcell {
    border-right: 1px solid ${colors.primary.basic} !important;
  }
  .gridcellNo {
    border-right: 1px solid ${colors.primary.basic} !important;
  }

  @media screen and (max-width: 1536px) {
    align-items: center;
    justify-items: center;
  }

  @media screen and (max-width: 1280px) {
    width: 95%;
    align-items: center;
    justify-items: center;
  }

  @media screen and (max-width: 768px) {
  }
`;

const TableButton = styled.button`
  width: 100%;
  background-color: #ffc73c;
  color: #fff;
  height: 56px;
  border-radius: 12px;

  @media screen and (max-width: 1536px) {
    height: 36px;
    border-radius: 16px;
  }

  @media screen and (max-width: 1280px) {
    height: 36px;
    border-radius: 16px;
  }

  @media screen and (max-width: 768px) {
  }
`;

const TitleElem = styled.span`
  font-size: 32px;
  @media screen and (max-width: 1536px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1280px) {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
  }
`;

const CloseWarp = styled.div`
  display: block;
  position: absolute;
  top: -15px;
  right: -15px;

  @media screen and (max-width: 1536px) {
    display: none;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const InputWarp = styled.div`
  margin-top: 2.5em;

  @media screen and (max-width: 1536px) {
    margin-top: 0;
  }

  @media screen and (max-width: 1280px) {
    margin-right: 5%;
    margin-top: 2.5em;
  }

  @media screen and (max-width: 768px) {
  }
`;

// xl:mr-[5%] !mr-0 xl:mt-[2.5em]
