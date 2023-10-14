import { useEffect, useState } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

import { useGetProfileApi } from '../../api/useMainApi';

import colors from '../../styles/colors';

const welcomeMessages = [
  '행운은 스스로 운이 좋다고 믿을 때 찾아온데요. 오늘도 내일도 행운이 가득한 날이 되시길 바래요',
  '오늘 하루도 뽀송뽀송 한 기분으로 좋은 하루 보내시길 바라요',
  '바쁜 일상 틈틈이 커피 한 잔의 하면서 여유 있는 하루 보내세요',
  '행복해서 웃는 게 아니라 웃으면 행복해진다고 하네요 많이 웃는 하루 보내세요',
  '더 많이 웃고, 더 많이 행복하고, 더 많이 사랑받는 멋진 한주 보내세요',
  '어제 보다 나은 오늘, 오늘 보다 나은 내일을 위해 모두 파이팅',
  '늘 맞이하는 똑같은 하루지만, 오늘만큼은 어제 보다 더 많이 웃고, 더 행복한 하루를 보내시길 바래요',
  '멋진 당신의 행복한 하루를 위해 오늘도 응원할게요',
  'Hope your day is filled with lots of sweet things',
  'I just wanna say Have a nice day!',
  'Have a lovely day! Have a beautiful day!',
  'Make today ridiculously amazing',
  "Have a nice day Let's enjoy this day!",
  'You have to get up every morning and tell yourself "I CAN DO THIS"',
]


const WelcomeBox = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const today = moment(new Date())
    .locale('ko')
    .format('YYYY년 MM월 DD일 (dddd)');

  const { data, isSuccess } = useGetProfileApi();

  useEffect(() => {
    if (isSuccess) {
      setName(data.userName)
    }
  }, [isSuccess, data])

  useEffect(() => {
    setWelcomeMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)])

  }, [])

  return (
    <Greeting>
      <div style={{ width: '100%'}}>
        <GreetingText>안녕하세요 {name}님</GreetingText>
        <GreetingSubText>{welcomeMessage}</GreetingSubText>
      </div>
      <WeatherSection>
        <div style={{ marginTop: 10 }}>
              <span style={{ color: '#939AAC', fontSize: '1rem' }}>
                구름 조금
              </span>
          <span
            style={{ color: '#909090', fontSize: '3rem', marginTop: 8 }}
          >
                19
                <span style={{ display: 'inline', fontSize: '2rem' }}>℃</span>
              </span>
          <span
            style={{ color: '#939AAC', marginTop: 8, fontSize: '1.3rem' }}
          >
                {today}
              </span>
        </div>
        <img
          src="/images/cloud.png"
          alt="weather"
          style={{ width: '20%', marginLeft: 10 }}
        />
      </WeatherSection>
    </Greeting>
  )
}

const Greeting = styled.section`
  padding: 2.5rem 3rem;
  background: ${colors.bg.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.6rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 2rem;
    border-radius: 0;
    flex-direction: column;
  }
`;

const GreetingText = styled.div`
  color: ${colors.font.gray02};
  font-size: 2.5rem;
  font-weight: 500;
`;

const GreetingSubText = styled.div`
  color: ${colors.font.gray02};
  font-size: 1.4rem;
  margin-top: 10px;
  font-weight: 400;
`;

const WeatherSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  span {
    display: block;
    text-align: right;
  }
`;

export default WelcomeBox
