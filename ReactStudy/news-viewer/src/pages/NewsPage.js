import Categories from '../component/Categories';
import NewsList from '../component/NewsList';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  //카테고리가 선택되지 않았으면 기본값 all로 사용
  // const {category} = useParams() || "all";
  const {category} = useParams();

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default NewsPage;