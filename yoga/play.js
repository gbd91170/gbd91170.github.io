let exercices;
let exercice_en_cours;
let timeData;
let audio = new Audio("./ring.mp3");
function pick(tableau, name) {
  return tableau.filter((elt) => elt.num == name)[0];
}

function affiche(num) {
  exercice = pick(exercices, num);
  const content = document.querySelector(".exercice-container");
  content.innerHTML = `
        <p id="temps"> </p>
        <img src="${"./img/" + exercice.num + ".png"}"/>

    `;
  timeData = document.getElementById("temps");
}

function chronometre(exercice_en_cours, nb_exercice, temps) {
  //   console.log(temps);
  if (temps < 0) {
    if (exercice_en_cours == nb_exercice - 1) {
      audio = new Audio("./ring.mp3");
      audio.play();
      display();
    } else {
      audio = new Audio("./ring.mp3");
      audio.play();
      affiche(a_afficher[exercice_en_cours + 1].num);
      chronometre(
        exercice_en_cours + 1,
        nb_exercice,
        a_afficher[exercice_en_cours + 1].time * 60
      );
    }
  } else {
    if (temps % 60 < 10) {
      sec = "0" + (temps % 60);
    } else {
      sec = temps % 60;
    }
    timeData.textContent = Math.floor(temps / 60) + ":" + sec;
    setTimeout(
      () => chronometre(exercice_en_cours, nb_exercice, temps - 1),
      1000
    );
  }
}

function affiches(exercices) {
  chronometre(
    exercice_en_cours,
    nb_exercice,
    a_afficher[exercice_en_cours].time * 60
  );
}

function display() {
  if (window.localStorage.exercices) {
    exercices = JSON.parse(window.localStorage.exercices);
    a_afficher = exercices
      .sort((a, b) => a.pos - b.pos)
      .filter((a) => a.visible == 1);
    nb_exercice = a_afficher.length;
    exercice_en_cours = 0;
    affiche(a_afficher[0].num);
    const pPlay = document.getElementById("temps");
    pPlay.innerHTML = '<i class="fas fa-play"></i>';
    pPlay.addEventListener("click", (e) => {
      affiches(exercices);
    });
  } else {
    alert("Vous devez d'abord paramétrer vos exercices");
  }
}
display();
