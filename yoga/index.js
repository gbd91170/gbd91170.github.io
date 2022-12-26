const contenu = document.getElementById("contenu");
//Créer l'objet exercice
class Exercice {
  constructor(num) {
    this.num = num;
    this.time = 1;
    this.pos = num;
    this.visible = 1;
  }
}

// exercice1 = new Exercice("./img/1.png");
// exercices = [exercice1];
function loadExercices() {
  const exercices = [];
  for (i = 0; i < 10; i++) {
    exercices.push(new Exercice(i));
  }
  return exercices;
}

//pick : Dans un tableau d'exercice, retourne l'objet exercice dont le num est name
function pick(tableau, name) {
  return tableau.filter((elt) => elt.num == name)[0];
}
//pickPos : dans un tableau d'exercices retourne l'objet exercice dont la position est pos
function pickPos(tableau, pos) {
  return tableau.filter((elt) => elt.pos == pos)[0];
}
function save(exercices) {
  window.localStorage.exercices = JSON.stringify(exercices);
}

function display(liste_exercices) {
  //   console.log(liste_exercices);
  contenu.innerHTML = liste_exercices
    .filter((res) => res.visible == 1)
    .sort((a, b) => a.pos - b.pos)
    .map((exercice) => {
      return `
            <li>
                <div class="card-header">
                    <input type="number" 
                        value=${exercice.time} name=${exercice.num}>
                    <span>min</span>
                </div>
                <img src="${"./img/" + exercice.num + ".png"}"/>
                <div class="arrow">
                    <i class="fas fa-arrow-left" data-name=${exercice.num}></i>
                </div>
                <div class="deleteBtn">
                    <i class="fas fa-times-circle" data-name=${
                      exercice.num
                    }></i>
                </div>
            </li>
            `;
    });
  const timeurs = document.querySelectorAll('input[type="number"]');
  timeurs.forEach((timeur) => {
    timeur.addEventListener("change", (e) => {
      pick(exercices, e.target.name).time = e.target.value;
      //   console.log(exercices);
      save(exercices);
    });
  });
  const positions = document.querySelectorAll(".fa-arrow-left");
  positions.forEach((position) => {
    position.addEventListener("click", (e) => {
      console.log(exercices);
      exercice_a_deplacer_a_gauche = pick(exercices, e.target.dataset.name);
      if (exercice_a_deplacer_a_gauche.pos > 0) {
        exercice_a_deplacer_a_droite = pickPos(
          exercices,
          exercice_a_deplacer_a_gauche.pos - 1
        );
        exercice_a_deplacer_a_gauche.pos -= 1;
        exercice_a_deplacer_a_droite.pos += 1;
        save(exercices);
        display(exercices);
      }
    });
  });
  const suppressions = document.querySelectorAll(".fa-times-circle");
  suppressions.forEach((suppression) => {
    suppression.addEventListener("click", (e) => {
      pick(exercices, e.target.dataset.name).visible = 0;
      //   console.log(exercices);
      save(exercices);
      display(exercices);
    });
  });
  const reset = document.querySelector(".fa-undo");
  reset.addEventListener("click", (e) => {
    exercices = loadExercices();
    save(exercices);
    display(exercices);
  });
}
let exercices;
if (window.localStorage.exercices) {
  console.log("j'ai déjà une config");
  exercices = JSON.parse(window.localStorage.exercices);
} else {
  exercices = loadExercices();
}
display(exercices);
