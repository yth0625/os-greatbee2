import { Grid, Divider, Button } from '@mui/material';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import SelectionBox from './component/SelectionBox';
import CategorySelector from './component/CategorySelector';
import CustomDropdown from './component/CustomDropdown';

const SendingAddress = (props: any) => {
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
                  <ChoiceTitle>보내는 분</ChoiceTitle>
                  <ChangeText>변경 &gt;</ChangeText>
                </ChoiceTitleBox>

                <Content>
                  <ReciverBox>
                    <span>정환석</span>
                    <span>010 - 3639 - 8386</span>
                    <span>
                      서울특별시 강서구 양천로 65길 32 (염창동) 삼성펠리체 601호
                    </span>
                  </ReciverBox>
                </Content>

                <Content>
                  <ChoiceTitle>받는 분</ChoiceTitle>
                </Content>

                <Content>
                  <NormalText>이름</NormalText>
                  <Inputbox>
                    <InputText>정환석</InputText>
                  </Inputbox>
                </Content>

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

                <Content>
                  <NormalText>물품 명</NormalText>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: '10px 0',
                    }}
                  >
                    <Inputbox style={{ width: 723, margin: '0' }}>
                      <InputText>예 ) 구두</InputText>
                    </Inputbox>
                    <div className="relative">
                      <CategorySelector
                        label="취급제한 품목"
                        style={{
                          width: '164px',
                          color: '#6D6D6D',
                          height: '64px',
                          backgroundColor: '#EEEEEE',
                          fontSize: '20px',
                          fontWeight: 500,
                          maxHeight: '54px',
                        }}
                      >
                        <div className="z-50 absolute flex flex-col rounded-[8px] border border-solid border-[#D1D1D1] bg-[#fff] shadow-lg left-0 mt-3 w-[640px]">
                          <div className="flex justify-center py-[8px] px-[16px]  bg-[#FFC73C]">
                            <span className="text-[20px] font-semibold text-[#fff] font-[#fff]">
                              취급제한 품목 안내
                            </span>
                          </div>
                          <div className="divide-y-2 divide-solid divide-[#D1D1D1] px-[16px]">
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                현금화가능 물품
                              </span>
                              <span className="text-[16px] font-normal">
                                현금, 수표, 주권, 인지 등의 유가증권
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                예술품/귀중품
                              </span>
                              <span className="text-[16px] font-normal">
                                금,은 귀금속 및 다이아몬드 등 고가의 보석류,
                                골동품(도자기류 포함) 및 미술품
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                위험 물품
                              </span>
                              <span className="text-[16px] font-normal">
                                화약류, 인명 살상용 총포류, 화공약품 등 인화물질
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                불법 유통물
                              </span>
                              <span className="text-[16px] font-normal">
                                밀수품, 밀반출 군수품, 부정 임산물, 기타
                                범칙물품
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                재생 불가능 물품
                              </span>
                              <span className="text-[16px] font-normal">
                                인감도장, 긴급한 각종(무역)서류, 원서,
                                배송기일내 도착하지 못하면 가치가 소멸되는 것 등
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                우편법 위배품
                              </span>
                              <span className="text-[16px] font-normal">
                                서신류 등 우편법상 제한화물
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                규격 외 물품
                              </span>
                              <span className="text-[16px] font-normal">
                                신청한 규격을 초과하는 물품 (택배사 별
                                규격기준은 홈페이지 참조)
                                <br />힌 변의 길이가 100cm이상인 물품
                              </span>
                            </div>
                            <div className="flex flex-col py-[14px] text-[#6D6D6D] space-y-1">
                              <span className="text-[20px] font-medium">
                                택배 운송에 적합하지 않은 물품 / 포장상태
                              </span>
                              <span className="text-[16px] font-normal">
                                중고가전제품 포장이 부적합한 상품 (파손위험 및
                                마대포장 등)
                                <br />
                                병, 유리, 거울 제품
                                <br />
                                규격내 포장이 되지않은 책상, 의자, 가구, 자전거
                                등
                                <br />
                                부패되기 쉬운 냉장/냉동식품류 및 연질 과일류,
                                액체류,
                                <br />
                                액상물질
                                <br />
                                뚜껑이 열리거나 변형이 쉬운 바케스, 말통, 원통형
                                지관통 <br />
                                비닐봉지, 종이쇼핑백으로 포장되어 내품이
                                유실되기 쉬운 화물
                              </span>
                            </div>
                          </div>
                        </div>
                      </CategorySelector>
                    </div>

                    <div className="relative">
                      <CategorySelector
                        label="카테고리 선택"
                        style={{
                          width: '164px',
                          color: '#6D6D6D',
                          height: '64px',
                          backgroundColor: '#EEEEEE',
                          fontSize: '20px',
                          fontWeight: 500,
                          maxHeight: '54px',
                        }}
                      >
                        <div className="z-50 absolute flex py-[24px] px-[48px] rounded-[8px] border border-solid border-[#D1D1D1] bg-[#fff] shadow-lg right-0 mt-3 w-[740px] h-[280px]">
                          <div className="flex space-x-[48px] ">
                            <div className="space-y-[12px]">
                              <div className="text-[#232323] font-medium ">
                                <span>농축산물류</span>
                              </div>
                              <div className="flex flex-col text-[#909090] space-y-[8px] text-[18px]">
                                <span>건어물</span>
                                <span>과일</span>
                                <span>쌀</span>
                                <span>야채 / 채소</span>
                                <span>기타</span>
                              </div>
                            </div>
                            <div className="space-y-[12px]">
                              <div className="text-[#232323] font-medium ">
                                <span>서적류</span>
                              </div>
                              <div className="flex flex-col text-[#909090] space-y-[8px] text-[18px]">
                                <span>서류</span>
                                <span>서적</span>
                                <span>인쇄물</span>
                                <span>학습지</span>
                                <span>기타</span>
                              </div>
                            </div>
                            <div className="space-y-[12px]">
                              <div className="text-[#232323] font-medium ">
                                <span>약품류/파우치류</span>
                              </div>
                              <div className="flex flex-col text-[#909090] space-y-[8px] text-[18px]">
                                <span>건강보조제품</span>
                                <span>배즙/인삼즙/홍삼즙</span>
                                <span>의약품</span>
                                <span>한약</span>
                                <span>기타</span>
                              </div>
                            </div>
                            <div className="space-y-[12px]">
                              <div className="text-[#232323] font-medium ">
                                <span>의류/잡화류</span>
                              </div>
                              <div className="flex flex-col text-[#909090] space-y-[8px] text-[18px]">
                                <span>의류</span>
                                <span>신발</span>
                                <span>가방/지갑</span>
                                <span>침구류</span>
                                <span>액세서리</span>
                                <span>주방용품</span>
                                <span>기타</span>
                              </div>
                            </div>
                            <div className="space-y-[12px]">
                              <div className="text-[#232323] font-medium ">
                                <span>화장품류</span>
                              </div>
                              <div className="flex flex-col text-[#909090] space-y-[8px] text-[18px]">
                                <span>비투/세안제</span>
                                <span>샴푸</span>
                                <span>스킨/로션</span>
                                <span>향수</span>
                                <span>기타</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CategorySelector>
                    </div>
                  </div>
                </Content>

                <Content>
                  <NormalText>물품단가</NormalText>
                  <Inputbox>
                    <InputText>만원</InputText>
                  </Inputbox>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        width: 259,
                        color: '#6D6D6D',
                        height: 64,
                        backgroundColor: '#EEEEEE',
                        fontSize: 20,
                        fontWeight: 500,
                        maxHeight: 54,
                      }}
                    >
                      1만원
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        width: 259,
                        color: '#6D6D6D',
                        height: 64,
                        backgroundColor: '#EEEEEE',
                        fontSize: 20,
                        fontWeight: 500,
                        maxHeight: 54,
                      }}
                    >
                      5만원
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        width: 259,
                        color: '#6D6D6D',
                        height: 64,
                        backgroundColor: '#EEEEEE',
                        fontSize: 20,
                        fontWeight: 500,
                        maxHeight: 54,
                      }}
                    >
                      10만원
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        width: 259,
                        color: '#6D6D6D',
                        height: 64,
                        backgroundColor: '#EEEEEE',
                        fontSize: 20,
                        fontWeight: 500,
                        maxHeight: 54,
                      }}
                    >
                      30만원
                    </Button>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: '#6D6D6D',
                      marginTop: 10,
                    }}
                  >
                    * 사고발생 시 보상기준이 되니 실제 물품 금액을 입력해주세요.
                  </span>
                </Content>

                <Content>
                  <CustomDropdown
                    label="물품배송 시 요청사항 선택"
                    optionsString={[
                      '물품배송 시 요청사항 선택',
                      '배송시 파손에 주의해 주세요',
                      '배송시 경비실에 맡겨 주세요',
                      '배송시 택배함에 넣어주세요',
                      '배송시 문앞에 놓아주세요',
                      '배송시 전화주세요. (벨 X)',
                      '직접입력(15자까지 입력가능)',
                    ]}
                  ></CustomDropdown>
                </Content>

                <Content>
                  <CustomDropdown
                    label="물품배송 시 요청사항 선택"
                    optionsString={[
                      '물품수거 시 요청사항 선택',
                      '기사님 방문전 연락주세요',
                      '수거시 전화주세요. (벨 X)',
                      '보낼물품 문앞에 있어요',
                      '보낼물품 경비실에 있어요',
                      '직접입력(15자까지 입력가능)',
                    ]}
                  ></CustomDropdown>
                </Content>

                <Content>
                  <div style={{ margin: ' 60px 0' }}>
                    <ChoiceTitle>박스크기 및 수량 (중복선택 가능)</ChoiceTitle>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon
                      width={32}
                      height={32}
                      iconName="InfoCircle"
                      style={''}
                    />
                    <span style={{ color: '#FF0000', fontSize: 20 }}>
                      무게, 크기 초과시 수거거부될 수 있으니 정확히
                      등록해주세요.
                    </span>
                  </div>
                  <div className="space-y-[24px] mt-[24px]">
                    <SelectionBox
                      title="소형박스"
                      content="무게 5kg/ 크기80cm이하 <br /> ex) 신발박스, A4용지박스 크기"
                    />
                    <SelectionBox
                      title="대형박스"
                      content="무게 20kg/ 크기140cm이하 <br /> ex) 전자레인지박스, 우체국5호박스 크기"
                    />
                    <SelectionBox
                      title="특대형박스"
                      content="무게 20kg/ 크기160cm이하 <br /> ex) 우체국 6호박스 크기"
                    />
                  </div>
                  <div className="my-[24px]">
                    <span className="text-[#F00]">
                      ※ 한 변의 길이가 100cm 초과 시 집하불가
                    </span>
                  </div>
                  <SurchargeBox>
                    <div className="flex flex-col w-full p-[24px] space-y-[16px] rounded-[8px] border border-solid border-[#D1D1D1] bg-[#fff]">
                      <span>
                        입력 규격 초과 시 표준운임 외 아래표를 기준으로
                        할증운임이 부과됩니다
                      </span>
                      <span>[할증운임 책정 기준]</span>
                      <table className="w-full border-collapse border border-[#909090] text-center">
                        <thead>
                          <tr className="bg-yellow-500 text-[#fff]">
                            <th className="border border-solid border-[#909090]">
                              무게 / 크기
                            </th>
                            <th className="border border-solid border-[#909090]">
                              기본운임
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-solid border-[#909090]">
                              5kg 이하/80cm 이하
                            </td>
                            <td className="border border-solid border-[#909090]">
                              4,490원
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-solid border-[#909090]">
                              5kg 이하/80cm 이하
                            </td>
                            <td className="border border-solid border-[#909090]">
                              4,490원
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-solid border-[#909090]">
                              5kg 이하/80cm 이하
                            </td>
                            <td className="border border-solid border-[#909090]">
                              4,490원
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </SurchargeBox>
                </Content>
              </ChoiceBox>
            </Box>
          </Grid>
          <Grid item xs={4} style={{ height: '520px' }}>
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

export default SendingAddress;

const SurchargeBox = styled.div`
  display: flex;
  width: 825px;
  padding: 24px 32px;
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  background-color: #efefec;
  @media screen and (max-width: 1536px) {
    width: 585px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const ReciverBox = styled.div`
  width: 100%;
  height: 148px;
  border-radius: 8px;
  border: 1px solid rgba(35, 35, 35, 0.2);
  padding: 14px 16px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #909090;
`;

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
  height: 2648px;
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

const ChoiceTitleBox = styled.span`
  display: flex;
  justify-content: space-between;
`;
