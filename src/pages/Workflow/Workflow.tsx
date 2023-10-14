import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import TableBasic from 'common/Table/TableBasic';
import { GridColDef } from '@mui/x-data-grid';
import StatusTag from 'common/Tag/StatusTag';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import RequestPurchase from './RequestPurchase';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: '제목',
    width: 240,
    sortable: false,
    headerClassName: 'gridheader',
  },
  {
    field: 'approvementDt',
    headerName: '승인완료일',
    width: 100,
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
  },
  {
    field: 'writer',
    headerName: '작성자',
    width: 80,
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
  {
    field: 'status',
    headerName: '승인내역',
    type: 'number',
    width: 100,
    headerAlign: 'center',
    sortable: false,
    headerClassName: 'gridheader',
    align: 'center',
    renderCell: (params) => {
      return <StatusTag text={params.row.status} />;
    },
  },
];

const rows = [
  {
    id: 1,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 2,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 3,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 4,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 5,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 6,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 7,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 8,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 9,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 10,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 11,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 12,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 13,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '진행중',
  },
  {
    id: 14,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 15,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 16,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 17,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
  {
    id: 18,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 19,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '반려됨',
  },
  {
    id: 20,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인완료',
  },
  {
    id: 21,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '승인요청',
  },
  {
    id: 22,
    title: '구매문서1',
    approvementDt: '2023.03.11.',
    writer: {
      name: '김꿀벌',
      img: 'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg',
    },
    status: '보류중',
  },
];

const getPosition = (index: number) => {
  let height = 184;
  if (index < 8) {
    let left = 6 + index * 211;
    return { top: 60, left: left, position: 'absolute' };
  } else if (index < 16) {
    let left = 111 + (index - 8) * 211;
    return { top: 60 + height, left: left, position: 'absolute' };
  } else if (index < 24) {
    let left = 6 + (index - 16) * 211;
    return { top: 60 + height * 2, left: left, position: 'absolute' };
  } else if (index < 32) {
    let left = 111 + (index - 24) * 211;
    return { top: 60 + height * 3, left: left, position: 'absolute' };
  } else if (index < 40) {
    let left = 6 + (index - 32) * 211;
    return { top: 60 + height * 4, left: left, position: 'absolute' };
  }
};

const serviceContents = [
  {
    type: '서비스 A',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 50,
  },
  {
    type: '서비스 B',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 25,
  },
  {
    type: '서비스 C',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 75,
  },
  {
    type: '서비스 D',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 100,
  },
  {
    type: '서비스 E',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 25,
  },
  {
    type: '서비스 F',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 0,
  },
  {
    type: '서비스 G',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 75,
  },
  {
    type: '서비스 H',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 100,
  },
  {
    type: '서비스 T',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 0,
  },
  {
    type: '서비스 Q',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 25,
  },
  {
    type: '서비스 X',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 0,
  },
  {
    type: '서비스 Y',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 100,
  },
  {
    type: '서비스 Z',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 75,
  },
  {
    type: '서비스 J',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 25,
  },
  {
    type: '서비스 L',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 50,
  },
  {
    type: '서비스 O',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 50,
  },
  {
    type: '서비스 Z',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 0,
  },
  {
    type: '서비스 J',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 50,
  },
  {
    type: '서비스 L',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 100,
  },
  {
    type: '서비스 O',
    assignee: '김꿀벌',
    date: '2023.09.21',
    percent: 75,
  },
];

const WorkFlow = () => {
  const [isShowPeriodSection, setIsShowPeriodSection] =
    useState<boolean>(false);
  const [isShowStatusSection, setIsShowStatusSection] =
    useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>();
  const [isShowHiddenFilter, setIsShowHiddenFilter] = useState<boolean>(false);
  const [workflowData, setWorkflowData] = useState<any[]>([]);
  const [isOpenList, setIsOpenList] = useState<boolean>(false);

  const dispatch = useDispatch();

  const checkeditem = (value: string) => {
    if (checkedFilter.filter((v) => v === value).length > 0) {
      let newarr = checkedFilter.filter((v) => v !== value);
      setCheckedFilter(newarr);
    } else {
      setCheckedFilter([...checkedFilter, value]);
    }
  };

  const rendomPickIndex = () => {
    let max = 3;
    let min = 1;
    let list = new Set();
    let previous = 0;
    for (let i = 0; i < 20; i++) {
      previous += Math.floor(Math.random() * (max - min + 1)) + min;
      if (previous < 40) list.add(previous);
    }

    const arr = Array.from(list);
    return arr;
  };

  const insertPosition = () => {
    const res = rendomPickIndex();
    let newdata = serviceContents.slice(0, res.length).map((v, i) => {
      return { ...v, style: getPosition(res[i] as number) };
    });
    console.log(newdata);
    setWorkflowData(newdata);
  };

  useEffect(() => {
    insertPosition();
    console.log(workflowData);
  }, []);

  const openPurchaseModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <RequestPurchase />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log(''),
        hasNoClose: true,
      }),
    );
  };

  const onClickContent = (type: string) => {
    console.log('type:', type)
    setIsOpenList(!isOpenList);
  };

  return (
    <Container>
      <AdminContainer>
        {workflowData.map((val, i) => {
          return (
            <Contents
              onClick={() => onClickContent(val.type)}
              style={val.style}
              key={i}
              path={`/images/honeycomb_${val.percent}.png`}
            >
              <div style={{ fontSize: 22, fontWeight: '700' }}>{val.type}</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: colors.font.gray03,
                  marginTop: 18,
                }}
              >
                {val.assignee}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.font.gray03,
                  marginTop: 12,
                }}
              >
                {val.date}
              </div>
            </Contents>
          );
        })}
      </AdminContainer>
      <FilterContainer isOpenList={isOpenList}>
        <CurrentFilterItems>
          <div
            style={{
              width: 450,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {checkedFilter.map((item, i) => (
              <FilterItem key={i}>
                {item}
                <Icon
                  iconName="close"
                  width={16}
                  height={16}
                  style={{ marginLeft: 1 }}
                  onPress={() => checkeditem(item)}
                />
              </FilterItem>
            ))}
            {period && (
              <FilterItem>
                {period}
                <Icon
                  iconName="close"
                  width={16}
                  height={16}
                  style={{ marginLeft: 1 }}
                  onPress={() => setPeriod('')}
                />
              </FilterItem>
            )}
          </div>
          <Filter onMouseEnter={() => setIsShowHiddenFilter(true)}>
            <Icon iconName="filter" />
            <span>필터</span>
            <Icon
              iconName="arrowdown"
              width={20}
              height={20}
              color={colors.font.dark}
            />
          </Filter>
          {isShowHiddenFilter && (
            <HiddenFilterMenu onMouseLeave={() => setIsShowHiddenFilter(false)}>
              <FindWorker>
                <span>사람찾기</span>
                <Icon iconName="arrowup" width={16} height={16} />
              </FindWorker>
              <Divider />
              <Period
                onClick={() => setIsShowPeriodSection(!isShowPeriodSection)}
              >
                <span>날짜 기간</span>
                {isShowPeriodSection ? (
                  <Icon iconName="arrowdown" width={16} height={16} />
                ) : (
                  <Icon iconName="arrowup" width={16} height={16} />
                )}
              </Period>
              <SelectBox>
                {isShowPeriodSection &&
                  ['1일 이내', '1주일 이내', '1개월 이내'].map((item, i) => (
                    <RadioButton key={i}>
                      <label htmlFor={item} className="radio-button">
                        {item}
                        <div>
                          <input
                            type="radio"
                            id={item}
                            name="period"
                            onChange={() => setPeriod(item)}
                          />
                          <span className="custom-radio"></span>
                        </div>
                      </label>
                    </RadioButton>
                  ))}
              </SelectBox>
              <Divider />
              <Status
                onClick={() => setIsShowStatusSection(!isShowStatusSection)}
              >
                <span>상태</span>
                {isShowStatusSection ? (
                  <Icon iconName="arrowdown" width={16} height={16} />
                ) : (
                  <Icon iconName="arrowup" width={16} height={16} />
                )}
              </Status>
              <SelectBox>
                {isShowStatusSection &&
                  ['승인요청', '진행중', '보류중', '승인완료', '반려됨'].map(
                    (item, i) => (
                      <CheckBox key={i} onClick={() => checkeditem(item)}>
                        <label htmlFor={item} className="radio-button">
                          {item}
                        </label>
                        <div>
                          <input
                            type="checkbox"
                            id={item}
                            name="status"
                            value={item}
                          />
                          {checkedFilter.filter((v, ) => v === item).length >
                          0 ? (
                            <Icon iconName="checked" />
                          ) : (
                            <Icon iconName="blank" />
                          )}
                        </div>
                      </CheckBox>
                    ),
                  )}
              </SelectBox>
            </HiddenFilterMenu>
          )}
        </CurrentFilterItems>
        <TableContainer>
          <Button onClick={openPurchaseModal}>임시버튼</Button>
          <TableBasic
            rows={rows}
            columns={columns}
            // onRowClick={openAccountModal}
            checkbox={false}
          />
        </TableContainer>
      </FilterContainer>
    </Container>
  );
};

