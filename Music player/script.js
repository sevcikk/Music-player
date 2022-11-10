const play = document.querySelector('.play'),
pause = document.querySelector('.pause'),
next = document.querySelector('.next'),
back = document.querySelector('.back'),

time = document.querySelector('.time'),
endTime = document.querySelector('.end-time'),

progressBar = document.querySelector('.progress-bar'),
progressArea = document.querySelector('.progress-area'),

nameMusic = document.querySelector('.name-music'),
nameArtist = document.querySelector('.name-artist'),

playAudio = document.querySelector('#play-audio'),
img = document.querySelector('.image img'),

repeat = document.querySelector('.repeat'),
shuffle = document.querySelector('.shuffle'),

ulTag = document.querySelector('ul'),
musicList = document.querySelector('.music-list'),
bar = document.querySelector('.bar');

let number = 0;
let lastMusic = music.length -1;

//play, pause
play.addEventListener('click', ()=>{
    playy();
    start(number);
});

pause.addEventListener('click', ()=>{
    pausee();
    playAudio.pause();
});

function start(number){
    playList();
    playAudio.src = `songs/${music[number].src}.mp3`;
    img.src = `img/${music[number].img}.jpg`;
    
    nameArtist.innerText = `${music[number].artist}`;
    nameMusic.innerText = `${music[number].name}`;  

    playAudio.volume = 0.3;
    playAudio.play();
}

function playy(){
    play.style.display = 'none';
    pause.style.display = 'block';
}

function pausee(){
    pause.style.display = 'none';
    play.style.display = 'block';
}

//back, next
next.addEventListener('click', ()=>{
    nextMusic();
    shuffleClick();
});

function nextMusic(){
    number++;
    if(number >= music.length){
        number = 0;
        start(number);
        playy();        
    }else{
        start(number);
        playy();
    }
}

back.addEventListener('click', ()=>{
    number--;
    number < 0 ? number = lastMusic : number = number;
    start(number);
    playy();
});

//progress bar, time update
playAudio.addEventListener('timeupdate', () =>{
    const timeCurrent = playAudio.currentTime; 
    const timeDuration = playAudio.duration;
    let totalTime = (timeCurrent / timeDuration) * 100;
    progressBar.style.width = `${totalTime}%`;
    
    playAudio.addEventListener('loadeddata', ()=>{
        const timeDurationMusic = playAudio.duration;
        let endTimeMin = Math.floor(timeDurationMusic / 60);
        let endTimeSec = Math.floor(timeDurationMusic % 60);

        if(endTimeSec < 10){
            endTimeSec = `0${currentSec}`;
        }
        endTime.innerText = `0${endTimeMin}:${endTimeSec}`;
    });

    let sec = Math.floor(timeCurrent % 60);
    let min = Math.floor(timeCurrent / 60);

    if(sec < 10){
        time.innerText = '0' + min + ':0' + sec;
    }else{
        time.innerText = '0' + min + ':' + sec;
    }
});

progressArea.addEventListener('click', (e)=>{

    let progressWidth = progressArea.clientWidth;
    let clickedOffset = e.offsetX;
    let musicDuration = playAudio.duration;
    playAudio.currentTime = (clickedOffset / progressWidth) * musicDuration;
});

//repeat, shuffle
playAudio.addEventListener('ended', ()=>{
        shuffleClick();
});

function shuffleClick(){
    textRepeat = repeat.innerText;
    textShuffle = shuffle.innerText;

    if(textRepeat == 'repeat'){
        getText = 'repeat';
    }else if(textShuffle == 'shuffle'){
        getText = 'shuffle';
    }else{
        getText = '';
    }

    switch(getText){
        case 'repeat':
            number = number;
            start(number);
            break;
        case 'shuffle':
            let randIndex = Math.floor((Math.random() * music.length));
           if(randIndex === number){
            randIndex ++;
            number = randIndex;
            start(number);
           }else{
            number = randIndex;
            start(number);
            }
            break;
        case '':

    }
}

//repeat, shuffle animate
shuffle.addEventListener('click', ()=>{
    if(shuffle.innerText == 'shuffle'){
        shuffle.innerText = '';
        shuffle.style.fill = 'aliceblue';
    }else{
        shuffle.innerText = 'shuffle';
        shuffle.style.fill =  '#47C25A';
    }
});

repeat.addEventListener('click', ()=>{
    if(repeat.innerText == 'repeat'){
        repeat.innerText = '';
        repeat.style.fill = 'aliceblue';
    }else{
        repeat.innerText = 'repeat';
        repeat.style.fill =  '#47C25A';
    }
});

//heart animate
const heart = document.querySelector('.heart');
heart.addEventListener('click', ()=>{
    if(heart.innerText == 'heart'){
        heart.innerText = '';
        heart.classList.remove("animateHeart"); 
    }else{
        heart.innerText = 'heart';
        heart.classList.add("animateHeart");   
    }
});

//overlay created
const arrowBtn = document.querySelector('.arrow');
const overlay = document.querySelector('.overlay');

arrowBtn.addEventListener('click', ()=>{
    if(overlay.style.display == 'block'){
        overlay.classList.add('overlayBack');
        setTimeout(animeBack, 500);
    }else{
        overlay.style.display = 'block';
    }
});

function animeBack(){
    overlay.style.display = 'none';
    overlay.classList.remove('overlayBack');
}

//overlay playList
bar.addEventListener('click', ()=>{
    if(musicList.style.display == 'block'){
        musicList.classList.add('listBack');
        setTimeout(animeList, 500);
    }else{
        musicList.style.display = 'block';
    }
});

function animeList(){
    musicList.style.display = 'none';
    musicList.classList.remove('listBack');
}

for(let i = 0; i < music.length; i++){
        let liTag = `<li li-index='${i + 1}'>
                    <div class='row'>
                        <span>${music[i].name}</span>
                        <p>${music[i].artist}<p>
                    </div>
                    <span id='${music[i].src}' class='audio-duration'>03:40</span>
                    <audio class='${music[i].src}' src='songs/${music[i].src}.mp3'></audio>
                    </li>`;
        ulTag.insertAdjacentHTML('beforeend', liTag);

        let liAudioDuration = ulTag.querySelector(`#${music[i].src}`);
        let liAudio = ulTag.querySelector(`.${music[i].src}`);
        liAudio.addEventListener('loadeddata', ()=>{
            let duration = liAudio.duration;
            let tolalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            };
            liAudioDuration.innerText = `${tolalMin}:${totalSec}`;
            liAudioDuration.setAttribute('t-duration', `${tolalMin}:${totalSec}`);
        });
} 

function playList(){
    const allLiTag = ulTag.querySelectorAll('li');

    for(let j = 0; j < allLiTag.length; j++){
        const ona = number + 1;
        allLiTag[j].classList.remove('playing');

        if(allLiTag[j].getAttribute('li-index') == ona){
                allLiTag[j].classList.add('playing');
        }
        allLiTag[j].setAttribute('onclick', 'clicked(this)');
        }
}

function clicked(element){
    let liIndex = element.getAttribute('li-index');
    number = liIndex -1;
    start(number);
}

musicList.addEventListener('click', ()=>{
    playy();
    start(number);
});



