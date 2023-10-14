import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from 'common/Button/Button';

import colors from 'styles/colors';
import SelectBasic from 'common/Select/SelectBasic';
import { IPaymentProductInfoRes } from '../../../interfaces/eprocurement';
import { numberWithCommas } from '../../../utils/utils';
import { useCancelOrderApi, useUpdatePaymentResultApi } from '../../../api/useEprocurementApi';
import { closeModal, openAlert } from '../../../redux/popUpReducer';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';


interface IOption {
  value: number;
  label: string;
}

interface IProductInfo extends IPaymentProductInfoRes {
  canceledCount: number;
}

interface IProps {
  type: string;
  productInfo: IProductInfo
  shippingAddrNo: string;
  receiptURL: string;
}

interface ITypeMeta {
  title: string;
  buttonName: string;
  successMessage: string;
  failureMessage: string;
}

const reasonOptions = [
  { label: '단순변심', value: 1 },
  { label: '물품파손', value: 2 },
]

const typeInfo: { [key: string]: ITypeMeta } = {
  cancel: {
    title: '주문 취소',
    buttonName: '취소 신청',
    successMessage: '주문 취소 신청이 완료되었습니다.',
    failureMessage: '주문 취소 신청이 실패하였습니다.',
  },
  exchange: {
    title: '교환 요청',
    buttonName: '교환 요청',
    successMessage: '교환 요청이 완료되었습니다.',
    failureMessage: '교환 요청이 실패하였습니다.',
  },
  refund: {
    title: '환불 요청',
    buttonName: '환불 요청',
    successMessage: '환불 요청이 완료되었습니다.',
    failureMessage: '환불 요청이 실패하였습니다.',
  },
};

