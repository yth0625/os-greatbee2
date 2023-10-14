import React from 'react';
import { Grid, Divider, Button } from '@mui/material';
import AffairsPaymentModal from 'pages/GeneralAffairs/Modal/AffairsPaymentModal';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import CustomLabelAndInput from './component/CustomLabelAndInput';

import { openModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';

const ReceivingAddress = (props: any) => {
  const { onNext } = props;
  const dispatch = useDispatch();

  const displayConfirmModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '택배비 결제',
          content: <AffairsPaymentModal />,
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
              <ChoiceBox>
                <div className="mx-[20px]">
                  <div className="py-[34px]">
                    <span className="text-[28px]">예약 내역</span>
                  </div>
                  <div className="space-y-[24px]">
                    <CustomLabelAndInput label="예약항목" content="예약항목" />
                    <CustomLabelAndInput label="박스수량" content="1개" />
                    <CustomLabelAndInput label="운임합계" content="4,490원" />
                    <CustomLabelAndInput
                      label="보내는 분"
                      content="예약항목"
                      type="textarea"
                    />
                  </div>
                </div>
                <div className="mx-[20px]">
                  <div className="py-[34px]">
                    <span className="text-[28px]">받는 분 1</span>
                  </div>
                  <div className="space-y-[24px]">
                    <CustomLabelAndInput label="성명/상호" content="예약항목" />
                    <CustomLabelAndInput label="휴대폰번호" content="1개" />
                    <CustomLabelAndInput
                      label="주소"
                      content="075-45 &#13;&#10;&#13;&#10;서울특별시 강서구 양천로 65길 32 (염창동)&#13;&#10;&#13;&#10;삼성펠리체 601호"
                      type="textarea"
                    />
                    <CustomLabelAndInput
                      label="포장수량"
                      content="1박스 (소형 1)"
                    />
                    <CustomLabelAndInput
                      label="물품정보"
                      content="구두 (물품단가 : 10,000원)"
                    />
                    <CustomLabelAndInput label="요청사항" content="-" />
                  </div>
                </div>
              </ChoiceBox>
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
  @media screen and (max-width: 1536px) {
    padding: 28px 88px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
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
