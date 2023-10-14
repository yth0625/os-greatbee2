import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Button from 'common/Button/Button';
import Icon from 'styles/Icon';
import ButtonSubmit from 'common/Button/ButtonSubmit';
import { IShippingAddressListRes } from '../../interfaces/eprocurement';
import { useForm } from 'react-hook-form';
import { openAlert } from '../../redux/popUpReducer';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import colors from 'styles/colors';

import { useSaveShippingAddrInfoApi } from '../../api/useEprocurementApi';
import { convertPhone } from '../../utils/utils';

type FormData = {
  deliverPostNo: string;
  phoneNo01: string;
  phoneNo02: string;
  recipientNm: string;
  // reqTxt: string;
  shippingAddrNm: string;
  shippingAddr: string;
  shippingAddrDtl: string;
};

interface IProps {
  address?: IShippingAddressListRes;
  type: string;
  close: (isSaved: boolean) => void;
}



const ChangeAddressModal = (props: IProps) => {
  const { address, type, close } = props;

  const dispatch = useDispatch();
  const open = useDaumPostcodePopup();

  // const [selectedOrderOption, setSelectedOrderOption] = useState<any>(
  //   orderOptions[0],
  // );
  // const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const { isLoading, mutateAsync } = useSaveShippingAddrInfoApi();

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      deliverPostNo: '',
      phoneNo01: '',
      phoneNo02: '',
      recipientNm: '',
      // reqTxt: '',
      shippingAddrNm: '',
      shippingAddr: '',
      shippingAddrDtl: '',
    },
  });

  const handleComplete = (data: any) => {
    reset({
      ...watch(),
      deliverPostNo: data.zonecode,
      shippingAddr: data.address,
    });
  };

  const save = async (data: FormData) => {
    // if (selectedOrderOption.value === orderOptions[0].value) {
    //   dispatch(
    //     openAlert({
    //       text: (
    //         <div style={{ color: '#565660', textAlign: 'center' }}>
    //           배송 요청사항을 선택해주세요.
    //         </div>
    //       ),
    //       hasConfirm: false,
    //     }),
    //   );
    //   return;
    // }

    try {
      const phoneNo01 = data.phoneNo01.replaceAll('-', '');

      await mutateAsync({
        deliverPostNo: data.deliverPostNo, //우편번호
        phoneNo01: phoneNo01, //연락처1
        // phoneNo02": "010555588882", //연락처2
        recipientNm: data.recipientNm, //주문인
        reqIdx: 1,
        reqTxt: '배송 전 연락바랍니다.', //메모내용
        shippingAddrNm: data.shippingAddrNm, //수신인
        shippingAddr: data.shippingAddr, //주소
        shippingAddrDtl: data.shippingAddrDtl, //상세주소
      });

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              배송지를 저장하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => close(true),
        }),
      );
    } catch (error) {
      let message = '배송지 저장에 실패했습니다.';
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
    if (address && type === 'edit') {
      // setSelectedOrderOption(orderOptions[address.reqIdx]);
      reset({
        deliverPostNo: address.deliverPostNo,
        phoneNo01: address.phoneNo01,
        phoneNo02: address.phoneNo02,
        recipientNm: address.recipientNm,
        // reqTxt: address.reqTxt,
        shippingAddr: address.shippingAddr,
        shippingAddrDtl: address.shippingAddrDtl,
        shippingAddrNm: address.shippingAddrNm,
      });
    }
  }, [address, reset, type]);

  // useEffect(() => {
  //   if (selectedOrderOption.value === 5) {
  //     setIsShowInput(true);
  //   } else {
  //     setIsShowInput(false);
  //   }
  // }, [selectedOrderOption]);

  return (
    <Container>
      <AddAddressContainer type={type}>
        <form onSubmit={handleSubmit(save)}>
          <div className="form_container_header">
            {(type === 'add' || type === 'modal') && <h3>배송지 추가</h3>}
            {type === 'edit' && <h3>배송지 수정하기</h3>}
            <Icon
              iconName="close"
              onPress={() => close(false)}
              style={{ position: 'absolute', top: 22, right: 24 }}
              width={26}
              height={26}
            />
          </div>
          <FormContent>
            <ItemContainer>
              <span>배송지명</span>
              <InputContainer>
                <div>배송지명 (변경가능해요)</div>
                <input
                  {...register('shippingAddrNm')}
                  placeholder="배송지명을 입력해주세요."
                />
              </InputContainer>
            </ItemContainer>

            <ItemContainer>
              <span>받는 사람</span>
              <InputContainer>
                <div>이름</div>
                <input
                  {...register('recipientNm')}
                  placeholder="이름을 입력해주세요."
                />
              </InputContainer>
            </ItemContainer>

            <ItemContainer>
              <span>연락처 (필수)</span>
              <InputContainer>
                <div>연락처</div>
                <input
                  {...register('phoneNo01')}
                  placeholder="연락처를 입력해주세요."
                  maxLength={13}
                  onChange={(e: any) => {
                    e.target.value = convertPhone(e.target.value);
                  }}
                />
              </InputContainer>
            </ItemContainer>

            {/* 230711 TODO api 추가 필요 */}
            <ItemContainer>
              <span>연락처 (선택)</span>
              <InputContainer>
                <div>연락처</div>
                <input
                  {...register('phoneNo02')}
                  placeholder="연락처를 입력해주세요."
                  maxLength={13}
                  onChange={(e: any) => {
                    e.target.value = convertPhone(e.target.value);
                  }}
                />
              </InputContainer>
            </ItemContainer>

            <ItemContainer>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>주소</span>
                <Button
                  buttonclassName="search_address_button"
                  textclassName="search_address_text"
                  onClick={() => {
                    open({ onComplete: handleComplete });
                  }}
                >
                  {type === 'edit' ? '주소 변경' : '주소 검색'}
                </Button>
              </div>
              <AddressContainer
                style={{ color: colors.font.gray02, fontSize: 16 }}
              >
                {watch('shippingAddr')
                  ? watch('shippingAddr')
                  : '주소를 검색해주세요.'}
              </AddressContainer>
              <InputContainer style={{ marginTop: 10 }}>
                <div>상세 주소</div>
                <AddressInput
                  {...register('shippingAddrDtl')}
                  style={{ background: 'white' }}
                  placeholder="상세주소를 입력해주세요."
                />
              </InputContainer>
            </ItemContainer>
            {/* <ItemContainer>
              <span>배송 요청사항</span>
              <SelectBasic
                type={'button'}
                iconColor="#adadad"
                outterStyle={{
                  width: '100%',
                  borderColor: '#adadad',
                  borderRadius: '8px',
                }}
                options={orderOptions}
                value={selectedOrderOption}
                setValue={(val) => {
                  setSelectedOrderOption(val);
                }}
              />
            </ItemContainer>
            {isShowInput && (
              <InputContainer style={{ marginTop: 10 }}>
                <div>배송 요청사항을 입력해주세요.</div>
                <textarea {...register('reqTxt')} />
              </InputContainer>
            )} */}
          </FormContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 60,
            }}
          >
            <Button
              outterStyles={{
                width: '192px',
                background: 'white',
                padding: '1.5rem 3rem',
                border: '2px solid #e5e5e5',
              }}
              textStyles={{ color: '#000' }}
              onClick={() => close(false)}
            >
              취소
            </Button>
            <ButtonSubmit
              submit={true}
              isDisabled={isLoading}
              outterStyles={{ width: '192px', marginLeft: '1vw' }}
              textStyles={{ color: '#000' }}
            >
              저장
            </ButtonSubmit>
          </div>
        </form>
      </AddAddressContainer>
    </Container>
  );
};

