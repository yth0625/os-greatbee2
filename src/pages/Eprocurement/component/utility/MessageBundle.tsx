// core
import { useEffect, useState } from "react";
// style
import styled from "@emotion/styled"
import ScreenFilter from '../style/ScreenFilter'
// recoil
import { useRecoilState } from 'recoil';
import { messageBundle } from '../../store'

const BundleCommon = styled.div` // MessageBundle 공통
  z-index: 1000;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 90%;
  min-width: calc(var(--min-width) * 0.9);
  border-radius: 0.8rem;
  background-color: #fff;
  .message {
    height: calc(100% - 10rem);
    padding: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    font-size: var(--font-size-large);
    text-align: center;
    word-break: keep-all;
    font-weight: var(--font-w-mid);
    .btn {
      display: inline-block;
      padding: 0.9rem 2.6rem;
      margin-top: 2.5rem;
      border: none;
      border-radius: var(--border-radius-small); /* 원래 .8rem */
      color: #fff;
      font-size: 1.6rem;
      cursor: pointer;
      transition: var(--transition-fast)
    }
    /* @media screen and ( max-width: 768px ) {
      font-size: var(--font-size-large);
    } */
  }
`
const Alert = styled(BundleCommon)`
  .btn_close {
    background-color: var(--primary-color);
    color: var(--primary-color-contrast);
  }
  .btn_close:hover {
    /* filter: brightness(0.93); */
    background-color: var(--primary-color-effect);
  }
`
const Confirm = styled(BundleCommon)`
  .btn_continue {
    margin-right: 10px;
    background-color: var(--primary-color);
    color: var(--primary-color-contrast);
    &:hover {
      background-color: var(--primary-color-effect);
    }
  }
  .btn_close {
    background-color: var(--error-color);
    color: #fff;
    &:hover {
      background-color: #f52929;
    }
  }
`
const Error = styled(BundleCommon)`
  border: 1px solid var(--error-color);
  .btn_close {
    background-color: var(--error-color);
    &:hover {
      filter: brightness(1.1);
    }
  }
`
const Prompt = styled(BundleCommon)`
  input {
    margin-top: 1rem;
    width: 100%;
    height: 4rem;
  }
  .btn_continue {
    margin-right: 10px;
    background-color: var(--primary-color);
    color: var(--primary-color-contrast);
    &:hover {
      background-color: var(--primary-color-effect);
    }
  }
  .btn_close {
    background-color: var(--error-color);
    color: #fff;
    &:hover {
      background-color: #f52929;
    }
  }
`

function MessageBundle(){
  const [ alert, setAlert ] = useRecoilState(messageBundle.alert);
  const [ confirm, setConfirm ] = useRecoilState(messageBundle.confirm);
  const [ error, setError ] = useRecoilState(messageBundle.error);
  const [ prompt, setPrompt ] = useRecoilState(messageBundle.prompt);
  const [ promptInput, setPromptInput ] = useState('');

  // 알림창은 2.6초뒤에 꺼지도록
  useEffect(()=>{
    // @ts-ignore
    let timeID;
    if(alert != ''){
      timeID = setTimeout(() => {
        setAlert('');
      }, 2600);
    }
    // @ts-ignore
    return ()=>clearTimeout(timeID)
  }, [alert])

  return(
    <>
      { (alert || confirm.message || error || prompt.message) &&
        // @ts-ignore
        <ScreenFilter zIndex={1000} ></ScreenFilter>
      }
      { // alert 팝업
        alert && (
          <Alert className="alert"
            // v-show="alertBundle.alertContent"
          >
            <div className="message">
              <p>{alert}</p>
              <button className="btn btn_close"
                autoFocus
                onClick={()=>setAlert('')}
              >
                확인
              </button>
            </div>
          </Alert>
        )
      }
      { // confirm 팝업
        confirm.message && (
          <Confirm className="confirm">
            <div className="message">
              <p>{confirm.message}</p>
              <button className="btn btn_continue"
                onClick={()=>{
                  // @ts-ignore
                  confirm.callback();
                  setConfirm({message: '', callback: null});
                }}
              >
                확인
              </button>
              <button className="btn btn_close"
                autoFocus
                onClick={()=>setConfirm({message: '', callback: null})}
              >
                취소
              </button>
            </div>
          </Confirm>
        )
      }
      { // error 팝업
        error && (
          <Error className="error">
            <div className="message">
              <p>{error}</p>
              <button className="btn btn_close"
                autoFocus
                onClick={()=>setError('')}
              >
                확인
              </button>
            </div>
          </Error>
        )
      }
      { // prompt 팝업
        prompt.message && (
          <Prompt className="prompt">
            <div className="message">
              {
                prompt.message &&
                <p>{prompt.message}</p>
              }
              <input type="text"
                autoFocus
                value={promptInput}
                onChange={(e)=>{setPromptInput(e.currentTarget.value)}}
              />
              <button className="btn btn_continue"
                onClick={()=>{
                  setPrompt({message: '', callback: null});
                  // @ts-ignore
                  prompt.callback(promptInput);
                  setPromptInput('');
                }}
              >
                확인
              </button>
              <button className="btn btn_close"
                onClick={()=>{
                  setPromptInput('');
                  setPrompt({message: '', callback: null});
                }}
              >
                취소
              </button>
            </div>
          </Prompt>
        )
      }
    </>
  )
}

export default MessageBundle
