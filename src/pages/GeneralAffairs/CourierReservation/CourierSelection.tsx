import { Grid, Divider, Button } from '@mui/material';
import colors from 'styles/colors';
import styled from '@emotion/styled';

const courierReservation = (props: any) => {
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
                <ChoiceTitleBox>
                  <ChoiceTitle>택배운임 안내</ChoiceTitle>
                  <ChangeText>변경 &gt;</ChangeText>
                </ChoiceTitleBox>

                <ChoiceBg>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CourierBox>
                        <CourierBoxHeader>
                          <img src="/images/check-one.png" alt="check-one" />
                        </CourierBoxHeader>
                        <LogoBox>
                          <img
                            src="/images/lotte.png"
                            alt="lotte"
                            style={{ marginBottom: '10px' }}
                          />
                          <span>롯데택배</span>
                          <CustomDivider style={{ margin: '20px 0' }} />
                          <CourierBoxContent>
                            <CourierDesc>5kg 이하 / 80cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 140cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 180cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                        </LogoBox>
                      </CourierBox>
                    </Grid>
                    <Grid item xs={6}>
                      <CourierBox>
                        <CourierBoxHeader>
                          <img src="/images/check-one.png" alt="check-one" />
                        </CourierBoxHeader>
                        <LogoBox>
                          <img
                            src="/images/cj.png"
                            alt="lotte"
                            style={{ marginBottom: '10px' }}
                          />
                          <span>대한통운</span>
                          <CustomDivider style={{ margin: '20px 0' }} />
                          <CourierBoxContent>
                            <CourierDesc>5kg 이하 / 80cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 140cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 180cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                        </LogoBox>
                      </CourierBox>
                    </Grid>

                    <Grid item xs={6}>
                      <CourierBox>
                        <CourierBoxHeader>
                          <img src="/images/check-one.png" alt="check-one" />
                        </CourierBoxHeader>
                        <LogoBox>
                          <img
                            src="/images/hanjin.png"
                            alt="lotte"
                            style={{ marginBottom: '10px' }}
                          />
                          <span>한진택배</span>
                          <CustomDivider style={{ margin: '20px 0' }} />
                          <CourierBoxContent>
                            <CourierDesc>5kg 이하 / 80cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 140cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 180cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                        </LogoBox>
                      </CourierBox>
                    </Grid>
                    <Grid item xs={6}>
                      <CourierBox>
                        <CourierBoxHeader>
                          <img src="/images/check-one.png" alt="check-one" />
                        </CourierBoxHeader>
                        <LogoBox>
                          <img
                            src="/images/lotte.png"
                            alt="lotte"
                            style={{ marginBottom: '10px' }}
                          />
                          <span>오늘도착 택배</span>
                          <CustomDivider style={{ margin: '20px 0' }} />
                          <CourierBoxContent>
                            <CourierDesc>5kg 이하 / 80cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDesc>20kg 이하 / 140cm 이하</CourierDesc>
                            <CourierPrice>4,490원</CourierPrice>
                          </CourierBoxContent>
                          <CourierBoxContent>
                            <CourierDescRed>당일수거 당일 배송</CourierDescRed>
                            <CourierDescRed>
                              서울지역: 서울, 수도권, 부산
                            </CourierDescRed>
                          </CourierBoxContent>
                        </LogoBox>
                      </CourierBox>
                    </Grid>
                  </Grid>
                </ChoiceBg>

                <NotiBox>
                  <NotiTitle>방문희망일 선택 마감시간 안내</NotiTitle>
                  <NotiDesc>롯데택배: 00시까지 '내일방문' 선택 가능</NotiDesc>
                  <NotiDesc>CJ대한통운: 00시까지 '내일방문' 선택 가능</NotiDesc>
                  <NotiDesc>한진택배: 22시까지 '내일방문' 선택 가능</NotiDesc>
                  <NotiDesc>
                    오늘도착 택배: 10시까지 '오늘방문' 선택 가능
                  </NotiDesc>
                </NotiBox>
              </ChoiceBox>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ height: '100%' }}>
            <Box>
              <ChoiceNotiTitle>택배사 선택</ChoiceNotiTitle>
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
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}
                >
                  [대한통운]
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
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}
                >
                  [한진택배]
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
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}
                >
                  [오늘도착 택배]
                </span>
                <table
                  style={{
                    width: '100%',
                    margin: '20px 0',
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
                      colSpan={2}
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      무게/크기
                    </td>
                    <td
                      colSpan={3}
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
                      colSpan={2}
                      rowSpan={3}
                      style={{
                        border: '1px solid #909090',
                        padding: '8px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}
                    >
                      20kg 이하 / 140cm 이하
                    </td>
                    <td
                      colSpan={3}
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
                      colSpan={3}
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

export default courierReservation;

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
  height: 1415px;
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

const ChoiceTitleBox = styled.span`
  display: flex;
  justify-content: space-between;
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

const ChoiceBg = styled.div`
  width: 100%;
  background: ${colors.bg.basic};
  border-radius: 16px;
  border: 2px solid #b8b8b8;
  padding: 32px 24px;
  margin-top: 24px;
`;

const CourierBox = styled.div`
  width: 100%;
  heigth: 100%;
  background: ${colors.bg.white};
  display: flex;
  border-radius: 8px;
  border: 2px solid rgba(144, 144, 144, 0.7);
  padding: 24px;
  flex-direction: column;
`;

const NotiDesc = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.font.gray01};
  font-weight: 400;
  margin-left: 8px;
  margin-bottom: 12px;
`;

const NotiTitle = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.font.gray00};
  font-weight: 400;
  margin: 10px 0;
`;

const NotiBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const CustomDivider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #d1d1d1;
  margin: 20px 0;
`;

const CourierDescRed = styled.span`
  font-size: 16px;
  line-height: 18px;
  color: ${colors.font.red};
  font-weight: 400;

  @media screen and (max-width: 1536px) {
    font-size: 12px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const CourierDesc = styled.span`
  font-size: 16px;
  line-height: 18px;
  color: ${colors.font.gray01};
  font-weight: 400;
`;

const CourierPrice = styled.span`
  font-size: 16px;
  line-height: 16px;
  color: ${colors.font.dark};
`;

const CourierBoxContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CourierBoxHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  flex-direction: column;
  justify-content: space-between;
`;
