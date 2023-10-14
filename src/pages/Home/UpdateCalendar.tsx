import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import PureCalendar from 'common/Calendar/Calendar';
import Update from './Update';

const todoItems = [
  {
    title: '기획팀 개발팀 미팅',
    location: '발리 회의룸',
    time: '9 AM - 10 AM',
  },
  {
    title: '신입/경력 팀원 미팅',
    location: '제주 회의룸',
    time: '11 AM - 12 PM',
  },
  {
    title: '팀 주간 회의',
    location: '도쿄 회의룸',
    time: '2 PM - 4 PM',
  },
];

const UpdateCalendar = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <Update />
      <CalendarConainer>
        <PureCalendar date={date} setValue={setDate} />
      </CalendarConainer>
      {/*{String(date).startsWith('Mon') && // 월요일이 클릭되면 목록이 나오도록 임시 조건문 추가*/}
      {/*  todoItems.length > 0 && (*/}
      {/*    <TodoList>*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          display: 'flex',*/}
      {/*          flexDirection: 'row',*/}
      {/*          justifyContent: 'space-between',*/}
      {/*          alignItems: 'center',*/}
      {/*          paddingBottom: 6,*/}
      {/*          borderBottom: `1px solid ${colors.border.basic}`,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <span>할 일 목록</span>*/}
      {/*        <Icon iconName="more" />*/}
      {/*      </div>*/}
      {/*      {todoItems.map((item, i) => {*/}
      {/*        return (*/}
      {/*          <TodoItem key={i}>*/}
      {/*            <div>*/}
      {/*              <div*/}
      {/*                style={{*/}
      {/*                  color: colors.font.dark,*/}
      {/*                  fontSize: 16,*/}
      {/*                  fontWeight: '600',*/}
      {/*                }}*/}
      {/*              >*/}
      {/*                {item.title}*/}
      {/*              </div>*/}
      {/*              <div*/}
      {/*                style={{*/}
      {/*                  color: colors.font.gray02,*/}
      {/*                  fontSize: 12,*/}
      {/*                  marginTop: 8,*/}
      {/*                }}*/}
      {/*              >*/}
      {/*                {item.location}*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div style={{ color: colors.font.dark, fontSize: 14 }}>*/}
      {/*              {item.time}*/}
      {/*            </div>*/}
      {/*          </TodoItem>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </TodoList>*/}
      {/*  )}*/}
    </>
  );
};

export default UpdateCalendar;

const UpdateContents = styled.section`
  min-height: 200px;
  background: ${colors.bg.white};
  padding: 2rem;
  margin-bottom: 14px;
  border-radius: 1.6rem;
  span {
    font-weight: 700;
  }
  @media screen and (max-width: 1440px) {
    padding: 0.5rem 1rem;
  }
  @media screen and (max-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 0;
  }
`;

const CalendarConainer = styled(UpdateContents)`
  padding: 2rem;
`;

const TodoList = styled(UpdateContents)`
  padding: 2rem;
`;

const TodoItem = styled.div`
  padding: 10px 16px;
  border-left: 6px solid ${colors.border.basic};
  margin-top: 16px;
  width: 100%;
  background: #fffdf4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
