let enemy = document.querySelector('.enemy')
let gamePlayMusic = new Audio('resources/music.mp3')
let gameOverMusic = new Audio('resources/gameover.mp3')
let man = document.querySelector('.man')
let gameOver = document.querySelector('.gameOver')
let retryBtn = document.querySelector('.retry')
let startBtn = document.querySelector('.start')
let gameName = document.querySelector('.gameName')
let volumeBtn = document.querySelector('.volumeBtn')

let cross = true
let score = 0

volumeBtn.addEventListener('click', ()=>{
  if(volumeBtn.classList.contains('mute')){
    gamePlayMusic.play();
    gamePlayMusic.addEventListener(
      "ended",
      () => {
        gamePlayMusic.currentTime = 0;
        gamePlayMusic.play();
      },
      false
    );
    volumeBtn.src = "resources/musicPlay.png";
    volumeBtn.classList.add('play')
    volumeBtn.classList.remove('mute')
  }else{
    gamePlayMusic.pause();
    volumeBtn.src = "resources/musicMute.png";
    volumeBtn.classList.add('mute')
    volumeBtn.classList.remove('play')
  }
})  

startBtn.addEventListener("click", () => {

  startBtn.style.visibility = 'hidden'
  gameName.style.visibility = 'hidden'
  enemy.classList.add("animateEnemy");

  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
      man.classList.add("animateManUp");
      setTimeout(() => {
        man.classList.remove("animateManUp");
      }, 1000);
    }
    if (e.key == "ArrowRight") {
      let manX = parseInt(
        window.getComputedStyle(man, null).getPropertyValue("left")
      );
      man.style.left = manX + 20 + "px";
    }
    if (e.key == "ArrowLeft") {
      let manX = parseInt(
        window.getComputedStyle(man, null).getPropertyValue("left")
      );
      man.style.left = manX - 20 + "px";
    }
  });

  setInterval(() => {
    let mx = parseInt(
      window.getComputedStyle(man, null).getPropertyValue("left")
    );
    let my = parseInt(
      window.getComputedStyle(man, null).getPropertyValue("top")
    );
    let ex = parseInt(
      window.getComputedStyle(enemy, null).getPropertyValue("left")
    );
    let ey = parseInt(
      window.getComputedStyle(enemy, null).getPropertyValue("top")
    );

    let offsetX = Math.abs(mx - ex);
    let offsetY = Math.abs(my - ey);

    if (offsetX < 120 && offsetY < 170) {
      retryBtn.style.visibility = "visible";
      gameOver.style.visibility = "visible";
      enemy.classList.remove("animateEnemy");
      man.classList.remove("animateManUp");
      gameOverMusic.play();
      if(volumeBtn.classList.contains('play')){
        gamePlayMusic.pause();
      }
    } else if (offsetX < 160 && cross) {
      score += 1;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1500);

      let aniDur = parseFloat(
        window
          .getComputedStyle(enemy, null)
          .getPropertyPriority("animation-duration")
      );
      let newDur = aniDur - 0.1;
      enemy.style.animationDuration = newDur + "s";
    }
  }, 400);
});
function updateScore(){
  document.getElementById("score").innerText = "Your Score : " + score;
}

retryBtn.addEventListener('click', ()=>{
  retryBtn.style.visibility = "hidden"
  gameOver.style.visibility = "hidden";
  enemy.classList.add("animateEnemy")
  enemy.classList.add("animateEnemy")
  score = 0
  document.getElementById("score").innerText = "Your Score : " + score;
  cross = true
  gameOverMusic.pause()
  if(volumeBtn.classList.contains('play')){
    gamePlayMusic.play()
  }
})