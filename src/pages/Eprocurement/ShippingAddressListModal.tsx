import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from 'common/Button/Button';
import Icon from 'styles/Icon';
import { useDispatch } from 'react-redux';
import { openAlert } from 'redux/popUpReducer';
import ChangeAddressModal from './ChangeShippingAddressModal';
import { IShippingAddressListRes } from '../../interfaces/eprocurement';
import { useDeleteShippingAddrInfoApi, useGetShippingAddrInfoApi } from '../../api/useEprocurementApi';
import { AxiosError } from 'axios';


interface IProps {
  selectAddress: (address: IShippingAddressListRes) => void;
  close: () => void;
  refetch: () => void;
}

const ShippingAddressListModal = (props: IProps) => {
  const { selectAddress, close, refetch } = props;

  const [isOpenAddAddress, setIsOpenAddAddress] = useState<string>('');
  const [editingAddr, setEditingAddr] = useState<IShippingAddressListRes>();

  const dispatch = useDispatch();
  const { isLoading, mutateAsync } = useDeleteShippingAddrInfoApi();

  const {
    data: shippingAddressList,
    isLoading: isShippingAddrInfoLoading,
    refetch: refetchShippingAddrInfo,
  } = useGetShippingAddrInfoApi();

  const openAlertDeleteAddress = (id: number) => {
    dispatch(
      openAlert({
        text: (
          <div
            style={{
              color: '#565660',
              textAlign: 'center',
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            선택하신 주소를 삭제하시겠습니까?
          </div>
        ),
        hasConfirm: true,
        confirmFn: () => deleteAddress(id),
        onClick: () => console.log(''),
      }),
    );
  };

  const deleteAddress = async (id: number) => {
    try {
      await mutateAsync({
        shippingAddrNo: id,
      });

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              배송지를 삭제하였습니다.
            </div>
          ),
          hasConfirm: false,
          onClick: () => refetchShippingAddrInfo(),
        }),
      );
    } catch (error) {
      let message = '배송지 삭제에 실패했습니다.';
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
    <>
      <Container>
        <h2>배송지 변경</h2>
        <AddAddress onClick={() => setIsOpenAddAddress('add')}>
          <Icon iconName="plus" width={16} height={16} />
          <div style={{ marginLeft: 8 }}>배송지 추가</div>
        </AddAddress>
        <InfoContainer>
          {shippingAddressList &&
            shippingAddressList.map(
              (item: IShippingAddressListRes, i: number) => (
                <div key={i}>
                  <div className="addresses">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Icon iconName="location" />
                        <div style={{ marginLeft: '0.3vw' }}>
                          {item.shippingAddrNm}
                        </div>
                      </div>
                      <div>
                        <Button
                          outterStyles={{
                            background: 'white',
                            borderColor: '#00000020',
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                          }}
                          textStyles={{
                            color: '#000000',
                          }}
                          onClick={() => {
                            setEditingAddr(item);
                            setIsOpenAddAddress('edit');
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          outterStyles={{
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                            marginLeft: 10,
                          }}
                          onClick={() => {
                            selectAddress(item);
                            close();
                          }}
                        >
                          선택
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '0.4vw',
                      }}
                    >
                      <div style={{ fontSize: '1.4rem' }}>
                        {item.recipientNm}
                      </div>
                      <div
                        style={{
                          height: '1.4rem',
                          width: 3,
                          margin: '0px 10px',
                          backgroundColor: '#909090',
                        }}
                      />
                      <div>{item.phoneNo01}</div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}
                    >
                      <div style={{ marginTop: '0.4vw' }}>
                        {item.shippingAddr} {item.shippingAddrDtl}
                      </div>
                      <Button
                        onClick={() =>
                          openAlertDeleteAddress(item.shippingAddrNo)
                        }
                        outterStyles={{
                          background: 'white',
                          border: 'none',
                          padding: 0,
                          paddingRight: 2,
                        }}
                        textStyles={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          color: '#000',
                        }}
                        isDisabled={isLoading}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            )}
        </InfoContainer>
      </Container>
      {isOpenAddAddress !== '' && (
        <ChangeAddressModal
          address={editingAddr}
          type={isOpenAddAddress}
          close={(isSaved: boolean) => {
            if (isSaved) {
              refetch();
            }
            setIsOpenAddAddress('');
          }}
        />
      )}
    </>
  );
};

export default ShippingAddressListModal;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 737px;
  height: 503px;
  max-height: 100vh;
  padding: 1px;
  overflow: scroll;
  padding: 0 48px;

  h2 {
    font-size: 28px;
    font-weight: 700;
  }

  @media screen and (max-width: 1536px) {
    padding: 0 24px;
    width: 678px;
    height: 545px;

    h2 {
      margin-top: 8px;
      font-size: 24px;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 24px;
    width: 650px;
  }
`;

const AddAddress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  padding: 1.2rem;
  margin-top: 3rem;
  cursor: pointer;

  @media screen and (max-width: 1536px) {
    margin-top: 20px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 24px 20px;
  margin-top: 38px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f1f1f180;
  border-radius: 8px;
  border: 1px solid #f1f1f1;
  .no_addresses {
    background-color: white;
    borderradius: 8px;
    border: 1px solid #f1f1f1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.7vw 1.4vw;
    margin: 0px 6vw;
    border-radius: 8px;
  }

  .addresses {
    background-color: white;
    borderradius: 8px;
    border: 1px solid #f1f1f1;
    display: flex;
    flex-direction: column;
    padding: 1vw 1.4vw 1.2vw;
    margin: 0.6rem 0vw;
    border-radius: 8px;
  }
`;
