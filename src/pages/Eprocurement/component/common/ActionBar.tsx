// router
import { useNavigate } from "react-router-dom"
// style
import styled from "@emotion/styled"
import { InputStyle } from '../style/FormStyle'
import colors from 'styles/colors';
// img
import Icon from 'styles/Icon';
import Button from 'common/Button/Button';
import { openModal } from '../../../../redux/popUpReducer';
import React, { useState } from 'react';
import QNABoard from '../utility/popup/qna/QNABoard';
import { useDispatch } from 'react-redux';
import CategoryMenu from '../../../../common/layout/CategoryMenu';

const ActionBarContainer = styled.div<{ isShowSearchBar: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isShowSearchBar ? 'space-between' : 'flex-end'};
  gap: 1.2rem;
  flex: 1;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }

  .select_category {
    height: 4rem;
    width: 15rem;
    background-color: #fff;
    color: var(--font-color-sub);
    border-radius: var(--border-radius-mid);
    border-color: var(--primary-color);
    @media screen and (max-width: 600px) {
      width: 10rem;
      flex-grow: 1;
    }
    li.on {
      color: var(--primary-color);
    }
  }

  .search_bar {
    position: relative;
    width: 50%;
    flex: 0.8;
    height: 48px;
    border-radius: var(--border-radius-mid);
    overflow: hidden;
    transition: var(--transition-fast);

    @media screen and (max-width: 1024px) {
      width: 60%;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      flex: 1;

      input {
        width: 100%;
      }
    }

    svg {
      position: absolute;
      top: 50%;
      left: 1.5rem;
      transform: translateY(-50%);
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.25rem;
      stroke: var(--primary-color);
      cursor: pointer;
    }

    input {
      height: 100%;
      padding-left: 5rem;
      transition: background-color var(--transition-default);
      border-color: var(--primary-color);
      border-radius: var(--border-radius-mid);
    }
  }
  .btn_action {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    width: 4rem;
    color: var(--primary-color);
    padding: 0;
    border-radius: var(--border-radius-mid);
    &:hover {
      background-color: var(--primary-color);
      color: #fff;
    }
    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const ButtonText = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 1510px) {
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  .button_outter {
    width: 50px;
    height: 48px;
    background-color: #fff;
    border: 1px solid ${colors.primary.basic};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

interface IProps {
  isShowSearchBar?: boolean;
  isCartPage?: boolean;
  sortOrder?: string;
  viewType?: string;
}

function ActionBar({
  isShowSearchBar = false,
  isCartPage = false,
  sortOrder,
  viewType,
}: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState<string>('');

  const search = (query: string) => {
    setText('')
    navigate(`/eprocurement?query=${query}`)
  }

  const showWishList = () => {
    navigate(`/eprocurement?isShowWishList=Y`)
  }

  return (
    <ActionBarContainer isShowSearchBar={isShowSearchBar}>
      <div style={{display: 'flex', width: '100%'}}>
        <CategoryMenu
          sortOrder={sortOrder}
          viewType={viewType}
          outterStyle={'0'}
        />

        {isShowSearchBar && (
          <div className="search_bar">
            <Icon iconName="search" onPress={(e) => search(e.target.value)} />
            <InputStyle
              type="text"
              placeholder="원하는 상품을 검색하세요. (한글 2자 이상, 영문 3자 이상)"
              value={text}
              onChange={(e: any) => {
                setText(e.currentTarget.value);
              }}
              onKeyUp={(e: any) => {
                e.key === 'Enter' && search(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <ButtonContainer>
        <Button
          onClick={() => showWishList()}
          icon="heart"
          iconColor={colors.primary.basic}
          iconPosition="left"
          buttonclassName="button_outter"
          outterStyles={{
            height: 48,
            padding: 13,
            backgroundColor: '#fff',
            marginRight: 8,
            border: '1px solid #eee',
          }}
          textStyles={{
            color: colors.font.gray04,
            fontSize: 18,
          }}
        >
          <ButtonText></ButtonText>
        </Button>
        {!isCartPage && (
          <Button
            onClick={() => navigate('/eprocurement/cart')}
            icon="cart"
            iconWidth={30}
            iconHeight={30}
            iconColor={colors.primary.basic}
            iconPosition="left"
            buttonclassName="button_outter"
            outterStyles={{
              height: 48,
              padding: 9,
              paddingTop: 11,
              backgroundColor: '#fff',
              marginRight: 8,
            }}
            textStyles={{
              color: colors.font.gray04,
              fontSize: 18,
            }}
          >
            <ButtonText></ButtonText>
          </Button>
        )}
        <Button
          onClick={() => dispatch(
            openModal({
              modalMessage: {
                title: '',
                content: (
                  <QNABoard />
                ),
              },
              hasConfirm: '아니오',
              confirmFn: () => {},
            }),
          )}
          icon="qna"
          iconColor={colors.primary.basic}
          iconPosition="left"
          buttonclassName="button_outter"
          outterStyles={{
            height: 48,
            padding: 13,
            backgroundColor: '#fff',
          }}
          textStyles={{
            color: colors.font.gray04,
            fontSize: 18,
          }}
        >
          <ButtonText></ButtonText>
        </Button>
      </ButtonContainer>
    </ActionBarContainer>
  );
}

export default ActionBar
