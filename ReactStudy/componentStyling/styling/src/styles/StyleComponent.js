import styled, { css } from 'styled-components';
//  단순 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정하려면 css를 불러와야 한다.

const sizes = {
  desktop: 1024,
  tablet: 768,
}

//size객체에 따라 자동으로 media 쿼리 함수를 만들어 준다.
//참고 : https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media(max-width: ${sizes[label] / 16}em){
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const Box = styled.div`
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  /* 기본적으로 가로 1024px에 가운데 정렬하고 가로 크기가 작아질 수록 크기를 줄이고 768px미만이 되면 꼭 채워줌 */
  width: 1024px;
  margin: 0 auto;
  /* media 쿼리 함수 사용 */
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`}

  /* media 쿼리 함수 미사용 */
  /* @media(max-width: 1024px){
    width: 768px;
  }
  @media(max-width: 768px){
    width: 100%;
  } */
`;

/* & 문자를 사용해 Sass처럼 자기 자신을 선택 가능하다 */
const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display; flex;
  align-item: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover{
    background: rgba(255, 255, 255, 0.9);
  }

  ${props =>
    props.inverted &&
  css`
    background: none;
    border: 2px solid white;
    color: white;
    &:hover{
      background: white;
      color: black;
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;