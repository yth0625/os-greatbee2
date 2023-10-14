import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

import Icon from 'styles/Icon';
import ButtonSubmit from 'common/Button/ButtonSubmit';
import { AxiosError } from 'axios';
import { openAlert } from '../../redux/popUpReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import colors from 'styles/colors';
import { RootState } from 'redux/store';
import AlertBacis from 'common/PopUp/Alert';
import Footer from 'common/Footer';
import { api } from '../../api/api';

type FormData = {
  companyName: string;
  employeeCount: number;
  name: string;
  work: string;
  email: string;
  phone: string;
  request: string;
  isPrivateChecked: boolean;
};

const memberList = [
  { value: 1, text: '1인 ~10인' },
  { value: 10, text: '10인 ~ 50인' },
  { value: 50, text: '50인 ~ 100인' },
  { value: 100, text: '100인 ~ 300인' },
  { value: 300, text: '300인 ~ 1,000인' },
  { value: 1000, text: '1,000인 이상' },
];

const workList = [
  { value: '서비스', text: '서비스' },
  { value: '의료·제약·복지', text: '의료·제약·복지' },
  { value: '제조·화학', text: '제조·화학' },
  { value: '판매·유통', text: '판매·유통' },
  { value: 'IT·웹·통신', text: 'IT·웹·통신' },
  { value: '건설·소방·전기', text: '건설·소방·전기' },
  { value: '교육', text: '교육' },
  { value: '미디어·디자인', text: '미디어·디자인' },
  { value: '도·소매', text: '도·소매' },
  { value: '광고·컨설팅', text: '광고·컨설팅' },
  { value: '연구·개발', text: '연구·개발' },
  { value: '은행·금융', text: '은행·금융' },
  { value: '기관·협회', text: '기관·협회' },
  { value: 'MICE', text: 'MICE' },
  { value: '기타', text: '기타' },
];

const ItemBox = (props: any) => {
  const { label, required } = props;
  return (
    <Item label={label}>
      <label>
        {required && <span style={{color: '#ef4444'}}>*[필수]</span>} {label}
      </label>
      <div style={{ marginTop: 8 }}>{props.children}</div>
    </Item>
  );
};

