import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { InputStyle } from 'common/Input/FormStyle';
import Icon from 'styles/Icon';
import TableBasic from 'common/Table/TableBasic';
import { GridColDef } from '@mui/x-data-grid';

import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import AnnouncementModal from 'pages/Home/AnnouncementModal';

const columns: GridColDef[] = [
  {
    field: 'no',
    headerName: '번호',
    headerAlign: 'center',
    sortable: false,
    width: 140,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
  },
  {
    field: 'status',
    headerName: '제목',
    headerAlign: 'center',
    sortable: false,
    minWidth: 700,
    headerClassName: 'gridheader',
    align: 'left',
    flex: 1,
  },
  {
    field: 'title',
    headerName: '작성일',
    headerAlign: 'center',
    sortable: false,
    width: 140,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
  },
  {
    field: 'writer',
    headerName: '작성자',
    type: 'number',
    headerAlign: 'center',
    sortable: false,
    width: 140,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 1,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {params.row.writer.name}
          <img
            src={params.row.writer.img}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              objectFit: 'cover',
              marginLeft: 3,
            }}
            alt={"작성자"}
          />
        </div>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    no: '1782',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 2,
    no: '1781',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 3,
    no: '1780',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 4,
    no: '1779',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 5,
    no: '1778',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 6,
    no: '1777',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 7,
    no: '1776',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 8,
    no: '1775',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 9,
    no: '1774',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 10,
    no: '1773',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 11,
    no: '1772',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 12,
    no: '1771',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 13,
    no: '1770',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 14,
    no: '1769',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 15,
    no: '1768',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 16,
    no: '1767',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 17,
    no: '1766',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 18,
    no: '1765',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 19,
    no: '1764',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 20,
    no: '1763',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 21,
    no: '1762',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 22,
    no: '1761',
    title: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
];

const Notice = () => {
  const dispatch = useDispatch();

  const openAnnounceModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '공지사항',
          content: <AnnouncementModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  return (
    <Container>
      <NoticeContainer>
        <div>
          <h1>공지사항</h1>
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
            onRowClick={openAnnounceModal}
            checkbox={false}
          />
        </TableContainer>
      </NoticeContainer>
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  margin-top: var(--header-height);
  padding: 30px 50px;
  width: 100%;
  height: calc(100vh - 100px);
`;

const NoticeContainer = styled.div`
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
  margin-top: 10px;
  height: calc(100% - 30px);
  width: 100%;
  .gridheader {
    color: ${colors.font.gray03};
  }
`;