const CancelOrder = (props: IProps) => {
  const dispatch = useDispatch();
  const { type, productInfo, shippingAddrNo, receiptURL } = props;

  const [countOptions, setCountOptions] = useState<IOption[]>([
    { label: '1', value: 1 },
  ]);
  const [selectedCountOption, setSelectedCountOption] = useState<IOption>({
    label: '1',
    value: 1,
  });
  const [selectedReasonOption, setSelectedReasonOption] = useState<IOption>(
    reasonOptions[0],
  );
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

  console.log('type', type);
  console.log('productInfo', productInfo);

  const sellingAmountUnit =
    productInfo?.sellingAmount / productInfo?.sellingCount;

  const { mutateAsync: cancelOrder, isLoading: isCancelOrderLoading } =
    useCancelOrderApi();
  const {
    mutateAsync: updatePaymentResult,
    isLoading: isUpdatePaymentResultLoading,
  } = useUpdatePaymentResultApi();

  const [filename, setFilename] = useState('');

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('file:', e.target.files);
      setFilename(e.target.files[0].name);
    }
  };

  const clickCancelingOrder = async () => {
    try {
      const cancelOrderPayload = {
        paymentNo: productInfo.paymentNo,
        productNo: productInfo.productNo,
        sellingAmount:
          (sellingAmountUnit * selectedCountOption.value + deliveryCharge) * -1,
        sellingCount: selectedCountOption.value * -1,
        reasonForCancelIdx: selectedReasonOption.value,
        shippingStatusCode: productInfo.shippingStatusCode,
      };
      await cancelOrder(cancelOrderPayload);

      // const updatePaymentResultPayload = {
      //   paymentNo: productInfo.productNo,
      //   amount: `${(sellingAmountUnit * selectedCountOption.value + deliveryCharge) * -1}`,
      //   shippingAddrNo: shippingAddrNo.toString(),
      //   paymentStatus: '1',
      //   paymentCode: 'SUC001',
      //   receiptURL: receiptURL,
      //   itemNm: productInfo.productNm,
      // }
      // await updatePaymentResult(updatePaymentResultPayload);

      dispatch(
        openAlert({
          text: (
            <div style={{ color: '#565660', textAlign: 'center' }}>
              {typeInfo[type].successMessage}
            </div>
          ),
          hasConfirm: false,
          onClick: () => dispatch(closeModal()),
        }),
      );
    } catch (error) {
      let message = typeInfo[type].failureMessage;
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

  // 취소 갯수 option 초기화
  useEffect(() => {
    if (productInfo.sellingCount > 1) {
      const options = [];
      for (
        let i = 1;
        i <= productInfo.sellingCount - productInfo.canceledCount;
        i++
      ) {
        options.push({ label: i.toString(), value: i });
      }
      setCountOptions(options);
    }
  }, [productInfo.canceledCount, productInfo.sellingCount]);

  useEffect(() => {
    // 배송비 계산
    console.log('selectedCountOption', selectedCountOption.value);
    console.log('selectedReasonOption', selectedReasonOption.value);
    setDeliveryCharge(0);
  }, [selectedCountOption, selectedReasonOption]);

  return (
    <ProductInfoContainer>
      <h2>{typeInfo[type].title}</h2>
      <div className="product_info_container">
        <img
          src={productInfo.productImg}
          alt={productInfo.productNm}
          style={{
            width: 240,
            objectFit: 'contain',
            height: 207,
          }}
        />
        <div style={{ width: '75%', marginLeft: 27 }}>
          <div className="product_detail">
            <div className="product_label">상품명</div>
            <div style={{ marginLeft: 16 }} className="product_value">
              {productInfo?.productNm}
            </div>
          </div>
          <div className="product_detail">
            <div className="product_label">판매가격(단가)</div>
            <div className="product_value">
              {numberWithCommas(sellingAmountUnit)}원
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              width: '100%',
            }}
          >
            <div className="product_detail">
              <div className="product_label">구입개수</div>
              <div className="product_value">X{productInfo?.sellingCount}</div>
            </div>
            <div className="product_detail" style={{ textAlign: 'right' }}>
              <div className="product_label">최초 결제 금액</div>
              <div className="product_value">
                {numberWithCommas(productInfo.sellingAmount)}원
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductInfo>
        <div className="cancel-options" style={{}}>
          <div className="option">
            <label>취소 수량</label>
            <SelectBasic
              className="selectbox"
              textStyle={{ marginLeft: -32, paddingTop: 5 }}
              iconColor={colors.font.dark}
              options={countOptions}
              setValue={setSelectedCountOption}
              value={selectedCountOption}
            />
          </div>
          <div className="option">
            <label>취소 사유</label>
            <SelectBasic
              className="selectbox"
              outterStyle={{
                textAlign: 'center',
                height: 40,
              }}
              textStyle={{ marginLeft: -32 }}
              iconColor={colors.font.dark}
              options={reasonOptions}
              setValue={setSelectedReasonOption}
              value={selectedReasonOption}
            />
          </div>
          <div className="option fileupload">
            <label style={{ marginTop: 10 }}>첨부 파일</label>
            <FileBox>
              {filename ? <FileName>{filename}</FileName> : null}
              <label
                htmlFor="ex_file"
                style={{ textAlign: 'center', maxWidth: 96 }}
              >
                {filename ? '변경' : '파일첨부'}
              </label>
              <input type="file" id="ex_file" onChange={selectFile} />
            </FileBox>
          </div>
        </div>
        <div className="cancel_options">
          <div className="product_info">
            <label>취소 금액</label>
            <span>
              {numberWithCommas(sellingAmountUnit * selectedCountOption.value)}
              원
            </span>
          </div>
          <div className="product_info">
            <label>배송비</label>
            <span>{numberWithCommas(deliveryCharge)}원</span>
          </div>
          <div className="product_info">
            <label>최종 환불 금액</label>
            <span>
              {numberWithCommas(
                sellingAmountUnit * selectedCountOption.value + deliveryCharge,
              )}
              원
            </span>
          </div>
          <div className="submit_button">
            <Button
              outterStyles={{ borderRadius: 8, padding: '8px 30px' }}
              textStyles={{
                fontSize: 16,
                fontWeight: 400,
              }}
              onClick={clickCancelingOrder}
              isDisabled={isCancelOrderLoading || isUpdatePaymentResultLoading}
            >
              {typeInfo[type].buttonName}
            </Button>
          </div>
        </div>
      </ProductInfo>
      <div className="responsive_1280">
        <div className="option">
          <label style={{ marginTop: 10 }}>첨부 파일</label>
          <FileBox>
            {filename ? <FileName>{filename}</FileName> : null}
            <label
              htmlFor="ex_file"
              style={{ textAlign: 'center', maxWidth: 96 }}
            >
              {filename ? '변경' : '파일첨부'}
            </label>
            <input type="file" id="ex_file" onChange={selectFile} />
          </FileBox>
        </div>
        <div className="submit_button">
          <Button
            outterStyles={{ borderRadius: 8, padding: '8px 30px' }}
            textStyles={{
              fontSize: 16,
              fontWeight: 400,
            }}
            onClick={clickCancelingOrder}
            isDisabled={isCancelOrderLoading || isUpdatePaymentResultLoading}
          >
            {typeInfo[type].buttonName}
          </Button>
        </div>
      </div>
    </ProductInfoContainer>
  );
};

