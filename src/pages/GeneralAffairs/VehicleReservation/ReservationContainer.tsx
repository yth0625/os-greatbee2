import React from "react";
import styled from "@emotion/styled";

function ReservationContainer() {

    return (
        <Container>
            <ContentContainer>
                <Header>[예약 정보]</Header>
                <InputContainer>
                    <InputLayer>
                        <InputHeader>차종</InputHeader>
                        <InputForm style={{width: '320px'}} placeholder="내용을 입력해 주세요"/>
                    </InputLayer>
                    <InputLayer>
                        <InputHeader>차종</InputHeader>
                        <InputForm style={{width: '320px'}} placeholder="내용을 입력해 주세요"/>
                    </InputLayer>
                    <InputLayer>
                        <InputHeader>신청자</InputHeader>
                        <InputForm style={{width: '320px'}} placeholder="내용을 입력해 주세요"/>
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>동승자</InputHeader>
                        <InputForm style={{width: '320px'}} placeholder="내용을 입력해 주세요"/>
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>사용시간</InputHeader>
                        <div style={{display: 'flex', width: '100%', height: '100%', gap: '16px'}}>
                            <InputForm style={{width: '152px'}}/>
                            <InputForm style={{width: '152px'}}/>
                        </div>
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>총 주행 거리</InputHeader>
                        <InputForm style={{width: '320px'}} />
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>출발지</InputHeader>
                        <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                            <InputForm style={{width: '210px'}} />
                            <GrayButton>주소 검색</GrayButton>
                        </div>
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>경유지</InputHeader>
                        <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                            <InputForm style={{width: '210px'}} />
                            <GrayButton>주소 검색</GrayButton>
                        </div>
                    </InputLayer>                    
                    <InputLayer>
                        <InputHeader>도착지</InputHeader>
                        <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                            <InputForm style={{width: '210px'}} />
                            <GrayButton>주소 검색</GrayButton>
                        </div>
                    </InputLayer>
                    <InputLayer>
                        <InputHeader>비고</InputHeader>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </InputLayer>
                    <YellowButton>예약하기</YellowButton>
                </InputContainer>
            </ContentContainer>
        </Container>
    )
}

export default ReservationContainer;

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
    padding-left: 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const InputLayer = styled.div`
    display: flex;
    width: 443px;
    height: 42px;

    gap: 41px;
`

const InputHeader = styled.p`
    display: flex;
    width: 82px;
    height: 19.25px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    margin-top: auto;
    margin-bottom: auto;
    padding-left: 12px;
    
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

    color: #1C1C1C;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 100% */
`