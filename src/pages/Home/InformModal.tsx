import React from 'react';
import styled from '@emotion/styled';
import Button from 'common/Button/Button';
import colors from 'styles/colors';
import StatusTag from 'common/Tag/StatusTag';

const informationData = [
  {
    status: '승인완료',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },
  {
    status: '반려됨',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },
  {
    status: '승인요청',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },
  {
    status: '보류중',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },
  {
    status: '진행중',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },

  {
    status: '승인요청',
    content:
      "김꿀벌님이 올린 '휴가신청(김꿀벌) - 2002년 10월 18일(1일) 연차'문서가 결재 완료되었습니다.",
    createdAt: '(10분 전)',
  },
];

const InformModal = () => {
  return (
    <Container>
      <Divider />
      {informationData.map((item, i) => (
        <>
          <ItemBox>
            <StatusTag text={item.status} />
            <div style={{ marginLeft: 10, fontSize: '15px' }}>
              {item.content}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: colors.font.dark,
                marginLeft: 10,
              }}
            >
              {item.createdAt}
            </div>
          </ItemBox>
          {item.status === '승인요청' && (
            <ButtonContainer>
              <Button
                outterStyles={{
                  background: colors.bg.basic,
                  borderColor: colors.bg.basic,
                }}
                textStyles={{ color: colors.font.basic }}
              >
                반려
              </Button>
              <Button
                outterStyles={{
                  marginLeft: 10,
                }}
                textStyles={{ color: colors.font.basic }}
              >
                승인
              </Button>
            </ButtonContainer>
          )}
          <Divider />
        </>
      ))}
    </Container>
  );
};

export default InformModal;

const Container = styled.div`
  width: 730px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.border.dark};
  margin: 20px 0px;
`;

const TagStyle = styled.div<{ type: string }>`
  width: 72px;
  height: 27px;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.type === '보류중'
      ? colors.bg.yellow
      : props.type === '승인완료'
      ? colors.bg.green
      : props.type === '반려됨'
      ? colors.bg.red
      : props.type === '진행중'
      ? colors.bg.blue
      : '#EEEEEE70'};
  border: 1px solid
    ${(props) =>
      props.type === '보류중'
        ? colors.primary.basic
        : props.type === '승인완료'
        ? colors.color.green
        : props.type === '반려됨'
        ? colors.color.red
        : props.type === '진행중'
        ? colors.color.blue
        : '#888888'};
  span {
    color: ${(props) =>
      props.type === '보류중'
        ? colors.primary.basic
        : props.type === '승인완료'
        ? colors.color.green
        : props.type === '반려됨'
        ? colors.color.red
        : props.type === '진행중'
        ? colors.color.blue
        : colors.color.gray};
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;
