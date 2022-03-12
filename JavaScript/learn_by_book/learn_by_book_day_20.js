//tip 44 aync/await로 함수를 명료하게 하자

//프라미스는 인터페이스가 여전히 투박하다.
//하지만 여전히 메서드에서는 콜백을 다룬다.

//하지만 비동기 프라미스 데이터를 단일 함수 함수의 변수에 추가해 콜백함수 사용을 피하게 됬다.

//async와 await는 서로 분리된 동작을 한다.
//async는 선언한 함수는 비동기 데이터를 사용한다는 것이다
//await는 비동기 함수의 내부에서 값이 반환될 때까지 함수의 실행을 중지시킬 수 있다.

//주의해야 할 점이 있다.
//1️⃣ async와 await는 프라미스를 대채하지 않고 더 나은 문법으로 감싸는 것에 불과하다.
//2️⃣ 최신 브라우저는 대부분 지원하지만 안되는 브라우저도 있으니 주의하자

//이제 사용 예제를 보자
function getUserPreferences() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: `dusk`,
    });
  });
  return preferences;
}
function getMusic(theme) {
  if (theme === `dusk`) {
    return Promise.resolve({
      album: `music for airports`,
    });
  }
  return Promise.reject({
    album: `kind of blue`,
  });
}
function getArtist(album) {
  return Promise.resolve({
    artist: `Brian Eno`,
  });
}

getUserPreferences()
  .then(preferences => {
    console.log(preferences.theme);
  });
//  dusk
//우선 함수를 호출하는 부분을 다른 함수에서도 감싸도록 한다.
//비동기 함수 호출을 담당하는 함수를 작성하고 function 앞에 async 키워드를 추가해 비동기 함수를 호출한다는 점을 표시한다.
//이렇게 하면 프라미스가 완료되었을 때 반환되는 값이 새로운 변수에 담긴다.
async function getTheme() {
  const { theme } = await getUserPreferences();
  return theme;
}

//비동기 함수의 재밌는 점은 프라미스로 변환된다는 것이다. then() 메서드가 필요하다
getTheme()
  .then(theme => {
    console.log(theme);
  })

//async함수가 빛나는 때는 여러개의 프라미스를 다룰 때이다.
//async/await를 사용해 각 프라미스에서 반환된 값을 변수에 먼저 할당하고 이어지는 함수로 전달이 가능하다
//즉, 연결된 프라미스를 하나의 함수로 감싸진 여러개의 함수 호출로 변환할 수 있다.
async function getArtistByPreperence() {
  const { theme } = await getUserPreferences();
  const { album } = await getMusic(theme);
  const { artist } = await getArtist(album);
  return artist;
}
getArtistByPreperence()
  .then(artist => {
    console.log(artist);
  });
//  Brian Eno

//정말 간결하게 코드가 작성됬다
//이제 오류를 잡기위해 catch() 메서드 또한 작성해 주자.
getArtistByPreperence()
  .then(artist => {
    console.log(artist);
  })
  .catch(error => {
    console.log(error);
  });



//tip 45 fetch로 간단한 AjAX호출을 처리하자
//이번에는 fetch()를 이용해 원격 데이터를 가져오는 법을 알아보자

//자바스크립트 앱을 개발할 경우에 API를 다뤄야한다. API를 사용하면 현재 정보를 가져올 수 있고,
//화면을 새로고침하지 않고 단일 요소를 갱싱할 수 있다.
//API를 사용하면 네이티브 소프트워어처럼 작동하는 매우 빠른 애플리케이션을 만들 수 있다.

//AJAX(비동기 자바스크립트와 XML)를 가져오는 일은 번거로웠다. 또한 다루기도 어려웠다.

//하지만 AJAX 호출을 처리할 수 있는 fetch()라는 도구가 생셔 간단하게 처리할 수 있게 되었다.
//fetch()는 자바스크립트 명세의 일부가 아닌 WHATWG(Web HyperText Application Technology Workin Group)가 정의한다
//fetch()는 대부분의 최신 브라우저에서는 지원되지만 Node.js에서는 지원되지 않지만 node-fetch패키지를 이용하면 사용이 가능하다.

