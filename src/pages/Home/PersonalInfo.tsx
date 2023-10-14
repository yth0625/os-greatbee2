import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import { InputStyle } from 'common/Input/FormStyle';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal, openAlert } from 'redux/popUpReducer';
import colors from 'styles/colors';
import { useChangePasswordApi, useGetUserInfoApi, useSaveUserInfoApi } from '../../api/useMainApi';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import ButtonSubmit from '../../common/Button/ButtonSubmit';

type FormData = {
  email: string;
  subName: string;
  telNo: string;
  phone: string;
  lastPw: string;
  currPw: string;
  newPw: string;
  reNewPw: string;
};


const PersonalInfo = () => {
  const [changePWstage, setChangePWstage] = useState<number>(1);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: userInfo } = useGetUserInfoApi();
  const { mutateAsync: saveUserInfoApi, isLoading: isSavingUserInfo } =
    useSaveUserInfoApi();

  // const {
  //   mutateAsync: checkPasswordApi,
  //   isLoading: isCheckingPasswordLoading,
  // } = useCheckPasswordApi();

  const {
    mutateAsync: changePasswordApi,
    isLoading: isChangingPasswordLoading,
  } = useChangePasswordApi();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: userInfo?.email,
      subName: userInfo?.subName,
      telNo: userInfo?.telNo,
      phone: userInfo?.phone,
      lastPw: '',
      newPw: '',
    },
  });

  // const checkPassword = async () => {
  //   const lastPw = watch('lastPw');
  //
  //   try {
  //     await checkPasswordApi({ lastPwd: lastPw, pwdCheck: 'Y' });
  //     setChangePWstage(3);
  //   } catch (error) {
  //     let message = '비밀번호가 일치하지 않습니다.';
  //     if (error instanceof AxiosError && error.response) {
  //       message = error.response.data.error.errMsg;
  //     }
  //
  //     dispatch(
  //       openAlert({
  //         text: (
  //           <div style={{ color: '#565660', textAlign: 'center' }}>
  //             {message}
  //           </div>
  //         ),
  //         hasConfirm: false,
  //       }),
  //     );
  //   }
  // };

  const changePassword = async () => {
    const currPw = watch('currPw');
    const newPw = watch('newPw');
    const reNewPw = watch('reNewPw');

    if (newPw.length < 8) {
      setError(
        'newPw',
        { type: 'focus', message: '*비밀번호가 8자 이상이어야 합니다.' },
        { shouldFocus: true },
      );
      return;
    }
    clearErrors('newPw');

    if (newPw !== reNewPw) {
      setError(
        'reNewPw',
        { type: 'focus', message: '*비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return;
    }
    clearErrors('reNewPw');

    try {
      await changePasswordApi({
        lastPwd: currPw,
        chngPwd: newPw,
        pwdCheck: 'N',
      });
      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              비밀번호가 변경되었습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => dispatch(closeModal()),
        }),
      );
    } catch (error) {
      let message = '비밀번호를 변경하지 못했습니다.';
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

  const save = async (data: FormData, e: any) => {
    if (e.key === 'Enter') e.preventDefault();

    try {
      await saveUserInfoApi({
        email: data.email,
        subName: data.subName,
        telNo: data.telNo,
        phone: data.phone,
        pwdCheck: 'N',
      });

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              저장에 성공하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => dispatch(closeModal()),
        }),
      );
    } catch (error) {
      let message = '저장에 실패했습니다.';
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

  const selectImageFile = (e: any) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(file);
    } else {
      console.log('no file');
    }
  };

  const renderImage = () => {
    if (selectedImage === null) return;

    console.log(selectedImage);
    const objectUrl = URL.createObjectURL(selectedImage);
    return (
      <img
        src={objectUrl}
        width={160}
        height={160}
        alt="selectprofile"
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />
    );
  };

  const resetForm = useCallback(() => {
    reset(userInfo); // asynchronously reset your form values
  }, [reset, userInfo]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <Container>
      <h1>개인 정보</h1>
      <form
        onSubmit={handleSubmit(save)}
        onKeyDown={(e: any) => {
          e.key === 'Enter' && e.preventDefault();
        }}
      >
        <Personal>
          {selectedImage ? (
            <label htmlFor="file">
              <ImageBox
                onChange={selectImageFile}
                type="file"
                id="file"
                accept="image/*"
              ></ImageBox>
              <Item
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                }}
              >
                {renderImage()}
              </Item>
            </label>
          ) : (
            <Item>
              <ImageContainer style={{ position: 'relative' }}>
                <label htmlFor="file">
                  <Icon
                    iconName="user"
                    width={110}
                    height={110}
                    className="usericon"
                    style={{}}
                  />
                  <div className="editicon">
                    <Icon iconName="pencil" />
                  </div>
                </label>
                <ImageBox
                  onChange={selectImageFile}
                  type="file"
                  id="file"
                  accept="image/*"
                ></ImageBox>
              </ImageContainer>
            </Item>
          )}

          <Table>
            <tbody>
              <tr>
                <td className="label">이름 계정</td>
                <td>
                  {userInfo?.membName} ({userInfo?.email})
                </td>
                <td className="label" style={{ color: 'red' }}>
                  메일
                </td>
                <td>
                  <InputStyle {...register('email')} />
                </td>
              </tr>
              <tr>
                <td className="label">서브네임</td>
                <td>
                  <InputStyle
                    {...register('subName')}
                    style={{ width: '90%' }}
                  />
                </td>
                <td className="label">사내전화</td>
                <td>
                  <InputStyle {...register('telNo')} />
                </td>
              </tr>
              <tr>
                <td className="label">부서</td>
                <td>{userInfo?.deptName}</td>
                <td className="label" style={{ color: 'red' }}>
                  휴대전화
                </td>
                <td>
                  <InputStyle {...register('phone')} />
                </td>
              </tr>
              <tr>
                <td className="label" style={{ height: 54, paddingTop: 16 }}>
                  직책
                </td>
                <td>{userInfo?.posName}</td>
              </tr>
            </tbody>
          </Table>
        </Personal>
        <Privacy>
          <SubTitle>
            보안 설정 변경
            {/* <span style={{ marginLeft: 7, fontSize: 14 }}>
              (최소 8자 이상, 최대 15자 이하의 소문자 하나, 대문자 하나, 숫자
              조합의 비밀번호를 사용하세요.)
            </span> */}
          </SubTitle>
          <PrivacyBox>
            <Table>
              <tbody>
                {changePWstage === 1 ? (
                  <tr>
                    <td className="label" style={{ width: '12%' }}>
                      비밀번호
                    </td>
                    <td>
                      <Button
                        onClick={() => setChangePWstage(3)}
                        buttonclassName="changepw_button"
                        textclassName="changepw_text"
                      >
                        비밀번호 변경
                      </Button>
                    </td>
                  </tr>
                ) : changePWstage === 2 ? (
                  <tr>
                    <td className="label">
                      <div>비밀번호</div>
                    </td>
                    <td style={{ width: '87%' }}>
                      {/* <div style={{ fontWeight: 'bold' }}>비밀번호 재확인</div>
                      <div
                        style={{
                          marginTop: 10,
                          fontSize: '1.2rem',
                          color: colors.font.gray01,
                        }}
                      >
                        계정 정보 보호를 위해 비밀번호를 다시 입력해주세요.
                      </div>
                      <InputStyle
                        {...register('lastPw')}
                        style={{ marginTop: 10, width: '41%' }}
                        type="password"
                        onKeyDown={async (e: any) => {
                          if (e.key === 'Enter') {
                            await checkPassword();
                          }
                        }}
                      />
                      <Button
                        onClick={checkPassword}
                        outterStyles={{
                          background: colors.bg.gray01,
                          border: 'none',
                          marginLeft: 5,
                        }}
                        textStyles={{ color: colors.font.gray04 }}
                        isDisabled={isCheckingPasswordLoading}
                      >
                        확인
                      </Button> */}
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td className="label">
                        <div>비밀번호(현재)</div>
                      </td>
                      <td style={{ width: '70%' }}>
                        <InputStyle
                          {...register('currPw')}
                          style={{ width: '41%' }}
                          type="password"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">
                        <div>신규 비밀번호</div>
                      </td>
                      <td style={{ width: '79%' }}>
                        <InputStyle
                          {...register('newPw')}
                          style={{
                            width: '41%',
                            border: errors.newPw && '1px solid #F6564A',
                          }}
                          type="password"
                        />
                        {errors.newPw && (
                          <p
                            style={{
                              color: '#F6564A',
                              fontSize: '1.2rem',
                              marginTop: 6,
                            }}
                          >
                            {errors.newPw.message}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">
                        <div style={{ width: 170 }}>
                          신규 비밀번호
                          <span style={{ color: 'red' }}> (확인)</span>
                        </div>
                      </td>
                      <td style={{ width: '79%' }}>
                        <InputStyle
                          {...register('reNewPw')}
                          style={{
                            width: '41%',
                            border: errors.reNewPw && '1px solid #F6564A',
                          }}
                          type="password"
                          onKeyDown={async (e: any) => {
                            if (e.key === 'Enter') {
                              await changePassword();
                            }
                          }}
                        />

                        <Button
                          onClick={changePassword}
                          buttonclassName="confirm_changepw_button"
                          textclassName="confirm_changepw_text"
                          isDisabled={isChangingPasswordLoading}
                        >
                          확인
                        </Button>
                        {errors.reNewPw && (
                          <p
                            style={{
                              color: '#F6564A',
                              fontSize: 12,
                              marginTop: 6,
                            }}
                          >
                            {errors.reNewPw.message}
                          </p>
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </PrivacyBox>
        </Privacy>
        <ButtonContainer changePWstage={changePWstage}>
          <Button
            onClick={() => dispatch(closeModal())}
            buttonclassName="cancel_button"
            textclassName="cancel_text"
          >
            취소
          </Button>
          <ButtonSubmit
            buttonClassName="save_button"
            textClassName="save_text"
            submit={true}
            isDisabled={isSavingUserInfo}
          >
            저장
          </ButtonSubmit>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default PersonalInfo;

const Container = styled.div`
  width: 1255px;
  min-height: 922px;
  background: ${colors.bg.white};
  padding: 10px 30px;

  h1 {
    font-size: 32px;
    font-weight: 700;
  }

  @media screen and (max-width: 1536px) {
    width: 1036px;
    padding: 10px;
    min-height: 700px;

    h1 {
      font-size: 28px;
      margin-top: -30px;
    }
  }

  @media screen and (max-width: 1280px) {
    width: 723px;
    padding: 10px 30px;
    min-height: 700px;

    h1 {
      font-size: 28px;
      margin-top: -30px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 710px;

    h1 {
      font-size: 26px;
    }
  }
`;

const Personal = styled.div`
  width: 100%;
  border: 1px solid ${colors.border.dark};
  border-radius: 16px;
  margin-top: 24px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1280px) {
    padding-bottom: 10px;
  }
`;

const Item = styled.div`
  width: 160px;
  height: 160px;
  margin-top: 32px;
  position: relative;

  @media screen and (max-width: 1280px) {
    margin-top: 22px;
  }
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  padding: 10px 18px;
  cursor: pointer;

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  .usericon {
    margin-left: 8px;
    margin-top: 8px;
    position: absolute;
    top: 10px;
    left: 18px;
  }

  label {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: #d9d9d9;
    padding: 10px 18px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;

    .editicon {
      position: absolute;
      bottom: 10px;
      right: 5px;
      z-index: 2;
    }
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
    label {
      width: 150px;
      height: 150px;
    }

    .usericon {
      top: 15px;
      left: 16px;
      svg {
        width: 100px;
        height: 100px;
      }
    }
  }
`;

const ImageBox = styled.input`
  width: 160px;
  height: 160px;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
`;

const Table = styled.table`
  width: 90%;
  margin-top: 42px;

  td {
    padding: 8px;
    color: ${colors.font.dark};
    flex: 1;
    font-size: 20px;
    border: none;
  }
  .label {
    min-width: 70px;
    font-weight: bold;
    font-size: 20px;
    color: ${colors.font.gray04};
  }

  input {
    color: #adadad;
  }

  @media screen and (max-width: 1536px) {
    width: 95%;
    td {
      font-size: 18px;

      .changepw_text {
        font-size: 18px;
      }

      .confirm_changepw_text {
        font-size: 18px;
      }
    }

    .label {
      font-size: 18px;
    }

    input {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 1280px) {
    width: 95%;
    td {
      font-size: 16px;
    }

    .label {
      font-size: 16px;
    }

    input {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 95%;
    td {
      font-size: 14px;
    }

    .label {
      font-size: 14px;
    }

    input {
      font-size: 14px;
    }
  }
`;

const Privacy = styled.div`
  width: 100%;
`;

const SubTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-top: 24px;

  @media screen and (max-width: 1536px) {
    font-size: 28px;
    margin-top: 32px;
  }

  @media screen and (max-width: 1280px) {
    font-size: 28px;
    margin-top: 32px;
  }

  @media screen and (max-width: 768px) {
    font-size: 26px;
    margin-top: 32px;
  }
`;

const PrivacyBox = styled(Personal)`
  table {
    margin-top: 32px;
    margin-bottom: 12px;
  }

  .confirm_changepw_button {
    background: ${colors.bg.gray01};
    border: none;
    margin-left: 10px;
    height: 52px;
    padding: 0 60px;
  }

  .confirm_changepw_text {
    color: ${colors.font.gray04};
    font-size: 20px;
  }

  .changepw_button {
    background: ${colors.bg.gray01};
    border: none;
    height: 56px;
    padding: 0 30px;
  }

  .changepw_text {
    color: ${colors.font.gray04};
    font-size: 20px;
  }

  @media screen and (max-width: 1536px) {
  }

  @media screen and (max-width: 1280px) {
    padding: 20px 0px;
    table {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    td {
      padding: 15px 10px 15px;
    }

    .changepw_button {
      height: 36px;
      padding: 6px 40px;
      border-radius: 16px;
    }

    .changepw_text {
      font-size: 16px;
    }

    .confirm_changepw_button {
      margin-left: 59px;
      height: 40px;
      width: 124px;
      border-radius: 16px;
      padding: 0px;
    }

    .confirm_changepw_text {
      font-size: 18px;
    }
  }
`;

const ButtonContainer = styled.div<{ changePWstage: number }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  .cancel_button {
    background: ${colors.bg.white};
    width: 240px;
    height: 52px;
  }

  .cancel_text {
    color: ${colors.font.basic};
    font-size: 20px;
  }

  .save_button {
    width: 240px;
    margin-left: 10px;
  }

  .save_text {
    color: ${colors.font.basic};
    font-size: 20px;
  }

  @media screen and (max-width: 1536px) {
    margin-top: 66px;

    .cancel_button {
      width: 242px;
      height: 65px;
    }

    .save_button {
      width: 242px;
      height: 65px;
    }
  }

  @media screen and (max-width: 1280px) {
    margin-top: ${(props) => (props.changePWstage === 3 ? '66px' : '128px')};

    .cancel_button {
      width: 242px;
      height: 65px;
    }

    .save_button {
      width: 242px;
      height: 65px;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: ${(props) => (props.changePWstage === 3 ? '66px' : '128px')};

    .cancel_button {
      width: 242px;
      height: 60px;
    }

    .save_button {
      width: 242px;
      height: 60px;
    }

    .cancel_text {
      font-size: 18px;
    }

    .save_text {
      font-size: 18px;
    }
  }
`;
