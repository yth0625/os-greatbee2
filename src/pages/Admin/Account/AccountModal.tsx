import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'styles/Icon';

import moment from 'moment';
import Button from 'common/Button/Button';
import { useDispatch } from 'react-redux';
import { closeModal, openAlert } from 'redux/popUpReducer';
import colors from 'styles/colors';

type ItemProps = {
  label: string;
  content: string;
};

const AccountModal = ({ item }: any) => {
  const [level, setLevel] = useState<string>('1');
  const dispatch = useDispatch();

  const data = [
    {
      label: '계정',
      content: item.email,
    },
    {
      label: '이름',
      content: item.firstName.name,
    },
    {
      label: '서브 이름',
      content: item.firstName.name,
    },
    {
      label: '소속 / 직책',
      content: '개발1팀 / 사원',
    },
    {
      label: '(계정) 등록일',
      content: moment(new Date()).format('YYYY-MM-DD'),
    },
    {
      label: '입사일',
      content: moment(new Date()).format('YYYY-MM-DD'),
    },
    {
      label: '연락처',
      content: '010-9999-9999',
    },
    {
      label: '레벨',
      content: (
        <>
          <LevelTag>{level}</LevelTag>
          <Select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
          </Select>
        </>
      ),
    },
  ];

  const RenderItem = ({ label, content }: ItemProps) => {
    const noinput =
      label === '계정' ||
      label === '이름' ||
      label === '(계정) 등록일' ||
      label === '입사일' ||
      label === '레벨';
    return noinput ? (
      <Item>
        <Label>{label}</Label>
        <ItemContent>{content}</ItemContent>
      </Item>
    ) : (
      <Item>
        <Label>{label}</Label>
        <ItemContentInput value={content} onChange={() => console.log('')} />
      </Item>
    );
  };

  const openDeleteAlert = () => {
    dispatch(
      openAlert({
        text: (
          <div style={{ color: '#565660', textAlign: 'center' }}>
            계정 삭제는 마스터의 승인이 필요합니다.
            <br /> <div style={{ marginTop: 5 }}>삭제 요청하시겠습니까?</div>
          </div>
        ),
        hasConfirm: true,
        confirmFn: () => console.log('confirm'),
        onClick: () => console.log('click'),
      }),
    );
  };

  return (
    <>
      <AccountContainer>
        {item.firstName.img ? (
          <UserImage src={item.firstName.img} />
        ) : (
          <PictureSection>
            <Icon iconName="user" width={120} height={120} />
          </PictureSection>
        )}
        <AccountInfo>
          {data.map((item, i) => (
            <RenderItem key={i} label={item.label} content={item.content} />
          ))}
        </AccountInfo>
      </AccountContainer>
      <ButtonContainer>
        <Button
          onClick={() => openDeleteAlert()}
          outterStyles={{
            background: '#fff',
            borderColor: 'var(--primary-color)',
            width: 140,
          }}
          textStyles={{ color: '#000' }}
        >
          삭제
        </Button>
        <Button
          outterStyles={{
            background: 'var(--primary-color)',
            border: 'none',
            width: 140,
            marginLeft: 10,
          }}
          textStyles={{ color: '#000' }}
        >
          수정
        </Button>
      </ButtonContainer>
    </>
  );
};

export default AccountModal;

const AccountContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const PictureSection = styled.div`
  margin-top: 20px;
  width: 35%;
  height: 210px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 40px 35px;
  border-radius: 16px;
`;

const AccountInfo = styled.div`
  width: 65%;
  margin-left: 30px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${colors.table.border};
  padding: 15px 0px;
`;

const Label = styled.div`
  width: 35%;
  color: ${colors.font.gray04};
  font-weight: 600;
`;

const ItemContent = styled.div`
  width: 65%;
  color: ${colors.font.dark};
  font-weight: 400;
  margin-left: 25px;
  position: relative;
  padding-left: 10px;
`;

const LevelTag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${colors.bg.black};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const ItemContentInput = styled.input`
  width: 65%;
  color: #232323;
  font-weight: 400;
  margin-left: 25px;
  border: 2px solid ${colors.border.dark};
  padding: 5px 10px;
  border-radius: 12px;

  &:focus {
    border: 2px solid ${colors.border.dark};
    border-radius: 4px;
  }
`;

const Select = styled.select`
  position: absolute;
  top: 0;
  width: 20px;
  height: 25px;
  left: 0;
  border: none;
`;

const UserImage = styled.img`
  margin-top: 20px;
  width: 35%;
  height: 210px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  border-radius: 16px;
`;