const SignUp = () => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      employeeCount: 0,
      name: '',
      work: '',
      email: '',
      phone: '',
      request: '',
      isPrivateChecked: false,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alert } = useSelector((state: RootState) => state.popup);

  const [requestTextLength, setRequestTextLength] = useState<string>('');

  const [isAvailableSubmit, setIsAvailableSubmit] = useState<boolean>(false);

  const signUp = async (data: FormData) => {

    try {
      if (!data.isPrivateChecked) {
        dispatch(
          openAlert({
            text: (
              <div style={{ color: '#565660', textAlign: 'center' }}>
                개인정보 수집 및 이용에 동의해주세요.
              </div>
            ),
            hasConfirm: false,
          }),
        );
        return;
      }

      // google app 으로 발송
      const emailUrl = 'https://script.google.com/macros/s/AKfycbxTJgwpxUpVj4s0hyiOiiS7CwVbQzM35xYwiG4S3Xxkgvl-Qp_q0V8b3OSClzePZ3322w/exec'
      const formData = new FormData();
      formData.append('company', data.companyName);
      formData.append('worker_cnt', data.employeeCount.toString());
      formData.append('name', data.name);
      formData.append('job', data.work);
      formData.append('email', data.email);
      formData.append('telephone', data.phone);
      formData.append('ask', data.request);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }

      await api.post(emailUrl, formData, config);

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              회원가입 신청이 완료되었어요 :D
              <br />빠르게 담당 꿀벌이 연락드릴 거예요
            </div>
          ),
          hasConfirm: false,
          onClick: () => navigate('/signIn'),
        }),
      );
    } catch (error) {
      let message = '가입에 실패했습니다. 운영자에게 문의해주세요';
      if (error instanceof AxiosError && error.response) {
        message = error.response.data.error.errMsg;
      }

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
  };

  useEffect(() => {
    console.log('watch(\'isPrivateChecked\')', watch('isPrivateChecked'))

    if (watch('companyName') === '' || watch('name') === '' || watch('email') === '' || watch('phone') === '' || watch('isPrivateChecked') === false) {
      setIsAvailableSubmit(false)
    } else {
      setIsAvailableSubmit(true)
    }
  },
    [
      watch('companyName'),
      watch('name'),
      watch('email'),
      watch('phone'),
      watch('isPrivateChecked')
    ])


  return (
    <>
      <Container>
        <div className="signup_container">
          <Icon
            iconName="arrowleft"
            width={50}
            height={50}
            className="back_button"
            onPress={() => navigate(-1)}
          />
          <Title>신규 가입</Title>
          <SubTitle>빈칸을 작성해 주시면 담당 꿀벌 연락드려요</SubTitle>
          <form onSubmit={handleSubmit(signUp)}>
            <div className="form_container">
              <Grid
                container
                direction={'column'}
                spacing={1}
                sx={{ width: 592, fontSize: 14 }}
              >
                <Grid item>
                  <ItemBox label={'회사이름'} required>
                    <input
                      {...register('companyName')}
                      type="text"
                      placeholder="회사 이름을 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'직원수'}>
                    <div style={{ position: 'relative' }}>
                      <select
                        {...register('employeeCount')}
                        id="employee-select"
                      >
                        <option value={0}>직원 수는 몇명인가요?</option>
                        {memberList.map((v: any, i: number) => (
                          <option value={v.value} key={i}>
                            {v.text}
                          </option>
                        ))}
                      </select>
                      <Icon
                        iconName="arrowdown"
                        width={24}
                        height={24}
                        color={'#859398'}
                        className="arrowdown"
                      ></Icon>
                    </div>
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'이름'} required>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="이름을 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'직업'}>
                    <div style={{ position: 'relative' }}>
                      <select {...register('work')} id="work-select">
                        <option value="">어떤 일을 하시나요?</option>
                        {workList.map((v: any, i: number) => (
                          <option value={v.value} key={i}>
                            {v.text}
                          </option>
                        ))}
                      </select>
                      <Icon
                        iconName="arrowdown"
                        width={24}
                        height={24}
                        color={'#859398'}
                        className="arrowdown"
                      ></Icon>
                    </div>
                  </ItemBox>
                </Grid>
                <Grid item>
                  <ItemBox label={'이메일'} required>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="회사 이메일을 알려주세요"
                    />
                  </ItemBox>
                </Grid>

                <Grid item>
                  <ItemBox label={'연락처'} required>
                    <input
                      {...register('phone')}
                      type="text"
                      placeholder="휴대 전화번호를 알려주세요"
                    />
                  </ItemBox>
                </Grid>
                {/*{state.type !== 'free' ? (*/}
                {/*  <Grid item>*/}
                {/*    <ItemBox label={'요청사항'}>*/}
                {/*      <textarea*/}
                {/*        {...register('request')}*/}
                {/*        placeholder="요청사항을 알려주세요"*/}
                {/*        rows={5}*/}
                {/*        cols={33}*/}
                {/*      />*/}
                {/*    </ItemBox>*/}
                {/*  </Grid>*/}
                {/*) : null}*/}
                <Grid item>
                  <ItemBox label={'요청사항'}>
                    <textarea
                      {...register('request')}
                      placeholder="요청사항을 알려주세요"
                      rows={5}
                      cols={33}
                      onChange={(e) => setRequestTextLength(e.target.value)}
                    />
                    <div className="count_text">
                      {requestTextLength.length} / 300
                    </div>
                  </ItemBox>
                </Grid>
              </Grid>

              <Consent>
                <input
                  {...register('isPrivateChecked')}
                  type="checkbox"
                  style={{ width: 20, height: 20 }}
                />
                <CheckBoxText>
                  <p>
                    [필수] <a href={'https://greatbee.notion.site/d5426853cde44bec9951947c4afeefdd?pvs=4'} target={'_blank'} rel="noreferrer"><span>개인정보 수집 및 이용</span></a>에 관한 동의
                  </p>
                </CheckBoxText>
              </Consent>
            </div>
            <ButtonBox>
              <ButtonSubmit
                buttonClassName="submit_button"
                textClassName="submit_text"
                submit={true}
                isDisabled={!isAvailableSubmit}
              >
                제출하기
              </ButtonSubmit>
            </ButtonBox>
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
      </Container>
      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </>
  );
};

