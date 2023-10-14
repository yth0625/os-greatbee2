import { useEffect, useRef, useState } from 'react';

import NewWindow from 'react-new-window';
import { useReactToPrint } from 'react-to-print';

import 'styles/print.css';
import { numberFormat } from './utils/formatting/numberFormat';
import { getKoreanNumber } from 'utils/utils';
import Button from 'common/Button/Button';
import colors from 'styles/colors';

export type InvoiceData = {
  productName: string;
  count: number;
  unitPrice: number;
  supplyValue: number;
  taxAmount: number;
}

interface IProps {
  title: string;
  purchaser: string;
  purchaseDate: string;
  data: InvoiceData[];
  setIsShowPrintView: (val: boolean) => void;
}

const PrintInvoice = ({
  title,
  purchaser,
  purchaseDate,
  data,
  setIsShowPrintView,
}: IProps) => {
  const printRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSupplyValue, setTotalSupplyValue] = useState<number>(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState<number>(0);

  const onClickPrintBtn = useReactToPrint({
    content: () => printRef.current,
    documentTitle: title,
  });

  const onPrint = () => {
    onClickPrintBtn();
    setTimeout(() => setIsShowPrintView(false), 200);
  };


  useEffect(() => {
    let supplyValueSum = 0
    let taxAmountSum = 0

    for (const item of data) {
      supplyValueSum += item.supplyValue
      taxAmountSum += item.taxAmount
    }

    setTotalSupplyValue(supplyValueSum)
    setTotalTaxAmount(taxAmountSum)
    setTotalPrice(supplyValueSum + taxAmountSum)

  }, [data])

  return (
    <NewWindow
      features={{ width: 1000, height: 1414 }}
      name={title}
      title={title}
      onUnload={() => setIsShowPrintView(false)}
    >
      <div
        style={{
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // overflow: 'hidden',
        }}
      >
        <section ref={printRef} className="printArea" id="print_area">
          <img
            src={`${window.location.origin}/images/invoice_stamp.png`}
            width={100}
            height={100}
            alt="stamp"
            style={{ position: 'absolute', top: 150, left: 791 }}
          />
          <div className="title">{title}</div>
          <div className="table_container">
            <div className="table_info">
              <div className="table_info_date">
                <div>일자: {purchaseDate}</div>
                <div style={{ paddingTop: 30 }}>{purchaser} 귀하</div>
              </div>
              <div className="table_info_text">
                공<br />급<br />자
              </div>
            </div>
            <table className="info_table" style={{ width: 600 }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'center' }}>등록번호</td>
                  <td colSpan={3}>771-87-02678</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>상호(법인명)</td>
                  <td>(주)그레이트비</td>
                  <td style={{ minWidth: 125, textAlign: 'center' }}>성명</td>
                  <td>김태경</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center', minWidth: 125 }}>
                    등록번호
                  </td>
                  <td colSpan={3}>
                    서울시 마포구 양화로8길 17-27, 2층(서교동, 미르빌딩)
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>업태</td>
                  <td>도매 및 소매업</td>
                  <td style={{ minWidth: 125, textAlign: 'center' }}>업종</td>
                  <td>전자상거래 소매업</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>전화번호</td>
                  <td>02-6953-6848</td>
                  <td style={{ minWidth: 125, textAlign: 'center' }}>팩스</td>
                  <td>02-6971-8848</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="print_total_price">
            <div className="total_price_label">
              합계금액
              <br />
              (공급가액+세액)
            </div>
            <div className="total_price_text">
              {getKoreanNumber(totalPrice)}
              <div style={{ fontWeight: 300, display: 'inline' }}>
                {' '}
                원정 (₩ {numberFormat(totalPrice)})
              </div>
            </div>
          </div>
          <table className="invoce_content">
            <thead>
              <tr>
                <th style={{ width: 50 }}>no</th>
                <th style={{ width: 280 }}>품명</th>
                <th style={{ width: 80 }}>규격</th>
                <th style={{ width: 80 }}>수량</th>
                <th style={{ width: 140 }}>단가</th>
                <th style={{ width: 100 }}>공급가액</th>
                <th style={{ width: 100 }}>세액</th>
                <th style={{ width: 80 }}>비고</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  <td>{item.productName}</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>
                    {numberFormat(item.count)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {numberFormat(item.unitPrice)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {numberFormat(item.supplyValue)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {numberFormat(item.taxAmount)}
                  </td>
                  <td style={{ textAlign: 'center' }}></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  소계
                </td>
                <td style={{ textAlign: 'right' }}>
                  {numberFormat(totalSupplyValue)}
                </td>
                <td style={{ textAlign: 'right' }}>{numberFormat(totalTaxAmount)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 20,
            gap: 12,
          }}
        >
          <Button
            outterStyles={{
              background: 'white',
              width: 125,
              height: 40,
              border: `2px solid ${colors.primary.basic}`,
            }}
            textStyles={{ color: colors.font.basic }}
            onClick={onPrint}
          >
            출력
          </Button>
          <Button
            outterStyles={{
              width: 125,
              height: 40,
            }}
            textStyles={{ color: colors.font.basic }}
            onClick={() => setIsShowPrintView(false)}
          >
            확인
          </Button>
          {/* <div
            style={{
              border: '1px solid #ddd',
              padding: '8px 16px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={onPrint}
          >
            <Icon iconName="print" width={20} height={20} />
            <div style={{ marginLeft: 8 }}>프린트하기</div>
          </div> */}
        </div>
      </div>
    </NewWindow>
  );
};

export default PrintInvoice;
