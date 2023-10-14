// core
import { useState, useEffect } from 'react';
// router
import { Link, useLocation, useNavigate } from 'react-router-dom';
// style
import styled from '@emotion/styled';
import { InputStyle } from 'common/Input/FormStyle';
// component
import GNB from './GNB';
import UserInfo from './UserInfo';
import UserMenu from './UserMenu';
import CustomerMenu from './CustomerMenu';
import Icon from 'styles/Icon';
// import { useDispatch } from 'react-redux';
// import { openModal } from 'redux/popUpReducer';
// import InformModal from 'pages/Home/InformModal';

type Props = {
  isAdminPage: boolean;
};

function GlobalHeader({ isAdminPage }: Props) {
  const location = useLocation(); // for route change detect
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  // const openAlarmModal = () => {
  //   dispatch(
  //     openModal({
  //       modalMessage: {
  //         title: '알림',
  //         content: <InformModal />,
  //       },
  //       hasConfirm: false,
  //       confirmFn: () => console.log('click'),
  //     }),
  //   );
  // };

  const toggleSearchIcon = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchValue('');
    } else {
      setIsSearchOpen(true);
    }
  };

  useEffect(() => {
    // 라우트 바뀔때 메뉴 닫기
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // 메뉴 열리면 body overflow 숨기기
    if (isMenuOpen) {
      document.body.classList.add('c_overflow_hidden');
    } else {
      document.body.classList.remove('c_overflow_hidden');
    }
  }, [isMenuOpen]);

  return (
    <GlobalHeaderContainer
      hasSearchValue={isSearchOpen}
      isAdminPage={isAdminPage}
    >
      <Link to="/" className="logo">
        <img src={'/images/favicon.png'} alt="logo" className="logo_img" />
      </Link>
      <div className="search_container">
        <div className="search">
          <div className={`search_bar ${isSearchOpen ? 'open' : ''}`}>
            <Icon iconName="search" style={{ position: 'absolute', top: 24 }} />
            <InputStyle
              type="text"
              placeholder="해당 검색창은 플랫폼 '그레이트비' 서비스 검색창 입니다."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="toggle_search" onClick={toggleSearchIcon}>
            {!isSearchOpen && <Icon iconName="search" />}
            {isSearchOpen && <Icon iconName="close" />}
          </div>
          {searchValue.length > 0 && (
            <div className="search_contents">
              해당 검색창은 플랫폼 '그레이트비' 서비스 검색창 입니다.
            </div>
          )}
        </div>
      </div>
      <div className="header_right">
        <div className="header_bar">
          <Icon iconName="headerchat" />
          <Icon iconName="headerheart" />
          <Icon
            iconName="cart"
            color="#000"
            onPress={() => navigate('/eprocurement/cart')}
          />
          <Icon iconName="headeralarm" />
          <Icon iconName="headerhome" />
        </div>
        <div className="user_container">
          {/*<button className="alarm">*/}
          {/*  <Icon iconName="alarm" onPress={openAlarmModal} />*/}
          {/*  <div className="alarm_circle"></div>*/}
          {/*</button>*/}
          <div className="user_info">
            <UserInfo />
          </div>
          <button className="open_menu" onClick={() => setIsMenuOpen(true)}>
            <Icon iconName="menu" />
          </button>
        </div>
        <div className={`menu_container ${isMenuOpen ? 'open' : ''}`}>
          <button className="close_menu" onClick={() => setIsMenuOpen(false)}>
            <Icon iconName="close" />
          </button>
          <div className="menu">
            <GNB />
            <div className="user_info">
              <UserInfo />
            </div>
            <div className="user_menu">
              <UserMenu setIsMenuOpen={setIsMenuOpen}></UserMenu>
            </div>
            <div className="customer_menu">
              <CustomerMenu />
            </div>
          </div>
        </div>
      </div>
    </GlobalHeaderContainer>
  );
}

export default GlobalHeader;