export default SignUp;

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
    height: 1370px;
    background: white;
    padding: 73px 240px;
    position: relative;

    form {
      margin-top: 50px;

      .submit_text {
        color: white;
        font-size: 18px;
        font-weight: 700;
      }
    }

    .back_button {
      position: absolute;
      top: 70px;
      left: 70px;
      cursor: pointer;
    }

    @media screen and (max-width: 1536px) {
      width: 851px;
      height: 1180px;
      padding: 56px 176px;

      .back_button {
        left: 165px;
        top: 53px;
      }
    }

    @media screen and (max-width: 1280px) {
      padding: 46px 24px;
      width: 768px;
      height: 917px;

      form {
        margin-top: 24px;
        .form_container {
          padding: 0 64px;
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

    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;

    .signup_container {
      border-radius: 0;
      height: 1024px;
    }

    form {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .submit_button {
        margin-bottom: 30px;
      }

      .submit_text {
        font-size: 16px;
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
    font-weight: 500;
  }
`;

const SubTitle = styled.div`
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 32px;
  margin-top: 50px;
  text-align: center;
  color: #adadad;

  @media screen and (max-width: 1536px) {
    font-size: 28px;
    margin-top: 40px;
  }

  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

const Item = styled.div<{ label: string }>`
  margin-bottom: ${(props) => (props.label === '요청사항' ? 0 : '32px')};
  position: relative;

  label {
    margin-left: 5px;
    font-size: 16px;
  }

  input {
    width: 100%;
    height: 64px;
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

  .arrowdown {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  .count_text {
    position: absolute;
    bottom: 15px;
    right: 16px;
    color: ${colors.font.gray01};
    font-size: 16px;
  }

  @media screen and (max-width: 1536px) {
    margin-bottom: ${(props) => (props.label === '요청사항' ? 0 : '20px')};

    input {
      height: 50px;
      width: 85%;
    }

    select {
      height: 50px;
      width: 85%;
    }

    .arrowdown {
      top: 10px;
      right: 96px;
    }

    textarea {
      width: 85%;
    }

    .count_text {
      right: 100px;
    }
  }

  @media screen and (max-width: 1280px) {
    margin-bottom: ${(props) => (props.label === '요청사항' ? 0 : '20px')};

    label {
      font-size: 14px;
    }
    input {
      height: 44px;
      font-size: 14px;
      border-radius: 8px;
      width: 100%;
    }

    select {
      height: 44px;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
    }

    .arrowdown {
      top: 10px;
      right: 16px;
    }

    .count_text {
      font-size: 14px;
    }

    textarea {
      width: 100%;
      font-size: 14px;
      border-radius: 8px;
      height: 90px;
    }

    .count_text {
      right: 10px;
    }
  }
`;

const Consent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  margin-bottom: 26px;

  @media screen and (max-width: 1280px) {
    justify-content: flex-start;

    p {
      font-size: 14px;
    }
  }
`;

const CheckBoxText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  font-size: 18px;
  color: #859398;

  span {
    color: #ef4444;
  }
`;

const ButtonBox = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 25px;

  .submit_button {
    background: var(--primary-color);
    width: 100%;
    border: none;
    height: 64px;
  }

  @media screen and (max-width: 1536px) {
    .submit_button {
      height: 50px;
    }
  }

  @media screen and (max-width: 1280px) {
    .submit_button {
      height: 48px;
    }
  }
`;


