import React from 'react';
import { Grid, Divider, Button } from '@mui/material';
import ConfirmModal from 'pages/GeneralAffairs/Modal/ConfirmModal';
import colors from 'styles/colors';
import styled from '@emotion/styled';

import { openModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';

const DayBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 180px;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid rgba(35, 35, 35, 0.2);
  background: var(--main, #fff);

  &.active {
    background: var(--main, #ffc73c);
  }

  & > span + span {
    margin-top: 16px;
  }
`;

const ReceivingAddress = (props: any) => {
  const { onNext } = props;
  const dispatch = useDispatch();

  const displayConfirmModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '택배서비스 이용약관',
          content: <ConfirmModal onNext={onNext} />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  return (
    <div>
      <Root>
        <Grid container spacing={4} style={{ height: '100%' }}>
          <Grid item xs={8} style={{ height: '100%' }}>
            <Box>
              <Title>택배 예약</Title>
              <Divider />
              <div className="mx-[20px]">
                <div className="py-[34px]">
                  <span className="text-[28px]">방문희망일 선택</span>
                </div>
                <div className="flex flex-col px-[32px] py-[24px] space-y-[10px] border border-solid border-[#D1D1D1] rounded-[8px] bg-[##f1f1f1]">
                  <div className="flex space-x-[10px]">
                    <DayBox className="active">
                      <span>수</span>
                      <span>2023-07-05</span>
                    </DayBox>
                    <DayBox>
                      <span>목</span>
                      <span>2023-07-06</span>
                    </DayBox>
                    <DayBox>
                      <span>금</span>
                      <span>2023-07-07</span>
                    </DayBox>
                  </div>
                  <div className="flex space-x-[10px]">
                    <DayBox>
                      <span>토</span>
                      <span>2023-07-08</span>
                    </DayBox>
                    <DayBox>
                      <span>일</span>
                      <span>2023-07-09</span>
                    </DayBox>
                    <DayBox>
                      <span>월</span>
                      <span>2023-07-10</span>
                    </DayBox>
                  </div>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ height: '100%' }}>
            <Box>
              <div className="mb-[24px] text-[20px] text-[#1A1A1A] font-semibold">
                <span>총 결제 금액</span>
              </div>
              <Divider />
              <div className="space-y-4 py-[24px]">
                <div className="flex justify-between">
                  <span>소형 박스</span>
                  <span>4,500원</span>
                </div>
                <div className="flex justify-between">
                  <span>기본운임</span>
                  <span>(4,500원 X 1박스)</span>
                </div>
              </div>
              <Divider />
              <div className="space-y-4 py-[24px]">
                <div className="flex justify-between">
                  <span>할인 금액</span>
                  <span>10원</span>
                </div>
                <div className="flex justify-between">
                  <span>프로모션 할인</span>
                  <span>10원</span>
                </div>
              </div>
              <Divider />
              <div className="space-y-4 py-[24px]">
                <div className="flex justify-between">
                  <span>총 결제예정 금액</span>
                  <span>4,490원</span>
                </div>
              </div>
              <Divider />
              <div className="space-y-4 pt-[24px]">
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    color: 'white',
                    height: 64,
                    backgroundColor: '#FFC73C',
                    fontSize: 22,
                    lineHeight: 26,
                    fontWeight: 700,
                  }}
                  onClick={displayConfirmModal}
                >
                  다음
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Root>
    </div>
  );
};

export default ReceivingAddress;
const Root = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.basic};
  padding: 100px 30px;
  padding-bottom: 60px;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.white};
  display: flex;
  border-radius: 16px;
  border: 2px solid #b8b8b8;
  padding: 28px 20px;
  margin-top: 20px;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 32px;
  line-height: 38.19px;
  color: ${colors.font.dark};
  margin-bottom: 12px;
  font-weight: 600;
`;

const ChoiceBox = styled.div`
  width: 100%;
  padding: 0 24px;
`;

const ChoiceTitle = styled.span`
  font-size: 24px;
  line-height: 28px;
  color: ${colors.font.dark};
`;

const ChangeText = styled.span`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.font.gray01};
`;
