import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { closeAlert, openAlert, openModal } from 'redux/popUpReducer';
import { useGetPaymentInfoApi, useUpdatePropertyYnInfoApi } from '../../../api/useEprocurementApi';
import moment from 'moment/moment';
import ConfirmDelivery from './ConfirmDelivery';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import PurchaseTable from 'common/Table/PurchaseTabel';
import Button from '../../../common/Button/Button';
import { AxiosError } from 'axios';

const RenderReleaseButton = ({ value }: { value: any }) => {
  const dispatch = useDispatch();

  const onButtonClick = (e: any) => {
    e.stopPropagation();

    if (value.value === null) return <div>-</div>;

    if (e.target.innerText === '출고확인') {
      dispatch(
        openAlert({
          text: (
            <div
              style={{
                width: 230,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ marginBottom: 5, color: colors.font.gray04 }}>
                관리 코드를 생성하시겠습니까?
              </div>
            </div>
          ),
          hasConfirm: true,
          confirmFn: () => console.log('confirm'),
          onClick: () => console.log('click'),
        }),
      );
    }
  };

  if (value.value === '출고확인') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            padding: 10,
            paddingRight: 24,
            paddingLeft: 24,
            backgroundColor: '#FFC74C',
            borderRadius: 16,
            cursor: 'pointer',
            color: 'white',
          }}
          onClick={(e) => onButtonClick(e)}
        >
          {value.value}
        </button>
      </div>
    );
  } else {
    return <div>-</div>;
  }
};

const RenderOrderButton = ({ value }: { value: any }) => {
  const dispatch = useDispatch();

  const onButtonClick = (e: any) => {
    e.stopPropagation();

    if (e.target.innerText === '발주하기') {
      dispatch(
        openAlert({
          text: (
            <div
              style={{
                width: 230,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ marginBottom: 5, color: colors.font.gray04 }}>
                {value.row.itemInfo}에 대한
              </div>
              <div style={{ color: colors.font.gray04 }}>
                발주를 진행하시겠습니까?
              </div>
            </div>
          ),
          hasConfirm: true,
          confirmFn: () => console.log('confirm'),
          onClick: () => console.log('click'),
        }),
      );
    }
  };

  if (value.value.status === null) return <div>-</div>;
  if (value.value.status === '발주완료') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>{value.value.status}</div>
        <div>{value.value.date}</div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            padding: 10,
            paddingRight: 24,
            paddingLeft: 24,
            backgroundColor: '#FFC74C',
            borderRadius: 16,
            cursor: 'pointer',
            color: 'white',
          }}
          onClick={(e) => onButtonClick(e)}
        >
          {value.value.status}
        </button>
      </div>
    );
  }
};

const RenderAssetsButton = ({value}: {value: any}) => {
  const dispatch = useDispatch();

  const { mutateAsync: updatePropertyYnInfo, isLoading: isUpdatePropertyYnInfoLoading } =
    useUpdatePropertyYnInfoApi();


  const conFirmRegistAssets = async () => {
    dispatch(closeAlert());

    try {
      const updatePropertyYnInfoPayload = {
        paymentNo: value.value.paymentNo,
        propertyYn: 'Y',
      };
      await updatePropertyYnInfo(updatePropertyYnInfoPayload);

      dispatch(
        openAlert({
          text: '자산 등록 코드가 생성되었습니다.',
          hasConfirm: false,
          onClick: async () => {
            await value.value.refresh();
            dispatch(closeAlert())
          },
        }),
      );
    } catch (error) {
      let message = '자산 등록에 실패했습니다.';
      if (error instanceof AxiosError && error.response) {
        message = error.response.data.error.errMsg;
      }

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              {message}
            </div>
          ),
          hasConfirm: false,
        }),
      );
    }

  };

  const onButtonClick = (e: any) => {
    e.stopPropagation();

    if (e.target.innerText === '자산등록') {
      dispatch(
        openAlert({
          text: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  color: colors.font.gray04,
                  textAlign: 'center',
                }}
              >
                자산 등록 코드를 생성하시겠어요?
              </div>
            </div>
          ),
          hasConfirm: true,
          confirmFn: conFirmRegistAssets,
          onClick: () => {},
        }),
      );
    }
  };

  // if (value.value === null) return <div>-</div>;

  // if (params.value.value !== '-') {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <div>{params.value}</div>
  //     </div>
  //   );
  // } else {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        style={{
          padding: 10,
          paddingRight: 24,
          paddingLeft: 24,
          backgroundColor: '#FFC74C',
          borderRadius: 16,
          cursor: 'pointer',
          color: 'white',
        }}
        disabled={isUpdatePropertyYnInfoLoading}
        onClick={(e) => onButtonClick(e)}
      >
        자산등록
      </button>
    </div>
  );
};

