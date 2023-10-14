import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import TableBasic from 'common/Table/TableBasic';

const Contract = () => {
  return (
    <Container>
      <ContractContainer>
        <div>
          <h1>계약 관리</h1>
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
          {/* <TableBasic
          rows={rows}
          columns={columns}
          onRowClick={openAssetsDetailModal}
          // setSelectionModel={checkRows}
          // selectionModel={selected}
          checkbox={false}
          /> */}
        </TableContainer>
      </ContractContainer>
    </Container>
  );
};

export default Contract;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  padding: 110px 50px 0px;
`;

const ContractContainer = styled.div`
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
  margin-top: 20px;
  height: calc(100% - 60px);
  width: 100%;
  .gridheaderNo {
    color: ${colors.font.gray03};
    border-top: 1px solid ${colors.border.basic};
    border-left: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
  .gridheader {
    color: ${colors.font.gray03};
    border-top: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
  .gridcell {
    border-right: 1px solid ${colors.border.basic};
  }
  .gridcellNo {
    border-left: 1px solid ${colors.border.basic};
    border-right: 1px solid ${colors.border.basic};
  }
`;
