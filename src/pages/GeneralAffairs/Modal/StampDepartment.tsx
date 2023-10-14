import styled from "@emotion/styled";
import React from "react";

const mock = {
    name: '김꿀벌',
    subname: '서브네임',
    dep: '경영지원부',
    team: '총무팀',
    role: 'Staff',
    phone: '010-1234-5678',
}

const mockData = Array(23).fill(mock);

const StampDepartment = () => {
    const renderTable = (data: any) => {
        const length = data.length;
        let rows = [];
        let tempRow = [];
        for(let i=0; i<length; i+=1){
            tempRow.push(data[i]);
            if(i%4 === 3 || i ===length-1){
                rows.push(tempRow);
                tempRow = [];
            }
        }
        console.log(rows);
        return (
            <LineContainer>
                {rows.map((row)=>(
                    <RowContainer>
                        {row.map((card)=>(
                            <NameCardContainer>
                                <NameCardInner>
                                    {renderProfileSVG()}
                                    <ProfileInner>
                                        <Header>
                                            <span style={{fontWeight: 600, width: '48px'}}>{card.name}</span>
                                            |
                                            <span style={{width: '63px'}}>{card.subname}</span>
                                        </Header>
                                        <Content>
                                            <span>{card.dep} {'>'} {card.team}</span>
                                            <span>{card.role}</span>
                                            <span>{card.phone}</span>
                                        </Content>
                                    </ProfileInner>
                                </NameCardInner>
                            </NameCardContainer>
                        ))}
                    </RowContainer>
                ))}
            </LineContainer>
        )
    }
    renderTable(mockData);
    return (
        <Container>
            <DepHeader>부서명</DepHeader>
            {renderTable(mockData)}
        </Container>
    )
}

const renderProfileSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
        <path d="M119.239 58C119.953 59.2376 119.953 60.7624 119.239 62L91.5483 109.962C90.8337 111.199 89.5132 111.962 88.0841 111.962L32.703 111.962C31.2739 111.962 29.9534 111.199 29.2388 109.962L1.54825 62C0.833722 60.7624 0.833722 59.2376 1.54825 58L29.2389 10.0385C29.9534 8.80087 31.2739 8.03847 32.703 8.03847L88.0842 8.03847C89.5132 8.03847 90.8337 8.80087 91.5483 10.0385L119.239 58Z" fill="#D9D9D9"/>
        <path d="M60.2061 20C64.5573 20 68.7303 21.7944 71.807 24.9883C74.8838 28.1823 76.6123 32.5143 76.6123 37.0312C76.6123 41.5482 74.8838 45.8802 71.807 49.0742C68.7303 52.2681 64.5573 54.0625 60.2061 54.0625C55.8548 54.0625 51.6819 52.2681 48.6051 49.0742C45.5283 45.8802 43.7998 41.5482 43.7998 37.0312C43.7998 32.5143 45.5283 28.1823 48.6051 24.9883C51.6819 21.7944 55.8548 20 60.2061 20ZM60.2061 62.5781C78.335 62.5781 93.0186 70.1996 93.0186 79.6094V88.125H27.3936V79.6094C27.3936 70.1996 42.0771 62.5781 60.2061 62.5781Z" fill="black" fill-opacity="0.2"/>
    </svg>
)

const Container = styled.div`
width: 1240px;
height: 664px;
`

const DepHeader = styled.div`
margin-bottom: 35px;

color: #000;
font-family: Pretendard;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const NameCardContainer = styled.div`
display: flex;
width: 297.25px;
height: 136px;
padding: 8px 15.606px 8px 11.394px;
align-items: center;

border-radius: 16px;
border: 1px solid #FFC73C;
`

const NameCardInner = styled.div`
display: flex;
align-items: center;
gap: 20px;
`

const ProfileInner = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 6px;
`

const Header = styled.div`
display: flex;
align-items: center;
gap: 8px;

color: #232323;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 22px; /* 122.222% */
`

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 2px;

color: #232323;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 128.571% */
text-transform: capitalize;
`

const RowContainer = styled.div`
display: flex;
gap: 17px;
margin-bottom: 16px;
`

const LineContainer = styled.div`
    padding-bottom: 40px;
`

export default StampDepartment;