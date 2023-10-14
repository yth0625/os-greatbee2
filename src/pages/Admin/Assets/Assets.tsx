import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import TableBasic from 'common/Table/TableBasic';
import { InputStyle } from 'common/Input/FormStyle';
import Icon from 'styles/Icon';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import AssetsDetailModal from './AssetsDetailModal';

const columns: GridColDef[] = [
  {
    field: 'no',
    headerName: '자산관리코드',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheaderNo',
    align: 'center',
    flex: 1,
    cellClassName: (params) => {
      return 'gridcellNo';
    },
  },
  {
    field: 'item',
    headerName: '품목',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
  {
    field: 'itemName',
    headerName: '품목명',
    headerAlign: 'center',
    sortable: false,
    minWidth: 180,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
  {
    field: 'assingee1',
    headerName: '담당자',
    type: 'number',
    headerAlign: 'center',
    sortable: false,
    minWidth: 180,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {params.row.assignee1.name}
          <img
            src={params.row.assignee1.img}
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
    field: 'serialNumber',
    headerName: 'S/N',
    headerAlign: 'center',
    sortable: false,
    minWidth: 180,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
  {
    field: 'depositDt',
    headerName: '입금날짜',
    headerAlign: 'center',
    sortable: false,
    minWidth: 180,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
  {
    field: 'department',
    headerName: '사용부서',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
  {
    field: 'assignee',
    headerName: '담당자',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    cellClassName: 'gridcell',
  },
];

const rows = [
  {
    id: 1,
    no: '1782',
    item: '비품',
    itemName: '노트북',
    depositDt: '2023.03.11.',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 2,
    no: '1781',
    item: '비품',
    itemName: '노트북',
    depositDt: '2023.03.11.',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 3,
    no: '1780',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 4,
    no: '1779',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 5,
    no: '1778',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 6,
    no: '1777',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 7,
    no: '1776',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 8,
    no: '1775',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 9,
    no: '1774',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 10,
    no: '1773',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 11,
    no: '1772',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 12,
    no: '1771',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 13,
    no: '1770',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 14,
    no: '1769',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 15,
    no: '1768',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 16,
    no: '1767',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 17,
    no: '1766',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 18,
    no: '1765',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 19,
    no: '1764',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 20,
    no: '1763',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 21,
    no: '1762',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
    serialNumber: 'AB-12354981',
    department: '개발팀',
  },
  {
    id: 22,
    no: '1761',
    depositDt: '2023.03.11.',
    item: '비품',
    itemName: '노트북',
    assignee: '김꿀벌',
    assignee1: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
    department: '개발팀',
  },
];

const Assets = () => {
  const dispatch = useDispatch();

  const openAssetsDetailModal = (item: any) => {
    dispatch(
      openModal({
        modalMessage: {
          title: '자산 정보',
          content: <AssetsDetailModal item={item.row} />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
      }),
    );
  };

  return (
    <Container>
      <AssetsContainer>
        <div>
          <h1>자산관리</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', width: '26%' }}>
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
        </div>
        <TableContainer>
          <TableBasic
            rows={rows}
            columns={columns}
            onRowClick={openAssetsDetailModal}
            // setSelectionModel={checkRows}
            // selectionModel={selected}
            checkbox={false}
          />
        </TableContainer>
      </AssetsContainer>
    </Container>
  );
};

export default Assets;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  padding: 110px 50px 0px;
`;

const AssetsContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.white};
  border-radius: 16px;
  padding: 20px;
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  height: calc(100% - 60px);
  width: 100%;
  .gridheaderNo {
    color: ${colors.font.gray03};
    border-top: 1px solid ${colors.border.basic};
    border-left: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
  .gridheader {
    color: ${colors.font.gray03};
    border-top: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
  .gridcell {
    border-right: 1px solid ${colors.border.basic};
  }
  .gridcellNo {
    border-left: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
`;
