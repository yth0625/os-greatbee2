import { useState, useEffect, useCallback } from 'react';
import { styled } from 'styled-components';

// 지정 hours
const createHours = (f: number, t: number) => {
    return Array.from({length: t - f + 1}, (_, from) => f + from);
}

const hoursToText = (time: number, long: boolean = false) => {
    // TODO: 30분 단위 string 조건문 변경
    if (time >= 13) return `${time - 12}${long ? ':00' : ''} PM`;
    else if (time >= 12 && time < 13) return `${time}${long ? ':00' : ''} PM`;
    else return `${time} AM`;
}

type CarReservation = {
    eventNum: number,
    start: number, 
    until: number,
    person: string,
}

const CarReservationArr: CarReservation[] = [
{
    eventNum: 2,
    start: 16,
    until: 1,
    person: '전지현'
}, 
{
    eventNum: 3,
    start: 16,
    until: 1,
    person: '전지현'
},
{
    eventNum: 4,
    start: 16,
    until: 1,
    person: '전지현'
},
{
    eventNum: 2,
    start: 17,
    until: 1,
    person: '전지현'
},
]

const isReserved = (eObject: CarReservation, time: number) => {
    if (time >= eObject.start && time < eObject.start + eObject.until) return true;
    else return false;
}

const hasReservation = (list: CarReservation[], time: number, k: number): CarReservation => {
    let result: CarReservation = {
        eventNum: -1,
        start: -1,
        until: -1,
        person: ''
    };
    for (let i = 0; i < list.length; i+=1) {
        let l = list[i];
        if (l.eventNum !== k) continue;
        if (l.start >= time && l.start < time + 0.5) {
            result = l;
            break;
        }
    }
    return result;
}

const carList = ['123하4567', '123하4567', '123하4567', '123하4567', '123하4567'];

function VehicleCalendar() {
    


    const drawHourTable = () => {
        const hourTable =
            createHours(7,21).map((time) =>{ 
                return (
                <HourRow>
                    <LeftTextHour>{hoursToText(time)}</LeftTextHour>
                    <TimeblockContainer>
                        {carList.map((carNum, i) => {
                            const mock = hasReservation(CarReservationArr, time, i);
                            return(<Timeblock>
                            {mock.eventNum >= 0 && i === mock.eventNum && isReserved(mock, time) ? 
                                <Halfblock /> : 
                                <Halfblock style={{boxShadow: '0px -1px 0px 0px #F7F7F7 inset'}}/>
                            }
                            {mock.eventNum >= 0 && i === mock.eventNum && isReserved(mock, time + 0.5) ? 
                                <Halfblock /> : 
                                <Halfblock style={{boxShadow: '0px -1px 0px 0px #F7F7F7 inset', borderBottom: '1px solid #E0E0E0'}}/>
                            }


                            {mock.eventNum >= 0 && i === mock.eventNum && mock.start <= time && mock.start + 0.5 > time && 
                                <ReservedBlock style={{height: `${24*(mock.until / 0.5)}px`}}>
                                    <Bar />
                                    <ReservedBlockContent>
                                        <ReservedTime>{hoursToText(time, true)}</ReservedTime>
                                        <ReservedPerson>사용자 - {mock.person}</ReservedPerson>
                                    </ReservedBlockContent>
                                </ReservedBlock>}
                        </Timeblock>)})}
                    </TimeblockContainer>
                </HourRow>)}
            )
        return <>{hourTable}</>;
    }


    return (
        <CalendarContainer>
            <ColumnHeaderContainer>
                <LeftText>GTM+9</LeftText>
                <ColumnHeader>
                    <Column>
                        123하4567
                    </Column>
                    <Column>
                        123하4567
                    </Column>
                    <Column>
                        123하4567
                    </Column>
                    <Column>
                        123하4567
                    </Column>
                    <Column>
                        123하4567
                    </Column>
                </ColumnHeader>
            </ColumnHeaderContainer>
            {drawHourTable()}
        </CalendarContainer>
    )
}

export default VehicleCalendar;

const CalendarContainer = styled.div`
    display: flex;
    width: 1148px;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    margin-top: 28px;

    border-radius: 12px;
    background: #FFF;
`

const ColumnHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    align-self: stretch;
`

const ColumnHeader = styled.div`
    display: flex;
    align-items: flex-start;
    flex: 1 0 0;
    border-top: 1px solid #E0E0E0;
`

const Column = styled.div`
    display: flex;
    height: 64px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    background: #FFF;
    box-shadow: -1px -1px 0px 0px #E0E0E0 inset;
`

const LeftText = styled.div`
    color: #AAAAAF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
`

const LeftTextHour = styled.div`
    width: 36px;

    color: #AAAAAF;
    /* text-xs/Medium */
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
`

const HourRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 7.5px;
    align-self: stretch;
`

const TimeblockContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;
`

const Timeblock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;

    background: #FFF;
`

const Halfblock = styled.div`
    display: flex;
    height: 24px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    background: #FFF;
    border-right: 1px solid #E0E0E0;
`

const ReservedBlock = styled.div`
    display: flex;
    position: absolute;
    width: 217px;
    gap: 4px;

    align-items: flex-start;
    align-self: stretch;

    background: rgba(255, 199, 60, 0.20);
`

const Bar = styled.div`
    width: 3px;
    height: 100%;
    align-self: stretch;
    background: #FFC73C;
`

const ReservedBlockContent = styled.div`
    display: flex;
    padding: 6px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 0 0;
`

const ReservedTime = styled.div`
    color: rgba(86, 86, 96, 0.80);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
`

const ReservedPerson = styled.div`
    color: #565660;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
`