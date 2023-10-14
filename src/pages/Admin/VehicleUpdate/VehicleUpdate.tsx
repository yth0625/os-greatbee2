import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import moment from 'moment/moment';
import colors from 'styles/colors';
import { GridColDef } from '@mui/x-data-grid';
import { InputStyle } from 'common/Input/FormStyle';
import Icon from 'styles/Icon';
import PurchaseTable from 'common/Table/PurchaseTabel';
import { IVehicleInfos } from "interfaces/eprocurement";

const dummyData = [
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
  {
    carType: '그랜저',
    carNum: '123하 4567',
    year: 2020,
    reg: 1696340385700,
    distance: 18900,
    drivingAge: 1696340385700,
    rental: '왕꿀벌렌트',
    insurance: '왕꿀벌보험',
    owner: '김효진',
    department: '총무부',
    contact: '123-45678',
  },
]

const FixButton = styled.button`
display: flex;
width: 66px;
padding: 5px;
justify-content: center;
align-items: center;
gap: 10px;
flex-shrink: 0;

border-radius: 8px;
background: #FFC73C;

color: #FFF;
font-family: Noto Sans KR;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 120% */
`;

const RenderFixButton = (props: any) => {

  return (
    <FixButton>
      수정
    </FixButton>
  )
}

const columns: GridColDef[] = [
    {
      field: 'carType',
      headerName: '차종',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheaderNo',
      align: 'center',
      minWidth: 110,
      flex: 0.13,
      cellClassName: (params) => {
        return 'gridcellNo';
      },
    },
    {
      field: 'carNum',
      headerName: '차량번호',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheaderProductNm',
      align: 'center',
      minWidth: 159,
      flex: 0.25,
      cellClassName: 'gridcell',
    },
    {
      field: 'year',
      headerName: '연식',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.1,
      minWidth: 132,
      cellClassName: 'gridcell',
    },
    {
      field: 'reg',
      headerName: '등록일',
      type: 'number',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.1,
      minWidth: 130,
      cellClassName: 'gridcell',
    },
    {
      field: 'distance',
      headerName: '운행거리',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 130,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderOrderButton value={params} />,
    },
    {
      field: 'drivingAge',
      headerName: '주행가능연령',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 152,
      cellClassName: 'gridcell',
      // renderCell: (params) => {
      //   // return <RenderDeliveryButton value={params} />;
      // },
    },
    {
      field: 'rental',
      headerName: '렌트사',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 147,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderDeliveryButton value={params} />,
      // renderCell: (params) => <RenderAssetsButton value={params} />,
    },
    {
      field: 'insurance',
      headerName: '보험사',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 147,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderDeliveryButton value={params} />,
      // renderCell: (params) => <RenderAssetsButton value={params} />,
    },
    {
      field: 'owner',
      headerName: '소유자(관리자)',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 147,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderReleaseButton value={params} />,
      // renderCell: (params) => <div>-</div>,
    },
    {
      field: 'department',
      headerName: '부서',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 109,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderReleaseButton value={params} />,
      // renderCell: (params) => <div>-</div>,
    },
    {
      field: 'contact',
      headerName: '연락처',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheader',
      align: 'center',
      flex: 0.12,
      minWidth: 116,
      cellClassName: 'gridcell',
      // renderCell: (params) => <RenderReleaseButton value={params} />,
      // renderCell: (params) => <div>-</div>,
    },
    {
      field: 'fix',
      headerName: '',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'gridheaderLast',
      align: 'center',
      flex: 0.12,
      minWidth: 92,
      cellClassName: 'gridcellLast',
      renderCell: (params) => <RenderFixButton>수정</RenderFixButton>,
      // renderCell: (params) => <div>-</div>,
    },
  ];

const VehicleUpdate = () => {
    // eslint-disable-next-line no-mixed-operators, no-undef
    const [rows, setRows] = useState<any>([]);
  
    const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');
  
  useEffect(()=>{
    const newRows = dummyData.map((item: IVehicleInfos, index) => {

      return {
        ...item,
        id: index,
        year: item.year + '년',
        reg: moment(item.reg).format('YYYY.MM.DD'),
        distance: item.distance + 'km',
        drivingAge: moment(item.drivingAge).format('YYYY.MM.DD'),
      };
    });
    setRows(newRows);
  },[])

    // const {
    //   data: paymentInfoList,
    //   // isLoading: isPaymentInfoListLoading,
    //   refetch: refetchPaymentInfoList,
    // } = useGetPaymentInfoApi(selectedPeriod.value, tomorrow, 'N');
    
    return (
      <Container>
        <PurchaseContainer>
          <div className="purchase_header">
            <h1>업무용 차량 현황</h1>
            <div className="input_box">
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
              customCss={{color: '#FFF'}}
              rows={rows}
              columns={columns}
              checkbox={true}
              onRowClick={() => {}}
            />
          </TableContainer>
        </PurchaseContainer>
      </Container>
    );
  };
  
  export default VehicleUpdate;
  
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
  