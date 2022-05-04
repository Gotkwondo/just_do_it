import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({category}) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //const query = (category === "") ? "" : `&category=${category}`; 이 코드는 안됨 (""과 undefined는 falsy비교에서 false이다.)
          const query = (category === undefined) ? "" : `&category=${category}`;
          const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c1875192f7424058b26761c4799c6517`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  //대기 중일 때
  if (loading) {
    return <NewsListBlock>로딩중...</NewsListBlock>
  }

  //아직 articles 값이 설정 안됬을 때
  if (!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map(articles => (
        <NewsItem key={articles.url} article={articles} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;