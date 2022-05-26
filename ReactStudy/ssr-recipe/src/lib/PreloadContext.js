import { configureStore } from '@reduxjs/toolkit';
import { useContext } from 'react';

//  클라이언트 환경: null
//  서버 환경: { done: false, promises: [] }
const PreloadContext = configureStore(null);

export default PreloadContext;

//  resolve는 함수 타입이다.
export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null; //  constex 값이 유효하지 않다면 아무것도 안함
  if (preloadContext.done) return null; //  이미 작업이 끝났으면 아무것도 안함

  //  promise 배열에 프로미스 등록
  //  resolve 함수가 프로미스를 반환하지 않더라도, 프로미스 취급을 하기 위해서
  //  Promise.resolve 함수 사용
  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};

//  PreloadContext는 SSR을 하는 과정에서 처리할 작업을 실행하고, 기다려야할 프로미스가 있다면 프로미스를 수집한다.
//  모든 프로미스를 수집하고 나서 수집된 프로미스들이 끝날 때까지 기다렸다가 다시 렌더링하면 데이터가 채워진 상태로
//  컴포넌트들이 나타난다.

//  Preloader 컴포넌트는 resolve 함수를 props로 받으며, 컴포넌트가 렌더링될 때 서버 환경에서만 resolve함수를 호출해 준다.