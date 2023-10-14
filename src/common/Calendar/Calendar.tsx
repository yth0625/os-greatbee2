import React, { useEffect, useState } from 'react';
import { months, weekDays } from 'const/constance';
import { generateMatrix } from 'utils/generateMatrix';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';

function PureCalendar({
  date,
  setValue,
}: {
  date: Date;
  setValue: (date: Date) => void;
}) {
  const [matrix, setMatrix] = useState<any[]>([]);

  const result = generateMatrix(date);

  const sixRows =
    matrix.length > 0 &&
    matrix[6].filter((item: any) => item.date !== -1).length > 0;

  const onPress = (item: number) => {
    if (typeof item !== 'string' && item != -1) {
      const newDate = new Date(date.setDate(item));
      setValue(newDate);
    }
  };

  const changeMonth = (n: number) => {
    const newDate = new Date(date.setMonth(date.getMonth() + n));
    setValue(newDate);
  };

  const renderText = (item: any) => {
    if (item.date === date.getDate()) {
      return `${colors.primary.basic}`;
    } else {
      return 'transparent';
    }
  };

  useEffect(() => {
    result.length > 0 && setMatrix(result);
  }, [date]);

  useEffect(() => {
    setValue(date);
  }, [date]);

  let rows = matrix?.map((row, rowIndex: number) => {
    let rowItems = row.map((item: any, colIndex: number) => {
      return (
        <span
          key={colIndex}
          style={{
            height: 24,
            width: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 11,
            cursor: 'pointer',
          }}
          onClick={() => onPress(item.date)}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              backgroundColor:
                item.date === -1 ? 'transparent' : renderText(item),
              borderRadius: 18,
            }}
          >
            <span
              style={{
                fontWeight: item.date == date.getDate() ? 'bold' : '300',
                color:
                  item.date === date.getDate()
                    ? colors.font.white
                    : colors.font.gray01,
                fontSize: 12,
              }}
            >
              {item.date != -1 ? item.date : ''}
            </span>
          </span>
        </span>
      );
    });

    return (
      <div
        key={rowIndex}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {rowItems}
      </div>
    );
  });

  return (
    <div>
      <ActionContainer>
        <Icon
          iconName="arrowleft"
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
          onPress={() => changeMonth(-1)}
        />
        <div style={{ fontWeight: 600, fontSize: 22 }}>{`${
          months[date.getMonth()]
        } ${date.getFullYear()}`}</div>
        <Icon
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
          iconName="arrowright"
          onPress={() => changeMonth(+1)}
        />
      </ActionContainer>
      <Week>
        {weekDays.map((item, i) => (
          <div style={{ fontSize: 13, width: 30, textAlign: 'center' }} key={i}>
            {item}
          </div>
        ))}
      </Week>
      <div>{rows}</div>
    </div>
  );
}

export default PureCalendar;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 30px;
`;

const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 14px;
`;
