'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import instance from '@/lib/api/axios';
import { useAuthStore } from '@/store/useAuthStore';

const KakaoCallbackPage = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) return;

      try {
        const loginRes = await instance.post('oauth/sign-in/kakao', {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        });

        const { accessToken, refreshToken, user } = loginRes.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        setUser(user);

        router.push('/');
      } catch (err: any) {
        if ([403, 404].includes(err?.response?.status)) {
          router.replace(`/oauth/kakao/signup?code=${code}`);
        } else {
          alert('카카오 로그인 실패');
        }
      }
    };

    fetchKakaoToken();
  }, [router, setAccessToken, setRefreshToken, setUser]);

  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-start bg-white px-4 pt-[25vh]'>
      <img
        src='/icons/kkotLoding.gif'
        alt='로딩 중'
        className='mb-6 h-[120px] w-[120px] object-contain sm:h-[255px] sm:w-[255px]'
      />

      <h2 className='text-18-b mb-2 text-gray-800'>카카오 로그인 처리 중...</h2>
      <p className='text-14-m text-gray-500'>잠시만 기다려주세요 😊</p>
    </main>
  );
};

export default KakaoCallbackPage;
