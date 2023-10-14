import { Grid, Divider, Button } from '@mui/material';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import CategorySelector from './component/CategorySelector';

const ReceivingAddress = (props: any) => {
  const { onNext } = props;
  return (
    <div>
      <Root>
        <Grid container spacing={4} style={{ height: '100%' }}>
          <Grid item xs={8} style={{ height: '100%' }}>
            <Box>
              <Title>택배 예약</Title>
              <Divider style={{ marginBottom: '30px' }} />
              <ChoiceBox>
                <div className="mb-[20px]  flex">
                  <ChoiceTitle>보내는 분</ChoiceTitle>
                  <div className="relative ml-[20px]">
                    <CategorySelector
                      label="취급제한 품목"
                      style={{
                        paddingLeft: 20,
                        backgroundColor: '#FFC73C',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: 8,
                      }}
                    >
                      <div className="absolute bg-[#fff] w-[450px] border border-solid border-[#CCC] rounded-[12px] p-[16px] text-[14px]">
                        <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                          <div className="w-[10%]">
                            <img
                              src="/src/pages/GeneralAffairs/asset/location.svg"
                              alt="location"
                            />
                          </div>
                          <div className="w-[15%]">회사</div>
                          <div className="w-[75%]">
                            서울 마포구 서교동 394-2
                          </div>
                        </div>
                        <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                          <div className="w-[10%]">
                            <img
                              src="/src/pages/GeneralAffairs/asset/location.svg"
                              alt="location"
                            />
                          </div>
                          <div className="w-[15%]">집</div>
                          <div className="w-[75%]">
                            서울 마포구 서교동 394-2
                          </div>
                        </div>
                        <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                          <div className="w-[10%]">
                            <img
                              src="/src/pages/GeneralAffairs/asset/location.svg"
                              alt="location"
                            />
                          </div>
                          <div className="w-[15%]">김효진</div>
                          <div className="w-[75%]">
                            서울 마포구 서교동 394-2
                          </div>
                        </div>
                        <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                          <div className="w-[10%]">
                            <img
                              src="/src/pages/GeneralAffairs/asset/location.svg"
                              alt="location"
                            />
                          </div>
                          <div className="w-[15%]">김효진</div>
                          <div className="w-[75%]">
                            서울 마포구 서교동 394-2
                          </div>
                        </div>
                        <div className="flex items-center border-b-[1px] border-solid border-[#d1d1d1] py-2">
                          <div className="w-[10%]">
                            <img
                              src="/src/pages/GeneralAffairs/asset/location.svg"
                              alt="location"
                            />
                          </div>
                          <div className="w-[15%]">김효진</div>
                          <div className="w-[75%]">
                            서울 마포구 서교동 394-2
                          </div>
                        </div>
                      </div>
                    </CategorySelector>
                  </div>
                </div>

                <NormalText>이름</NormalText>
                <Inputbox>
                  <InputText>정환석</InputText>
                </Inputbox>

                <Content>
                  <NormalText>연락처</NormalText>
                  <CallBox>
                    <CallInputBox>
                      <InputText>010</InputText>
                    </CallInputBox>
                    <div style={{ margin: '30px 20px' }}>-</div>
                    <CallInputBox>
                      <InputText>1234</InputText>
                    </CallInputBox>
                    <div style={{ margin: '30px 20px' }}>-</div>
                    <CallInputBox>
                      <InputText>5678</InputText>
                    </CallInputBox>
                  </CallBox>
                </Content>
                <Content>
                  <NormalText>배송지</NormalText>
                  <Inputbox>
                    <InputText>잡하주소</InputText>
                  </Inputbox>
                  <Inputbox>
                    <InputText>상세주소 입력</InputText>
                  </Inputbox>
                </Content>
              </ChoiceBox>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ height: '100%' }}>
            <Box>
              <ChoiceNotiTitle>택배운임 안내</ChoiceNotiTitle>
              <ChoiceNotiBg>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}
                >
                  [롯데택배]
                </span>
                <table
                  style={{
                    width: '100%',
                    margin: '12px 0',
                    borderCollapse: 'collapse',
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '16px',
                      lineHeight: '18px',
                      fontWeight: 400,
                    }}
                  >
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      무게/크기
                    </td>
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      기본운임
                    </td>
                  </tr>
                  <tr
                    style={{
                      fontSize: '14px',
                      lineHeight: '18px',
                      fontWeight: 400,
                    }}
                  >
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      5kg 이하 / 80cm 이하
                    </td>
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      4,490원
                    </td>
                  </tr>
                  <tr
                    style={{
                      fontSize: '14px',
                      lineHeight: '18px',
                      fontWeight: 400,
                    }}
                  >
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      20kg 이하 / 140cm 이하
                    </td>
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      4,490원
                    </td>
                  </tr>
                  <tr
                    style={{
                      fontSize: '14px',
                      lineHeight: '18px',
                      fontWeight: 400,
                    }}
                  >
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      20kg 이하 / 140cm 이하
                    </td>
                    <td
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      4,490원
                    </td>
                  </tr>
                </table>
                <JejuNoti>
                  <span
                    style={{ fontSize: 16, color: '#6D6D6D', marginBottom: 10 }}
                  >
                    제주 및 도서지역 할증 운임
                  </span>
                  <span
                    style={{ fontWeight: 400, fontSize: 14, color: '#909090' }}
                  >
                    제주도 3,000원 / 도서지역 5,000원
                  </span>
                  <Divider style={{ margin: '14px 0' }} />
                </JejuNoti>
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
                    marginTop: 20,
                  }}
                  onClick={onNext}
                >
                  다음
                </Button>
              </ChoiceNotiBg>
            </Box>
          </Grid>
        </Grid>
      </Root>
    </div>
  );
};

export default ReceivingAddress;

const Content = styled.div`
  margin-top: 30px;
`;
const CallBox = styled.div`
  width: 100%;
  display: flex;
`;

const InputText = styled.span`
  font-size: 20px;
  line-height: 23px;
  color: #6d6d6d;
`;

const CallInputBox = styled.div`
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: 1px solid #adadad;
  padding: 14px 0px;
  text-align: center;
  margin: 10px 0;
`;

const Inputbox = styled.div`
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: 1px solid #adadad;
  padding: 14px 16px;
  margin: 10px 0;
`;

const NormalText = styled.span`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.font.dark};
  font-weight: 400;
`;

const JejuNoti = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChoiceNotiTitle = styled.span`
  font-size: 24px;
  line-height: 28.64px;
  color: ${colors.font.dark};
`;

const ChoiceNotiBg = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.basic};
  border-radius: 16px;
  border: 13px;
  padding: 24px 20px;
  margin-top: 12px;
`;

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
