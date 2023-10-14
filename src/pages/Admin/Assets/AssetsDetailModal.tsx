import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Icon from 'styles/Icon';

// TODO sample data - 추후 삭제 필요
const tempData = [
  {
    subtitle: '사용자 정보',
    contents: [
      {
        label: '사용자',
        value: '김꿀벌',
      },
      {
        label: '사용부서',
        value: '총무팀',
      },
    ],
  },
  {
    subtitle: '품목 정보',
    contents: [
      {
        label: '자산관리코드',
        value: '100899',
      },
      {
        label: '품목',
        value: '노트북',
      },
      {
        label: '품목명',
        value: 'MacBook Pro 13인치 스페이스 그레이',
      },
      {
        label: '수량',
        value: '10',
      },
    ],
  },
  {
    subtitle: '제품 정보',
    contents: [
      {
        label: '제조사',
        value: 'Apple',
      },
      {
        label: '모델명',
        value: 'A-1706',
      },
      {
        label: 'S/N',
        value: 'XX-XXXX-XXXX',
      },
    ],
  },
  {
    subtitle: '기준 정보',
    contents: [
      {
        label: '취득일자',
        value: '2023.01.01.',
      },
      {
        label: '종료기한',
        value: '2027.12.31.',
      },
      {
        label: '정율/정액',
        value: '정율',
      },
      {
        label: '상각기간',
        value: '5년',
      },
    ],
  },
  {
    subtitle: '자산가치',
    contents: [
      {
        label: '취득가액',
        value: '2,000,000',
      },
      {
        label: '당월 잔존가액',
        value: '1,833,333',
      },
      {
        label: '당월 상각액',
        value: '3,333',
      },
      {
        label: '당기 잔존가액',
        value: '1,8333,333',
      },
      {
        label: '당기 상각액',
        value: '3,333',
      },
      {
        label: '변동 내역',
        value: '없음',
      },
    ],
  },
  {
    subtitle: '자산관리 QR코드',
    qr: 'sampleqr',
  },
];

const AssetsDetailModal = ({ item }: any) => {
  return (
    <Container>
      {tempData.map((data, i) => (
        <div
          key={i}
          style={{
            borderBottom: data.qr ? 'none' : `1px solid ${colors.border.basic}`,
            paddingBottom: 20,
            width: '100%',
          }}
        >
          <SubTitle>[{data.subtitle}]</SubTitle>
          {data.contents &&
            data.contents.map((label, idx) => (
              <Contents key={idx}>
                <Label>{label.label}</Label>
                <Value>{label.value}</Value>
              </Contents>
            ))}
          {/* TODO 샘플 qr코드로 추구 변경 필요 */}
          {data.qr && <Icon iconName="sampleqr" />}
        </div>
      ))}
    </Container>
  );
};

export default AssetsDetailModal;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const SubTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.font.gray04};
`;

const Contents = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Label = styled.div`
  font-weight: 600;
  color: ${colors.font.gray04};
  min-width: 100px;
`;

const Value = styled.div`
  border: 1px solid ${colors.border.basic};
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  color: ${colors.font.gray01};
`;