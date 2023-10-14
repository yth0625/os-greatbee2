import React, { useState } from 'react';
import styled from '@emotion/styled';

import moment from 'moment';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';
import colors from 'styles/colors';

// type ItemProps = {
//   label: string;
//   content: string;
// };

const HeaderData = [
  '계정',
  '이름',
  '서브 이름',
  '소속',
  '직책',
  '등록일',
  '입사일',
  '연락처',
  '권한',
];

const AccountEditModal = ({ data, clearSelectData }: any) => {
  const [level, setLevel] = useState<string>('1');
  const dispatch = useDispatch();

  return (
    <>
      <AccountContainer>
        <Table>
          <thead>
            <tr>
              {HeaderData.map((item, i) => (
                <TableHead key={i} last={i === HeaderData.length - 1}>
                  {item}
                </TableHead>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <tr key={i}>
                <TableData>{item.email}</TableData>
                <TableData>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <div>{item.firstName.name}</div>
                    <img
                      src={item.firstName.img}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        objectFit: 'cover',
                        marginLeft: 3,
                      }}
                    />
                  </div>
                </TableData>
                <TableData style={{ width: 120 }}>
                  <input
                    value={item.firstName.name}
                    onChange={() => console.log('')}
                  />
                </TableData>
                <TableData style={{ width: 100 }}>
                  <input
                    value={item.department}
                    onChange={() => console.log('')}
                  />
                </TableData>
                <TableData style={{ width: 80 }}>
                  <input
                    value={item.position}
                    onChange={() => console.log('')}
                  />
                </TableData>
                <TableData>{moment(new Date()).format('YYYY.MM.DD')}</TableData>
                <TableData>{moment(new Date()).format('YYYY.MM.DD')}</TableData>
                <TableData style={{ width: 140 }}>
                  <input
                    value={'010-9999-0000'}
                    onChange={() => console.log('')}
                  />
                </TableData>
                <TableData>
                  <LevelTag>{level}</LevelTag>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                  </select>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      </AccountContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            clearSelectData();
            dispatch(closeModal());
          }}
          outterStyles={{
            background: '#fff',
            borderColor: 'var(--primary-color)',
            width: 140,
          }}
          textStyles={{ color: '#000' }}
        >
          취소
        </Button>
        <Button
          outterStyles={{
            background: 'var(--primary-color)',
            border: 'none',
            width: 140,
            marginLeft: 10,
          }}
          textStyles={{ color: '#000' }}
        >
          저장
        </Button>
      </ButtonContainer>
    </>
  );
};

export default AccountEditModal;

const AccountContainer = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.th<{ last?: boolean }>`
  padding: 8px 0;
  border-top: 1px solid ${colors.table.border};
  border-bottom: 1px solid ${colors.table.border};
  color: ${colors.table.font};
  border-right: ${(props) =>
    props.last ? 'none' : `1px solid ${colors.table.border}`};
`;

const TableData = styled.td`
  font-size: 1.4rem;
  padding: 4px 10px;
  border-bottom: 1px solid ${colors.table.border};
  text-align: center;
  position: relative;
  overflow: hidden;
  input {
    padding: 5px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    text-align: center;
    &:focus {
      border: 1px solid ${colors.table.border};
    }
  }
  select {
    position: absolute;
    top: 5px;
    width: 20px;
    left: 0;
    border: none;
  }
`;

const LevelTag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${colors.bg.black};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
