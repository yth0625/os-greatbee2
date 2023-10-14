import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import VehicleCalendar from './VehicleCalender';
import ReservationContainer from './ReservationContainer';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import VehicleReservationContainer from './VehicleReservationInfoContainer';
import { Link } from 'react-router-dom';
import SimpleCalendar from 'common/Calendar/SimpleCalendar';

//TODO: button 클릭 영역 넓히기
function VehicleReservation() {
    const dispatch = useDispatch();

    const onOpenModal = (type: string) => {
        dispatch(
            openModal({
                modalMessage: {
                title: '',
                content: <VehicleReservationContainer type={type} />,
                },
                hasConfirm: '아니오',
                confirmFn: () => console.log('click'),
            }),
        );
    };

    return (
        <VehicleContainer>
            <WhiteContainer>
                <Header>
                    업무용 차량 예약
                </Header>
                <SimpleCalendar />
                <ModalButtonContainer>
                    <Link to="/generalAffairs/VehicleUpdate">
                        <ModalButton type='button' >
                            업무용 차량 현황 보기
                        </ModalButton>
                    </Link>
                    <ModalButton type='button' onClick={()=>onOpenModal('change')}>
                        업무용 차량 정보 변경
                    </ModalButton>
                    <ModalButton type='button' onClick={()=>onOpenModal('new')}>
                        업무용 차량 신규 등록
                    </ModalButton>
                </ModalButtonContainer>
                <ContentContainer>
                    <VehicleCalendar />
                    <ReservationContainer />
                </ContentContainer>
            </WhiteContainer>
        </VehicleContainer>
    )
}

export default VehicleReservation;

const VehicleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: var(--header-height);
  padding: 34px 3rem;
`

const WhiteContainer = styled.div`
  position: relative;
  padding: 30px 32px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFF;

  width: 1716px;
  height: 932px;
`

const Header = styled.div`
  margin-top: 12px;

  color: #232323;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const ContentContainer = styled.div`
    display: flex;
    position: relative;
    align-items: flex-start;
    gap: 24px;
`

const ModalButtonContainer = styled.div`
    position: absolute;
    top: 52px;
    right: 0px;

    display: inline-flex;
    align-items: flex-start;
    gap: 19px;
`

const ModalButton = styled.button`
    display: flex;
    width: 152px;
    height: 50px;
    padding: 10.435px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10.435px;

    border-radius: 12.522px;
    border: 1.043px solid #FFC73C;
    background: #FFF;

    color: #7C7C7C;
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1px;
`