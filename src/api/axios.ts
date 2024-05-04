import axios from 'axios';
import { API_DOMAIN } from '../static';

const TIMEOUT_TIME = 10_000;

export const AxiosInstance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    'Content-Type': 'application/vnd.api+json',
  },
  // withCredentials:true, // 쿠키 cors 통신 설정
});

export default AxiosInstance;

// 취소 토큰을 생성하는 함수
const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;
// Request interceptor for API calls

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('capsule_token') as any;
    config.headers.Authorization = `Bearer ${token?.access}`;

    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;
    return config;
  },
  async (error) =>
    // 요청 전 에러 처리
    // add error handling before sending the request
    Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // error handling
    if (axios.isCancel(error)) {
      // 취소된 요청은 에러로 처리하지 않음
      return Promise.resolve();
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject(error);
  }
);
