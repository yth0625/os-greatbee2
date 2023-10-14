// core
import { useEffect } from 'react';
// axios
import axios from 'axios';
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { token, messageBundle } from '../store';

// token 사용하는 auth instance 시작
const auth = axios.create({
  // baseURL: '/api/v1/',
  baseURL: 'https://eprocurement.greatbee.kr/api/v1/',
});

// 토큰 만료 후 요청 저장 작업
// @ts-ignore
let refreshSubscribers = [];
let isTokenRefreshing = false;
let errorCount = 0;

// @ts-ignore
function onTokenRefreshed(token) {
  // @ts-ignore
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
}
// @ts-ignore
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// auth interceptor custom hook
// @ts-ignore
function AuthAxiosInterceptor({ children }) {
  const [accessToken, setAccessToken] = useRecoilState(token.accessToken);
  const [refreshToken, setRefreshToken] = useRecoilState(token.refreshToken);
  const setAlert = useSetRecoilState(messageBundle.alert);

  // intercepter 삽입
  useEffect(() => {
    // const requestIntercept = auth.interceptors.request.use(
    //   config => {
    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   }
    // );
    const responseIntercept = auth.interceptors.response.use(
      (res) => {
        errorCount = 0;
        return res;
      },
      (error) => {
        const { config: originalRequest, response } = error;
        if (response?.status == 401 || response?.data?.statusCode == 401) {
          refreshSubscribers = [];
          errorCount++;
          try {
            if (
              originalRequest.url == 'auth/token-refresh' ||
              response.data?.message == 'token expired'
            )
              throw 'refreshToken 만료';
            if (!refreshToken) throw 'refreshToken 만료';
            if (errorCount > 5) throw '에러 5번 넘음'; // 무한루프 방지

            if (!isTokenRefreshing) {
              isTokenRefreshing = true;
              // token refresh 요청
              auth
                .post(`auth/token-refresh`, {
                  refreshToken: refreshToken,
                })
                .then((res) => {
                  const newAccessToken = res.data.accessToken;
                  // 새로운 토큰 저장
                  isTokenRefreshing = false;
                  setAccessToken(newAccessToken);
                  // 새로운 토큰으로 지연되었던 요청 진행
                  onTokenRefreshed(newAccessToken);
                })
                .catch((error) => {
                  throw 'auth/token-refresh에러';
                });
            }
            // token 재발급 동안의 요청은 refreshSubscribers에 저장
            return new Promise((resolve, reject) => {
              // @ts-ignore
              addRefreshSubscriber((token) => {
                originalRequest.headers.Authorization = 'Bearer ' + token;
                resolve(axios(originalRequest));
              });
            });
          } catch (error) {
            if (error == 'refreshToken 만료') {
              setAlert('토큰이 만료되었습니다. 다시 로그인해주세요');
              setRefreshToken('');
              setAccessToken('');
              setTimeout(() => {
                window.location.href = '/login';
              }, 1200);
            }
            isTokenRefreshing = false;
            refreshSubscribers = [];
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      // auth.interceptors.response.eject(requestIntercept);
      auth.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return children;
}

export default auth;
export { AuthAxiosInterceptor };
