import { useLocation } from 'react-router-dom';

const About = () => {
  const { search } = useLocation();

  //현재 지금 경로가(search) "?detail=true"인지 확인
  const showDetail = search === "?detail=true";
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정되있음</p>}
    </div>
  );
};

export default About;