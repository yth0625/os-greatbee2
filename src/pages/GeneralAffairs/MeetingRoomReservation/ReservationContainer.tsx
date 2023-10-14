import React, { useState } from "react";
import styled from "@emotion/styled";
import Icon from "styles/Icon";

const roomList = ['회의실을 선택해주세요' ,'회의실A', '회의실B', '회의실C', '회의실D', '회의실E'];

function ReservationContainer() {
    const [isDropDownVisable, setIsDropDownVisable] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [reverse, setReverse] = useState(1);

    const renderRadioButton = (r: number) => {
        if(r > 0)
            return (
                <Icon
                    iconName="radioCircleSelected"
                    className="selected_circle"
                    color="white"
                    outlined={true}
                    style={{ cursor: 'pointer', height: '22px' }}
                    />
            )
        
        else
        return (
            <Icon
                iconName="radioCircle"
                className="circle"
                color="#565660"
                width={20}
                height={20}
                style={{ cursor: 'pointer', height: '22px' }}
                />
        )
    }

    return (
        <Container>
            <ContentContainer>
                <InputContainer>
                    <InputLayer>
                        <InputHeader>Agenda</InputHeader>
                        <InputForm style={{width: '100%'}} placeholder="내용을 입력해 주세요"/>
                    </InputLayer>
                    <InputLayer>
                        <InputHeader>예약 회의실</InputHeader>
                        {!isDropDownVisable && <DropdownForm style={{width: '100%'}} onClick={()=>setIsDropDownVisable(true)} placeholder={roomList[selectedRoom]} />}
                        {isDropDownVisable && 
                            <>
                                {roomList.map((value, index)=>{
                                    if (index > 0)
                                    return (
                                        <button onClick={()=>{
                                            setSelectedRoom(index)
                                            setIsDropDownVisable(false);
                                            }}>
                                            {value}
                                        </button>
                                    )
                                    else return;
                                })}
                            </>
                        }
                    </InputLayer>
                    <InputLayer>
                        <InputHeader>예약 시간</InputHeader>
                        <TimeForm>
                            <TimeInputForm>
                                <RadioButtonContainer onClick={()=>setReverse(1)}>
                                    {renderRadioButton(reverse)}
                                    <span>시간대</span>
                                </RadioButtonContainer>
                                <TimeInputContainer>
                                    <TimeInput>
                                        {clockSVG()}
                                        <input placeholder="시작 시간" style={{border: 'none', width: '60px'}} />
                                    </TimeInput>
                                    <span>~</span>
                                    <TimeInput>
                                        {clockSVG()}
                                        <input placeholder="종료 시간" style={{border: 'none', width: '60px'}} />
                                    </TimeInput>
                                </TimeInputContainer>
                            </TimeInputForm>
                            <TimeInputForm>
                                <RadioButtonContainer onClick={()=>setReverse(-1)}>
                                    {renderRadioButton(reverse * (-1))}
                                    <span>종일</span>
                                </RadioButtonContainer>
                            </TimeInputForm>
                        </TimeForm>
                    </InputLayer>                    
                    <YellowButton>확인</YellowButton>
                </InputContainer>
            </ContentContainer>
        </Container>
    )
}

export default ReservationContainer;

const clockSVG = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <g clip-path="url(#clip0_1_57153)">
            <path d="M10.3079 18.3346C14.9103 18.3346 18.6413 14.6037 18.6413 10.0013C18.6413 5.39893 14.9103 1.66797 10.3079 1.66797C5.70557 1.66797 1.97461 5.39893 1.97461 10.0013C1.97461 14.6037 5.70557 18.3346 10.3079 18.3346Z" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.8076 13.3333L10.796 11.3217C10.4834 11.0092 10.3077 10.5853 10.3076 10.1433V5" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_57153">
                <rect width="20" height="20" fill="white" transform="translate(0.307617)"/>
            </clipPath>
            </defs>
        </svg>
    )
}

const Container = styled.div`
    display: flex;
    // width: 498px;
    // height: 792px;
    margin-top: 28px;
    padding: 24px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex-shrink: 0;

    border-radius: 12px;
    border: 1px solid #D0D0D0;
    background: #FFF;
`

const ContentContainer = styled.div`
    display: flex;
    width: 464px;
    height: 758px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;

`

const Header = styled.p`
    color: #565660;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 122.222% */
    text-transform: capitalize;
`

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    padding-left: 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const InputLayer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;
align-self: stretch;
`

const InputHeader = styled.p`
color: #565660;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 22px; /* 137.5% */
text-transform: capitalize;
`

const InputForm = styled.input`
    border-radius: 12px;
    border: 1px solid #CCC;
    background: var(--White, #FFF);

    padding: 12px 23px 12px 23px;
`

const DropdownForm = styled.input`
    border-radius: 12px;
    border: 1px solid #CCC;
    background: var(--White, #FFF);

    padding: 12px 23px 12px 23px;
`

const GrayButton = styled.button`
    display: inline-flex;
    width: 97px;
    height: 26.25px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: auto;

    border-radius: 8px;
    background: #909090;

    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const YellowButton = styled.button`
    display: flex;
    width: 160px;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 24px;

    border-radius: 8px;
    background: #FFC73C;

    position: absolute;
    right: 9px;
    bottom: 18px;

    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 100% */
`

const TimeForm = styled.div`
display: flex;
padding: 24px 16px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 24px;
align-self: stretch;

border-radius: 12px;
background: rgba(242, 242, 242, 0.50);
`

const TimeInputForm = styled.div`
display: flex;
align-items: center;
gap: 24px;
align-self: stretch;
`

const RadioButtonContainer = styled.button`
display: flex;
justify-content: center;
align-items: center;
gap: 12px;

color: #565660;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 22px; /* 137.5% */
text-transform: capitalize;
`

const TimeInputContainer = styled.div`
display: flex;
align-items: center;
gap: 16px;
flex: 1 0 0;

color: #AAAAAF;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 22px; /* 137.5% */
text-transform: capitalize;
`

const TimeInput = styled.div`
display: flex;
align-items: center;
text-align: center;
justify-content: center;
gap: 16px;

width: 133.5px;
height: 48px;
flex-shrink: 0;

border-radius: 12px;
border: 1px solid #CCC;
background: #FFF;
`