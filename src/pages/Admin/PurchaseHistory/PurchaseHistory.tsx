import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import colors from 'styles/colors';
import { InputStyle } from 'common/Input/FormStyle';
import { GridColDef } from '@mui/x-data-grid';
import Icon from 'styles/Icon';
import Button from 'common/Button/Button';
import PurchaseTable from 'common/Table/PurchaseTabel';
import moment from 'moment';
import SelectBasic from 'common/Select/SelectBasic';

import {
  getPaymentBillInfoApi,
  useGetPaymentInfoApi,
} from '../../../api/useEprocurementApi';
import PrintInvoice, { InvoiceData } from '../../Eprocurement/PrintInvoice';
import {
  IPaymentBillInfoRes,
  IPaymentInfoRes,
} from '../../../interfaces/eprocurement';
import { AxiosResponse } from 'axios';

const filterButtonGroup = [
  {
    text: '최근 1개월',
    value: moment(new Date()).subtract(1, 'months').format('YYYYMMDD'),
  },
  {
    text: '최근 3개월',
    value: moment(new Date()).subtract(3, 'months').format('YYYYMMDD'),
  },
  {
    text: '최근 6개월',
    value: moment(new Date()).subtract(6, 'months').format('YYYYMMDD'),
  },
  {
    text: '2023년',
    value: '20230101',
  },
  {
    text: '전체',
    value: '20230501',
  },
];

const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');