const GlobalHeaderContainer = styled.header<{
  hasSearchValue: boolean;
  isAdminPage: boolean;
}>`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: var(--header-height);
  width: 100%;
  padding-left: var(--sidebar-width);
  background-color: ${(props) =>
    props.isAdminPage ? 'transparent' : 'var(--base-color-light)'};

  .logo_img {
    width: 53px;
  }

  .header_right {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 30%;
  }

  .header_bar {
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-right: 10px;
    display: none;
    align-items: center;
  }

  .search_contents {
    position: absolute;
    background-color: #fff;
    top: 105%;
    left: 0;
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: var(--border-radius-mid);
    color: #7c7c7c;
    box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 768px) {
      display: ${(props) => (props.hasSearchValue ? 'block' : 'none')};
    }
  }
  .logo {
    align-items: center;
    margin-left: 1.6rem;
    display: none;
    @media screen and (max-width: 1024px) {
      display: flex;
    }
    div {
      width: 4.8rem;
    }
  }
  .search_container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3rem;
    width: 70%;
    height: 100%;
    padding: 1.6rem 0;
    margin: 0 3rem;
    border-bottom: 1px solid var(--border-color-light);
    @media screen and (max-width: 1024px) {
      border-bottom: none;
    }
    @media screen and (max-width: 768px) {
      justify-content: center;
      gap: 0;
      margin: 0 2rem;
      display: none;
    }
    .search {
      position: relative;
      width: 100%;
      height: 100%;
      .search_bar {
        float: right;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius-large);
        overflow: hidden;
        transition: var(--transition-fast);
        @media screen and (max-width: 768px) {
          width: 0;
          &.open {
            width: 100%;
          }
          &:not(.open) {
            opacity: 0;
          }
        }
        svg {
          position: absolute;
          top: 50%;
          left: 2rem;
          transform: translateY(-50%);
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.25rem;
          cursor: pointer;
          @media screen and (max-width: 480px) {
            left: 1rem;
          }
        }
        input {
          height: 100%;
          padding-left: 5.5rem;
          transition: background-color var(--transition-default);
          @media screen and (max-width: 1024px) {
            background-color: var(--base-color-light);
          }
          @media screen and (max-width: 768px) {
            padding-right: 2rem;
          }
          @media screen and (max-width: 480px) {
            padding-right: 3rem;
            padding-left: 4rem;
          }
        }
        input:not(:focus) {
          border-color: transparent;
        }
      }
      .toggle_search {
        position: absolute;
        top: 50%;
        right: 2%;
        transform: translateY(-50%);
        width: 3.2rem;
        height: 3.2rem;
        align-items: center;
        display: none;
        @media screen and (max-width: 768px) {
          display: flex;
        }
        div {
          margin-top: 3px;
          margin-left: 10px;
          width: 100%;
          height: 100%;
          stroke: #000;
          svg {
            stroke: #000;
          }
        }
      }
    }
    .write {
      height: 100%;
      display: flex;
      align-items: center;
      button {
        padding-top: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        height: 100%;
        width: 15rem;
        border: none;
        background-color: #000;
        color: #fff;
        white-space: nowrap;
        div {
          fill: currentColor;
          height: 2em;
          button {
            width: 4.5rem;
            padding: 0;
          }
        }
        .write_text {
          margin-top: 13px;
        }
        @media screen and (max-width: 1024px) {
          width: 4.8rem;
          .write_text {
            display: none;
          }
        }
        @media screen and (max-width: 768px) {
          background-color: transparent;
          color: #000;
          padding-left: 9px;
          margin-top: -1px;
          div {
            margin-left: 24px;
          }
        }
      }
    }
  }
  .user_container {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    height: 100%;
    width: 100%;
    padding: 0 2.5rem;
    border-bottom-left-radius: var(--border-radius-large);
    background-color: var(--primary-color);

    @media screen and (max-width: 1280px) {
      border-bottom-left-radius: 0;
    }

    @media screen and (max-width: 768px) {
      background-color: transparent;
      padding: 0 2rem 0 0;
      gap: 2rem;
      width: auto;
    }

    .alarm {
      position: relative;
      display: flex;
      align-items: center;
      svg {
        width: 3.2rem;
        height: 3.2rem;
      }
      .alarm_circle {
        position: absolute;
        top: 0.5rem;
        right: 0.7rem;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 50%;
      }
    }

    .user_info {
      margin-right: calc(-2.5rem + 1.7rem);
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .open_menu {
      align-items: center;
      display: none;

      @media screen and (max-width: 1024px) {
        display: flex;
      }

      img {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
  }

  .menu_container {
    z-index: 1000;
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: calc(var(--header-height) - 1rem) 0 2rem;
    visibility: hidden;
    overflow: hidden;
    transition: var(--transition-fast);
    display: none;

    @media screen and (max-width: 1024px) {
      display: block;
    }

    &.open {
      right: 0;
      visibility: visible;
    }
    .close_menu {
      position: absolute;
      top: calc(var(--header-height) / 2);
      right: 2rem;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      svg {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
    .menu {
      height: 100%;
      padding: 0 2rem;
      overflow-y: auto;
      box-shadow: rgba(51, 51, 51, 0.04) 0 0 20px 0;
      .user_info {
        margin: 2rem 0;
        padding: 0.8rem 2rem;
        background-color: var(--primary-color);
        border-radius: var(--border-radius-large);
      }

      .customer_menu {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color-light);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    background-color: ${(props) =>
      props.isAdminPage ? 'transparent' : '#fff'};
  }

  @media screen and (max-width: 768px) {
    justify-content: space-between;

    .header_right {
      width: 37%;
      .header_bar {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }

    .logo {
      margin-left: 24px;
    }

    .logo_img {
      width: 48px;
    }
  }
`;
