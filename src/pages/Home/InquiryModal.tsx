import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'styles/Icon';
import colors from 'styles/colors';
import ButtonSubmit from '../../common/Button/ButtonSubmit';
import { useRegisterInquiryApi } from '../../api/useMainApi';
import { closeModal, openAlert } from '../../redux/popUpReducer';
import { convertPhone } from '../../utils/utils';
import SelectBasic, { Value } from 'common/Select/SelectBasic';

const selectOptions = [
  { label: '플랫폼 서비스', value: 1 },
  { label: '구입 / 결제', value: 2 },
  { label: '계정 / 로그인', value: 3 },
  { label: '버그 / 장애', value: 4 },
  { label: '제안하기', value: 5 },
  { label: '기타', value: 6 },
];

type FormData = {
  email: string;
  phone: string;
  category: Value;
  subject: string;
  content: string;
};

const InquiryModal = () => {
  const dispatch = useDispatch();

  const [filename, setFilename] = useState('');

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      email: '',
      phone: '',
      category: { label: '카테고리 선택', value: 0 },
      subject: '',
      content: '',
    },
  });

  const { isLoading, mutateAsync } = useRegisterInquiryApi();

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFilename(e.target.files[0].name);
    }
  };

  const submit = async (data: FormData) => {
    try {
      await mutateAsync({
        email: data.email,
        hpNo: data.phone,
        reqType: data.category.label,
        subject: data.subject,
        content: data.content,
      });

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              문의 내용을 제출하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => dispatch(closeModal()),
        }),
      );
    } catch (error) {
      let message = '문의 내용 제출에 실패했습니다. 운영자에게 문의해주세요';
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

  return (
    <Container>
      <div className="inquiry_title">문의하기 (고객센터)</div>
      <Header>
        <span>*</span> 필수 입력 사항
        <Divider />
      </Header>
      <form onSubmit={handleSubmit(submit)}>
        <Email>
          <Subtitle>
            이메일 주소 <span> *</span>
          </Subtitle>
          <input {...register('email')} type="text" />
        </Email>
        <Contact>
          <Subtitle>
            휴대폰 번호 <span> *</span>
          </Subtitle>
          <input
            {...register('phone')}
            type="text"
            maxLength={13}
            onChange={(e: any) => {
              e.target.value = convertPhone(e.target.value);
            }}
          />
        </Contact>
        <Category style={{ marginBottom: 13, marginTop: 13 }}>
          <Subtitle>
            문의 분류 <span> *</span>
          </Subtitle>
          <SelectBasic
            outterStyle={{
              width: '100%',
              borderRadius: 8,
              height: 40,
              border: `1px solid ${colors.border.dark}`,
              textAlign: 'left',
            }}
            textStyle={{}}
            iconColor={colors.border.dark}
            options={selectOptions}
            setValue={(val) => setValue('category', val)}
            value={watch('category')}
          />
        </Category>
        <Title>
          <Subtitle>
            문의 제목<span>*</span>
          </Subtitle>
          <input {...register('subject')} type="text" />
        </Title>
        <Detail>
          <Subtitle>
            문의 내용<span>*</span>
          </Subtitle>
          <TextareaBox>
            <textarea
              {...register('content')}
              maxLength={1000}
              rows={9}
              cols={33}
            ></textarea>
            <Subtitle
              style={{
                position: 'absolute',
                bottom: 10,
                right: -35,
                color: colors.font.gray02,
                fontSize: '1.2rem',
              }}
            >
              {watch('content').length} / 1000
            </Subtitle>
          </TextareaBox>
        </Detail>
        {/*<Upload>*/}
        {/*  <Subtitle>파일 첨부</Subtitle>*/}
        {/*  <FileBox>*/}
        {/*    <FileName>{filename ? filename : '파일을 첨부해주세요'}</FileName>*/}
        {/*    <label htmlFor="ex_file">파일첨부</label>*/}
        {/*    <input type="file" id="ex_file" onChange={selectFile} />*/}
        {/*  </FileBox>*/}
        {/*</Upload>*/}
        <ButtonBox>
          <ButtonSubmit
            outterStyles={{
              background: 'var(--primary-color)',
              width: 240,
              marginTop: 10,
              border: 'none',
            }}
            submit={true}
            textStyles={{ color: '#000', fontSize: '1.5rem' }}
            isDisabled={isLoading}
          >
            제출
          </ButtonSubmit>
        </ButtonBox>
      </form>
    </Container>
  );
};

export default InquiryModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  form {
    @media screen and (max-width: 1280px) {
      width: 620px;
      padding: 10px 30px;
    }
  }

  .inquiry_title {
    font-size: 22px;
    font-weight: bold;
    text-align: left;
    width: 100%;
    margin-top: -20px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 1280px) {
    form {
      width: 620px;
      padding: 10px 30px;
    }

    .inquiry_title {
      padding-left: 30px;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  text-align: right;
  color: var(--font-color-sub);
  font-size: 1.5rem;
  margin-bottom: 5px;
  padding-top: 10px;

  span {
    color: #f54336;
  }

  @media screen and (max-width: 1280px) {
    width: 620px;
    padding: 10px 30px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e5e5;
  margin-top: 10px;
`;

const Email = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 13px;

  span {
    color: #f54336;
    margin-left: 3px;
  }

  input {
    width: 500px;
    padding: 5px;
    font-size: 1.5rem;
    border-radius: 8px;
    padding-left: 10px;
    height: 40px;
  }
`;

const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  margin-bottom: 13px;

  span {
    color: #f54336;
    margin-left: 3px;
  }

  input {
    width: 500px;
    padding: 5px;
    font-size: 1.5rem;
    border-radius: 8px;
    padding-left: 10px;
    height: 40px;
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 1.5rem;
`;

const TextareaBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  textarea {
    width: 99.5%;
    border-radius: 8px;
    padding-left: 10px;
    margin-left: -2px;
    font-size: 1.5rem;
    margin-left: 3px;
  }
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  min-width: 110px;
  font-size: 1.5rem;

  span {
    font-size: 1.5rem;
    color: #f54336;
    margin-left: 3px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 13px;

  span {
    font-size: 1.5rem;
    color: #f54336;
    margin-left: 3px;
  }

  input {
    width: 500px;
    padding: 5px;
    font-size: 1.5rem;
    border-radius: 8px;
    padding-left: 10px;
    height: 40px;
  }
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 150px;
  font-size: 1.5rem;
  margin-bottom: 13px;
`;

const Upload = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  margin-bottom: 13px;
`;

const FileBox = styled.div`
  margin: 10px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    display: inline-block;
    line-height: normal;
    cursor: pointer;
    padding: 7px 18px;
    font-size: 1.5rem;
    background: ${colors.border.basic};
    border-radius: 8px;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const FileName = styled.div`
  width: 400px;
  border: 1px solid ${colors.border.dark};
  border-radius: 8px;
  margin-right: 10px;
  padding: 10px;
  color: #859398;
  font-size: 1.5rem;
  height: 37px;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
`;