export default WorkFlow;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('/images/workflowbg.png');
  background-size: 1920px;
  background-repeat: no-repeat;
  background-position: -150px 0;
`;

const AdminContainer = styled.div`
  overflow: hidden;
  height: 100vh;
  min-width: 1920px;
  // position: fixed;
  // position: relative;
`;

const FilterContainer = styled.div<{ isOpenList: boolean }>`
  position: absolute;
  background: ${colors.bg.white};
  padding: 3rem;
  margin-top: 88px;
  height: 92vh;
  right: 0;
  top: ${(props) => (props.isOpenList ? 0 : null)};
  box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: -3px 3px 5px 1px rgba(0, 0, 0, 0.2);
`;

const Contents = styled.div<{ path: string }>`
  cursor: pointer;
  width: 216px;
  height: 245px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => `url(${props.path})`};
  background-size: 216px;
`;

const CurrentFilterItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const FilterItem = styled.div`
  max-width: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 34px;
  border-radius: 50px;
  background: ${colors.bg.white};
  border: 1px solid ${colors.bg.gray03};
  padding: 8px 16px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const Filter = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
  background: #f7f9fb;
  padding: 4px;
  border-radius: 8px;
`;

const HiddenFilterMenu = styled.div`
  z-index: 999;
  position: absolute;
  top: 68px;
  right: 30px;
  width: 200px;
  background: ${colors.bg.white};
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 8px;
`;

const FindWorker = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  span {
    font-weight: 600;
  }
`;

const Divider = styled.div`
  margin: 5px 0;
  width: 100%;
  height: 1px;
  background: #e5e5e5;
`;

const Period = styled(FindWorker)``;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioButton = styled.div`
  position: relative;
  padding: 10px 0;
  .radio-button input[type='radio'] {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  .radio-button .custom-radio {
    position: absolute;
    top: 10px;
    right: 0;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #eee;
  }

  .radio-button input[type='radio']:checked ~ .custom-radio {
    border: 1px solid #ffd338;
  }

  .custom-radio:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .radio-button input[type='radio']:checked ~ .custom-radio:after {
    background-color: #ffd338;
  }
`;

const Status = styled(FindWorker)``;

const CheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  padding: 10px 0;
  color: ${colors.font.gray04};
  input {
    display: none;
  }
`;

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  .gridheader {
    color: ${colors.font.gray03};
  }
`;
