import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = {
  confirmFunc: () => void;
  hasConfirm: string;
  modalMessage: {
    title: string;
    content: JSX.Element | any;
  };
  hasNoClose?: boolean;
};

type PopupType = {
  alert: {
    isOpenAlert: boolean;
    alertMessage: string;
    hasConfirm: boolean;
    confirmFunc: () => void;
    onClick?: () => void;
    cancelFn?: () => void;
    cancelText?: string;
    confirmText?: string;
  };
  modal: {
    list: ModalType[];
  };
  wishpopup: {
    isOpenWishPopup: boolean;
    text: string | JSX.Element;
  };
  toastMessage: {
    isOpenToastMessage: boolean;
    text: string | JSX.Element;
  };
};

export type OpenAlertProps = {
  text: string | any;
  hasConfirm?: boolean;
  confirmFn?: () => void;
  onClick?: () => void;
  cancelFn?: () => void;
  cancelText?: string;
  confirmText?: string;
};

export type OpenModalProps = {
  modalMessage: {
    title: string;
    content: JSX.Element | any;
  };
  hasConfirm: string;
  confirmFn: () => void;
  hasNoClose?: boolean;
};

export type OpenWishPopupProps = {
  text: string | JSX.Element;
};

export type OpenToastPopupProps = {
  text: string | JSX.Element;
}

const initialState: PopupType = {
  alert: {
    isOpenAlert: false,
    alertMessage: '',
    confirmFunc: () => console.log(''),
    hasConfirm: false,
    onClick: () => console.log(''),
    cancelFn: () => console.log(''),
    cancelText: '취소',
    confirmText: '확인',
  },
  modal: {
    list: [],
  },
  wishpopup: {
    isOpenWishPopup: false,
    text: '',
  },
  toastMessage: {
    isOpenToastMessage: false,
    text: '',
  }
};

export const dataReducer = createSlice({
  name: 'data',
  initialState,
  reducers: {
    openAlert: (state: PopupType, action: PayloadAction<OpenAlertProps>) => {
      const {
        text,
        hasConfirm,
        confirmFn,
        onClick,
        cancelFn,
        cancelText,
        confirmText,
      } = action.payload;
      state.alert.alertMessage = text;
      if (cancelFn) state.alert.cancelFn = cancelFn;
      if (cancelText) state.alert.cancelText = cancelText;
      if (confirmText) state.alert.confirmText = confirmText;

      if (hasConfirm && confirmFn) {
        state.alert.hasConfirm = hasConfirm;
        state.alert.confirmFunc = confirmFn;
      } else {
        state.alert.hasConfirm = false;
        state.alert.onClick = onClick;
      }
      state.alert.isOpenAlert = true;
    },
    closeAlert: (state: PopupType) => {
      state.alert.isOpenAlert = false;
      state.alert.alertMessage = '';
      state.alert.hasConfirm = false;
      state.alert.confirmFunc = () => console.log('');
      state.alert.onClick = () => console.log('');
      state.alert.cancelFn = () => console.log('');
      state.alert.cancelText = '취소';
      state.alert.confirmText = '확인';
    },
    openModal: (state: PopupType, action: PayloadAction<OpenModalProps>) => {
      const { modalMessage, confirmFn, hasConfirm, hasNoClose } =
        action.payload;
      console.log(action);
      const modal: ModalType = {
        confirmFunc: confirmFn,
        hasConfirm: hasConfirm,
        modalMessage: {
          title: modalMessage.title,
          content: modalMessage.content,
        },
        hasNoClose: hasNoClose ? hasNoClose : false,
      };
      state.modal.list.push(modal);
    },
    closeModal: (state) => {
      if (state.modal.list.length > 0) state.modal.list.pop();
    },
    openWishPopup: (
      state: PopupType,
      action: PayloadAction<OpenWishPopupProps>,
    ) => {
      const { text } = action.payload;
      state.wishpopup.isOpenWishPopup = true;
      state.wishpopup.text = text;
    },
    closeWishPopup: (state: PopupType) => {
      state.wishpopup.isOpenWishPopup = false;
      state.wishpopup.text = '';
    },
    openToastMessage: (
      state: PopupType,
      action: PayloadAction<OpenToastPopupProps>,
    ) => {
      const { text } = action.payload;
      state.toastMessage.isOpenToastMessage = true;
      state.toastMessage.text = text;

      setTimeout(() => {
        state.toastMessage.isOpenToastMessage = false;
        state.toastMessage.text = '';
      }, 2500);
    },
    closeToastMessage: (state: PopupType) => {
      state.toastMessage.isOpenToastMessage = false;
      state.toastMessage.text = '';
    },
  },
});

export const {
  openAlert,
  closeAlert,
  openModal,
  closeModal,
  openWishPopup,
  closeWishPopup,
  openToastMessage,
  closeToastMessage,
} = dataReducer.actions;

export default dataReducer.reducer;
