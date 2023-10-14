import React from 'react';
import styled from '@emotion/styled';
import AccountIcon from 'assets/svgs/account';
import AdminIcon from 'assets/svgs/admin';
import AffairIcon from 'assets/svgs/affair';
import AlarmIcon from 'assets/svgs/alarm';
import ArrowDownIcon from 'assets/svgs/arrow_down';
import ArrowLeftIcon from 'assets/svgs/arrow_left';
import ArrowRightIcon from 'assets/svgs/arrow_right';
import ArrowUpIcon from 'assets/svgs/arrow_up';
import Cart from 'assets/svgs/cart';
import CategoryOfficeIcon from 'assets/svgs/category_office';
import CategoryIcon from 'assets/svgs/category';
import CloseIcon from 'assets/svgs/close';
import ContactIcon from 'assets/svgs/contract';
import HeartIcon from 'assets/svgs/heart';
import HomeIcon from 'assets/svgs/home';
import LogoTextIcon from 'assets/svgs/logo_text';
import LogoTextIcon2 from 'assets/svgs/logo_text2';
import LogoIcon from 'assets/svgs/logo';
import LogoutIcon from 'assets/svgs/logout';
import MenuIcon from 'assets/svgs/menu';
import PlusIcon from 'assets/svgs/plus';
import ProposalIcon from 'assets/svgs/proposal';
import QnaIcon from 'assets/svgs/qna';
import RecommendIcon from 'assets/svgs/recommend';
import SearchIcon from 'assets/svgs/search';
import SettingIcon from 'assets/svgs/setting';
import ShoppingIcon from 'assets/svgs/shopping_bag';
import StarIcon from 'assets/svgs/star';
import ThumbsUpIcon from 'assets/svgs/thumbs_up';
import WalletIcon from 'assets/svgs/wallet';
import WealthIcon from 'assets/svgs/wealth';
import WorkFlowIcon from 'assets/svgs/workflow';
import FloatingMenuIcon from 'assets/svgs/floatingmenu';
import MoreIcon from 'assets/svgs/more';
import WorkflowItemIcon from 'assets/svgs/WorkflowItem';
import StampIcon from 'assets/svgs/Stamp';
import SuitCaseIcon from 'assets/svgs/Suitcase';
import AssetIcon from 'assets/svgs/Asset';
import ServiceCenterIcon from 'assets/svgs/ServiceCenter';
import InfoIcon from 'assets/svgs/Info';
import AuthorizationIcon from 'assets/svgs/Authorization';
import OrganizationIcon from 'assets/svgs/organization';
import ManageAssetsIcon from 'assets/svgs/manageAsset';
import UsecaseIcon from 'assets/svgs/usecase';
import CloudIcon from 'assets/svgs/cloud';
import CartFillIcon from 'assets/svgs/cartfill';
import PencilIcon from 'assets/svgs/pencil';
import UserIcon from 'assets/svgs/user';
import WaffleTextIcon from 'assets/svgs/waffle';
import LoginSubTextIcon from 'assets/svgs/loginsubtext';
import OpenEyeIcon from 'assets/svgs/eye_open';
import CloseEyeIcon from 'assets/svgs/eye_close';
import FilterIcon from 'assets/svgs/filtericon';
import CheckedIcon from 'assets/svgs/checked';
import BlankIcon from 'assets/svgs/blank';
import MinusIcon from 'assets/svgs/Minus';
import SampleQRIcon from 'assets/svgs/sampleqr';
import HeartFillIcon from 'assets/svgs/heart_fill';
import HeartFill2Icon from 'assets/svgs/heart_fill2';
import CGHomeIcon from 'assets/svgs/category/home';
import CGTechIcon from 'assets/svgs/category/tech';
import CGElectronicIcon from 'assets/svgs/category/electronic';
import CGSafeIcon from 'assets/svgs/category/safe';
import CGDispenserIcon from 'assets/svgs/category/dispenser';
import CGPaperIcon from 'assets/svgs/category/paper';
import CGOfficeEquipmentIcon from 'assets/svgs/category/officeEquipment';
import CGOfficeSuppliesIcon from 'assets/svgs/category/officesupplies';
import CGIndustrialIcon from 'assets/svgs/category/industrial';
import CGHouseHoldItemsIcon from 'assets/svgs/category/household';
import CGNachosIcon from 'assets/svgs/category/nachos';
import CGInkTonerIcon from 'assets/svgs/category/ink_toner';
import CGNasIcon from 'assets/svgs/category/nas';
import CGCrayonIcon from 'assets/svgs/category/crayon';
import CGStudioDesignIcon from 'assets/svgs/category/studio_design';
import CGFileBinderIcon from 'assets/svgs/category/file_binder';
import CGConfettiIcon from '../assets/svgs/category/confetti';
import CGEtcIcon from '../assets/svgs/category/etc';
import CGLaurelIcon from '../assets/svgs/category/laurel';
import LocationIcon from 'assets/svgs/location';
import InfoCircle from '../assets/svgs/info_circle';
import RadioCircleIcon from '../assets/svgs/radio_circle';
import RadioCircleSelectedIcon from '../assets/svgs/radio_circle_selected';
import LogoGBTextIcon from '../assets/svgs/logo_gb_text';
import LogoGBIcon from '../assets/svgs/logo_gb';
import TriangleRightIcon from 'assets/svgs/arrowRight';
import FloatingBtnDownIcon from 'assets/svgs/floatingbtn_down';
import FloatingBtnUpIcon from 'assets/svgs/floatingbtn_up';
import CategoryMenuIcon from 'assets/svgs/categorymenu';
import ListIcon from 'assets/svgs/list';
import ThumbnailIcon from 'assets/svgs/thumbnail';
import ProfilePencilIcon from 'assets/svgs/profilepencil';
import SelectCloseIcon from 'assets/svgs/selectclose';
import PopupCartIcon from 'assets/svgs/popupcart';
import MgPurchaseIcon from 'assets/svgs/mgpurchase';
import PurchaseHistoryIcon from 'assets/svgs/purchasehistory';
import NoDataInCartIcon from 'assets/svgs/nocart';
import NoDataInWishListIcon from 'assets/svgs/nowishlist';
import HeaderChatIcon from 'assets/svgs/header_chat';
import HeaderHeartIcon from 'assets/svgs/header_heart';
import HeaderCartIcon from 'assets/svgs/header_cart';
import HeaderAlarmIcon from 'assets/svgs/header_alarm';
import HeaderHomeIcon from 'assets/svgs/header_home';
import CustomerIcon from 'assets/svgs/customer';
import UserGuideIcon from 'assets/svgs/userguide';
import FAQIcon from 'assets/svgs/faq';
import CheckOne from 'assets/svgs/CheckOne';
import CheckOne_active from 'assets/svgs/CheckOne_active';

