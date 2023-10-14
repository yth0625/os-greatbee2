// style
import styled from "@emotion/styled"
// data
import { categoryList } from './store/data/categoryList'
// img
import Icon from 'styles/Icon';
import colors from 'styles/colors';

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(calc((100% - 2rem * 5) / 8), auto)
  );
  gap: 1.2rem;
  margin-top: 15px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc((100% - 2rem * 4) / 6), auto)
    );
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc((100% - 2rem * 2) / 4), auto)
    );
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(40%, auto));
  }
  .category_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.6vw;
    background-color: #fff;
    aspect-ratio: 1;
    text-align: center;
    box-shadow: var(--box-shadow01);
    border-radius: var(--border-radius-large);
    cursor: pointer;
    transition: var(--transition-default);
    &:hover {
      background-color: var(--effect-color);
    }
    &.on {
      background-color: var(--effect-color);
    }
    @media screen and (max-width: 600px) {
      aspect-ratio: 3/2;
    }
    @media screen and (max-width: 480px) {
      aspect-ratio: 1;
    }
    svg {
      height: 100%;
    }
    .box_title {
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 90%;
      color: #1a1a1a;
    }
    .box_sub {
      font-size: var(--font-size-x-small);
      color: var(--font-color-sub);
      line-height: 1.1;
    }
  }
`;

function Category({
  // @ts-ignore
  selectedCategory,
  setSelectedCategory = (category: any) => {},
}) {
  return (
    <CategoryContainer>
      {categoryList &&
        categoryList.map((el) => (
          <div
            className={`category_box ${
              selectedCategory.value === el.value ? 'on' : ''
            }`}
            key={el.value}
            onClick={() =>
              setSelectedCategory({ value: el.value, label: el.label })
            } // 1부터 시작함
          >
            <Icon
              iconName={el.icon}
              style={{ width: '100%', height: '50%' }}
              color={
                selectedCategory.value === el.value
                  ? colors.primary.basic
                  : '#C5C5C5'
              }
              selected={selectedCategory.value === el.value}
            />
            <h4 className="box_title">{el.label}</h4>
          </div>
        ))}
    </CategoryContainer>
  );
}

export default Category
