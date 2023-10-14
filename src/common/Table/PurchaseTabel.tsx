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

export default function PurchaseTable({
  rows,
  columns,
  onRowClick,
  selectionModel,
  setSelectionModel,
  checkbox = true,
  customCss,
}: any) {
  const PAGE_SIZE = 13;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  return (
    <TableContainer>
      <DataGrid
        className="data_grid"
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
            background: '#FFC94C',
            minHeight: '50px !important',
            maxHeight: '50px !important',
            lineHeight: '50px !important',
            color: customCss.color ? customCss.color : 'black',
            borderRadius: '16px',
            marginBottom: '6px',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-checkboxInput': {
            minWidth: '64px !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-checkboxInput .MuiSvgIcon-root': {
            color: '#D1D1D6',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader .Mui-checked .MuiSvgIcon-root' : {
            color: '#FFC73C',
          },
          '&.MuiDataGrid-root .MuiDataGrid-withBorderColor': {
            MozBorderRadiusBottomright: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell':
            {
              minHeight: '64px !important',
              maxHeight: '64px !important',
              borderBottom: 'none !important',
            },
          '&.MuiDataGrid-root .MuiDataGrid-row': {
            minHeight: '87px !important',
            maxHeight: '87px !important',
            height: '87px !important',
            color: '##1C1C1C',
            border: '1px solid #FFC94C',
            width: '99.5%',
            borderRadius: '16px',
            padding: '10px 0',
            marginBottom: '6px',
          },
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
            fontSize: 14,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
          '.MuiSvgIcon-root': {
            fontSize: 20,
            color: 'black',
          },
          '&.MuiDataGrid-root::-webkit-scrollbar': { display: 'none' },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cellCheckbox' : {
            minWidth: '64px !important',
            borderRight: '1px solid #ffc74c!important;'
          },
          '&.MuiDataGrid-root .MuiDataGrid-cellCheckbox .MuiSvgIcon-root' : {
            color: '#D1D1D6',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cellCheckbox .Mui-checked .MuiSvgIcon-root' : {
            color: '#FFC73C',
          },
        }}
        rows={rows}
        columns={columns}
        checkboxSelection={checkbox}
        disableColumnMenu
        // autoHeight
        onRowClick={(row) => onRowClick(row)}
        disableRowSelectionOnClick={true}
        // onRowSelectionModelChange={(ids) => {
        //   setSelectionModel(ids);
        // }}
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

  .data_grid {
    @media screen and (max-width: 768px) {
      .MuiDataGrid-columnHeaders {
        border-radius: 0px !important;
        background: #ffc94c;
      }

      .MuiDataGrid-row {
        border-radius: 0px !important;
        border-left: none !important;
        border-right: none !important;
        border-top: none !important;
      }
    }
  }
`;