const RenderDeliveryButton = ({ value }: { value: any }) => {
  const dispatch = useDispatch();

  const onButtonClick = (e: any) => {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: (
            <ConfirmDelivery
              paymentNo={value.value.paymentNo}
              receiptURL={value.value.receiptURL}
              shippingAddrNo={value.value.shippingAddrNo}
            />
          ),
        },
        hasConfirm: '아니오',
        confirmFn: () => {},
      }),
    );
  };

  if (value.value.status === null) return <div>-</div>;
  if (value.value.status === '입고완료') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>{value.value.status === null ? '-' : value.value.status}</div>
        <div>{value.value.date}</div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            padding: 10,
            paddingRight: 24,
            paddingLeft: 24,
            backgroundColor: '#FFC74C',
            borderRadius: 16,
            cursor: 'pointer',
            color: 'white',
          }}
          onClick={(e) => onButtonClick(e)}
        >
          {value.value.status}
        </button>
      </div>
    );
  }
};

const columns: GridColDef[] = [
  {
    field: 'number',
    headerName: '구매번호',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheaderNo',
    align: 'center',
    minWidth: 200,
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
    headerClassName: 'gridheaderProductNm',
    align: 'center',
    minWidth: 200,
    maxWidth: 400,
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
    flex: 0.1,
    minWidth: 90,
    maxWidth: 200,
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
          {/*<div>{params.value.date}</div>*/}
        </div>
      );
    },
  },
  {
    field: 'approve',
    headerName: '승인',
    type: 'number',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 0.1,
    minWidth: 90,
    maxWidth: 200,
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
          {/*<div>{params.value.date}</div>*/}
        </div>
      );
    },
  },
  {
    field: 'order',
    headerName: '발주',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 0.12,
    minWidth: 100,
    maxWidth: 200,
    cellClassName: 'gridcell',
    renderCell: (params) => <RenderOrderButton value={params} />,
  },
  {
    field: 'store',
    headerName: '배송/입고',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 0.12,
    minWidth: 100,
    maxWidth: 200,
    cellClassName: 'gridcell',
    renderCell: (params) => {
      return <RenderDeliveryButton value={params} />;
    },
  },
  {
    field: 'registasset',
    headerName: '자산등록',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    flex: 0.12,
    minWidth: 100,
    maxWidth: 200,
    cellClassName: 'gridcell',
    // renderCell: (params) => <RenderDeliveryButton value={params} />,
    renderCell: (params) => <RenderAssetsButton value={params} />,
  },
  {
    field: 'release',
    headerName: '배포',
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheaderLast',
    align: 'center',
    flex: 0.12,
    minWidth: 100,
    maxWidth: 200,
    cellClassName: 'gridcellLast',
    // renderCell: (params) => <RenderReleaseButton value={params} />,
    renderCell: (params) => <div>-</div>,
  },
];

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
    value:'20230101',
  },
  {
    text: '전체',
    value:'20230501',
  }
]

const PurchaseManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(filterButtonGroup[4]);
  const [rows, setRows] = useState<any>([]);

  const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');

  const {
    data: paymentInfoList,
    // isLoading: isPaymentInfoListLoading,
    refetch: refetchPaymentInfoList,
  } = useGetPaymentInfoApi(selectedPeriod.value, tomorrow, 'N');

  useEffect(() => {
    if (paymentInfoList) {
      const newRows = paymentInfoList.map((item, index) => {
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
          approve: {
            status: '-',
            date: '',
          },
          order: {
            status: '발주완료',
            date: orderDate,
          },
          store: {
            status: '배송확인',
            paymentNo: item.paymentNo,
            receiptURL: item.receiptURL || '',
            shippingAddrNo: item.shippingAddrNo || '',
            date: '',
          },
          registasset: {
            paymentNo: item.paymentNo,
            refresh: refetchPaymentInfoList
          },
          release: '-',
        };
      });

      setRows(newRows);
    }
  }, [paymentInfoList]);

  return (
    <Container>
      <PurchaseContainer>
        <div className="purchase_header">
          <h1>구매 진행 현황</h1>
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
    </Container>
  );
};

export default PurchaseManagement;

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
  padding: 34px;

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

  .gridheaderProductNm {
    min-width: 300px;

    @media screen and (max-width: 1280px) {
      max-width: 200px;
    }
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
