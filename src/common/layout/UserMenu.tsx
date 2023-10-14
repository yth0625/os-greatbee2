import { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';

// style
import styled from '@emotion/styled';
import Icon from 'styles/Icon';

import PersonalInfo from 'pages/Home/PersonalInfo';

type Props = {
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
};

function UserMenu({ setIsMenuOpen }: Props) {
  const dispatch = useDispatch();

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
    <UserMenuContainer>
      <div className="my_profile">
        <div className="menu_box">
          <Icon iconName="account" />
          <span>내 프로필</span>
        </div>
        <span className="my_email">sample@gmail.com</span>
      </div>
      <div className="action_menu">
        <div className="menu_box">
          <Icon iconName="wallet" />
          <span>개인메시지</span>
        </div>
        <div className="menu_box" onClick={openChangePersonalInfo}>
          <Icon iconName="setting" />
          <span>프로필 설정</span>
        </div>
        <div className="menu_box">
          <Icon iconName="logout" />
          <span>로그아웃</span>
        </div>
      </div>
    </UserMenuContainer>
  );
}

export default UserMenu;

const UserMenuContainer = styled.div`
  color: var(--font-color-mid);
  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    &.my_profile {
      gap: 2rem;
      .my_email {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &.action_menu {
      margin-top: 2rem;
      justify-content: space-between;
      @media screen and (max-width: 320px) {
        flex-wrap: wrap;
      }
    }
    .menu_box {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      margin: -0.5rem -1rem;
      white-space: nowrap;
      cursor: pointer;
    }
  }
`;
