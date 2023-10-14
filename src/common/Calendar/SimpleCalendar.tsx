import React from "react";
import styled from "@emotion/styled";

const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];

export default function SimpleCalendar(props: any) {

    const stringfyDate = (num: number) => {
        const strDate = new Date(num);

        return strDate.getFullYear() + '. ' + (strDate.getMonth() + 1) + '.' + strDate.getDate() + '(' + dayInKorean[strDate.getDay()] + ')';;
    }

    return (
        <CalendarContainer>
            <Header>Today</Header>
            <Content>
                <SvgContainerLeft>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2485 6.35134C15.4735 6.57638 15.5999 6.88155 15.5999 7.19974C15.5999 7.51794 15.4735 7.82311 15.2485 8.04814L11.2969 11.9997L15.2485 15.9513C15.4671 16.1777 15.5881 16.4808 15.5853 16.7954C15.5826 17.1101 15.4564 17.411 15.2339 17.6335C15.0114 17.856 14.7105 17.9822 14.3958 17.985C14.0812 17.9877 13.7781 17.8667 13.5517 17.6481L8.75173 12.8481C8.52677 12.6231 8.40039 12.3179 8.40039 11.9997C8.40039 11.6815 8.52677 11.3764 8.75173 11.1513L13.5517 6.35134C13.7768 6.12638 14.0819 6 14.4001 6C14.7183 6 15.0235 6.12638 15.2485 6.35134Z" fill="#565660"/>
                    </svg>
                </SvgContainerLeft>
                <DateContainer>{stringfyDate(1696767016552)}</DateContainer>
                <SvgContainerRight>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75173 17.6493C8.52677 17.4242 8.40039 17.1191 8.40039 16.8009C8.40039 16.4827 8.52677 16.1775 8.75173 15.9525L12.7033 12.0009L8.75173 8.04928C8.53314 7.82296 8.41219 7.51983 8.41493 7.2052C8.41766 6.89056 8.54386 6.58959 8.76635 6.3671C8.98884 6.14461 9.28982 6.0184 9.60445 6.01567C9.91909 6.01294 10.2222 6.13389 10.4485 6.35248L15.2485 11.1525C15.4735 11.3775 15.5999 11.6827 15.5999 12.0009C15.5999 12.3191 15.4735 12.6242 15.2485 12.8493L10.4485 17.6493C10.2235 17.8742 9.91833 18.0006 9.60013 18.0006C9.28194 18.0006 8.97677 17.8742 8.75173 17.6493Z" fill="#565660"/>
                    </svg>
                </SvgContainerRight>
            </Content>
        </CalendarContainer>
    )
}

const CalendarContainer = styled.div`
position: absolute;
top: 30px;
left: 40%;
display: inline-flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;

border-radius: 8px;
background: rgba(242, 242, 242, 0.50);
`

const Header = styled.button`
display: flex;
width: 100%;
height: 32px;
justify-content: center;
align-items: center;
flex: 1 0 0;

padding: 16px 0;

color: #FFC73C;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 22px; /* 137.5% */
text-transform: capitalize;
`

const Content = styled.div`
display: flex;
align-items: flex-start;
gap: 1px;
`

const SvgContainerLeft = styled.button`
display: flex; 
justify-content: center; 
align-items: center;
background: #F2F2F2;
height: 34px;
border-radius: 0 0 0 8px;
`

const SvgContainerRight = styled.button`
display: flex; 
justify-content: center; 
align-items: center;
background: #F2F2F2;
height: 34px;
border-radius: 0 0 8px 0;
`

const DateContainer = styled.button`
display: flex;
padding: 6px 16px;
align-items: center;
gap: 8px;
align-self: stretch;

background: #F2F2F2;

color: #565660;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 22px; /* 137.5% */
text-transform: capitalize;
`