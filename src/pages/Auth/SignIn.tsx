import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { isMobile, deviceType } from 'react-device-detect';

import Icon from 'styles/Icon';
import colors from 'styles/colors';
import { useSignInApi } from '../../api/useSignInApi';
import ButtonSubmit from 'common/Button/ButtonSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert } from 'redux/popUpReducer';
import AlertBacis from 'common/PopUp/Alert';
import { RootState } from 'redux/store';
import Footer from 'common/Footer';
import Button from 'common/Button/Button';

type FormData = {
  userId: string;
  userPw: string;
};

const SignIn = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const { alert } = useSelector((state: RootState) => state.popup);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSaveId, setIsSaveId] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      userId: '',
      userPw: '',
    },
  });

  const { isLoading, mutateAsync } = useSignInApi();

  const signIn = async (data: FormData) => {
    // call login api
    try {
      const res = await mutateAsync({
        userId: data.userId,
        userPw: data.userPw,
      });

      // if (isMobile) {
      //   dispatch(
      //     openAlert({
      //       text: (
      //         <div
      //           style={{
      //             color: '#565660',
      //             textAlign: 'center',
      //             lineHeight: 1.5,
      //           }}
      //         >
      //           모바일 환경에서의 접속은 잠시 점검중에 있습니다.
      //           <br />
      //           PC에서 접속해 주세요
      //           <br />
      //           (점검 기간 : 2023.06.16 ~ 2023.06.18)
      //         </div>
      //       ),
      //       hasConfirm: false,
      //     }),
      //   );
      //   return;
      // }

      // access token 저장
      if (isSaveId) {
        window.localStorage.setItem('accessToken', res.data.data.accessToken);
      } else {
        window.sessionStorage.setItem('accessToken', res.data.data.accessToken);
      }

      // main 으로 이동
      navigate('/');
    } catch (error) {
      let message = '로그인에 실패했습니다. 운영자에게 문의해주세요';
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.error.errCode === 'AUTH-001') {
          dispatch(
            openAlert({
              text: (
                <div
                  style={{
                    color: '#565660',
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  입력하신 아이디와 비밀번호가 일치하지 않습니다.
                  <br />
                  확인 후 다시 입력해 주세요.
                </div>
              ),
              hasConfirm: false,
            }),
          );
        } else {
          message = error.response.data.error.errMsg;

          dispatch(
            openAlert({
              text: (
                <div style={{ color: '#565660', textAlign: 'center' }}>
                  {message}
                </div>
              ),
              hasConfirm: false,
            }),
          );
        }
      }
    }
  };
  useEffect(() => {
    // 외주 수정
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('accessToken', 'your-access-token-here');
      navigate('/generalaffairs');
    } else if (localStorage.getItem('accessToken')) {
      navigate('/');
    }

    if (deviceType === 'mobile') {
      // navigate('/tryapp');
      navigate('/generalaffairs');
    }
  }, []);

  return (
    <Container>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit(signIn)}>
          <LogoBox />
          <InputBox>
            <input {...register('userId')} type="text" placeholder="아이디" />
            <div
              style={{
                width: '100%',
                position: 'relative',
              }}
            >
              <input
                {...register('userPw')}
                type={showPw ? 'text' : 'password'}
                placeholder="비밀번호"
              />
              {showPw ? (
                <Icon
                  width={26}
                  height={26}
                  iconName="eyeopen"
                  className="input_icon"
                  onPress={() => setShowPw(false)}
                />
              ) : (
                <Icon
                  width={26}
                  height={26}
                  iconName="eyeclose"
                  className="input_icon"
                  onPress={() => setShowPw(true)}
                />
              )}
            </div>
          </InputBox>
          <div className="auto_login_find_pw">
            <SaveIdBox>
              <input
                type="checkbox"
                id="saveid"
                onChange={() => setIsSaveId(!isSaveId)}
              />
              <label htmlFor="saveid">자동 로그인</label>
            </SaveIdBox>
            <SearchText onClick={() => navigate('/findPW')}>
              비밀번호 찾기
            </SearchText>
          </div>
          <ButtonBox>
            <ButtonSubmit
              buttonClassName="login_button"
              textClassName="login_button_text"
              isDisabled={isLoading}
              submit={true}
            >
              로그인
            </ButtonSubmit>
            <ButtonSubmit
              theme="light"
              onClick={() => navigate('/signUp')}
              buttonClassName="signup_button"
              textClassName="signup_button_text"
              isDisabled={isLoading}
            >
              신규가입
            </ButtonSubmit>
            <Divider>
              <div className="horizontal_divider" />
              <div style={{ color: colors.font.gray01, fontSize: 12 }}>
                또는
              </div>
              <div className="horizontal_divider" />
            </Divider>
            <SocialLoginBox className="social_login_box">
              <div className="social_btn">
                <img src="/images/google.png" alt="google" className="google" />
              </div>
              <div className="social_btn">
                <img src="/images/apple.png" alt="apple" className="apple" />
              </div>
              <div className="social_btn">
                <img src="/images/naver.png" alt="apple" className="naver" />
              </div>
            </SocialLoginBox>
          </ButtonBox>
          <div className="bottom_info_text">그레이트비가 궁금하다면?</div>
        </form>
        {alert.isOpenAlert && (
          <AlertBacis
            hasConfirm={alert.hasConfirm}
            confirm={alert.confirmFunc}
            onClick={alert.onClick}
          >
            <span>{alert.alertMessage}</span>
          </AlertBacis>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </Container>
  );
};
export default SignIn;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  form {
    padding: 41px 48px;
    width: 688px;
    height: 748px;
    background: ${colors.bg.white};
    box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    -webkit-box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    border-radius: 16px;

    .auto_login_find_pw {
      font-size: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }

    .bottom_info_text {
      display: none;
      color: ${colors.primary.basic};
      text-decoration: underline;
      text-align: center;
      font-weight: semi-bold;
      font-size: 14px;
      margin-top: 136px;
      cursor: pointer;
    }

    @media screen and (max-width: 1536px) {
      padding: 30px;
      width: 549px;
      height: 602px;
      .auto_login_find_pw {
        margin: 4px 0 24px;
      }
    }

    @media screen and (max-width: 1280px) {
      box-shadow: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;

      width: 335px;
      height: 524px;
      padding: 0px;

      .bottom_info_text {
        display: block;
      }

      .auto_login_find_pw {
        margin-top: 26px;
        font-size: 14px;
      }
    }
  }
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 176px;

  background-image: url('/images/logo/1920logo.png');
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: center;

  @media screen and (max-width: 1536px) {
    height: 125px;
    background-size: 340px;
    background-image: url('/images/logo/1536logo.png');
  }

  @media screen and (max-width: 1280px) {
    background-size: 213px;
    background-image: url('/images/logo/GreatBee.png');
    background-repeat: no-repeat;
    background-position: center;
    height: 42px;
  }

  p {
    width: 250px;
    margin-left: -50px;
    margin-top: 52px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: -0.1px;

    span {
      font-weight: 600;
      color: ${colors.primary.basic};
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;

  div {
    width: 40px;
    font-size: 18px;
    font-weight: 600;
  }

  .input_icon {
    position: absolute;
    top: 18px;
    right: 0px;
    cursor: pointer;
  }

  input {
    padding: 0 16px;
    height: 64px;
    border-radius: 16px;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 18px;

    &:focus {
      border: 1px solid ${colors.primary.basic};
    }
  }

  @media screen and (max-width: 1536px) {
    margin-top: 30px;
    input {
      height: 40px;
      font-size: 16px;
    }

    .input_icon {
      top: 10px;
      right: -5px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    margin-top: 29px;
    input {
      height: 44px;
      font-size: 14px;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .input_icon {
      top: 11px;
      right: -5px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;

  .login_button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 19px;
    padding-bottom: 19px;
  }

  .login_button_text {
    font-size: 22px;
  }

  .signup_button {
    margin-top: 18px;
    width: 100%;
    border-color: ${colors.primary.basic};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 19px;
    padding-bottom: 19px;
    border-width: 1px;
  }

  .signup_button_text {
    font-size: 22px;
  }

  @media screen and (max-width: 1536px) {
    .login_button {
      height: 40px;
      border-radius: 16px;
    }

    .login_button_text {
      font-size: 18px;
    }

    .signup_button {
      height: 40px;
      border-radius: 16px;
    }

    .signup_button_text {
      font-size: 18px;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 1280px) {
    .login_button {
      padding-top: 14px;
      padding-bottom: 14px;
      background: #4F4F4F;
      border-color: #4F4F4F;
      border-radius: 8px;
    }

    .login_button_text {
      font-size: 16px;
    }

    .signup_button {
      display: none;
    }
`;

const SearchText = styled.div`
  text-align: right;
  margin-right: 10px;
  cursor: pointer;
  color: ${colors.font.gray04};
  text-decoration: underline;

  @media screen and (max-width: 1280px) {
    text-decoration: none;
  }
`;

const SaveIdBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    margin-left: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    color: ${colors.font.gray04};
  }

  input {
    width: 20px;
    height: 20px;
    border-radius: 8px;
  }

  @media screen and (max-width: 1280px) {
    label {
      font-size: 14px;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  line-height: 1.5;

  .horizontal_divider {
    width: 42%;
    height: 1px;
    background: ${colors.border.dark};
  }

  @media screen and (min-width: 1281px) {
    display: none;
  }
`;

const SocialLoginBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 112px;
  width: 100%;
  justify-content: center;
  margin-top: 30px;

  .social_btn {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid ${colors.primary.basic};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .google {
      width: 32px;
    }

    .apple {
      width: 30px;
    }

    .naver {
      width: 22px;
    }
  }

  @media screen and (max-width: 1280px) {
    gap: 12px;
    margin-top: 12px;
    .social_btn {
      width: 50px;
      height: 50px;
      gap: 12px;

      .google {
        width: 25px;
      }
      .apple {
        width: 24px;
      }
      .naver {
        width: 18px;
      }
    }
  }
`;
