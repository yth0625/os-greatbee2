import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import colors from 'styles/colors';
import { useNavigate } from 'react-router-dom';
import Footer from 'common/Footer';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from 'common/Button/Button';

type FormData = {
  companyName: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  certificationNm: number | null;
};

const ItemBox = (props: any) => {
  const { label } = props;
  return (
    <Item label={label}>
      <label style={{ display: label === '' ? 'none' : 'block' }}>
        {label}
      </label>
      <div style={{ marginTop: 8 }}>{props.children}</div>
    </Item>
  );
};

const ChangePWModal = ({ setIsOpenModal }: any) => {
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  return (
    <Box>
      <ModalContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="new_pw">
            <label>신규 비밀번호</label>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="신규 비밀번호를 입력해주세요."
            />
            {showPw ? (
              <Icon
                iconName="eyeopen"
                style={{
                  position: 'absolute',
                  top: 38,
                  right: 10,
                  cursor: 'pointer',
                }}
                onPress={() => setShowPw(false)}
              />
            ) : (
              <Icon
                iconName="eyeclose"
                style={{
                  position: 'absolute',
                  top: 38,
                  right: 12,
                  cursor: 'pointer',
                }}
                onPress={() => setShowPw(true)}
              />
            )}
          </div>
          <div className="new_pw_confirm">
            <label>신규 비밀번호 확인</label>
            <input
              type={showPwConfirm ? 'text' : 'password'}
              placeholder="신규 비밀번호를 다시 입력해주세요."
            />
            {showPwConfirm ? (
              <Icon
                iconName="eyeopen"
                style={{
                  position: 'absolute',
                  top: 38,
                  right: 12,
                  cursor: 'pointer',
                }}
                onPress={() => setShowPwConfirm(false)}
              />
            ) : (
              <Icon
                iconName="eyeclose"
                style={{
                  position: 'absolute',
                  top: 38,
                  right: 12,
                  cursor: 'pointer',
                }}
                onPress={() => setShowPwConfirm(true)}
              />
            )}
          </div>
        </div>
        <ButtonContainer>
          <Button
            outterStyles={{ width: 150, background: colors.bg.white }}
            textStyles={{ color: colors.font.basic }}
            onClick={() => setIsOpenModal(false)}
          >
            취소
          </Button>
          <Button
            outterStyles={{ width: 150 }}
            textStyles={{ color: colors.font.basic }}
          >
            로그인하기
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Box>
  );
};

const FinePW = () => {
  const navigate = useNavigate();

  const [sendEmail, setSendEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      id: '',
      name: '',
      email: '',
      phone: '',
      certificationNm: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <Container>
        <div className="signup_container">
          <Icon
            className="back_button"
            iconName="arrowleft"
            width={50}
            height={50}
            onPress={() => navigate(-1)}
          />
          <Title>비밀번호 찾기</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_container">
              <div>
                <Grid item>
                  <ItemBox label={'회사이름'}>
                    <input
                      {...register('companyName')}
                      type="text"
                      placeholder="회사 이름을 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'아이디'}>
                    <input
                      {...register('id')}
                      type="text"
                      placeholder="아이디를 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'이름'}>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="이름을 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'연락처'}>
                    <input
                      {...register('phone')}
                      type="text"
                      placeholder="휴대 전화번호를 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <EmailCertification>
                  <div style={{ flex: 0.8 }}>
                    <Grid item>
                      <ItemBox label={'이메일'}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="회사 이메일을 알려주세요"
                        />
                      </ItemBox>
                    </Grid>
                    <Grid item>
                      <ItemBox label={''}>
                        <CertiInput
                          {...register('certificationNm')}
                          type="text"
                          placeholder="인증번호를 입력해주세요"
                          isError={isError}
                        />
                      </ItemBox>
                      {sendEmail && (
                        <CertificationTextBox>
                          <div className="error_text">
                            인증번호가 발송되었습니다.
                          </div>
                          <div
                            className="certification_info"
                            onClick={() => setIsOpenInfo(!isOpenInfo)}
                          >
                            인증번호가 오지않는다면 ?
                          </div>
                          {isOpenInfo && (
                            <div className="certification_infobox">
                              <div>
                                <Icon
                                  iconName="close"
                                  width={20}
                                  height={20}
                                  style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    cursor: 'pointer',
                                  }}
                                  onPress={() => setIsOpenInfo(false)}
                                />
                                메일이 스팸 메일로 분류된 것은 아닌지
                                <br />
                                스팸 메일함을 확인해 주세요.
                                <br />
                                스팸 메일함에도 메일이 없다면,
                                <br />
                                다시 한 번 '인증번호 받기'를 눌러주세요.
                              </div>
                            </div>
                          )}
                        </CertificationTextBox>
                      )}
                    </Grid>
                  </div>
                  <div className="certification_button_box">
                    <Button
                      buttonclassName="send_certification_number"
                      textclassName="send_certification_number_text"
                      textStyles={{ color: '#859398' }}
                      onClick={() => setSendEmail(true)}
                    >
                      인증번호 받기
                    </Button>
                    <Button
                      buttonclassName="send_certification_number"
                      textclassName="send_certification_number_text"
                      textStyles={{ color: '#859398' }}
                      onClick={() => setSendEmail(true)}
                    >
                      확인
                    </Button>
                  </div>
                </EmailCertification>
              </div>
            </div>
            <Button
              buttonclassName="find_pw_button"
              textclassName="find_pw_button_text"
              onClick={() => setIsOpenModal(true)}
            >
              비밀번호 찾기
            </Button>
          </form>
        </div>
      </Container>
      <div style={{ width: '100%' }}>
        <Footer />
      </div>
      {isOpenModal && <ChangePWModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
};

