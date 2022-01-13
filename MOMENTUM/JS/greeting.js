// const loginForm = document.getElementById("login-form");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
// const loginButton = loginForm.querySelector("button");
const link = document.querySelector("a");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

loginForm.addEventListener("submit", onLoginSubmit);
// loginButton.addEventListener("click", onLoginBtnClick);

function onLoginSubmit(event) {
    event.preventDefault(); //브라우저의 기본동작(새로고침)을 막음
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username} ! !`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

link.addEventListener("click", handleLinckClick);

function handleLinckClick(event) {
    event.preventDefault();
    console.dir(event);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) { //show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    //show the h1 tag
    paintGreetings(savedUsername);
}







//localStorage API를 이용하여 웹에 정보를 저장(setItem('key', value)),제거(removeItem(key)), 불러오기(getItem(key)), 항목 전체제거(clear())을 할 수 있다