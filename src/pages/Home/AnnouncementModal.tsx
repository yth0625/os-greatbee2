import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import Button from 'common/Button/Button';
import colors from 'styles/colors';

const AnnouncementModal = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const submit = () => {
    console.log('call api');
  };

  return (
    <Container>
      <Divider />
      <Title>
        <Subtitle>신규 입사자 교육 날짜 일정 안내드립니다</Subtitle>
        <Writer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            김꿀벌
            <img
              src={
                'http://image.cine21.com/resize/IMGDB/article/2004/1228/medium/154347_pl483[W578-].jpg'
              }
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                objectFit: 'cover',
                marginLeft: 12,
                marginRight: 25,
              }}
            ></img>
            10분 전
          </div>
        </Writer>
      </Title>
      <Divider />
      <Detail>
        <TextBox>
          <p
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 0,
              border: 'none',
              padding: '0rem',
            }}
          >
            국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한
            조약, 무호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나
            국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한
            조약의 체결-비준에 대한 동의권을 가진다.국회는 상호원조 또는
            안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 무호통상항해조약,
            주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적
            부담을 지우는 조약 또는 입법사항에 관한 조약의 체결-비준에 대한
            동의권을 가진다.국회는 상호원조 또는 안전보장에 관한 조약, 중요한
            국제조직에 관한 조약, 무호통상항해조약, 주권의 제약에 관한 조약,
            강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는
            입법사항에 관한 조약의 체결-비준에 대한 동의권을 가진다.국회는
            상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약,
            무호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나 국민에게
            중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의
            체결-비준에 대한 동의권을 가진다.국회는 상호원조 또는 안전보장에
            관한 조약, 중요한 국제조직에 관한 조약, 무호통상항해조약, 주권의
            제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을
            지우는 조약 또는 입법사항에 관한 조약의 체결-비준에 대한 동의권을
            가진다.국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에
            관한 조약, 무호통상항해조약, 주권의 제약에 관한 조약, 강화조약,
            국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에
            관한 조약의 체결-비준에 대한 동의권을 가진다.국회는 상호원조 또는
            안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 무호통상항해조약,
            주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적
            부담을 지우는 조약 또는 입법사항에 관한 조약의 체결-비준에 대한
            동의권을 가진다.국회는 상호원조 또는 안전보장에 관한 조약, 중요한
            국제조직에 관한 조약, 무호통상항해조약, 주권의 제약에 관한 조약,
            강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는
            입법사항에 관한 조약의 체결-비준에 대한 동의권을 가진다.
          </p>
        </TextBox>
      </Detail>
      <Divider />
      <ButtonBox>
        <Button
          onClick={isClicked ? () => submit() : () => console.log('')}
          outterStyles={{
            background: 'var(--primary-color)',
            width: 200,
            border: 'none',
          }}
          textStyles={{
            color: '#000',
            fontSize: '1.3rem',
            resize: 'none',
          }}
        >
          목록보기
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default AnnouncementModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e5e5;
  margin-top: 5px;
`;

const Title = styled.div`
  width: 600px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin-top: 3px;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const Writer = styled.div`
  margin-right: 20px;
`;

const Detail = styled.div`
  width: 600px;
  height: 200px;
  border-radius: 8px;
  margin-top: 10px;
`;

const TextBox = styled.div`
  width: 600px;
  height: 200px;
  font-size: 1.4rem;
  line-height: 20px;
  border-radius: 0px;
  overflow: scroll;
`;

const ButtonBox = styled.div`
  width: 200px;
  height: 35px;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
`;
