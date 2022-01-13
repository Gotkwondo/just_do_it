const clock = document.querySelector("h2#clock");


function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = (`${hours}:${minutes}:${seconds}`);
}
getClock()  //브라우저 실행시 바로 시간을 보여주게끔 함수 호출

setInterval(getClock, 1000);   //1초마다 첫번째 인자의 행동을 실행  setTimeout과는 달리 반복

//padStart(padEnd 앞뒤에 넣는거에 달라짐) : 문자열의 수(첫번째 인자)를 지정하여
//문자를 더 길게 할 때 넣어줄 것(두번째 인자)를 지정, 문자열만 설정 가능