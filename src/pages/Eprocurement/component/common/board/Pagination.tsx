// core
import { useMemo } from 'react';
// style
import styled from '@emotion/styled';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
  > div {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    font-size: var(--font-size-x-small);
    transition: var(--transition-fast);
    user-select: none;
    cursor: pointer;
    &:hover {
      background-color: var(--effect-color);
    }
    &.active {
      background-color: var(--base-color-light);
      border-radius: var(--border-radius-small);
      color: var(--primary-color-contrast);
    }
  }
`;

function Pagination({ page, setPage, totalPage, maxShowPage = 5 }: any) {
  // page(현재 페이지), setPage(페이지 변경함수), totalPage(전체 페이지수), maxShowPage(최대 보일 페이지수)

  const range = useMemo(() => {
    // pagination 범위
    const min =
      maxShowPage * Math.floor((page <= 1 ? page : page - 1) / maxShowPage) + 1;
    const max = Math.min(min + maxShowPage - 1, totalPage);
    return { min: min, max: max };
  }, [page, totalPage]);

  function changePage(num: number) {
    // 페이지 변경
    if (page == num) return;
    if (num > 0 && num <= totalPage) {
      // 0보단 크고, 최대 페이지 이하일 때
      setPage(num);
    }
  }

  const pageNumRendering = () => {
    // pageNum 렌더링 함수
    const result = [];
    for (let i = range.min; i <= range.max; i++) {
      result.push(
        <div
          key={i}
          className={`${page == i ? 'active' : ''}`}
          onClick={() => changePage(i)}
        >
          {i}
        </div>,
      );
    }
    return result;
  };

  return (
    <PaginationContainer className="pagination">
      <div
        className={`prev ${page <= 1 ? 'disable' : ''}`}
        onClick={() => changePage(Math.max(1, range.min - 1))}
      >
        &lt;
      </div>
      {pageNumRendering()}
      <div
        className={`next ${page >= totalPage ? 'disable' : ''}`}
        onClick={() => changePage(Math.min(totalPage, range.max + 1))}
      >
        &gt;
      </div>
    </PaginationContainer>
  );
}

export default Pagination