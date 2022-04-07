//tip 43 프라미스를 이용해 비동기적으로 데이터 가져오기
//프라미스를 이용해 지연된 데이터 응답을 처리하는 방법을 알아보자

//자바스크립트는 비동기 언어이다. 비동기 언어는 이전의 코드가 해결되지 않아도 이어지는 코드를 실행할 수 있는 코드이다.
//코드가 중단되는 이유는 API, DOM이나 다른 곳에서 데이터를 가져올 수 있고 사용자 응답을 기다릴 수도 있다.
//비동기 언어의 가치는 지연된 정보를 기다리는 동안 이 정보가 필요치 않은 다른 코드를 실행할 수 있다는 점에 있다.
//지연된 정보를 기다리는 동안 코드는 멈추지 않는다는 것이다.

//프로미스 등장 이전에는 콜백함수를 이요해 비동기 작업을 했다.
//데이터 원본에 비용을 요청할 때 콜백함수를 인수로 넘기고 비동기 데이터를 가져온 후에 콜백함수를 호출한다. 예로는 setTimeout()이 있다.
// function getUserPreferences(cd){
//   return setTimeout(() => {
//     cd({
//       theme: `dusk`,
//     });
//   }, 1000);
// }
// function log(value) {
//   return console.log(value);
// }
// log(`starting`);
// //  starting
// getUserPreferences(preferences => {
//   return log(preferences.theme.toUpperCase());
// });
// log(`ending?`);
//  ending?

//  DUSK

//콜백 함수는 비동기데이터를 다루기 좋은 방법이다.
//문제는 비동기 함수에서 또 비동기 함수를 호출하고, 계속해서 비동기 함수를 호출하며 너무 많은 콜백 함수가 중첩되는 경우가 생긴다. 이게 콜백 지옥이라한다..
function getMusic(theme, cd) {
  return setTimeout(() => {
    if (theme === `dusk`) {
      return cd({
        album: `music for airports`,
      });
    }
    return cd({
      album: `kind of blue`,
    });
  }, 1000);
}
//getUserPreferences()를 호출하면서 getMusic()을 콜백함수로 전달한다.
//getMusic()은 인수로 테마설정(preferences.theme)과 콜백함수를 받는다.
// getUserPreferences(preferences => {
//   return getMusic(preferences.theme, music => {
//     console.log(music.album);
//   });
// });
//일기 힘들다...
//여러 비동기 함수들은 두개의 콜백함수를 전달 받는다. 요청이 성공한 경우에 실행할 콜백 함수와 오류가 발생했을 때 실행할 콜백함수가 필요하기 때문이다.

//프라미스를 사용하면 콜백함수 문제를 해결할 수 있다.
//프라미스는 콜백함수를 인수로 받는 대신에 성공과 실패에 대응하는 메서드를 사용한다.
//이로써 시각적으로 평평하게 보이고 콜백함수를 중첩하는 대신에 여러개의 비동기 프라미스를 연결할 수 있다.

//프라미스의 동작 원리를 알아보자
//비동기 적업을 전달받아 응답에 따라 두가지 메서드 중 하나를 호출하는 객체가 프라미스이다.
//비동기 작업이 성공이나 충족하면 then()메서드로 결과를 넘겨주고, 실패하거나 거부되면 catch()메서드를 호출한다.
//then()과 catch()메서드에는 비동기 작업의 결과인 응답된 함수만이 인수로 전달된다.

//프라미스는 두개의 인수 resolve()와 reject()를 받는다.
//코드가 의도대로 동작했을 때는 resolve()가 실행되는데 resolve()가 호출되면 then()메서드에 전달된 함수가 실행된다.
function getUserPreferences2() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: `dusk`,
    });
  });
  return preferences;
}
//비동기 작업이 성공한 경우 then()메서드를 이용해 코드를 호출하는 경우이다.
getUserPreferences2().then(preferences => { console.log(preferences.theme); });
//  dusk
//이제 비동기 작업이 실패한 경우에 catch()메서드를 이용해 코드를 호출해 보자.
function failUserPreferences() {
  const preferences = new Promise((resolve, reject) => {
    reject({
      type: `접근이 거부됨`,
    });
  });
  return preferences;
}
failUserPreferences()
  .then(preferences => {
    console.log(preferences.theme); //실행 안됨
  })
  .catch(error => {
    console.log(`실패: ${error.type}`);
  });
//훨씬 간결해 보인다.

//이제 getMusic()함수를 프라미스를 이용해 바꾸어보자.
function getMusic2(theme) {
  if (theme === `dusk`) {
    return Promise.resolve({
      album: `music for airports`,
    });
  }
  return Promise.reject({
    album: `kind of blue`,
  });
}
//getUserPreferences()의 then()메서드에 전달한 함수의 내부에서 getMusic()을 호출해 반환할 수 있다.
//그 후에 연결된 또 다른 then()메서드에서 getMusic()의 결과를 이용하는 함수가 호출됨
getUserPreferences2()
  .then(preference => {
    return getMusic2(preference.theme);
  })
  .then(music => {
    console.log(music.album);
  })
//  music for airports

//여러개의 중첩된 콜백함수에 데이터를 전달하는 대신 여러개의 then()메서드를 통해 데이터를 이래로 내려주는 것이다.
//프라미스가 반환하기 때문에 암묵적 반환을 이용하는 화살표 함수로 모든 코드를 한줄로 만들 수 있다.
getUserPreferences2()
  .then(preference => getMusic2(preference.theme))
  .then(music => { console.log(music.album); });

//프라미스를 연결하는 경우 catch()메서드를 개별적으로 연결할 필요가 없다.
//catch()메서드 하나만 정의해서 프라미스가 거절되는 모든 경우를 처리한다.
function getUserPreferences3() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: `dusks`,
    });
  });
  return preferences;
}

function getArtist(album) {
  return Promise.resolve({
    artist: `Brian Eno`,
  });
}

//위의 함수는 getMusic()에서 거부될 것이므로 getArtist()를 사용할 기회가 없을 것이다. 그러므로 catch()메서드가 뒤에 선언되어있어도 실행된다.
function failMusic(theme) {
  return Promise.reject({
    type: `네트워크 오류`,
  });
}

getUserPreferences3()
  .then(preference => failMusic(preference.theme))
  .then(music => { console.log(music.album); })
  .catch(e => {
    console.log(e);
  });

//주의해야 할게 프로미스는 resolve(), reject()중 하나를 무조건 전달해야한다.
//또한 위와 같이 연결해서 호출한다면 앞에서의 then()이 만족하고 데이터를 넘긴다 해도 뒤의 then()이 불충족하면 catch()가 처리를 하게 된다.
//만약 조건문을 활용하고 싶다면 프로미스 안의 함수에서 조건문을 사용하면된다.