interface Props {
  iconName: string;
  onPress?: (e?: any) => void;
  style?: {};
  buttonStyle?: {};
  width?: number;
  height?: number;
  color?: string;
  outlined?: boolean;
  active?: boolean;
  selected?: boolean;
  className?: string;
}

export default function Icon({
  iconName,
  onPress,
  style,
  buttonStyle,
  width,
  height,
  color,
  outlined,
  active,
  selected,
  className,
}: Props) {
  function renderIcon() {
    switch (iconName) {
      case 'account':
        return <AccountIcon width={width} height={height} color={color} />;
      case 'admin':
        return <AdminIcon width={width} height={height} color={color} />;
      case 'affair':
        return <AffairIcon width={width} height={height} color={color} />;
      case 'alarm':
        return <AlarmIcon width={width} height={height} color={color} />;
      case 'arrowdown':
        return <ArrowDownIcon width={width} height={height} color={color} />;
      case 'arrowleft':
        return <ArrowLeftIcon width={width} height={height} color={color} />;
      case 'arrowright':
        return <ArrowRightIcon width={width} height={height} color={color} />;
      case 'arrowup':
        return <ArrowUpIcon width={width} height={height} color={color} />;
      case 'cart':
        return <Cart width={width} height={height} color={color} />;
      case 'category_office':
        return (
          <CategoryOfficeIcon width={width} height={height} color={color} />
        );
      case 'category':
        return <CategoryIcon width={width} height={height} color={color} />;
      case 'close':
        return <CloseIcon width={width} height={height} color={color} />;
      case 'contact':
        return <ContactIcon width={width} height={height} color={color} />;
      case 'heart':
        return <HeartIcon width={width} height={height} color={color} />;
      case 'heartfill':
        return <HeartFillIcon width={width} height={height} color={color} />;
      case 'heartfill2':
        return <HeartFill2Icon width={width} height={height} color={color} />;
      case 'home':
        return <HomeIcon width={width} height={height} color={color} />;
      case 'logoText':
        return <LogoTextIcon width={width} height={height} color={color} />;
      case 'logoText2':
        return <LogoTextIcon2 width={width} height={height} color={color} />;
      case 'logo':
        return <LogoIcon width={width} height={height} color={color} />;
      case 'logoGB':
        return <LogoGBIcon width={width} height={height} color={color} />;
      case 'logoGBText':
        return <LogoGBTextIcon width={width} height={height} color={color} />;
      case 'logout':
        return <LogoutIcon width={width} height={height} color={color} />;
      case 'menu':
        return <MenuIcon width={width} height={height} color={color} />;
      case 'plus':
        return <PlusIcon width={width} height={height} color={color} />;
      case 'proposal':
        return <ProposalIcon width={width} height={height} color={color} />;
      case 'qna':
        return <QnaIcon width={width} height={height} color={color} />;
      case 'recommend':
        return <RecommendIcon width={width} height={height} color={color} />;
      case 'InfoCircle':
        return <InfoCircle width={width} height={height} color={color} />;
      case 'radioCircle':
        return <RadioCircleIcon width={width} height={height} color={color} />;
      case 'radioCircleSelected':
        return (
          <RadioCircleSelectedIcon
            width={width}
            height={height}
            color={color}
            outlined={outlined}
          />
        );
      case 'search':
        return <SearchIcon width={width} height={height} color={color} />;
      case 'setting':
        return <SettingIcon width={width} height={height} color={color} />;
      case 'shopping':
        return <ShoppingIcon width={width} height={height} color={color} />;
      case 'star':
        return <StarIcon width={width} height={height} color={color} />;
      case 'thumbsup':
        return <ThumbsUpIcon width={width} height={height} color={color} />;
      case 'wallet':
        return <WalletIcon width={width} height={height} color={color} />;
      case 'wealth':
        return <WealthIcon width={width} height={height} color={color} />;
      case 'workflow':
        return <WorkFlowIcon width={width} height={height} color={color} />;
      case 'floatingMenu':
        return <FloatingMenuIcon width={width} height={height} color={color} />;
      case 'more':
        return <MoreIcon width={width} height={height} color={color} />;
      case 'workflowitem':
        return <WorkflowItemIcon width={width} height={height} color={color} />;
      case 'stamp':
        return <StampIcon width={width} height={height} color={color} />;
      case 'suitcase':
        return <SuitCaseIcon width={width} height={height} color={color} />;
      case 'asset':
        return <AssetIcon width={width} height={height} color={color} />;
      case 'servicecenter':
        return (
          <ServiceCenterIcon width={width} height={height} color={color} />
        );
      case 'info':
        return <InfoIcon width={width} height={height} color={color} />;
      case 'authorization':
        return (
          <AuthorizationIcon width={width} height={height} color={color} />
        );
      case 'organize':
        return <OrganizationIcon width={width} height={height} color={color} />;
      case 'manageAssets':
        return <ManageAssetsIcon width={width} height={height} color={color} />;
      case 'usecase':
        return <UsecaseIcon width={width} height={height} color={color} />;
      case 'cloud':
        return <CloudIcon width={width} height={height} color={color} />;
      case 'cartfill':
        return <CartFillIcon width={width} height={height} color={color} />;
      case 'pencil':
        return <PencilIcon width={width} height={height} color={color} />;
      case 'user':
        return <UserIcon width={width} height={height} color={color} />;
      case 'waffle':
        return <WaffleTextIcon width={width} height={height} color={color} />;
      case 'loginsubtext':
        return <LoginSubTextIcon width={width} height={height} color={color} />;
      case 'checkone':
        return <CheckOne width={width} height={height} color={color} />;
      case 'checkone_active':
        return <CheckOne_active width={width} height={height} color={color} />;

      case 'eyeopen':
        return <OpenEyeIcon width={width} height={height} color={color} />;
      case 'eyeclose':
        return <CloseEyeIcon width={width} height={height} color={color} />;
      case 'filter':
        return <FilterIcon width={width} height={height} color={color} />;
      case 'checked':
        return <CheckedIcon width={width} height={height} color={color} />;
      case 'blank':
        return <BlankIcon width={width} height={height} color={color} />;
      case 'minus':
        return <MinusIcon width={width} height={height} color={color} />;
      case 'sampleqr': // sample qr code - TODO 추후 삭제 필요
        return <SampleQRIcon width={width} height={height} color={color} />;
      case 'cghome':
        return <CGHomeIcon width={width} height={height} color={color} />;
      case 'cgtech':
        return (
          <CGTechIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgelectronic':
        return <CGElectronicIcon width={width} height={height} color={color} />;
      case 'cgsafe':
        return <CGSafeIcon width={width} height={height} color={color} />;
      case 'cgdispenser':
        return (
          <CGDispenserIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgpaper':
        return <CGPaperIcon width={width} height={height} color={color} />;
      case 'cgofficeequipment':
        return (
          <CGOfficeEquipmentIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgofficesupplies':
        return (
          <CGOfficeSuppliesIcon width={width} height={height} color={color} />
        );
      case 'cgindustrial':
        return <CGIndustrialIcon width={width} height={height} color={color} />;
      case 'cghousehold':
        return (
          <CGHouseHoldItemsIcon width={width} height={height} color={color} />
        );
      case 'cgnachos':
        return (
          <CGNachosIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgink':
        return (
          <CGInkTonerIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgnas':
        return (
          <CGNasIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgcrayon':
        return (
          <CGCrayonIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgconfetti':
        return (
          <CGConfettiIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgetc':
        return (
          <CGEtcIcon
            width={width}
            height={height}
            color={color}
            selected={selected}
          />
        );
      case 'cgstudio':
        return (
          <CGStudioDesignIcon width={width} height={height} color={color} />
        );
      case 'cgfile':
        return <CGFileBinderIcon width={width} height={height} color={color} />;
      case 'cglaurel':
        return <CGLaurelIcon width={width} height={height} color={color} />;
      case 'location':
        return <LocationIcon width={width} height={height} color={color} />;
      case 'triRight':
        return (
          <TriangleRightIcon width={width} height={height} color={color} />
        );
      case 'floatingBtnUp':
        return (
          <FloatingBtnUpIcon width={width} height={height} color={color} />
        );
      case 'floatingBtnDown':
        return (
          <FloatingBtnDownIcon width={width} height={height} color={color} />
        );
      case 'categorymenu':
        return <CategoryMenuIcon width={width} height={height} color={color} />;
      case 'list':
        return <ListIcon width={width} height={height} color={color} />;
      case 'thumbnail':
        return <ThumbnailIcon width={width} height={height} color={color} />;
      case 'profilepencil':
        return (
          <ProfilePencilIcon width={width} height={height} color={color} />
        );
      case 'selectclose':
        return <SelectCloseIcon width={width} height={height} color={color} />;
      case 'popupcart':
        return <PopupCartIcon width={width} height={height} color={color} />;
      case 'mgpurchase':
        return <MgPurchaseIcon width={width} height={height} color={color} />;
      case 'purchasehistory':
        return (
          <PurchaseHistoryIcon width={width} height={height} color={color} />
        );
      case 'nodataincart':
        return <NoDataInCartIcon width={width} height={height} color={color} />;
      case 'nodatainwishlist':
        return (
          <NoDataInWishListIcon width={width} height={height} color={color} />
        );
      case 'headerchat':
        return <HeaderChatIcon width={width} height={height} color={color} />;
      case 'headerheart':
        return <HeaderHeartIcon width={width} height={height} color={color} />;
      case 'headercart':
        return <HeaderCartIcon width={width} height={height} color={color} />;
      case 'headeralarm':
        return <HeaderAlarmIcon width={width} height={height} color={color} />;
      case 'headerhome':
        return <HeaderHomeIcon width={width} height={height} color={color} />;
      case 'customer':
        return <CustomerIcon width={width} height={height} color={color} />;
      case 'userguide':
        return <UserGuideIcon width={width} height={height} color={color} />;
      case 'faq':
        return <FAQIcon width={width} height={height} color={color} />;
      default:
        return null;
    }
  }
  return (
    <div css={[style]} className={className ? className : ''}>
      <Button onClick={onPress} css={[buttonStyle]}>
        {renderIcon()}
      </Button>
    </div>
  );
}

const Button = styled.span`
  width: 35px;
  height: 35px;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
