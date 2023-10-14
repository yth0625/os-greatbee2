import React, { useState } from 'react';
import 'moment/locale/ko';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

import Welcome from './Welcome';
import Favorite from './Favorite';
import Notice from './Notice';

import UpdateCalendar from './UpdateCalendar';
import RecentDocument from './RecentDocument';


function Main() {
  const [isShowRightContent, setIsShowRightContent] = useState<boolean>(false);

  return (
    <HomeContainer>
      <HomeLeft>
        <Welcome />
        <Favorite />
        <BottomContainer>
          <Notice />
          <RecentDocument />
        </BottomContainer>
      </HomeLeft>
      <HomeRight>
        <UpdateCalendar />
      </HomeRight>
      {isShowRightContent ? (
        <FloatingContent
          floating={isShowRightContent}
          onMouseLeave={() => setIsShowRightContent(false)}
        >
          <UpdateCalendar />
        </FloatingContent>
      ) : (
        <FloatingButton onMouseEnter={() => setIsShowRightContent(true)}>
          <Icon
            width={30}
            height={30}
            iconName='floatingMenu'
            style={{ marginTop: 3, marginLeft: 3 }}
          />
        </FloatingButton>
      )}
    </HomeContainer>
  );
}

export default Main;

const HomeContainer = styled.div`
  display: flex;
  padding-top: 8rem;

  .c_section_title {
    padding-bottom: 2rem;
  }

  position: relative;
`;

const HomeRight = styled.div`
  display: block;
  width: 30%;
  height: calc(100vh - 10rem);
  flex-shrink: 0;
  padding: 14px;
  @media screen and (max-width: 1440px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 3rem 0;
  }
`;

const FloatingContent = styled.div<{ floating: boolean }>`
  position: ${(props) => (props.floating ? 'absolute' : 'none')};
  margin-top: 1rem;
  padding: 2rem 1.5rem;
  background: ${colors.bg.white};
  right: 0;
  width: 30%;
  min-width: 400px;
  top: 80px;
  height: calc(100vh - 10rem);
  box-shadow: -6px 6px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: -5px 5px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: -5px 5px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 1.6rem;
  @media screen and (max-width: 1440px) {
    width: 27%;
    min-width: 349px;
  }
  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 3rem 0;
  }
`;

const HomeLeft = styled.div`
  padding: 3rem;
  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 3rem 0;
  }
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .favorite_container {
    padding: 0;
    @media screen and (max-width: 600px) {
      padding-left: 2rem;
    }

    .c_section_title {
      padding-bottom: 0;
      padding-left: 2.5rem;
      @media screen and (max-width: 600px) {
        padding-left: 0;
      }
    }
  }

  .category_container {
    background-color: ${colors.font.gray03};
  }
`;


const BottomContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const FloatingButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 100px;
  right: 1.5%;
  background: ${colors.bg.gray03};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 12px;
  display: none;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1440px) {
    display: block;
  }
`;
