import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Button from 'common/Button/Button';
import { InputStyle } from 'common/Input/FormStyle';

const RequestPurchase = () => {
  return (
    <Container>
      <RequestBox>
        <div style={{ height: 30, paddingTop: 7, fontWeight: '700' }}>
          구매요청
        </div>
        <Line />
        <RequestContents>
          <RequestContent>
            <span>신청일자</span>
            <InputStyle />
          </RequestContent>
          <RequestContent>
            <span>신청자</span>
            <InputStyle />
          </RequestContent>
          <RequestContent>
            <span>구매 목적</span>
            <textarea rows={4} style={{ width: '100%', borderRadius: 16 }} />
          </RequestContent>
          <RequestContent>
            <span>실 사용자</span>
            <InputStyle />
          </RequestContent>
          <RequestContent>
            <span>품목(금액)</span>
            <InputStyle />
          </RequestContent>
        </RequestContents>
      </RequestBox>
      <Divider />
      <ApprovalLine>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>결재선</div>
          <Button outterStyles={{ height: 30 }}>수정</Button>
        </div>
        <Line />
      </ApprovalLine>
    </Container>
  );
};

export default RequestPurchase;

const Container = styled.div`
  width: 800px;
  margin-top: -2rem;
  display: flex;
  flex-direction: row;
  height: 500px;
`;

const RequestBox = styled.div`
  width: 70%;
  padding-right: 20px;
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${colors.border.dark};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
  background-color: ${colors.border.dark};
`;

const ApprovalLine = styled.div`
  width: 30%;
  padding-left: 20px;
`;

const RequestContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RequestContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  span {
    width: 120px;
    font-size: 16px;
  }
`;