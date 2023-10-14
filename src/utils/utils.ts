
export const orderOptions = [
  { label: '배송시 요청사항을 선택해주세요.', value: -1 },
  { label: '직접 수령하겠습니다.', value: 0 },
  { label: '배송 전 연락바랍니다.', value: 1 },
  { label: '부재 시 경비실에 맡겨주세요.', value: 2 },
  { label: '부재 시 문 앞에 놓아주세요.', value: 3 },
  { label: '부재 시 택배함에 넣어주세요.', value: 4 },
  { label: '직접입력', value: 5 },
];



export const signOut = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
  window.location.href = '/signIn';
};

export interface IPurchasingCard {
  paymentNo: string;
  totalPrice: number;
  userName: string;
  productName: string;
  email: string;
  phone: string;
  address: string;
  postCode: string;
  callback?: (res: any) => void;
}

export const purchaseUsingCard = (data: IPurchasingCard) => {
  // @ts-ignore
  const IMP = window.IMP; // 생략 가능
  IMP.init('imp02462720'); // 예: imp00000000a

  //test
  const pg = 'html5_inicis.MOI1349672'; //테스트 시 html5_inicis.INIpayTest 기재, INIpayTest 안됨
  // const pg = "html5_inicis.INIBillTst" //테스트 시 html5_inicis.INIBillTst 기재

  IMP.request_pay(
    {
      pg,
      pay_method: 'card',
      merchant_uid: data.paymentNo, //상점에서 생성한 고유 주문번호
      name: data.productName,
      amount: data.totalPrice,
      buyer_email: data.email,
      buyer_name: data.userName,
      buyer_tel: data.phone,
      buyer_addr: data.address,
      buyer_postcode: data.postCode,
      display: {
        card_quota: [3], // 할부개월 3개월까지 활성화
      },
      // escrow : false, //에스크로 결제인 경우 설정
      // vbank_due : 'YYYYMMDD',
      // bypass : {
      //   acceptmethod : "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
      //   P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
      //   acceptmethod: 'cardpoint',  // 카드포인트 사용시 설정(PC)
      //   P_RESERVED : 'cp_yn=Y',     // 카드포인트 사용시 설정(모바일)
      // },
      // period : {
      //   from : "20200101", //YYYYMMDD
      //   to : "20201231"   //YYYYMMDD
      // }
    },
    function (res: any) {
      // callback 로직
      //* ...중략... *//
      data.callback && data.callback(res);
    },
  );
};

export const convertPhone = (phone: string): string => {
  let p = phone.replace(/[^0-9]/g, '');
  p = p.replace(
    /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
    '$1-$2-$3',
  );
  p.replace('--', '-');

  return p;
};

export const numberWithCommas = (x: number) => {
  return x.toLocaleString();
};

export const isEmptyObj = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export function getKoreanNumber(num: number) {
  const koreanNumber = [
    '',
    '일',
    '이',
    '삼',
    '사',
    '오',
    '육',
    '칠',
    '팔',
    '구',
  ];
  const tenUnit = ['', '십', '백', '천'];
  const tenThousandUnit = ['조', '억', '만', ''];
  const unit = 10000;

  let answer = '';

  while (num > 0) {
    const mod = num % unit;
    const modToArray = mod.toString().split('');
    const length = modToArray.length - 1;

    const modToKorean = modToArray.reduce((acc, value, index) => {
      const valueToNumber = +value;
      if (!valueToNumber) return acc;
      const numberToKorean =
        index < length && valueToNumber === 1
          ? ''
          : koreanNumber[valueToNumber];
      return `${acc}${numberToKorean}${tenUnit[length - index]}`;
    }, '');

    answer = `${modToKorean}${tenThousandUnit.pop()}${answer}`;
    num = Math.floor(num / unit);
  }

  return answer;
}

export const debounce = (callback: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
