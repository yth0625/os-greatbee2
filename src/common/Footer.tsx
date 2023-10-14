import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const [isEprocurementPage, setIsEprocurementPage] = useState<boolean>(false);
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.startsWith('/eprocurement')) {
      setIsEprocurementPage(true);
      setIsAdminPage(false);
    } else if (location.pathname.startsWith('/admin')) {
      setIsEprocurementPage(false);
      setIsAdminPage(true);
    } else {
      setIsEprocurementPage(false);
      setIsAdminPage(false);
    }
  }, [location]);

  return (
    <FooterContainer
      isAdminPage={isAdminPage}
      isEprocurementPage={isEprocurementPage}
    >
      <div className="company_info">
        <p className="company_name">주식회사 그레이트비</p>
        <div className="address_info">
          <p>
            서울특별시 마포구 양화로8길 17-28, 2층 (서교동, 미르빌딩) | 대표이사
            김태경
          </p>
          <p className="conpany_address">
            <a
              href={'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=7718702678'}
              target={'_blank'}
              rel="noreferrer"
              style={{ fontWeight: 600 }}
            >
              사업자 정보확인
            </a>{' '}
            | 사업자등록번호 771-87-02678 | 통신판매업신고 2023-서울마포-1210
            <span className="divider">|</span>
            <br className="breakingpoint" />
            대표번호 02-6923-6848 |{' '}
            <a
              href="mailto:biz@greatbee.co.kr"
              style={{ textDecoration: 'underline' }}
            >
              biz@greatbee.co.kr
            </a>
          </p>
        </div>
        {/* <p>
        그레이트비는 모든 거래에 대한 책임과 배송,교환,환불,민원등의 처리는
        그레이트비에서 진행합니다. (민원 담당자 구자항 / 연락처)
        <a href="tel:02-6923-6848">02-6923-6848</a>)
      </p> */}
        <div className="company_terms">
          <p>All rights reserved © GreatBee Corp</p>
          <p className="terms_link">
            <a
              href={
                'https://greatbee.notion.site/f09509ad1fcf4aa2a62a0e5f0bcd233f'
              }
              target={'_blank'}
              rel="noreferrer"
            >
              서비스이용약관
            </a>{' '}
            |{' '}
            <a
              href={
                'https://greatbee.notion.site/1df6f3657c724da6bdf5515250df8b64'
              }
              target={'_blank'}
              rel="noreferrer"
            >
              개인정보처리방침
            </a>
          </p>
        </div>
      </div>
      <div className="footer_certification" style={{}}>
        <a href={'https://www.ftc.go.kr'} target={'_blank'} rel="noreferrer">
          <img
            src="/images/logo/fair.png"
            alt="공정거래위원회 인증"
            className="fair_trade"
          />
        </a>
        <a
          href={'https://www.kca.go.kr/home/main.do'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            src="/images/logo/customer.png"
            alt="한국소비자원 인증"
            className="customer_center"
          />
        </a>
        <img
          src="https://image.inicis.com/mkt/certmark/escrow/escrow_74x74_color.png"
          alt="클릭하시면 이니시스 결제시스템의 유효성을 확인하실 수 있습니다."
          className="inicis"
          onClick={() => {
            window.open(
              'https://mark.inicis.com/mark/escrow_popup_v3.php?mid=MOI1349672',
              'mark',
              'scrollbars=no,resizable=no,width=565,height=683',
            );
          }}
        />
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer<{
  isAdminPage: boolean;
  isEprocurementPage: boolean;
}>`
  margin-top: 0;
  color: #00000090;
  display: flex;
  background-color: #ffffff;
  flex-direction: row;
  align-items: flex-start;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
  padding: 35px 70px 27px 100px;
  border-top: 1px solid #f1f1f1;
  margin-left: ${(props) =>
    props.isAdminPage ? 'var(--sidebar - width)' : '0px'};
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  height: 113px;

  .company_name {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }

  .footer_certification {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  }

  .fair_trade {
    width: 151px;
    height: 40px;
  }

  .customer_center {
    width: 151px;
    height: 40px;
  }

  .inicis {
    right: 78px;
    bottom: 33px;
    border: 0px;
    cursor: pointer;
    height: 51px;
  }

  .divider {
    margin: 0 3px;
  }

  .breakingpoint {
    display: none;
  }

  .company_info {
    display: flex;
    flex-direction: row;

    .address_info {
      margin-left: 20px;
    }

    @media screen and (max-width: 1280px) {
      flex-direction: column;
      margin-top: 0;
      .address_info {
        margin-left: 0px;
      }
    }

    .company_terms {
      margin-left: 40px;
      font-size: 12px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      @media screen and (max-width: 1280px) {
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 0px;
        margin-top: 0px;
        .terms_link {
          margin-left: 12px;
        }
      }
    }
  }

  @media screen and (max-width: 1770px) {
    padding-left: 50px;
    padding-right: 50px;

    .company_info {
      .company_name {
        min-width: 8.5vw;
      }

      .company_terms {
        justify-content: flex-start;
        min-width: 15vw;
        margin-left: 10px;
      }
    }
  }

  @media screen and (max-width: 1536px) {
    height: 111px;
    flex-direction: row;
    padding: 31px 40px;

    .breakingpoint {
      display: block;
    }

    .footer_certification {
      gap: 10px;
    }

    .company_info {
      .company_name {
        min-width: 10vw;
      }
      .company_terms {
        margin-left: 50px;
        justify-content: flex-start;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    height: 142px;
    flex-direction: row;
    padding: 20px 40px;
    div {
      margin-left: 0;
      margin-top: 10px;
    }

    .company_info {
      .company_terms {
        margin-left: 0px;
      }
    }

    .fair_trade {
      width: 130px;
      height: 34px;
    }

    .customer_center {
      width: 130px;
      height: 34px;
    }

    .inicis {
      right: 78px;
      bottom: 33px;
      border: 0px;
      cursor: pointer;
      height: 50px;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: ${(props) =>
      props.isAdminPage || props.isEprocurementPage ? 'row' : 'column'};
    height: ${(props) =>
      props.isAdminPage || props.isEprocurementPage ? '113px' : '213px'};

    padding: ${(props) =>
      props.isAdminPage || props.isEprocurementPage
        ? '13px 23px'
        : '20px 40px'};

    div {
      margin-top: ${(props) =>
        props.isAdminPage || props.isEprocurementPage ? '3px' : '10px'};
    }

    .company_name {
      font-size: 14px;
    }

    .divider {
      display: none;
    }

    .breakingpoint {
      display: block;
    }

    .fair_trade {
      width: 100px;
      height: 24px;
    }

    .customer_center {
      width: 100px;
      height: 24px;
    }

    .inicis {
      right: 78px;
      bottom: 33px;
      border: 0px;
      cursor: pointer;
      height: 50px;
    }

    p,
    a {
      font-size: ${(props) =>
        props.isAdminPage || (props.isEprocurementPage && '10px')};
    }
  }
`;
