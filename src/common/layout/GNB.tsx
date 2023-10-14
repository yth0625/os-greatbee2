// router
import { Link, NavLink, useLocation } from 'react-router-dom';
// style
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import { useEffect, useState } from 'react';
// img
import colors from 'styles/colors';

const adminmenulist = [
  // { text: '사용현황', last: false, path: '/usagestatus' },
  // { text: '계정관리', last: false, path: '/account' },
  // { text: '페이지 권한 관리', last: false, path: '/authority' },
  // { text: '제문서 관리', last: false, path: '/document' },
  // { text: '워크플로 관리', last: false, path: '/workflow' },
  // { text: '조직도 관리', last: false, path: '/organization' },
  // { text: '계약관리', last: false, path: '/contract' },
  { text: '구매 진행 현황', last: false, path: '/purchase' },
  { text: '구매 내역 관리', last: true, path: '/purchasehistory' },
  // { text: '자산관리', last: false, path: '/assets' },
  // { text: '일반총무', last: true, path: '/generalaffairs' },
];

const generalAffairsMenuList = [
  { text: '인감', last: false, path: '#SealsModal' },
  { text: '공지', last: false, path: '/generalaffairs/menu2' },
  { text: '조직도', last: false, path: '#stampModal' },
  { text: '문서 수발', last: false, path: '/generalaffairs/menu2' },
  { text: '운영 현황', last: false, path: '/generalaffairs/menu2' },
  { text: '출입 신청', last: false, path: '/generalaffairs/menu2' },
  { text: '주차', last: false, path: '/generalaffairs/menu2' },
  { text: '업무용 차량 예약', last: false, path: '/vehicleReservation' },
  { text: '회의실 예약', last: false, path: '/meetingRoomReservation' },
  { text: '명함 신청', last: false, path: '/generalaffairs/menu2' },
  { text: 'Guest 방문 예약', last: true, path: '/generalaffairs/menu2' },
  { text: '좌석 배치도', last: true, path: '/seatingChart' },
];

// URL의 path일치하면 primary색 추가하는 링크 컴포넌트
// todo: ts-ignore 없애기
// @ts-ignore
function ActiveCheckLink({ children, to, ...props }) {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
      style={{ fontSize: 18 }}
    >
      {children}
    </NavLink>
  );
}

function GNB() {
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);
  const [isGeneralAffairsPage, setIsGeneralAffairsPage] =
    useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }

    if (location.pathname.startsWith('/generalaffairs')) {
      setIsGeneralAffairsPage(true);
    } else {
      setIsGeneralAffairsPage(false);
    }
  }, [location.pathname]);

  return (
    <GNBContainer>
      <ActiveCheckLink to="/">
        <Icon iconName="home" color={'#000'} width={24} height={26} />
        <span>메인</span>
      </ActiveCheckLink>
      <ActiveCheck>
        <Icon iconName="proposal" color={colors.font.gray01} />
        <span>e-문서</span>
      </ActiveCheck>
      <ActiveCheck>
        <Icon iconName="workflow" color={colors.font.gray01} />
        <span>워크플로</span>
      </ActiveCheck>
      <ActiveCheck>
        <Icon iconName="contact" color={colors.font.gray01} />
        <span>계약</span>
      </ActiveCheck>
      <ActiveCheckLink to="/eprocurement">
        <Icon iconName="cart" color={'#000'} />
        <span>구매</span>
      </ActiveCheckLink>
      <ActiveCheck style={{ paddingLeft: '6px' }}>
        <Icon iconName="wealth" color={colors.font.gray01} />
        <span>자산</span>
      </ActiveCheck>
      <ActiveCheckLink to="/generalaffairs">
        <Icon iconName="affair" color={'#000'} />
        <span>일반총무</span>
      </ActiveCheckLink>

      {isGeneralAffairsPage && (
        <AdminMenu>
          {generalAffairsMenuList?.map((item, i) => (
            <Link
              to={`/generalaffairs${item.path}`}
              style={{ padding: 0, margin: 0 }}
              key={i}
              className="adminmenu"
            >
              <AdminItem last={item.last}>{item.text}</AdminItem>
            </Link>
          ))}
        </AdminMenu>
      )}
      <ActiveCheckLink to="/admin">
        <Icon iconName="admin" />
        <span>관리자</span>
      </ActiveCheckLink>
      {isAdminPage && (
        <AdminMenu>
          {adminmenulist?.map((item, i) => (
            <Link
              to={`/admin${item.path}`}
              style={{ padding: 0, margin: 0 }}
              key={i}
              className="adminmenu"
            >
              <AdminItem last={item.last}>{item.text}</AdminItem>
            </Link>
          ))}
        </AdminMenu>
      )}
    </GNBContainer>
  );
}

export default GNB;

const GNBContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 17px;
  color: var(--font-color-default);
  background-color: #fff;
  transition: var(--transition-default);
  overflow: hidden;
  a {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 0.8rem;
    border-radius: var(--border-radius-small);
    font-weight: var(--font-w-mid);
    transition: var(--transition-faster);
    white-space: nowrap;
    user-select: none;
    height: 48px;
    &:hover {
      background-color: var(--effect-color);
      height: 48px;
    }
    &.active {
      background-color: var(--primary-color);
    }
    img {
      width: 3.2rem;
      height: 3.2rem;
    }
  }

  @media screen and (max-width: 1536px) {
    gap: 10px;
    a {
      height: 38px;
      padding: 0.8rem 0.6rem;
      &:hover {
        height: 38px;
      }
    }
  }
`;

const AdminMenu = styled.ul`
  margin-top: -18px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  &::-webkit-scrollbar {
    display: none;
  }

  a {
    height: 40px;
    &:hover {
      height: 40px;
    }
  }
  .adminmenu {
    &:hover {
      background: #eeeeee50;
    }
  }
  @media screen and (max-width: 1280px) {
    height: 0px;
    border: none;
    display: none;
    &:hover {
      display: none;
    }
  }

  @media screen and (max-width: 1536px) {
    margin-top: -10px;
    a {
      height: 32px;
      &:hover {
        height: 32px;
      }
    }
  }
  @media screen and (max-width: 1920px) {
    display: block;
    width
  }
`;

const AdminItem = styled.li<{ last?: boolean }>`
  width: 100%;
  padding: 10px 60px;
  font-size: 1.5rem;
  font-weight: 300;
  border-bottom: ${(props) => (props.last ? 'none' : '1px solid #e5e5e5')};
  cursor: pointer;

  @media screen and (max-width: 1536px) {
    padding: 10px 45px;
    font-size: 1.3rem;
  }
`;

const ActiveCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem;
  border-radius: var(--border-radius-small);
  font-weight: var(--font-w-mid);
  transition: var(--transition-faster);
  white-space: nowrap;
  user-select: none;
  font-size: 18px;

  span {
    color: ${colors.font.gray01};
  }
  img {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media screen and (max-width: 1536px) {
    padding: 0.8rem 0.6rem;
  }
`;
