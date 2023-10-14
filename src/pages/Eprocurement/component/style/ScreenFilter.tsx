import styled from "@emotion/styled"

const ScreenFilter = styled.div<{ zIndex: number; filterColor: string }>`
  z-index: ${(props) => props.zIndex || 999};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.filterColor || 'var(--filter-color)'};
`;

export default ScreenFilter
