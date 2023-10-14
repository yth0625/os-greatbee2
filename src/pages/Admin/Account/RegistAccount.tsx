import React, { useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import colors from 'styles/colors';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/popUpReducer';

const RegistAccount = () => {
  const [level, setLevel] = useState<string>('1');
  const [filename, setFilename] = useState<string>('');
  const [tabStatus, setTabStatus] = useState<string>('개별등록');

  const dispatch = useDispatch();

  const [data, setData] = useState<any[]>(new Array(10).fill(1));

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilename(e.target.files[0].name);
    }
  };

  console.log(tabStatus);
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

  return (
    <AccountContainer>
      <TabConainter>
        <RegistIndividual
          selected={tabStatus}
          onClick={() => setTabStatus('개별등록')}
        >
          개별등록
        </RegistIndividual>
        <RegistAll
          selected={tabStatus}
          onClick={() => setTabStatus('일괄등록')}
        >
          일괄등록
        </RegistAll>
      </TabConainter>
      {tabStatus === '개별등록' ? (
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
                <TableData>
                  <input value={''} onChange={() => console.log('')} />
                </TableData>
                <TableData>
                  <input value={''} onChange={() => console.log('')} />
                </TableData>
                <TableData style={{ width: 120 }}>
                  <input
                    value={item.firstName}
                    onChange={() => console.log('')}
                  />
                </TableData>
                <TableData style={{ width: 100 }}>
                  <input value={''} onChange={() => console.log('')} />
                </TableData>
                <TableData style={{ width: 80 }}>
                  <input value={''} onChange={() => console.log('')} />
                </TableData>
                <TableData>{moment(new Date()).format('YYYY.MM.DD')}</TableData>
                <TableData>{moment(new Date()).format('YYYY.MM.DD')}</TableData>
                <TableData style={{ width: 140 }}>
                  <input value={''} onChange={() => console.log('')} />
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
      ) : (
        <div style={{ height: 486 }}>
          <UploadBox>
            <tbody>
              <tr>
                <td className="label">계정등록 템플릿</td>
                <td>계정등록 템플릿.xlsx</td>
              </tr>
              <tr>
                <td className="label">파일 업로드</td>
                <td>
                  <FileBox>
                    <FileName>
                      {filename ? filename : '파일을 첨부해주세요.'}
                    </FileName>
                    <label htmlFor="ex_file">
                      <div className="btnStart">첨부파일</div>
                    </label>
                    <input type="file" id="ex_file" onChange={selectFile} />
                  </FileBox>
                </td>
              </tr>
            </tbody>
          </UploadBox>
        </div>
      )}
      <ButtonContainer>
        <Button
          onClick={() => {
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
            marginLeft: 20,
          }}
          textStyles={{ color: '#000' }}
        >
          저장
        </Button>
      </ButtonContainer>
    </AccountContainer>
  );
};

export default RegistAccount;

const AccountContainer = styled.div`
  width: 1122px;
  height: 650px;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 10px;
`;

const TabConainter = styled.div`
  width: 100%;
  height: 46px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RegistIndividual = styled.div<{ selected: string }>`
  width: 50%;
  text-align: center;
  height: 100%;
  padding-top: 14px;
  border: 1px solid ${colors.border.dark};
  border-top-left-radius: 16px;
  background: ${(props) =>
    props.selected === '개별등록' ? colors.bg.gray01 : colors.bg.white}}
`;

const RegistAll = styled.div<{ selected: string }>`
  width: 50%;
  text-align: center;
  height: 100%;
  padding-top: 14px;
  border-top-right-radius: 16px;
  border: 1px solid ${colors.border.dark};
  background: ${(props) =>
    props.selected === '일괄등록' ? colors.bg.gray01 : colors.bg.white}}
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

const UploadBox = styled.table`
  border: 1px solid ${colors.border.dark};
  border-radius: 16px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  td {
    padding: 8px;
    color: ${colors.font.dark};
  }
  .label {
    font-weight: bold;
    color: ${colors.font.gray04};
    vertical-align: middle;
  }
`;

const FileBox = styled.div`
  margin: 10px 0 0;
  display: flex;
  flex-direction: row;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    cursor: pointer;
    padding: 7px 18px;
    background: ${colors.border.basic};
    border-radius: 16px;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const FileName = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid ${colors.border.basic};
  border-radius: 8px;
  margin-right: 10px;
  padding: 10px;
  color: ${colors.font.gray01};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
