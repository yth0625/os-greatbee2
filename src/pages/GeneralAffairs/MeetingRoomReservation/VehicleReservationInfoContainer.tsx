import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { openToastMessage,  closeToastMessage, closeModal } from 'redux/popUpReducer';
import { useDispatch } from 'react-redux';
type VehicleReservationContainerProps = {
    type: string,
};

const VehicleReservationContainer: React.FC<VehicleReservationContainerProps> = ({
    type
}) => {
    const [header, setHeader] = useState('');
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if (type === 'change') setHeader('회의실 정보 변경');
        else if (type === 'new') setHeader('회의실 신규 등록');
    },[type]);

    const openConfirmed = () => {
        dispatch(
            openToastMessage({
                text: '저장 되었습니다.',
            }),
        );
        dispatch(closeModal());
        setTimeout(() => {
            dispatch(closeToastMessage());
        }, 2500);

    }

    return (
        <Container>
            <Header>{header}</Header>
            <Content>
                <ContentHeader>[회의실 정보]</ContentHeader>
                <InputLayer>
                    <InputHeader>회의실 이름</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>위치</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>수용인원</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>A/V 여부</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>기타</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   

                <Divider />

                <ContentHeader>[관리자]</ContentHeader>
                <InputLayer>
                    <InputHeader>이름</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>부서</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
                <InputLayer>
                    <InputHeader>연락처</InputHeader>
                    <div style={{display: 'flex', width: '100%', height: '100%', gap: '13px'}}>
                        <InputForm placeholder="내용을 입력해 주세요"/>
                    </div>
                </InputLayer>   
            </Content>
            <ConfirmButton
                onClick={openConfirmed}
            >
                    확인
            </ConfirmButton>
        </Container>
    )
}

export default VehicleReservationContainer;

const Container = styled.div`
    display: flex;
    width: 853px;
    padding: 0px 64px 32px 64px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    border-radius: 16px;
    background: #FFF;
`

const Header = styled.p`
    color: #232323;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Content = styled.div`
    display: flex;
    padding: 26px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    border-radius: 16px;
    border: 1px solid #D0D0D0;
`

const ContentHeader = styled.p`
    color: #565660;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 122.222% */
    text-transform: capitalize;

    margin-bottom: 16px;
`

const InputLayer = styled.div`
    display: flex;
    width: 443px;
    height: 42px;

    gap: 48.68px;
`

const InputHeader = styled.p`
    display: flex;
    width: 86px;
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
    width: 464px;
    height: 42px;

    border-radius: 12px;
    border: 1px solid #CCC;
    background: var(--White, #FFF);

    padding: 12px 23px 12px 23px;
`

const Divider = styled.div`
    width: 648px;
    height: 1px;

    margin-top: 12px;
    margin-bottom: 28px;

    background: #D0D0D0;
`

const ConfirmButton = styled.button`
    display: flex;
    width: 160px;
    height: 56px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    margin-left: auto;
    margin-right: auto;

    border-radius: 16px;
    background: #FFC73C;

    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 100% */
`