// Axios 인스턴스
import axios from 'axios';
import type { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // API 서버에서 쿠키 인증을 사용하지 않으므로 false 설정
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('request interceptor error');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data, statusText } = error.response;

      console.error(`🩺 API Error ${status}:`, data);

      throw new Response(JSON.stringify(data), { status, statusText });
    }
  },
);

export default instance;