//fetch()를 사용하려면 API 끝점(endpoint)이 필요하다
//typicode는 가상의 블로그 데이터를 제공하고 있으며 제공하는 JSON 서버를 이용하면 로컬 환경에서 모의 API를 만들 수 있다.
//JSON서버는 모의API를 만들 수 있는 좋은 도구로 API응답이 느린 경우, 인증이 필요한 경우, 호출마다 비용이 소비된느 경우에 유용하다.

//첫번째로 GET요청을 하여 fetch()를 이용해 데이터를 가져와보자
fetch(`https://jsonplaceholder.typicode.com/posts/1`);
//{
//"userId": 1,
//"id": 1,
//"title": "sunt...",
//"body": "quia..."
//}
//요청을 보내고 나면 fetch()는 응답을 처리하는 프라미스를 반환한다.

//이어서 then()메서드에 응답을 처리하는 콜백함수를 추가해보자
//하지만 응답 본문을 사용하기에 앞서 자바스크립트에서 다룰 수 있는 형식으로 변환해주어야 한다.
//다행히 fetch()는 다양한 믹스인을 포함하고 있어 응답 본문 데이터를 자동으로 변환시켜준다.
//이 경우에는 JSON을 가져올 것을 알고 있으므로 응답에 json()을 호출해 JSON으로 변환 가능하다.
//json()은 프라미스를 반환하기에 then()메서드를 추가해야하며 추가된 then()의 콜백에서 파싱된 데이터를 처리할 수 있다.
fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  .then(data => {
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  });

//아쉬운 점은 fetch() 프라미스는 상태코드가 404로 요청에 실패해도 응답본문을 반환하기에 catch()메서드만으로 오류를 처리할 수 없다.
//응답에는 응답코드가 200에서 299사이인 경우 true로 설정되는 ok필드가 있다. 이 필드를 이용해 응답을 확인하고 요류가 발생하면 오류처리로 넘어가도록 할 수 있다.
//하지만 인터넷 익스플로러는 지원하지 않고 Edge만 지원한다... 익스플로러를 지원해야한다면 reponse.status를 이용해 200에서 299 사이의 값인지 확인해야 한다.
fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  .then(data => {
    if (!data.ok) {
      throw Error(data.status);
    }
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  })
  .catch(e => {
    console.log(e);
  });

//이제는 POST요청을 해보자
//GET요청 외의 다른 요청을 처리할 때는 몇가지 조건을 추가로 설정해야 한다.
//두번째 인수로 절정 조건을 담은 객체를 전달해야 한다.
//설정 객체는 서로 다른 다양한 세부 사항을 담을 수 있다. 여기서는 가장 중요한 정보만 포함시킨다.

//POST요청을 보내기 때문에 POST메서드를 사용한다고 선언해야 한다.
//그리고 추가적인 JSON데이터를 넘겨주고 JSON데이터를 보내기 때문에 헤더의 Content-Type을 application/json으로 설정해준다
//마지막으로 JSON데이터를 담은 문자열로 요청 본문을 추가한다.
const update = {
  title: 'Clarence White Techniques',
  body: 'Amazing',
  userId: 1,
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(update),
};

fetch('https://jsonplaceholder.typicode.com/posts', options)
  .then(data => {
    if (!data.ok) {
      throw Error(data.status);
    }
    return data.json();
  })
  .then(update => {
    console.log(update);
// {
//   title: 'Clarence White Techniques',
//   body: 'Amazing',
//   userId: 1,
//   id: 101
// };
  })
  .catch(e => {
    console.log(e);
  });
//요청이 성공적이라면 새로운 ID와 블로그 게시물 객체를 담은 응답 본문을 받을 것이다.

//끝으로 요청 본문의 형식으로 JSON데이터가 흔하지만 FormData와 같은 다른 방식도 있고 요청에 따라 조정할 수 있는 다양한 방법이 있으며 모드, 캐시방법등을 설정할 수 있다.
//코드를 작성할 때 AJAX 요청을 어디서 다룰지 위치를 주의해야 한다. fetch()는 대부분 인터넷 연결이 필요하고 API끝점이 프로젝트 진행중 변경될 수 있다.
//fetch()작업을 한곳으로 모아두면 수정과 테스트가 쉬워진다.