export default FinePW;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 176px 0 70px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;

  .signup_container {
    box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    -webkit-box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 6px 7px 21px 1px rgba(0, 0, 0, 0.23);
    border-radius: 16px;
    width: 1072px;
    height: 910px;
    background: white;
    padding: 73px 240px;
    position: relative;

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 90%;
      margin-top: 50px;

      .find_pw_button {
        width: 100%;
        height: 64px;
        border-radius: 16px;
        background: #d9d9d9;
        border-color: #d9d9d9;
      }

      .find_pw_button_text {
        font-size: 22px;
      }
    }

    .back_button {
      position: absolute;
      top: 70px;
      left: 70px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1536px) {
    .signup_container {
      width: 851px;
      height: 856px;
      padding: 56px 175px;

      .back_button {
        left: 165px;
        top: 53px;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    padding-top: 136px;
    .signup_container {
      width: 768px;
      height: 740px;
      padding: 46px 24px 40px;

      form {
        margin-top: 24px;
        height: 94%;

        .form_container {
          padding: 0 64px;
        }

        .find_pw_button {
          height: 50px;
          border-radius: 8px;
        }

        .find_pw_button_text {
          font-size: 16px;
        }
      }

      .back_button {
        left: 40px;
        top: 46px;

        svg {
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    overflow: hidden;

    .signup_container {
      height: 1024px;
      border-radius: 0px;

      box-shadow: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;

      form {
        height: 100%;
        .find_pw_button {
          margin-bottom: 30px;
        }
      }
    }
  }
`;

const Title = styled.div`
  text-align: center;
  color: ${colors.font.dark};
  font-size: 44px;
  font-weight: bold;
  margin-bottom: 20px;

  @media screen and (max-width: 1280px) {
    font-size: 16px;
    font-weight: semi-bold;
  }
`;

const Item = styled.div<{ label: string }>`
  margin-bottom: ${(props) =>
    props.label === '이메일' || props.label === '' ? 0 : '32px'};
  position: relative;

  label {
    margin-left: 5px;
    font-size: 16px;
    cursor: default;
  }

  input {
    width: 100%;
    height: 50px;
    font-color: #859398;
    border-radius: 16px;
    font-size: 18px;
  }

  select {
    width: 100%;
    height: 64px;
    color: #859398;
    border-radius: 16px;
    font-size: 18px;
    z-index: 1;
  }

  textarea {
    width: 100%;
    height: 120px;
    font-size: 18px;
    border-radius: 16px;
  }

  @media screen and (max-width: 1280px) {
    margin-bottom: ${(props) =>
      props.label === '이메일' || props.label === '' ? 0 : '20px'};

    label {
      font-size: 14px;
    }
    input {
      height: 44px;
      font-size: 14px;
      border-radius: 8px;
    }

    select {
      height: 44px;
      border-radius: 8px;
      font-size: 14px;
    }

    .arrowdown {
      top: 10px;
      right: 16px;
    }

    .count_text {
      font-size: 14px;
    }

    textarea {
      font-size: 14px;
      border-radius: 8px;
      height: 90px;
    }
  }
`;

const CertiInput = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 50px;
  font-color: #859398;
  border-radius: 16px;
  font-size: 18px;

  &:focus {
    bordercolor: ${(props) => (props.isError ? '#f54336' : 'inherit')};
    outline: 1px solid ${(props) => (props.isError ? '#f54336' : 'inherit')};
  }
`;

const EmailCertification = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  .error_text {
    color: #f54336;
    padding: 8px 20px;
  }

  .certification_info {
    padding: 0px 20px;
    color: ${colors.font.gray03};
    text-decoration: underline;
    cursor: pointer;
  }

  .certification_button_box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
  }

  .send_certification_number {
    background: white;
    border-width: 1px;
    height: 50px;
    border-radius: 16px;
    padding: 0px 44px;
  }

  @media screen and (max-width: 1280px) {
    .certification_button_box {
      margin-top: 20px;
    }

    .send_certification_number {
      height: 44px;
      border-radius: 8px;
    }

    .error_text {
      font-size: 14px;
    }

    .certification_info {
      font-size: 14px;
    }
  }
`;

const CertificationTextBox = styled.div`
  position: relative;

  .certification_infobox {
    position: absolute;
    width: 351px;
    top: 55px;
    left: 20px;
    padding: 30px;
    background: white;
    border-radius: 16px;
    font-size: 18px;
    line-height: 1.5;
    color: ${colors.font.gray03};
    border: 1px solid ${colors.bg.gray03};
  }

  @media screen and (max-width: 1280px) {
    .certification_infobox {
      width: 281px;
      font-size: 14px;
      padding: 20px 31px 20px 21px;
    }
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000070;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  width: 521px;
  height: 389px;
  background: white;
  border-radius: 16px;
  padding: 59px 34px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .new_pw {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 41px;
  }

  .new_pw_confirm {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  label {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 1280px) {
    padding: 50px 48px;
    .new_pw,
    .new_pw_confirm {
      input {
        border-radius: 8px;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;
