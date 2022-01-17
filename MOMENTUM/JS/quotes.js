const quotes = [
    {
        quote: "The way to get started is to quit talking and begin",
        author: "Walt Disney",
    },
    {
        quote: "Just Do It",
        author: "NIKE",
    },
    {
        quote: "Everyone has a plan, until they get punched in the mouth",
        author: "Mike Tyson",
    },
    {
        quote: "asdfa",
        author: "ㅁㄴㅇㅀ ㅁㄴㅇㅍㄴㅊㅍㅋㅌㅊㅍㅈㄷㅈㄱ",
    },
    {
        quote: "asdfa",
        author: "asdfas",
    },
    {
        quote: "asdfㅂㅈㄷㅂㅈ",
        author: "ㅁㄴㅇㄻㄴs",
    },
    {
        quote: "asdfa",
        author: "ㅇㄴㄴㅇㄹs",
    },
    {
        quote: "asdfa",
        author: "ㅁ",
    },
    {
        quote: "ㅇa",
        author: "ㅇ",
    },
    {
        quote: "ㅎ",
        author: "ㅎ",
    }

];
const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
//Math.random() 0과 1사이의 무작위 값을 생성
//Math.round() : 반올림    Math.ceil() : 올림    Math.floor() : 내림