import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import { InputStyle } from 'common/Input/FormStyle';
import { Divider } from '@mui/material';

//TODO: button 클릭 영역 넓히기
function MeetingRoomReservation() {
    return (
        <VehicleContainer>
            <WhiteContainer>
                <Header>
                    좌석 배치도 Viewer
                </Header>
                <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 1)'}}/>
                <div style={{'display': 'flex', marginTop: 24 }}>
                    <div style={{ width: 532, padding: '0px 24px'}}>
                        <InputStyle
                            style={{
                                background: 'rgba(238, 238, 238, 0.50)',
                                paddingLeft: 40,
                                border: '1px solid rgba(144, 144, 144, 0.50)',
                                width: '484px',
                                color: '#909090'
                            }}
                            placeholder="검색하세요"
                        />
                        <div style={{ margin: '24px 0px'}}>
                            <span style={{ fontSize: 24 }}>본사</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 1)'}}/>
                        <div style={{margin: '12px 0px', padding: 10 }}>
                            <img
                                src='/images/local-two.png'
                                width={24}
                                height={24}
                                alt="local"
                            />
                            <span style={{ 'marginLeft': 8, 'fontSize': 20, 'fontWeight': 400, 'color': '#999999'}}>서울 동성구 아차산로 17 서울숲 엘타워</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- L 타워 6층</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- L 타워 7층</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>

                        <div style={{ margin: '24px 0px'}}>
                            <span style={{ fontSize: 24 }}>판교지점</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 1)'}}/>
                        <div style={{margin: '12px 0px', padding: 10 }}>
                            <img
                                src='/images/local-two.png'
                                width={24}
                                height={24}
                                alt="local"
                            />
                            <span style={{ 'marginLeft': 8, 'fontSize': 20, 'fontWeight': 400, 'color': '#999999'}}>경기 성남시 분당구 판교역로 166</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- H스퀘어 3층 A파트</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- H스퀘어 3층 B파트</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- H스퀘어 4층 A파트</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- H스퀘어 4층 B파트</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                        <div style={{margin: '12px 0px', padding: '10px 32px'}}>
                            <span style={{ 'fontSize': 20, 'fontWeight': 400, 'color': '#333333'}}>- H스퀘어 4층 C파트</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 0.3)' }}/>
                    </div>
                    <div style={{ width: 1020, height: 1024, marginLeft: 40}}>
                        <div style={{ margin: '24px 0px'}}>
                            <span style={{ fontSize: 24 }}>L타워 6층</span>
                        </div>
                        <Divider style={{ backgroundColor: 'rgba(217, 217, 217, 1)'}}/>
                        <div style={{ backgroundColor: '#E8E8E8', width: '100%', height: '100%', borderRadius: 16}}>

                        </div>
                    </div>
                    
                </div>
            </WhiteContainer>
        </VehicleContainer>
    )
}

export default MeetingRoomReservation;

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

  width: 1704px;
  height: 1309px;
`

const Header = styled.div`
  margin-top: 12px;

  color: #232323;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-bottom: 24px;
`;
