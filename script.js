const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const startScreen = document.getElementById("start-screen");
const displayContainer = document.getElementById("display-container");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const optionsContainer = document.getElementById("options");
const options = Array.from(document.getElementsByClassName("option"));
const timeLeftElement = document.getElementById("time-left");
const questionCountElement = document.getElementById("number-of-question");

let scoreCommentElement = document.getElementById("score-comment");
let currentQuestion = 0;
let score = 0;
let time = 10;
let timer;

const quizData = [
  {
    question:
      "Where does Ukrainian stand in the list of the most beautiful languages in the world?",
    image: "/images/1.jpg",
    options: ["in 15th place", "in 3th place", "in 9th place"],
    answer: "in 3th place",
  },
  {
    question: "Which city is the capital of Ukraine?",
    image: "/images/2.jpg",
    options: ["Kharkiv", "Odesa", "Kyiv"],
    answer: "Kyiv",
  },
  {
    question:
      "What is the place of the Ukrainian Mriya airplane among the world's largest civilian aircraft?",
    image: "/images/3.jpg",
    options: ["Third place", "First place", "Fifth place"],
    answer: "First place",
  },
  {
    question: "What is the area of Ukraine?",
    image: "images/4.jpg",
    options: ["603 square km", "551 square km", "487 square km"],
    answer: "603 square km",
  },
  {
    question: "At 105 meters deep, which station is the deepest in the world?",
    image: "images/5.jpg",
    options: ["Khreshchatyk", "Peremohy Square", "Arsenalnaya"],
    answer: "Arsenalnaya",
  },
  {
    question: "Where was the world's first kidney transplant performed?",
    image: "images/6.jpg",
    options: ["In Kherson city", "In Kharkiv city", "In Dnipro city"],
    answer: "In Kherson city",
  },
  {
    question: "Where is the longest promenade in Europe?",
    image: "images/7.jpg",
    options: ["Odesa", "Dnipro", "Cherkasy"],
    answer: "Dnipro",
  },
  {
    question: "How many seas wash over Ukraine?",
    image: "images/8.jpg",
    options: ["2", "0", "1"],
    answer: "2",
  },
];

function startTimer() {
  time = 10;
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (time >= 0) {
    timeLeftElement.textContent = time + "s";
    time -= 1;
  } else {
    clearInterval(timer);
    showCorrectAnswer();
    nextButton.disabled = false;
  }
}

function updateQuestionCount() {
  questionCountElement.textContent = `${currentQuestion + 1} of ${
    quizData.length
  } questions`;
}

function showCorrectAnswer() {
  const currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  options.forEach((option, index) => {
    option.textContent = currentQuiz.options[index];
    option.classList.remove("correct", "incorrect");
    option.removeEventListener("click", selectOption);
    option.classList.remove("hovered");
    if (currentQuiz.options[index] === currentQuiz.answer) {
      option.classList.add("correct");
    }
  });
}

function showQuestion() {
  updateQuestionCount();

  const currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  questionImage.src = currentQuiz.image;

  options.forEach((option, index) => {
    option.textContent = currentQuiz.options[index];
    option.classList.remove("correct", "incorrect");
  });
}

function selectOption(e) {
  const selectedOption = e.target; //Змінна selectedOption отримує посилання на об'єкт події e.target, який представляє сам елемент, на який клікнув користувач.
  const selectedAnswer = selectedOption.textContent;

  if (selectedAnswer === quizData[currentQuestion].answer) {
    score += 1;
    selectedOption.classList.add("correct");
  } else {
    selectedOption.classList.add("incorrect");
  }

  options.forEach((option) => {
    option.removeEventListener("click", selectOption);
    option.classList.remove("hovered");
  });

  nextButton.disabled = false;
}

function resetOptions() {
  options.forEach((option) => {
    option.classList.remove("correct", "incorrect");
    option.classList.add("hovered");
  });
}

function nextQuiz() {
  clearInterval(timer);

  const scoreText =
    score < 5
      ? "Not bad, but you can know more!"
      : "Amazing! You know a lot interesting facts about Ukraine!";

  if (currentQuestion === quizData.length - 1) {
    displayContainer.style.display = "none";
    scoreElement.textContent = `Your score: ${score}`;
    scoreCommentElement.textContent = scoreText;
    scoreContainer.style.display = "block";
  } else {
    currentQuestion += 1;
    resetOptions();
    showQuestion();
    options.forEach((option) => {
      option.addEventListener("click", selectOption);
    });
    nextButton.disabled = true;
    startTimer();
  }
}

nextButton.addEventListener("click", nextQuiz);

showQuestion();

options.forEach((option) => {
  option.addEventListener("click", selectOption);
});

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  startTimer();
});

restartButton.addEventListener("click", () => {
  window.location.reload();
});
