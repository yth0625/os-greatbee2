import React from 'react';
import styled from '@emotion/styled';
import Favorite from './Favorite';
import colors from 'styles/colors';

const RecentPurchaseHistory = () => {
  return (
    <RecommendContainer>
      <div className="sticky_box">
        <div style={{ display: 'flex', flexDirection: 'row', height: 60 }}>
          <div className="sticky_title">최근 구매 상품</div>
        </div>
        <section className="recommend_container">
          <div className="scroll_box">
            <Favorite />
          </div>
        </section>
      </div>
    </RecommendContainer>
  );
};

export default RecentPurchaseHistory;

const RecommendContainer = styled.div`
  display: block;
  width: 30%;
  max-width: 670px;
  flex-shrink: 0;
  padding-left: 0;

  .c_section_title {
    padding-bottom: 1.5rem;
  }

  .sticky_box {
    padding: 3rem 2rem;
    position: sticky;
    top: calc(var(--header-height) + 3rem);
    background-color: #fff;
    height: calc(100vh - var(--header-height) - 3rem * 2);
    width: 100%;
    overflow: hidden;
    border-radius: var(--border-radius-large);

    .sticky_title {
      padding-top: 22px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      background-color: ${colors.primary.basic};
      font-size: 18px;
      font-weight: 700;
      color: ${colors.font.basic};
    }
  }

  .recommend_container {
    background-color: #fff;
    height: calc(100% - 5rem);
    width: 100%;
    border: 1px solid ${colors.bg.gray01};
    padding: 1rem 1rem 0;

    .scroll_box {
      box-sizing: content-box;
      width: calc(100% + 5rem); /* box-shadow 안짤리게 */
      height: 100%;
      margin: 0 -2.5rem; /* box-shadow 안짤리게 */
      overflow-y: auto;
      scrollbar-width: none; /* firefox */

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    width: 192px;
    padding: 0 16px;

    .sticky_box {
      padding: 0px;
      background-color: transparent;
      top: calc(var(--header-height) + 24px);

      .sticky_title {
        height: 48px;
        padding: 14px 26px;
        border-radius: 16px;
      }
    }

    .recommend_container {
      background-color: transparent;
      padding: 0;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
