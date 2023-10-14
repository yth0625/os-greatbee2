import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';

const PriceInfo = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>가격 안내</Title>
      <SubText>와플의 다양한 기능을 무료로 체험해보세요.</SubText>
      <FreeTrialButton
        onClick={() => navigate('/signUp', { state: { type: 'free' } })}
      >
        무료 체험 신청하기
      </FreeTrialButton>
      <div style={{ position: 'relative', marginTop: 50 }}>
        <Information>
          <thead>
            <tr>
              <th>주요기능</th>
              <th>개인 요금제</th>
              <th>프로 요금제</th>
              <th>기업 요금제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>멤버</td>
              <td>본인포함 최대 5명</td>
              <td>본임포함 최대 100명</td>
              <td>세일즈팀 별도 문의</td>
            </tr>
            <tr>
              <td>월간플랜</td>
              <td>무료</td>
              <td>
                <div>8,000원 / 월·1인</div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: colors.font.gray02,
                  }}
                >
                  부가세 10% 별도
                </div>
              </td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>연간플랜</td>
              <td>무료</td>
              <td>
                <div>7,000원 / 월·1인</div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: colors.font.gray02,
                  }}
                >
                  부가세 10% 별도
                </div>
              </td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>멤버십 관리자</td>
              <td>1명</td>
              <td>3명</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>자산관리</td>
              <td>최대 500건</td>
              <td>최대 8,000건</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>계약관리</td>
              <td>최대 30건</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>전자인장</td>
              <td>1개</td>
              <td>5개</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>e-문서</td>
              <td>500MB</td>
              <td>10GB</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>워크플로</td>
              <td>100Page</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>일반총무</td>
              <td>3명 선택 사용 가능</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>e-Procurement</td>
              <td>사용 가능</td>
              <td>무제한</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>기타</td>
              <td>-</td>
              <td>API연동, 감사로그</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button
                  outterStyles={{ borderRadius: 0 }}
                  textStyles={{ color: colors.font.dark, fontSize: 14 }}
                  onClick={() =>
                    navigate('/signUp', { state: { type: 'personal' } })
                  }
                >
                  지금 신청하기
                </Button>
              </td>
              <td>
                <Button
                  outterStyles={{ borderRadius: 0 }}
                  textStyles={{ color: colors.font.dark, fontSize: 14 }}
                  onClick={() =>
                    navigate('/signUp', { state: { type: 'pro' } })
                  }
                >
                  지금 신청하기
                </Button>
              </td>
              <td>
                <Button
                  outterStyles={{ borderRadius: 0 }}
                  textStyles={{ color: colors.font.dark, fontSize: 14 }}
                  onClick={() =>
                    navigate('/signUp', { state: { type: 'enterprise' } })
                  }
                >
                  지금 신청하기
                </Button>
              </td>
            </tr>
          </tbody>
        </Information>
        <RecommendTag
          style={{
            right: '36%',
          }}
        >
          추천
        </RecommendTag>
        <RecommendTag
          style={{
            right: '10%',
          }}
        >
          추천
        </RecommendTag>
      </div>
    </Container>
  );
};

export default PriceInfo;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to bottom,
    ${colors.primary.basic} 30%,
    ${colors.bg.white} 10%
  );
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.font.white};
  margin-top: 50px;
`;

const SubText = styled.div`
  color: #ffffff90;
  margin-top: 20px;
`;

const FreeTrialButton = styled.div`
  background: ${colors.bg.white};
  padding: 14px 20px;
  font-size: 14px;
  margin-top: 40px;
  color: ${colors.font.gray04};
  cursor: pointer;
`;

const Information = styled.table`
  width: 800px;
  background: ${colors.bg.white};
  box-shadow: 2px 3px 24px 0px rgba(0, 0, 0, 0.15);
  border-collapse: collapse;
  th {
    padding: 30px;
    border: 1px solid ${colors.border.basic};
    font-weight: 800;
    font-size: 20px;
  }
  td {
    padding: 14px;
    text-align: center;
    border: 1px solid ${colors.border.basic};
    color: ${colors.font.gray04};
    font-size: 14px;
  }
`;

const RecommendTag = styled.div`
  position: absolute;
  width: 40px;
  background: red;
  font-size: 14px;
  padding: 2px 6px;
  text-align: center;
  color: ${colors.font.white};
  border-radius: 4px;
  top: -10px;
`;
