import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination, PaginationItem } from '@mui/material';
import styled from '@emotion/styled';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <div
      dir="ltr"
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pagination
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    </div>
  );
}

export default function TableBasic({
  rows,
  columns,
  onRowClick,
  selectionModel,
  setSelectionModel,
  checkbox = true,
}: any) {
  // console.log(selectionModel); // TODO checkbox value 제어
  const PAGE_SIZE = 13;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  return (
    <TableContainer>
      <DataGrid
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
            fontSize: 14,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
          '.MuiDataGrid-checkboxInput': {
            color: 'black',
          },
          '.MuiSvgIcon-root': {
            fontSize: 20,
            color: 'black',
          },
          '&.MuiDataGrid-root::-webkit-scrollbar': { display: 'none' },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
        }}
        rows={rows}
        columns={columns}
        checkboxSelection={checkbox}
        disableColumnMenu
        // autoHeight
        onRowClick={(row) => onRowClick(row)}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        hideFooterSelectedRowCount={true}
        rowSelectionModel={selectionModel}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          pagination: CustomPagination,
        }}
      />
    </TableContainer>
  );
}

const TableContainer = styled.div`
  height: 95%;
  width: 100%;
`;
