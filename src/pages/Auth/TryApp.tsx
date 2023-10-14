import React from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

const TryApp = () => {
  return (
    <Container>
      <div className="logo_infotext">
        {/* <Icon iconName="arrowleft" style={{ position: 'absolute', left: 10 }} /> */}
        <img
          src="/images/logo/GreatBee.png"
          alt="logo"
          width={'58%'}
          style={{ paddingTop: '7.2vh' }}
        />
        <InfoTextBox>
          더 편리하고 더 똑똑하게 일할 수 있도록!
          <br />
          회사와 구성원의 Value-up을 위한
          <br />
          경영지원 운영·관리 플랫폼을 제공합니다.
        </InfoTextBox>
        <img
          src="/images/tryappimage.png"
          alt="tryappinfo"
          width={'92%'}
          style={{ paddingTop: '6.2vh' }}
        />
      </div>
      <BottomContainer>
        <div className="textinfo">그레이트비앱이 없으시다면?</div>
        <span>
          구글 플레이 또는 애플 앱스토어에서 그레이트비를 검색해 주세요
        </span>
        <Buttons>
          {/* TODO app 이름 넣어야함*/}
          <a href="http://play.google.com/store/apps/details?id=naver">
            <img src="/images/googleplay.png" alt="googleplay" />
          </a>
          <a href="https://itunes.apple.com/kr/app/apple-store/naver">
            <img src="/images/appstore.png" alt="appstore" />
          </a>
        </Buttons>
      </BottomContainer>
    </Container>
  );
};

export default TryApp;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 3.6vw;
  /* font-size: 13px; */

  .logo_infotext {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const InfoTextBox = styled.p`
  padding-top: 4vh;
  line-height: 30px;
  text-align: center;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .textinfo {
    color: ${colors.primary.basic};
    text-decoration: underline;
    line-height: 18px;
    margin-bottom: 4px;
  }

  span {
    letter-spacing: -0.6px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 5vh 0;

  a {
    width: 40%;
  }
  img {
    width: 100%;
  }
`;
