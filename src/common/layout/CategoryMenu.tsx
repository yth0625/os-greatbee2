import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import { categoryIcons } from 'const/constance';
import Loading from 'pages/Eprocurement/component/utility/Loading';
import useCategory from 'hooks/useCategory';
import { getCategory1ListApi } from '../../api/useEprocurementApi';
import { AxiosResponse } from 'axios';
import { IProdCategory } from '../../interfaces/eprocurement';
import { useNavigate } from 'react-router-dom';

interface ICategory {
  value: number;
  label: string;
}

type CategoryIconValue = {
  value: number;
  label: string;
  icon: string;
};

interface IProps {
  outterStyle?: {};
  sortOrder?: string;
  viewType?: string;
}

const CategoryMenu = ({
  outterStyle,
  sortOrder = '0',
  viewType = 'card',
}: IProps) => {
  const navigate = useNavigate();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selected1, setSelected1] = useState<number>(1);
  const [categoryWithIcon, setCategoryWithIcon] = useState<CategoryIconValue[]>(
    [],
  );

  const [categories1, setCategories1] = useState<ICategory[]>([]);

  const selectRef = useRef(null);

  const { categories: itemCategory, loading: isLoading } = useCategory();

  const openDropBox = (value: boolean) => {
    if (isSelectOpen) {
      // @ts-ignore
      selectRef.current && selectRef.current.blur();
    }
    setIsSelectOpen(value);
  };

  useEffect(() => {
    if (categories1) {
      const res = categories1.map((item, i) => {
        if (categoryIcons[i].value === item.value) {
          return {
            ...item,
            icon: categoryIcons[i].icon,
            children: [],
          };
        }

        return null;
      });
      // @ts-ignore
      setCategoryWithIcon(res);
    }
  }, [categories1]);

  useEffect(() => {
    // 처음에 대분류 카테고리 업데이트
    getCategory1ListApi().then((res: AxiosResponse) => {
      const newCategories: ICategory[] = res.data.data.map(
        (item: IProdCategory) => {
          return { value: item.cateNo, label: item.cateNm };
        },
      );

      if (newCategories) {
        const res = newCategories.map((item: ICategory, i: number) => {
          if (categoryIcons[i].value === item.value) {
            return {
              ...item,
              icon: categoryIcons[i].icon,
              children: [],
            };
          }

          return null;
        });

        setCategories1(newCategories);

        // @ts-ignore
        setCategoryWithIcon(res);
      }
    });
  }, []);

  return (
    <Container>
      <SelectBox
        ref={selectRef}
        css={[outterStyle]}
        onClick={() => openDropBox(!isSelectOpen)}
        onBlur={() => setIsSelectOpen(false)}
        type={'button'}
      >
        {isSelectOpen ? (
          <Icon
            iconName="selectclose"
            style={{ marginRight: 20, marginLeft: 4, cursor: 'pointer' }}
            width={34}
            height={28}
          />
        ) : (
          <Icon
            iconName="categorymenu"
            style={{ marginRight: 20, marginLeft: 4, cursor: 'pointer' }}
            width={34}
            height={28}
          />
        )}
      </SelectBox>

      {isSelectOpen && (
        <CategoryContainer>
          <div className="cate_container">
            {categoryWithIcon?.map((item, i) => {
              if (i === 0) return null;
              return (
                <ListItem
                  key={i}
                  selected={selected1 === item.value}
                  onMouseOver={(e) => {
                    e.stopPropagation();
                    setSelected1(item.value);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/eprocurement?category1=${item.value}&sortOrder=${sortOrder}&viewType=${viewType}&&page=1`,
                    );
                  }}
                >
                  <div className="labelicon">
                    <Icon
                      iconName={item.icon}
                      width={20}
                      height={20}
                      color="#000"
                      style={{ marginRight: 10 }}
                    />
                    {item.label}
                  </div>
                  {selected1 === item.value && <Icon iconName="triRight" className="right_arrow" />}
                </ListItem>
              );
            })}
          </div>
          <Divider />
          {selected1 && isLoading ? (
            <Loading />
          ) : (
            itemCategory.map((category1, i) => {
              if (
                category1.value === selected1 &&
                category1.children.length > 0
              ) {
                return (
                  <SectionCategoryContainer key={i}>
                    {category1.children.map((category2: any, i) => (
                      <>
                        <SectionCategoryList
                          key={i}
                          lastone={(i + 1) % 4 === 0}
                        >
                          <SectionListItem
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/eprocurement?category2=${category2.value}&sortOrder=${sortOrder}&viewType=${viewType}&&page=1`,
                              );
                            }}
                            style={{ height: 'auto', padding: '7px 14px' }}
                          >
                            {category2.label}
                          </SectionListItem>

                          {category2.children?.map(
                            (category3: any, i: number) => (
                              <SectionListItem
                                key={i}
                                style={{
                                  fontWeight: 300,
                                  color: '#616161',
                                }}
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/eprocurement?category3=${category3.value}&sortOrder=${sortOrder}&viewType=${viewType}&&page=1`,
                                  );
                                }}
                              >
                                {category3.label}
                              </SectionListItem>
                            ),
                          )}
                        </SectionCategoryList>
                      </>
                    ))}
                  </SectionCategoryContainer>
                );
              }

              return null;
            })
          )}
        </CategoryContainer>
      )}
    </Container>
  );
};

export default CategoryMenu;

const SelectBox = styled.button`
  text-align: left;
  margin: 0;
  padding: 0;
  position: relative;
  height: 44px;
  border-radius: 10px;
  color: ${colors.font.gray04};
  width: 58px !important;
`;

const CategoryContainer = styled.ul`
  position: absolute;
  top: 70px;
  min-width: 920px;
  height: 612px;
  display: flex;
  flex-direction: row;
  padding: 8px 8px 8px 16px;
  background: ${colors.bg.white};
  border: 1px solid ${colors.primary.basic};
  border-radius: 10px;
  z-index: 99;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox

  .cate_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 596px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
  }

  @media screen and (max-width: 1536px) {
    top: 60px;
    min-width: 572px;
    height: 500px;
    padding: 8px;

    .cate_container {
      height: 484px;
    }
  }
`;

const ListItem = styled.li<{ selected: boolean }>`
  padding: 4px 8px;
  width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  height: auto;
  background: ${(props) => (props.selected) ? '#ffc74c21' : 'white'};

  .labelicon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1536px) {
    width: 116px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const Divider = styled.div`
  width: 1px;
  background: #d9d9d9;
  z-index: 100;
  margin: 0 0 0 16px;
  position: relative;
  @media screen and (max-width: 1536px) {
    margin: 0 0 0 8px;
  }
`;

const Container = styled.div`
  position: relative;
  margin-top: 3px;
`;

const SectionCategoryContainer = styled.ul`
  border-left: 5px;
  border-left-color: #d9d9d9;
  display: flex;
  flex-direction: row;
  width: 720px;
  height: 596px;
  overflow-y: scroll;
  flex-wrap: wrap;
  .section_category_list {
  }
  .category3 {
    text-align: center;
    color: ${colors.font.gray03};

    &:hover {
      background: #ffc74c21;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1536px) {
    width: 510px;
    height: 500px;
  }
`;

const SectionCategoryList = styled.div<{ lastone: boolean }>`
  padding: 10px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: ${(props) => (props.lastone ? 'none' : '1px solid #d9d9d9')};
  margin-bottom: 20px;

  @media screen and (max-width: 1536px) {
    gap: 4px;
    padding: 4px;
    margin-bottom: 10px;
  }
`;

const SectionListItem = styled.li`
  padding: 14px;
  width: 160px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  font-weight: 700;

  .labelicon {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
  }

  &:hover {
    background: #ffc74c21;
    cursor: pointer;
  }

  @media screen and (max-width: 1536px) {
    width: 116px;
    font-size: 12px;
    font-weight: 600;
    padding: 4px;
  }
`;
