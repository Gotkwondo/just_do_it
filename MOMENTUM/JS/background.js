const images = ["0.jpg", "1.jpg", "2.jpg"];
const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgimg = document.createElement("img");
bgimg.src = `img/${chosenImg}`;

document.body.querySelector("#bg_img").appendChild(bgimg);
//document.body.appendChild()는 body 끝에 태그를 추가할 때 필요
//document.body.prependChild()는 body 맨 앞에 태그를 추가할 때 필요