export default CancelOrder;

const ProductInfoContainer = styled.div`
  padding: 0rem 5rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1rem;
  min-width: 1050px;
  justify-content: space-between;

  h2 {
    font-size: 28px;
    font-weight: 700;
  }

  .product_detail {
    margin-bottom: 22px;
  }

  .product_info_container {
    margin-top: 2rem;
    width; 100%;
    display: flex;
    flex-direction: row;

    .product_label {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.3;
    }

    .product_value {
      margin-top: 6px;
      font-size: 16px;
      line-height: 1.3;
      font-weight: 300;
      font-weight: regular;
    }
  }

  .responsive_1280 {
    display: none;
  }

  @media screen and (max-width: 1440px) {
    padding: 0 3rem 3rem;
  }

  @media screen and (max-width: 1280px) {
    min-width: 678px;

    .product_info_container {
      padding: 0px 10px 0 0 ;
    }

    .responsive_1280 {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px 10px 0 0;
      gap: 20px;

      .option {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        label {
          width: 100px;
        }
      }

      .submit_button {
        display: flex;
        justify-content: center;
      }

    }
  }

  @media screen and (max-width: 768px) {
    min-width: 640px;
    h2 {
      font-size: 22px;
    }

    .responsive_1280 {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px 10px 0 0;
      gap: 20px;

      .option {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        label {
          width: 100px;
        }
      }

      .submit_button {
        display: flex;
        justify-content: center;
      }

    }
  }

  @media screen and (max-width: 600px) {
    padding: 2rem;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  .cancel-options {
    height: 45%;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    .fileupload {
      display: flex;
    }
  }
  label {
    width: 140px;
    color: #1c1c1c;
    font-size: 16px;
    font-weight: 300;
    cursor: default;
  }

  button {
    width: 40%;
  }

  .option {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 70px;

    .selectbox {
      text-align: center;
      height: 40px;
    }

    span {
      padding-top: 12px;
      color: #6d6d6d;
    }
  }

  .cancel_options {
    padding-top: 20px;
    padding-right: 0px;
    width: 43%;
  }

  .product_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 45px;
    margin-left: 11px;
    align-items: center;

    span {
      width: 140px;
      text-align: end;
      font-size: 16px;
      font-weight: 300;
    }
  }

  .cancel-options {
    border-right: 2px solid #00000030;
    height: 55%;
    width: 57%;
  }

  .submit_button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }

  @media screen and (max-width: 1280px) {
    label {
      width: 100px;
    }

    button {
      width: 60%;
    }

    .submit_button {
      display: none;
    }

    .option {
      height: 40px;
      margin-bottom: 12px;
    }

    .cancel-options {
      padding-left: 0px;
      border-right: none;
      .fileupload {
        display: none;
      }
    }

    .cancel_options {
      padding: 10px 10px 0;
      border-left: 2px solid ${colors.border.basic};
    }

    .product_info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      margin-bottom: 12px;
      margin-left: 11px;
      align-items: center;

      span {
        width: 140px;
        text-align: end;
        font-size: 16px;
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .option {
      .selectbox {
        height: 36px;
        border-radius: 8px;

        .select_text {
          padding-top: 9px;
        }

        .select_option {
          font-size: 16px;
          height: 40px;
        }

        svg {
          width: 20px;
          padding-bottom: 5px;
        }
      }
    }
  }
`;

const FileBox = styled.div`
  margin: 10px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    display: inline-block;
    line-height: normal;
    padding: 4px 14px;
    font-size: 16px;
    border: 1px solid ${colors.border.basic};
    border-radius: 20px;
    cursor: pointer;
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
  max-width: 260px;
  border-radius: 8px;
  margin-right: 10px;
  padding: 14px;
  color: #859398;
  font-size: 1.5rem;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
