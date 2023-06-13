// le tableau data contient les question sous forme d'objet.
// chaque objet et composé du text de la question.et les réponse suggerées ainsi que la bonne réponse.

data = [
  {
    question: " In JavaScript, a variable name must:",
    a: "Contain Brackets",
    b: "Be between Brackets",
    c: "Be explicit",
    d: "Contain quotation marks",
    correct: "c",
  },
  {
    question: "Select the right ways to increment in JS:",
    a: "Const newYear = currentYear++1;",
    b: "CurrentYear += 1",
    c: "CurrentYear =+ 1",
    d: "CurrentYear =++",
    correct: "b",
  },
  {
    question:
      "Which property aligns the elements along the main axis in CSS?",
    a: "Justify-content",
    b: "Text-align",
    c: "Box-sizing",
    d: "Display",
    correct: "a",
  },
  {
    question: "What's Responsive Design?",
    a: "A fast loading Website",
    b: "Tools used to create layouts compatible with all devices",
    c: "Technology allowing you to create beautiful design",
    d: "A set of tools to make interactivity in our code",
    correct: "b",
  },
  {
    question: "What's the 'Mobile First' concept?",
    a: "Creating the Desktop version before the Mobile version",
    b: "Create a Website that only works on mobile",
    c: "Create the Mobile version before the Desktop Version",
    d: "Modify certain CSS rules depending on the device",
    correct: "c",
  },
  {
    question: "How to add JavaScript to an HTML file?",
    a: "By adding the <script> tag",
    b: "With<js></js>",
    c: "With <link src='script.js'></link>",
    d: "With <script src='script.js'></script>",
    correct: "d",
  },
  {
    question: "In JavaScript, how to add a class to an element?",
    a: "Element.addClass('newClass')",
    b: "Element.classList.add('newClass')",
    c: "Element.class.add('newClass')",
    d: "Element.addlist('newClass')",
    correct: "b",
  },
  {
    question: "How to create a local repository from an already existing repository?",
    a: "Git init <REMOTE_URL>",
    b: "Git pull <REMOTE_URL>",
    c: "Git clone <REMOTE_URL>",
    d: "Git add <REMOTE_URL> ",
    correct: "c",
  },
  {
    question:
      "Which Git command allows you to make sure that your local repository is updated?",
    a: "Git pull",
    b: "Git commit -m",
    c: "Git push",
    d: "Git remote",
    correct: "a",
  },
  {
    question:
      "Which command allows you to recover existing repository URL's configured on a local repository?",
    a: "Git status",
    b: "Git list <REMOTE_URL>",
    c: "Git remote -v",
    d: "Git merge <REMOTE_URL>",
    correct: "c",
  },
];
// selectionné tous les radio avec querySelectorAll
const answers = document.querySelectorAll(".answer");
// récoupéré la question et les réponses.
const question = document.getElementById("question");
const reponse_a = document.querySelector("#reponse_a");
const reponse_b = document.querySelector("#reponse_b");
const reponse_c = document.querySelector("#reponse_c");
const reponse_d = document.querySelector("#reponse_d");
const quizContainer = document.querySelector(".quiz-container");
const numQuestion = document.querySelector("#numQuestion");
const list = document.querySelectorAll("#list");
const btn_suivant = document.getElementById("btn_suivant");
const btn_resultat = document.querySelector("#btn_resultat");
function btn_resulte_desable() {
  btn_resultat.disabled = true;
  btn_resultat.classList.remove("btn_hover");
}
function btn_resulte_active() {
  btn_resultat.disabled = false;
  btn_resultat.classList.add("btn_hover");
}
btn_resulte_desable();

function Addlist() {
  list.forEach((element) => {
    if (element) {
      element.addEventListener("click", function () {
        element.classList.toggle("Mystyle");
      });
    }
  });
}

let score_Value = 0;
let numberQuestion = 1;
// on initialise totale bonne réponse  = 0 ;

// currentquiz est la varaible pour incrémenté les objet dans le tableau data.
let currentquiz = 0;
function desableButton() {
  btn_suivant.disabled = true;
}
function ButtonAble() {
  btn_suivant.disabled = false;
}

// cette fonction permé de décoché les radio
function uncheckedRadio() {
  for (let i = 0; i < answers.length; i++) {
    answers[i].checked = false;
  }
}

// remplire les label et le h2 avec les text du tableau
function chargerLesQuestion() {
  uncheckedRadio();
  Addlist();
  desableButton();

  question.innerText = data[currentquiz].question;
  reponse_a.innerText = data[currentquiz].a;
  reponse_b.innerText = data[currentquiz].b;
  reponse_c.innerText = data[currentquiz].c;
  reponse_d.innerText = data[currentquiz].d;
}
// on appelle la fonction chargerLesQuestion pour la première fois;
chargerLesQuestion();

// getSelected permis de récupéré le radio coché.( danc la réponse choisi par l'utilisateur)
function getSelected() {
  let answer;
  answers.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
      numberQuestion++;
    }
  });
  return answer;
}
function desableButton() {
  btn_suivant.disabled = true;
  btn_suivant.classList.remove("btn_suivant_hover");
}
function ButtonAble() {
  btn_suivant.disabled = false;
  btn_suivant.classList.add("btn_suivant_hover");
}

btn_suivant.addEventListener("click", function () {
  blackColor();

  numQuestion.innerHTML = `Question ${numberQuestion} :`;
  if (currentquiz < data.length) {
    chargerLesQuestion();
  } else {
    localStorage.setItem("score-value", score_Value);
    btn_resulte_active();
  }
});
// quand l'utilisateur appue sur le bouton submit, on récupére la réponse choisi avec getSelected
// on mit une condition, si l'utilisateur a la bonne réponse il affiche dans console.log bonne réponse,
// et incrémente la varaible score,
// sinon on affiche dans console.log mauvaise réponse.
// on incrémente la varaible currentquiz, c'est à dire : passé une autre question mais avant ça on vérifié
// si le tatale de question n'est pas attient.
const btn_submit = document.getElementById("btn");
btn.addEventListener("click", function () {
  const reponse = getSelected();

  if (reponse) {
    if (reponse === data[currentquiz].correct) {
      score_Value++;

      const audio_1 = new Audio("good.mp3");
      audio_1.play();
    } else {
      const audio_2 = new Audio("oh.mp3");
      audio_2.play();
    }
    color(data[currentquiz].correct);
    currentquiz++;
    ButtonAble();
  }
});
function color(reponse) {
  if (reponse == "a") {
    reponse_a.style.color = "green";
    reponse_b.style.color = "red";
    reponse_c.style.color = "red";
    reponse_d.style.color = "red";
  } else if (reponse == "b") {
    reponse_a.style.color = "red";
    reponse_b.style.color = "green";
    reponse_c.style.color = "red";
    reponse_d.style.color = "red";
  } else if (reponse == "c") {
    reponse_a.style.color = "red";
    reponse_b.style.color = "red";
    reponse_c.style.color = "green";
    reponse_d.style.color = "red";
  } else {
    reponse_a.style.color = "red";
    reponse_b.style.color = "red";
    reponse_c.style.color = "red";
    reponse_d.style.color = "green";
  }
}
function blackColor() {
  reponse_a.style.color = "black";
  reponse_b.style.color = "black";
  reponse_c.style.color = "black";
  reponse_d.style.color = "black";
}
