// const title = document.getElementById("title");

// title.innerText = "Got You!";

// console.log(title.id);
// console.log(title.className);
//getElementsByTagName는 태그명에 따라 element를 가져올 수 있다.
//querySelector는 element를 CSS방식으로 첫번째 것만 리턴
//css방식으로 검색 시 '.' '#'와 같은 형식을 표시해 줘야지 검색 가능
// const title = document.getElementsByTagName("h1");

// console.log(title);

const h1 = document.querySelector(".hello:first-child h1");

console.log(h1);

function handleh1Click() {
    h1.classList.toggle("active");    //toggle은 classList에 active가 있으면 active를 제거하고 없으면 추가한다.
    // const clickedClass = "active";              //classList는 class들의 목록으로 작업하게 도와줌
    // if (h1.classList.contains(clickedClass)) {  //cotains 명시한 요소가 있는지 확인
    //     h1.classList.remove(clickedClass);
    // } else {
    //     h1.classList.add(clickedClass);
    // }



    // const currentColor = h1.style.color;
    // let newColor;
    // if (currentColor === "blue") {
    //     newColor = "tomato";
    // } else {
    //     newColor = "blue";
    // }
    // h1.style.color = newColor;
}


// function handleMouseEnter() {
//     h1.innerText = "Mouse is here"
// }
// function handleMouseLeave() {
//     h1.innerText = "Mouse is gone"
// }
// function handleWindowResize() {
//     document.body.style.backgroundColor = "tomato";
// }
// function handleWindowCopy() {
//     alert("Copier!");
// }
// function handleWindowOffline() {
//     alert("SOS no WIFI");
// }
// function handleWindowOnline() {
//     alert("Internet is Online!")
// }

h1.onclick = handleh1Click;
// h1.addEventListener("mouseenter", handleMouseEnter);
// h1.addEventListener("mouseleave", handleMouseLeave);

// window.addEventListener("resize", handleWindowResize);
// window.addEventListener("copy", handleWindowCopy);
// window.addEventListener("offline", handleWindowOffline);
// window.addEventListener("online", handleWindowOnline);