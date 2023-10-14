// router
import { Link, useLocation } from 'react-router-dom';
// style
import styled from '@emotion/styled';
// component
import GNB from './GNB';
import CustomerMenu from './CustomerMenu';

function GlobalSidebar() {
  const location = useLocation();

  return (
    <GlobalSidebarContainer>
      <div className="top">
        <div className="logo">
          <Link to="/" state={{ prevPath: location.pathname }}>
            <div className="imagebox">
              <img
                src="/images/logo/GreatBee.png"
                alt="logo"
                width={215}
                height={46}
              />
            </div>
          </Link>
        </div>
        <div className="menu">
          <GNB />
        </div>
      </div>
      <div className="bottom">
        <div className="divider" />
        <div className="customer">
          <CustomerMenu />
        </div>
      </div>
    </GlobalSidebarContainer>
  );
}

export default GlobalSidebar;

const GlobalSidebarContainer = styled.aside`
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100px;
  height: 100%;
  border-top-right-radius: var(--border-radius-large);
  border-bottom-right-radius: var(--border-radius-large);
  font-size: var(--font-size-large);
  color: var(--font-color-default);
  background-color: #fff;
  transition: var(--transition-default);
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  img {
    margin-left: -120px;
  }

  .imagebox {
    width: 50px;
    height: 50px;
    margin-top: 35px;
    padding-top: 2px;
    overflow: hidden;
  }

  ul,
  li {
    display: none;
  }
  &:hover {
    width: 280px;

    img {
      margin-left: 0;
    }

    .imagebox {
      overflow: visible;
    }

    .logo {
      a {
        div:last-child {
          display: block;
        }
      }
    }
    ul,
    li {
      display: block;
    }

    .menu {
      padding: 0px 28px 40px 28px;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    padding-left: 28px;
    margin-bottom: 50px;
    height: var(--header-height);
  }
  .menu {
    padding: 0px 24px 40px 28px;
  }

  .customer {
    padding: 27.5px 10px 27.5px 10px;
    margin: 0 1.5rem;
    border-top: 1px solid var(--border-color-light);
    font-size: var(--font-size-mid);
  }

  @media screen and (max-width: 1536px) {
    width: 100px;
    img {
      margin-left: -122px;
    }

    .logo {
      margin-bottom: 30px;
    }
    .menu {
      padding: 0px 28px 40px 28px;
    }

    &:hover {
      width: 224px;

      img {
        width: 179px;
        height: 38.67px;
        margin-left: -5px;
      }
    }
  }
  @media screen and (max-width: 1280px) {
    width: 100px;
    img {
      margin-left: -118px !important;
      width: 210px;
      height: 40px;
    }
    &:hover {
      width: 100px;
      img {
        margin-left: -118px !important;
        width: 210px;
        height: 40px;
      }
      .imagebox {
        overflow: hidden;
        width: 48px;
        height: 50px;
      }
    }
  }
`;