const PurchaseHistory = () => {
  const year = moment(new Date()).format('YYYY');
  const [selectedCategory, setSelectedCategory] = useState({
    label: '최근 1개월',
    value: 0,
  });

  const categotyOptions = [
    { label: '최근 1개월', value: 0 },
    { label: '최근 3개월', value: 1 },
    { label: '최근 6개월', value: 2 },
    { label: `${year}년`, value: 3 },
    { label: '전체', value: 4 },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState(filterButtonGroup[4]);
  const [rows, setRows] = useState<any>([]);

  const [purchaser, setPurchaser] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);
  const [isShowPrintView, setIsShowPrintView] = useState(false);

  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: '구매번호',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheaderNo',
      align: 'center',
      flex: 0.13,
      cellClassName: (params) => {
        return 'gridcellNo';
      },
    },

    {
      field: 'itemInfo',
      headerName: '품목정보',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'writer',
      headerName: '기안',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.13,
      cellClassName: 'gridcell',
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>{params.value.name}</div>
            <div>{params.value.date}</div>
          </div>
        );
      },
    },
    {
      field: 'price',
      headerName: '총 상품 가격',
      type: 'number',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.15,
      cellClassName: 'gridcell',
    },
    {
      field: 'deliveryfee',
      headerName: '배송비',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.1,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderOrderButton value={params} />,
    },
    {
      field: 'status',
      headerName: '진행 현황',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.1,
      cellClassName: 'gridcell',
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>{params.value.status}</div>
            <div>{params.value.date}</div>
          </div>
        );
      },
    },
    {
      field: 'etc',
      headerName: '',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.2,
      minWidth: 280,
      cellClassName: 'gridcellLast',
      renderCell: (params) => (
        <div>
          <Button
            outterStyles={{
              padding: '10px 20px',
              border: 'none',
              marginRight: 10,
            }}
            textStyles={{ color: colors.font.basic, fontWeight: '400' }}
            onClick={() => {
              console.log('open:', params.value.receiptUrl);

              const option =
                'width=900, height=600, location=no, status=no, menubar=no, toolbar=no, resizable=yes, scrollbars = yes ';
              window.open(params.value.receiptUrl, '카드영수증', option);
            }}
          >
            카드영수증
          </Button>
          <Button
            outterStyles={{
              padding: '10px 20px',
              backgroundColor: '#FFC74C',
              border: 'none',
            }}
            textStyles={{ color: colors.font.basic, fontWeight: '400' }}
            onClick={async () => {
              const res: AxiosResponse = await getPaymentBillInfoApi(
                params.value.paymentNo,
              );
              const paymentBillInfoList = res.data
                .data as IPaymentBillInfoRes[];

              if (paymentBillInfoList && paymentBillInfoList.length > 0) {
                setPurchaser(paymentBillInfoList[0].buyer);
                setPurchaseDate(
                  moment(paymentBillInfoList[0].buyDttm).format(
                    'YYYY년 MM월 DD일',
                  ),
                );

                const newInvoiceData = paymentBillInfoList.map(
                  (item: IPaymentBillInfoRes) => {
                    return {
                      productName: item.productNm,
                      count: item.sellingCount,
                      unitPrice: item.sellingAmount / item.sellingCount,
                      supplyValue: item.supplyAmount,
                      taxAmount: item.taxAmount,
                    };
                  },
                );

                setInvoiceData(newInvoiceData);
                setIsShowPrintView(true);
              }
            }}
          >
            거래명세서
          </Button>
        </div>
      ),
    },
  ];

  const {
    data: paymentInfoList,
    // isLoading: isPaymentInfoListLoading,
    // refetch: refetchPaymentInfoList,
  } = useGetPaymentInfoApi(selectedPeriod.value, tomorrow, 'Y');

  useEffect(() => {
    if (paymentInfoList) {
      const newRows = paymentInfoList.map((item: IPaymentInfoRes, index) => {
        const orderDate = moment(item.rgtDttm).format('YYYY.MM.DD');

        return {
          id: index,
          number: item.paymentNo,
          category: '-',
          itemInfo: item.itemNm,
          writer: {
            name: '-',
            date: '',
          },
          price: item.amount,
          deliveryfee: '-',
          status: {
            status: '발주완료',
            date: orderDate,
          },
          etc: {
            receiptUrl: item.receiptURL,
            paymentNo: item.paymentNo,
          },
        };
      });

      setRows(newRows);
    }
  }, [paymentInfoList]);

  return (
    <Container>
      <PurchaseContainer>
        <div className="purchase_header">
          <h1>구매 내역 관리</h1>
          <div className="input_box">
            <div className="filter_box">
              {filterButtonGroup.map((item, i) => (
                <Button
                  key={i}
                  buttonclassName="filter_button"
                  textclassName="filter_button_text"
                  outterStyles={{
                    background:
                      selectedPeriod === item ? colors.primary.basic : 'white',
                    border:
                      selectedPeriod === item
                        ? colors.primary.basic
                        : `1px solid ${colors.border.dark}`,
                  }}
                  textStyles={{
                    color:
                      selectedPeriod === item ? 'white' : colors.font.gray04,
                  }}
                  onClick={() => {
                    console.log('click item:', item);
                    setSelectedPeriod(item);
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </div>
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
            <div className="category_box">
              <SelectBasic
                options={categotyOptions}
                value={selectedCategory}
                setValue={setSelectedCategory}
                outterStyle={{ border: 'none', width: 130, height: 20 }}
              />
            </div>
          </div>
        </div>
        <TableContainer>
          <PurchaseTable
            rows={rows}
            columns={columns}
            checkbox={false}
            onRowClick={() => console.log('')}
          />
        </TableContainer>
      </PurchaseContainer>
      {isShowPrintView && (
        <div style={{ display: 'none' }}>
          <PrintInvoice
            title={'거래명세표'}
            purchaser={purchaser}
            purchaseDate={purchaseDate}
            data={invoiceData}
            setIsShowPrintView={setIsShowPrintView}
          />
        </div>
      )}
    </Container>
  );
};

export default PurchaseHistory;

const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  height: calc(100vh - 100px);
`;

const PurchaseContainer = styled.div`
  width: 100% - 60px;
  height: 94%;
  background: ${colors.bg.white};
  border-radius: 16px;
  margin: 30px;
  padding: 20px;

  .purchase_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;

    .input_box {
      position: relative;
      width: 70%;
      display: flex;
      justify-content: flex-end;

      .filter_box {
        display: flex;
        flex-direction: row;
        align-items: center;

        .filter_button {
          margin-right: 10px;
          padding: 14px 18px;
          border-radius: 18px;
          min-width: 100px;
        }

        .filter_button_text {
          font-size: 14px;
          font-weight: 400;
        }
      }

      .category_box {
        display: none;
      }
    }
  }

  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
    margin-left: 10px;
  }

  @media screen and (max-width: 1536px) {
    .purchase_header {
      .input_box {
        width: 80%;

        .filter_box {
          .filter_button {
            padding: 14px 14px;
            min-width: 80px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1280px) {
    .purchase_header {
      .input_box {
        .filter_box {
          .filter_button {
            padding: 12px 10px;
            margin-right: 5px;
          }
          .filter_button_text {
            font-size: 12px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0px;
    margin: 0px 24px;

    h1 {
      font-size: 20px;
      margin-left: 4px;
    }

    .purchase_header {
      flex-direction: column;
      margin-top: 0px;
      gap: 20px;
      margin-bottom: 20px;
      .input_box {
        width: 100%;
        justify-content: space-between;

        .filter_box {
          display: none;
        }

        .category_box {
          display: flex;
          svg {
            margin-top: 2px;
            padding-top: 3px;
            path {
              stroke: #222;
            }
          }
        }
        input {
          width: 300px;
          border: none;
        }
      }
    }
  }
`;

const TableContainer = styled.div`
  margin-top: 10px;
  height: calc(100% - 30px);
  width: 100%;
  .gridheaderNo {
  }
  .gridheader {
  }
  .gridcell {
    border-right: 1px solid ${colors.primary.basic} !important;
  }
  .gridcellNo {
    border-right: 1px solid ${colors.primary.basic} !important;
  }

  .gridcellLast {
    width: 70%;
  }
`;
