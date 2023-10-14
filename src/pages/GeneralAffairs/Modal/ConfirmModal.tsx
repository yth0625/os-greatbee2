import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import { Divider, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import { closeModal, openAlert } from 'redux/popUpReducer';

const ModalContentWrapper = styled.div`
  width: 1132px;
  height: 720px;
  @media screen and (max-width: 1536px) {
    width: 680px;
  }

  @media screen and (max-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const PopupButton = styled.button`
  width: 135px;
  height: 48px;
  background-color: #232323;
  justify-content: center;
  align-items: cente;
  color: #fff;
  border-radius: 16px;
  margin-bottom: 71px;
`;

const ModalContent = (props: any) => {
  const { onNext } = props;
  console.log(props);
  const dispatch = useDispatch();
  const [iconsChecked, setIconsChecked] = useState(Array(2).fill(false)); // 체크 상태 배열, 초기값은 모두 false
  const openComplateModal = () => {
    dispatch(closeModal());
    onNext();
  };

  const toggleIconChecked = (index: any) => {
    const newIconsChecked = [...iconsChecked]; // 현재 상태 복사
    console.log(newIconsChecked);
    newIconsChecked[index] = !newIconsChecked[index]; // 선택한 아이콘 상태 토글
    setIconsChecked(newIconsChecked); // 새로운 상태로 업데이트
  };

  const confirmButtonDisabled = !iconsChecked.every((isChecked) => isChecked); // 모든 아이콘이 체크되었는지 확인

  return (
    <ModalContentWrapper>
      <div className="flex flex-col space-y-6 text-[#909090]">
        <div
          className="flex items-center mt-[30px] cursor-pointer w-[250px]"
          onClick={() => {
            console.log(iconsChecked);
            const allChecked = iconsChecked.every((isChecked) => isChecked);
            setIconsChecked(Array(2).fill(!allChecked)); // 전체 아이콘 상태를 토글
          }}
        >
          <Icon
            width={32}
            height={32}
            iconName={
              iconsChecked.every((isChecked) => isChecked)
                ? 'checkone_active'
                : 'checkone'
            } // 전체 아이콘 상태에 따라 아이콘 변경
          />
          <span className="ml-2">전체 약관에 동의합니다.</span>
        </div>
        <Divider />
        <div className="flex flex-col mt-[30px] text-[16px]">
          <div
            className="flex items-center w-[250px] cursor-pointer"
            onClick={() => toggleIconChecked(0)}
          >
            <Icon
              width={24}
              height={24}
              iconName={iconsChecked[0] ? 'checkone_active' : 'checkone'}
            />
            <span className="ml-2">개인정보 제공에 대한 동의</span>
          </div>
          <div className="flex flex-col px-[16px] py-[24px] text-[16px] rounded-[8px] mt-[10px] bg-[#eeebeb] ">
            <span className="leading-8">
              로지아이 택배예약서비스를 이용을 위해 ‘정보통신망 이용촉진 및
              정보보호 등에 관한 법률’ 제24조의2(개인정보의 제공 동의 등)에 따라
              아래와 같은 사항을 알리고 동의를 받아 귀하의 개인정보를 아래
              업체에 제공합니다. 귀하가 '동의' 버튼을 클릭하면 개인정보 제공에
              대해 동의한 것으로 봅니다.
            </span>
            <div className="flex flex-col mt-[20px] leading-8">
              개인정보를 제공받는 자 : CJ대한통운, 롯데택배, 한진택배, 와이엘피
              <br />
              제공하는 개인정보 항목
              <br />
              - 예약자정보: 이름, 전화번호, 휴대폰번호, 결제정보
              <br />
              - 송하인정보: 이름, 전화번호, 휴대폰번호, 배송주소, 배송물품정보
              <br />
              - 수하인정보: 이름, 전화번호, 휴대폰번호, 배송주소
              <br />
              개인정보를 제공받는 자의 이용목적 : 신청물품의 집하 및 배송업무
              <br />
              개인정보의 보유 및 이용기간 : 개인 정보 제공시점으로부터 1년 간
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[30px] text-[16px]">
          <div
            className="flex items-center w-[320px] cursor-pointer"
            onClick={() => toggleIconChecked(1)}
          >
            <Icon
              width={24}
              height={24}
              iconName={iconsChecked[1] ? 'checkone_active' : 'checkone'}
            />
            <span className="ml-2">
              취급제한 물품 포함 확인 및 파손면책 동의
            </span>
          </div>
          <div className="flex flex-col px-[16px] py-[24px] text-[16px] rounded-[8px] mt-[10px] bg-[#eeebeb] ">
            <span className="leading-8">
              취급제한 물품 포함 확인 및 파손면책 동의
              <br />
              접수물품 외 취급제한물품이 포함되어 있지 않으며 포장법에 알맞게
              완충포장이 되어 있어야 합니다. 포장불량이나 취급제한물품 포함 시
              이로 인한 파손면책(택배사 책임 없음 인정)에 동의하셔야 접수 및
              집하 가능합니다.
              <br />
              ※ 동의 전 하단의 취급제한물품안내와 포장법안내를 꼭 확인 바랍니다.
              <br />
              보내실 물품이 접수가능규격초과,포장불량,취급불가 품목인 경우
              집하거부되거나 추가운임이 할증될 수 있습니다.
              <br />
            </span>
            <div className="flex flex-col mt-[48px] leading-8">
              취급제한물품 안내
              <br />
              • 현금화 가능 물품
              <br />
              - 현금,수표,주권,채권,인지등의 유가증권
              <br />
              • 예술품/귀중품
              <br />
              - 귀금속 등 고가의 보석류, 골동품(도자기류 포함) 및 미술품
              <br />
              • 동물 및 식물
              <br />
              - 개, 고양이 등의 동물 및 식물
              <br />
              • 위험물품
              <br />
              - 화약류, 인마, 살상용 총포류, 인화물질
              <br />
              • 불법유통물
              <br />
              - 밀수품, 밀반출 군수품, 부정 임산물, 기타 범칙물품
              <br />
              • 재생 불가능 물품
              <br />
              - 인감도장, 긴급한 각종(무역)서류, 원서, 배송기일내 미도착시
              가치가 소멸되는 것 등<br />
              • 우편법 위배품
              <br />
              - 서신류 등 우편법상 제한물품
              <br />
              • 고액물품
              <br />
              - 가액 50만원 이상의 고액물품
              <br />
              • 택배운송에 적합하지 않은 물품
              <br />
              (1) 중고가전제품
              <br />
              (2) 병, 유리, 거울 제품
              <br />
              (3) 규격내 포장이 되지않는 책상, 의자, 가구, 자전거 등<br />
              (4) 포장이 부적합한 상품(파손위험 및 마대포장 등)
              <br />
              (5) 뚜껑이 열리거나 변형이 쉬운 바케스,말통,원통형 지관통
              <br />
              (6) 비닐봉지, 종이쇼핑백으로 포장되어 내품이 유실되기 쉬운 화물
              <br />
              (7) 부패되기 쉬운 냉장/냉동식품류 및 연질과일류,액체류,액상물질
              <br />
              <br />
              포장법 안내
              <br />
              1) 식품류접수가능 중량/용적을 준수한 박스포장 상태여야 하며,
              유리병 포장은 집하 불가합니다.
              <br />
              2) 농산물/과일류접수가능 중량/용적을 준수한 전용박스포장 상태여야
              하며, 포도,딸기,복숭아,홍시,귤 등 쉽게 물러지는 과일은 집하
              불가합니다.
              <br />
              3) 서류/인쇄물접수가능 중량/용적을 준수한 박스포장이나 서류봉투
              상태여야 하며, 현금,유가증권,신분증이나 편지봉투/비닐포장은 집하
              불가합니다.
              <br />
              4) 의류접수가능 중량/용적을 준수한 박스포장 상태여야 하며,
              내용물이 보이는 비닐/종이쇼핑백,박스포장이 안된 캐리어는 집하
              불가합니다.
              <br />
              5) 한약/건강식품류접수가능 중량/용적을 준수한 전용박스 포장
              상태여야 합니다.
              <br />
              6) 문구/서적류접수가능 중량/용적을 준수한 박스포장 상태여야 하며
              낱권 전집 등 서적의 경우 이동 시 흔들림이 없도록 완충/끈묶음 후
              박스포장 부탁드립니다.
              <br />
              7) 생활용품/잡화접수가능 중량/용적을 준수한 박스포장 상태여야
              하며, 낚시대,골프채,액체류(샴푸,화장품류 등)나 박스포장이 안된
              캐리어는 집하 불가합니다.
              <br />
            </div>
          </div>
          <div>
            <ul className="px-[20px]">
              <li className="list-disc">
                그레이트비는 제휴택배사의 택배서비스를 중계하는 역할을 수행하며,
                택배배송업무의 당사자가 아닙니다. 따라서 집하, 배송업무에 대한
                모든 책임은 해당 택배사에게 있으며 본사는 일체의 책임을 지지
                않습니다.
              </li>
              <li className="list-disc">
                영업소,택배기사의 사정으로 픽업 및 배송이 지연될 수 있으며,
                집하/배송지연 문의는 택배사 고객센터(1588-1255)로 문의해주시기
                바랍니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <PopupButton
            onClick={() => openComplateModal()}
            className={confirmButtonDisabled ? '' : '!bg-[#ffc73c] text-[#fff]'}
            disabled={confirmButtonDisabled}
          >
            확인
          </PopupButton>
        </div>
      </div>
    </ModalContentWrapper>
  );
};

export default ModalContent;
