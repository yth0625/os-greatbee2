import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';

import Icon from 'styles/Icon';
import styled from '@emotion/styled';

import PersonalInfo from 'pages/Home/PersonalInfo';
import { useGetProfileApi } from '../../api/useMainApi';
import { signOut } from '../../utils/utils';

function UserInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { data } = useGetProfileApi();

  const openChangePersonalInfo = () => {
    setIsMenuOpen(false);
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <PersonalInfo />,
        },
        hasConfirm: '아니오',
        confirmFn: () => console.log('click'),
      }),
    );
  };

  return (
    <UserInfoContainer>
      <p className="profile">
        <span className="position">{data?.deptName}</span>
        <span className="name">{data?.userName}</span>
      </p>
      <button
        className="toggle_user_menu"
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        {isMenuOpen ? (
          <Icon iconName="arrowup" width={24} height={24} />
        ) : (
          <Icon iconName="arrowdown" width={24} height={24} />
        )}
      </button>
      {isMenuOpen && (
        <AdditionalMenu onMouseLeave={() => setIsMenuOpen(false)}>
          <ItemBox>
            <Icon iconName="account" style={{ marginRight: 10 }} />
            <div>내 프로필</div>
          </ItemBox>
          <div
            style={{
              marginBottom: 10,
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
          >
            {data?.email}
          </div>
          <Divider />
          {/*<ItemBox>*/}
          {/*  <Icon iconName="wallet" style={{ marginRight: 10 }} />*/}
          {/*  <div>개인메세지</div>*/}
          {/*</ItemBox>*/}
          <ItemBox onClick={openChangePersonalInfo}>
            <Icon iconName="setting" style={{ marginRight: 10 }} />
            <div>프로필 설정</div>
          </ItemBox>
          <Divider />
          <ItemBox onClick={() => signOut()}>
            <Icon iconName="logout" style={{ marginRight: 10 }} />
            <div>로그아웃</div>
          </ItemBox>
        </AdditionalMenu>
      )}
    </UserInfoContainer>
  );
}

export default UserInfo;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
  @media screen and (max-width: 1024px) {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  .profile {
    display: flex;
    align-items: flex-end;
    gap: 0 1rem;
    overflow: hidden;
    line-height: 1.3;
    @media screen and (max-width: 1440px) {
      flex-direction: column;
    }
    .position {
      color: var(--font-color-mid);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .name {
      font-size: var(--font-size-large);
      font-weight: var(--font-w-mid);
      white-space: nowrap;
    }
  }
  .avatar {
    flex-shrink: 0;
    width: 4.6rem;
    height: 4.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .toggle_user_menu {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -0.5rem;
    padding: 0.5rem;
    @media screen and (max-width: 1024px) {
      display: none;
    }
    img {
      width: 1.6rem;
    }
  }
`;

const AdditionalMenu = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 70px;
  background: white;
  border-radius: var(--border-radius-mid);
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  color: #555555;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #ffc74c20;
    border-radius: 8px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e5e5;
`;
