import { useEffect, useState } from 'react';
import Icon from 'styles/Icon';
import styled from '@emotion/styled';

import { useGetFavoriteListApi } from '../../api/useMainApi';
import colors from '../../styles/colors';

interface IFavorite {
  icon: string;
  text: string;
  enText: string;
}

const favoriteInfo: {
  [key: string]: IFavorite
} = {
  workflow: { icon: 'workflowitem', text: '워크플로', enText: 'Workflow' },
  asset: { icon: 'asset', text: '자산', enText: 'Asset' },
  contract: { icon: 'stamp', text: '계약', enText: 'Contact' },
  administration: { icon: 'suitcase', text: '일반총무', enText: 'Administration' },
};

function Favorite() {
  const [favorites, setFavorites] = useState<IFavorite[]>([
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
    { icon: '', text: '', enText: '' },
  ]);

  const { data, isSuccess } = useGetFavoriteListApi();

  useEffect(() => {
    if (isSuccess) {
      setFavorites((prev) => {
        const newPrev = [...prev];

        for (let i = 0; i < data.length; i++) {
          newPrev[i].icon = favoriteInfo[data[i].menuEngName.toLowerCase()].icon;
          newPrev[i].text = data[i].menuName;
          newPrev[i].enText = data[i].menuEngName;
        }
        return newPrev;
      });
    }
  }, [isSuccess, data, setFavorites]);

  return (
    <FavoriteCategory>
      <div>즐겨찾기</div>
      <FavoriteList>
        {favorites.map((item, i) => {
          if (item.text === '') {
            return (
              <FavoriteItem
                key={i}
                item={item.text}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed #00000030',
                }}
              >
                <div className='favorite_nocontent'>+</div>
              </FavoriteItem>
            );
          } else {
            return (
              <FavoriteItem key={i} item={item.text}>
                <Icon iconName={item.icon} />
                <div className='favorite_text'>{item.text}</div>
                <div className='favorite_entext'>{item.enText}</div>
              </FavoriteItem>
            );
          }
        })}
      </FavoriteList>
    </FavoriteCategory>
  );
}

const FavoriteCategory = styled.section`
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
`;

const FavoriteList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  padding: 2rem 0;
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 600px) {
    padding: 1.5rem 0.1rem;
  }
`;

const FavoriteItem = styled.li<{ item: string }>`
  width: 15%;
  height: 14rem;
  position: relative;
  border-radius: 1.2rem;
  padding: 1.8rem 1.2rem;
  background-color: ${(props) =>
  props.item === '워크플로' ? colors.primary.basic : colors.bg.white};
  box-shadow: 6px 6px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  .favorite_text {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 10px;
    @media screen and (max-width: 1440px) {
      font-size: 2.2rem;
    }
    @media screen and (max-width: 1024px) {
      font-size: 1.8rem;
    }
    @media screen and (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  .favorite_entext {
    font-size: 1rem;
    margin-top: 14px;
    color: ${colors.font.gray02};
    @media screen and (max-width: 1440px) {
      font-size: 1.3rem;
    }
    @media screen and (max-width: 1024px) {
      font-size: 1.1rem;
    }
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .favorite_nocontent {
    text-align: center;
    font-size: 3rem;
    color: #1a1a1a30;
    @media screen and (max-width: 1440px) {
      font-size: 4rem;
    }
    @media screen and (max-width: 768px) {
      font-size: 3rem;
    }
  }

  @media screen and (max-width: 1440px) {
    padding: 2.2rem 1.6rem;
    height: 17rem;
    width: 16%;
    min-width: 150px;
  }
  @media screen and (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const CloseButton = styled.div`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 14px;
  border: 1px dashed #00000020;
`;

export default Favorite
