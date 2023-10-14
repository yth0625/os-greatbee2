// core
import React, { useState } from 'react';
// style
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import ButtonSubmit from '../../common/Button/ButtonSubmit';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/popUpReducer';

type FormData = {
  email: string;
};

interface IProps {
  confirm?: (email: string) => void;
}

const TaxInvoiceModal = ({confirm}: IProps) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);


  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  const submit = async (data: FormData) => {
    setIsLoading(true)
    console.log('data:', data)
    if (data.email.length > 0) {
      confirm && confirm(data.email);
      dispatch(closeModal());
    }

    setIsLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <InputContainer>
              <label>세금계산서 발행 이메일 주소</label>
              <input {...register('email')} type="text" placeholder="example@email.com" />
            </InputContainer>
          </Grid>
          <Grid item>
            <Grid container direction={'row'} justifyContent={'center'} spacing={3}>
              <Grid item>
                <Button
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                  outterStyles={{
                    backgroundColor: 'white',
                    borderColor: 'var(--primary-color)',
                    paddingLeft: 40,
                    paddingRight: 40,
                    minWidth: 120,
                  }}
                  textStyles={{ color: 'black', fontWeight: 400 }}
                >
                  취소
                </Button>
              </Grid>
              <Grid item>
                <ButtonSubmit
                  isDisabled={isLoading}
                  submit={true}
                  outterStyles={{
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    paddingLeft: 40,
                    paddingRight: 40,
                    marginLeft: 10,
                    minWidth: 120,
                  }}
                  textStyles={{ color: 'black', fontWeight: 400 }}
                >
                  확인
                </ButtonSubmit>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default TaxInvoiceModal;

const InputContainer = styled.div`
  label {
    font-size: 16px;
    font-weight: 400;
  }

  input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #adadad;
    margin-top: 14px;
    color: #6d6d6d;
    font-size: 16px;
  }
`

