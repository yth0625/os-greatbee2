export interface ISignInReq {
  userId: string;
  userPw: string;
}

export interface ISignInRes {
  data: {
    data: {
      grantType: string;
      accessToken: string;
      accessTokenExpireDate: number;
    }
  }
}

export interface ISignUpReq {
  shop: string;
  membCnt: number;
  userName: string;
  job: string;
  email: string;
  hpNo: string;
  reqCont: string;
}

export interface ISignUpRes {
  data: {
    result: string;
    data: any,
    error: any
  }
}
