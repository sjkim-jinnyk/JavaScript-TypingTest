// 게임 시간 초기 값, 변수 설정
const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaing = false;
let words = [];
let timeInterval;
let checkInterval;

let second = document.querySelector('.second');
let total = document.querySelector('.total');
let wordInput = document.querySelector('.wordInput');
let wordText = document.querySelector('.wordText');
let btn = document.querySelector('.btn');



init();

// 게임실행 초기화
function init() {
    getWords();
    wordInput.addEventListener('input', wordCheck);
}

// 게임 실행
function run() {
    score = 0;
    if(isPlaing)return;
    isPlaing = true;
    time = GAME_TIME;
    btnChange('게임 중');
    wordInput.focus();
    timeInterval = setInterval(countDown, 1000);
}

// 단어 랜덤 받기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word)=>{
                if(word.length < 10) {
                    words.push(word);
                }
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

// 단어 일치 체크
function wordCheck() {
    if(wordText.innerText.toLowerCase()===wordInput.value.toLowerCase()) {
        wordInput.value = "";
        if(!isPlaing) return;
        score++;
        total.innerText = score;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordText.innerText = words[randomIndex];
        time = GAME_TIME;
    }
};

// Time interval
function countDown() {
    time > 0 ? time-- : isPlaing = false;
    if(!isPlaing) {
        clearInterval(timeInterval);
        wordInput.value = "";
        btnChange('게임시작');
    }
    second.innerText = time;
}

// 버튼 change
function btnChange(text){
    btn.innerText = text;
    btn.classList.toggle('loading');
}

