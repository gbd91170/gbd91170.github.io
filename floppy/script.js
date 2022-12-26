"use-strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";

//general settings
let gamePlaying = false;
const gravity = 0.5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = canvas.width / 10;

let index = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight = 0,
  flyHeight;

// pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => {
  return 0.8 * Math.random() * (canvas.height - pipeGap) + pipeWidth;
};

const setup = () => {
  currentScore = 0;
  flight = jump;
  flyHeight = canvas.height / 2 - size[1] / 2;
  pipes = [];
  for (let i = 0; i < 3; i++) {
    pipes.push([canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
  }
  console.log(pipes);
};

const render = () => {
  try {
    index++;
    //background
    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height,
      // 0,
      -(((index * speed) / 2) % canvas.width),
      0,
      canvas.width,
      canvas.height
    );
    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height,
      // 0,
      -(((index * speed) / 2) % canvas.width) + canvas.width,
      0,
      canvas.width,
      canvas.height
    );

    //oiseau
    if (gamePlaying) {
      flight += gravity;
      flyHeight = Math.max(
        Math.min(flyHeight + flight, canvas.height - size[1]),
        -35
      );

      ctx.drawImage(
        img,
        432,
        Math.floor((index % 9) / 3) * size[1],
        ...size,
        cTenth,
        flyHeight,
        ...size
      );
    } else {
      flyHeight = canvas.height / 2 - size[1] / 2;
      ctx.drawImage(
        img,
        432,
        Math.floor((index % 9) / 3) * size[1],
        ...size,
        canvas.width / 2 - size[0] / 2,
        flyHeight,
        ...size
      );

      ctx.font = "bold 30px courier";
      ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
      ctx.fillText(`Cliquez pour jouer`, 48, 535);
    }

    //pipe
    if (gamePlaying) {
      pipes.map((pipe) => {
        //top pipe
        pipe[0] -= speed;
        ctx.drawImage(
          img,
          432,
          588 - pipe[1],
          pipeWidth,
          pipe[1],
          pipe[0],
          0,
          pipeWidth,
          pipe[1]
        );
        //bottom pipe
        ctx.drawImage(
          img,
          432 + pipeWidth,
          108,
          pipeWidth,
          canvas.height - pipe[1] + pipeGap,
          pipe[0],
          pipe[1] + pipeGap,
          pipeWidth,
          canvas.height - pipe[1] + pipeGap
        );

        if (pipe[0] < -pipeWidth) {
          currentScore++;
          bestScore = Math.max(bestScore, currentScore);
          document.getElementById(
            "bestScore"
          ).innerHTML = `Meilleur : ${bestScore}`;
          document.getElementById(
            "currentScore"
          ).innerHTML = `Score : ${currentScore}`;

          //remove pipe & create new one
          pipes = [
            ...pipes.slice(1),
            [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
          ];
        }
        //if hit the pipe, end
        if (
          [
            pipe[0] <= cTenth + size[0],
            pipe[0] + pipeWidth >= cTenth,
            pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
          ].every((e) => e)
        ) {
          gamePlaying = false;
          setup();
        }
      });
    }
    window.requestAnimationFrame(render);
  } catch (err) {
    console.log(err);
  }
};
setup();
img.onload = render;
document.addEventListener("click", () => (gamePlaying = true));
document.getElementById("bestScore").innerHTML = `Meilleur : ${bestScore}`;
document.getElementById("currentScore").innerHTML = `Score : ${currentScore}`;
window.onclick = () => (flight = jump);