export default ChangeAddressModal;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const AddAddressContainer = styled.div<{ type: string }>`
  width: 737px;
  position: ${(props) => (props.type === 'modal' ? 'relative' : 'absolute')};
  background-color: white;
  border-radius: 16px;

  form {
    margin-bottom: 20px;

    .form_container_header {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: flex-start;
      height: 80px;
      border-top-left-radius: 16px;
      border-top-tight-radius: 16px;
      padding-left: 65px;
      padding-top: 10px;
    }
  }

  h3 {
    padding: 28px 10px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
  }

  @media screen and (max-width: 1536px) {
    width: 678px;
    height: 758px;
    form {
      .form_container_header {
        padding-left: 32px;
      }
    }

    h3 {
      font-size: 24px;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 8px;
  }

  .search_address_button {
    background: #e5e5e5;
    border: 2px solid #fff;
    border-radius: 8px;
  }

  .search_address_text {
    color: #222;
  }
`;

const InputContainer = styled.div`
  border: 1px solid #adadad;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 24px;

  div {
    font-size: 1.2rem;
    font-weight: 400;
    color: #00000060;
    padding: 2px 0 5px;
  }

  input {
    border: none;
    color: #6d6d6d;
    width: 100%;
    font-size: 16px;

    &::placeholder {
      opacity: 0;
    }
  }

  textarea {
    border: none;
    width: 100%;
    border-radius: 0;
    padding: 0;
    margin-top: 5px;
    height: 5rem;
    color: #6d6d6d;
  }

  @media screen and (max-width: 1536px) {
    height: 48px;
    padding: 12px 16px;
    border: 1px solid #e5e5e5;
    div {
      display: none;
    }

    input {
      &::placeholder {
        opacity: 1;
        color: ${colors.font.gray01};
      }
    }
  }
`;

const AddressContainer = styled.div`
  border: 1px solid #adadad;
  padding: 1.8rem 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  background: #eeeeee;

  @media screen and (max-width: 1536px) {
    height: 48px;
    padding: 15px 16px;
    background: white;
    border: 1px solid #e5e5e5;
  }
`;

const AddressInput = styled.input`
  border: 1px solid #adadad;
  border-radius: 8px;
  background: #eeeeee;
`;

const FormContent = styled.div`
  padding: 20px 76px;

  @media screen and (max-width: 1536px) {
    padding: 20px 44px;
  }
`;
