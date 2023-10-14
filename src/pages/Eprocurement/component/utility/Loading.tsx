import styled from "@emotion/styled";

const LoadingContainer = styled.div<{background: string | null}>`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props=> props.background || 'rgba(255,255,255, 0.85)'};
`
const DefaultLoadingStyle = styled.div`
  position: relative;
  font-size: var(--font-size-xx-large);
  color: var(--primary-color);
  &::after {
    content: '';  
    width: 0.1em;
    height: 0.1em;
    background: currentColor;
    position: absolute;
    bottom: 0.2em;
    right: -0.1em;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
  }
  @keyframes animloader {
    0% {
      box-shadow: 0.2em 0 rgba(255, 255, 255, 0), 0.4em 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 0.2em 0 currentColor, 0.4em 0 rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0.2em 0 currentColor, 0.4em 0 currentColor;
    }
  }
`
const DotLoadingStyle = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--primary-color);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    &:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

`

function Loading({ type='default', background = null }) {
  return (
    <LoadingContainer background={background}>
      { type === 'default' &&
        <DefaultLoadingStyle>
          Loading
        </DefaultLoadingStyle>
      }
      { type === 'dot' &&
        <DotLoadingStyle>
          <div></div><div></div><div></div><div></div>
        </DotLoadingStyle>
      }
    </LoadingContainer>
  );
}

export default Loading
