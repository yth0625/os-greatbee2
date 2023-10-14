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

export default function QuickServiceTable({
  rows,
  columns,
  onRowClick,
  selectionModel,
  setSelectionModel,
  checkbox = true,
}: any) {
  let PAGE_SIZE = 6;
  let rowheight = 0;
  let cellHeight = 0;
  let headerMB = 0;
  let tableWidth = '100%';

  if (window.innerWidth <= 768) {
    rowheight = 84;
    cellHeight = 64;
    headerMB = 6;
    tableWidth = '530px';
  } else if (window.innerWidth <= 1280) {
    rowheight = 56;
    cellHeight = 34;
    headerMB = 15;
    PAGE_SIZE = 8;
  } else if (window.innerWidth <= 1536) {
    rowheight = 56;
    cellHeight = 34;
    headerMB = 6;
    PAGE_SIZE = 6;
  } else {
    rowheight = 84;
    cellHeight = 64;
    headerMB = 6;
    PAGE_SIZE = 6;
  }

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <TableContainer>
      <DataGrid
        className="data_grid"
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-main': {
            width: `${tableWidth}`,
            overflowX: 'auto',
            overflow: 'auto',
          },
          '&.MuiDataGrid-root .MuiDataGrid-main > div': {
            width: `${window.innerWidth <= 768 ? `1132px !important` : 'auto'}`,
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
            background: '#FFC94C',
            minHeight: '50px !important',
            maxHeight: '50px !important',
            lineHeight: '50px !important',
            color: 'white',
            borderRadius: '16px',
            marginBottom: `${headerMB}px`,
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-withBorderColor': {
            MozBorderRadiusBottomright: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell':
            {
              minHeight: `${cellHeight}px !important`,
              maxHeight: `${cellHeight}px !important`,
              borderBottom: 'none !important',
            },
          '&.MuiDataGrid-root .MuiDataGrid-row': {
            minHeight: `${rowheight}px !important`,
            maxHeight: `${rowheight}px !important`,
            height: `${rowheight}px !important`,
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

          '.MuiDataGrid-footerContainer': {
            border: 'none',
            marginTop: '40px',
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
  height: 720px;
  width: 95%;

  @media screen and (max-width: 1536px) {
    width: 90%;
    height: 520px;
    [data-field='status'] {
      display: none;
    }
  }

  @media screen and (max-width: 1280px) {
    width: 100%;
    height: 650px;

    [data-field='status'] {
      display: none !important;
    }
  }

  @media screen and (max-width: 768px) {
    width: unset;

    [data-field='vendor'] {
      min-width: 80px !important;
    }
    [data-field='number'] {
      min-width: 180px !important;
    }
    [data-field='status'] {
      display: none !important;
    }
    [data-field='receiver'] {
      min-width: 80px !important;
    }

    [data-field='receiver_number'] {
      min-width: 180px !important;
    }

    [data-field='caller'] {
      min-width: 80px !important;
    }

    [data-field='caller_number'] {
      min-width: 180px !important;
    }

    [data-field='shipdate'] {
      min-width: 130px !important;
    }

    [data-field='cancle_wrap'] {
      min-width: 100px !important;
    }

    [data-field='statement_wrap'] {
      min-width: 100px !important;
    }
  }

  .data_grid {
    @media screen and (max-width: 768px) {
      .MuiDataGrid-columnHeaders {
        border-radius: 0px !important;
        background: #ffc94c;
        color: #fff !important;
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
