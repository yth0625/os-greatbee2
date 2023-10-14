// style
import styled from '@emotion/styled';
import Icon from 'styles/Icon';
import { useDispatch } from 'react-redux';
import { openModal } from 'redux/popUpReducer';
import InquiryModal from 'pages/Home/InquiryModal';

function CustomerMenu() {
  const dispatch = useDispatch();

  const openInquiryModal = () => {
    dispatch(
      openModal({
        modalMessage: {
          title: '',
          content: <InquiryModal />,
        },
        hasConfirm: '아니오',
        confirmFn: () => {},
      }),
    );
  };

  return (
    <CustomerMenuContainer>
      <Box onClick={openInquiryModal}>
        <Icon iconName="customer" />
        <span>고객센터</span>
      </Box>
      <Box style={{ marginTop: 10 }}>
        <a
          href={'https://greatbee.notion.site/adc690f014c045998abfc29e0f98f09c'}
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <Icon iconName="userguide" />
          <span>유저 가이드</span>
        </a>
      </Box>
      <Box style={{ marginTop: 10 }}>
        <a
          href={
            'https://greatbee.notion.site/2899f4988c6f4394bb8a514fad0398f6 '
          }
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <Icon iconName="faq" />
          <span>자주 묻는 질문</span>
        </a>
      </Box>
    </CustomerMenuContainer>
  );
}

export default CustomerMenu;

const CustomerMenuContainer = styled.nav`
  gap: 1.2rem;
  color: var(--font-color-default);
  background-color: #fff;
  transition: var(--transition-default);
  overflow: hidden;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  padding: 2px 0.8rem;
  border-radius: var(--border-radius-small);
  font-weight: var(--font-w-mid);
  transition: var(--transition-faster);
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }
`;
