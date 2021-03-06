//npm으로 외부 코드를 가져오자

//몇 년 전만 해도 오픈 소스 라이브러리를 사용하려면 코드를 복사해서 내부에 붙여넣거나, 프로젝트에 라이프러리 코드를 내려받거나,
//프로젝터에 라이브러리 코드를 내려받거나, 외부의 의존성을 <script>태그를 이용해 포함시키는 방법밖에 없었다.
//원하는 코드를 사용할 수 있지만
//의존성을 최신으로 유지하는 것과 프로젝트 내부에 저장하는 경우 문제가 되었다.
//유지보수가 어렵고, 라이브러리 코드가 있다고 가정한 코드를 작성해야되고, 코드를 읽고 테스트를 장성하기도 어려웠다.

//하지만 이제는 라이브러리 코드를 직접 프로젝트에 내려받고, 버젼을 관리하고, 익숙한 규칙에 따라 개별 파일에서 코드를 가져와 사용할 수 있다.

//npm(node package manager)이라는 도구를 이용해 이런 작업을 할 수 있다. 대체 도구도 있다. 페이스북에서 만든 yarn
//npm은 중요한 프로젝트이며 대부분은 코드를 가져오기 위해 사용된다.
//다른 사용의 예는 프로젝트의 메타데이터와 구성 정보를 설정, 명령줄 스크립트를 실행, 다른 사람이 쓸 수 있도록 프로젝트를 게시할 수 도 있다.

//npm은 프로젝트 구조를 가출 수 있을 뿐아니라 코드를 공유할 때도 사용할 수 있다. 또한 다운로드 수, 수정되지 않은 버그의 수, 버젼 등에 대한 정보도 알 수 있다.
//예시로 데이터 변환에 사용할 수 있는 도구 모음인 로대시(Lodash)의 한달 평균 다운로드 횟수는 5천만회 이며
//npm이 수집한 데이터는 거대한 자바스크립트 커뮤니티의 암묵적인 지지를 보여준다.

//npm install --save lodash 명령을 실행해 프로젝트에 설치한다.
//npm install은 몇가지 작업을 수행한다.
//1️⃣프로젝트에 node_modules디렉터리가 없는 경우에는 디렉터리를 생성하고 패키지를 내려받음
//2️⃣설치하는 패키지의 번호로 package.json파일을 갱신함.
//3️⃣끝으로, 설치하는 코드의 버전에 대한 세부 정보를 담은 package-lock.json파일을 생성한다.
//package-lock.json에는 해당 코드가 필요로 하는 다른 라이브러리에 대한 정보도 담겨있다.

//설치를 마쳤다면 코드를 가져오려면 import문을 사용하면 된다. 하지만 라이브러리를 설치했기에 경로는 작성하지 않는다.
//예시 코드를 보자
import lodash, { frompairs } from `lodash`;
export function mapToObject(map) {
  return frompairs([...map]);
}
export function objectToMap(object) {
  const pairs = lodash.toPairs(object);
  return new Map(pairs);
}
//프로젝트의 어느 곳에서든 동일한 문법으로 코드를 가져올 수 있다는 점이 좋다.
//상대 경로를 사용하지 않고 불러온 코드는 외부 코드이다.

//종종 코드베이스에 필요하지만 실환경을 위한 빌드에서는 제외해야 하는 코드를 다뤄야 할 때가 있다.
//예를 들어, 테스트 실행기가 필요하지만 실환경 코드에도 테스트 실행기가 필요하지는 않는다.
//이런 경우 npm을 이용해 개발 의존성을 다루고 실행할 수 있는 깔끔한 인터페이스를 제오한다.

//설치시 --save-dev플래그를 사용하면 --save플래그를 사용한 경우와 의존성을 추가하는 필드가 다르다.

//만약 프로젝트 전역에 Prettier를 설치해 사용한다는 점을 알려야 한다면 npm 스크립트를 이용하면 해결할 수 있다.
//npm스크립트는 동일한 명령을 실행할 때 node_modules 디렉터리에 설치한 패키지를 실행한다.
//명령을 실행하려면 package.json 파일의 scripts 필드에 명령을 추가한다.
//scripts 필드에 새로운 항목으로 clean하여 prettier--tab-width=4--write./code/*.js를 실행할 수 있게 된다.
//package.json 파일이 있는 디렉터리에서 npm run clean을 싱행하면 프로젝트에 설치한 Prettier 패키지를 npm이 실행 시켜줌
