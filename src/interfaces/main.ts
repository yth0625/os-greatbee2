export interface IProfileRes {
  userName: string;
  deptName: string;
  email: string;
  membImgUrl: string;
}

export interface IUserInfoRes {
  membName: string;
  subName: string;
  userId: string;
  deptName: string;
  posName: string;
  email: string;
  telNo: string;
  phone: string;
  membImgUrl: string;
}

export interface ISavingUserInfoReq {
  subName: string;
  email: string;
  telNo: string;
  phone: string;
  pwdCheck: string;
}

export interface ICheckingPasswordReq {
  lastPwd: string;
  pwdCheck: string;
}

export interface IChangingPasswordReq {
  lastPwd: string;
  chngPwd: string;
  pwdCheck: string;
}

export interface IFavoriteRes {
  menuSeq: number;
  menuName: string;
  favSeq: number;
  menuEngName: string;
  favImagePath: string;
}

export interface INoticeRes {
  subject: string;
  content: string;
  notiSeq: number;
  notiDttm: string;
  membImgUrl: string;
}

export interface IRecentDocumentRes {
  docsSeq: number;
  docsType: string;
  docsTitle: string;
  recentDttm: string;
}

export interface IUpdatedDocumentRes {
  docsSeq: number;
  docsState: string;
  docsTitle: string;
  updateDate: string;
}


export interface IRegisteringInquiryReq {
  email: string;
  hpNo: string;
  reqType: string;
  subject: string;
  content: string;
}

export interface IRegisteringInquiryRes {
  data: {
    result: string;
    data: any,
    error: any
  }
}
