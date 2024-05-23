const questions = [
  {
    question: "What does the term 'DOM' stand for in JavaScript?",
    answers: {
      A: "Document Object Model",
      B: "Data Object Model",
      C: "Document Oriented Module",
      D: "Dynamic Object Method",
    },
    correctAnswer: "A",
  },
  {
    question:
      "What is the output of the following code? console.log(3 === '3';",
    answers: {
      A: "`true`",
      B: "`falee`",
      C: "`true`",
      D: "`false`",
    },
    correctAnswer: "B",
  },
  {
    question:
      "Which term describes the process of converting a value from its current type to a specified type in JavaScript?",
    answers: {
      A: "Parsing",
      B: "Converting",
      C: "Coercion",
      D: "Transformation",
    },
    correctAnswer: "C",
  },
  {
    question: "What is the purpose of an 'event handler' in JavaScript?",
    answers: {
      A: "To handle errors in the code",
      B: "To handle user actions or browser events",
      C: "To handle asynchronous operations",
      D: "To handle database queries",
    },
    correctAnswer: "B",
  },
  {
    question:
      "What will the following code output? console.log(1 + 2 + '3' - 1);",
    answers: {
      A: "23",
      B: "32",
      C: "4",
      D: "NaN",
    },
    correctAnswer: "C",
  },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
  const questionContainer = document.getElementById("ques");
  const optionsContainer = document.getElementById("opt");

  questionContainer.innerHTML = questions[currentQuestion].question;
  optionsContainer.innerHTML = "";

  for (let key in questions[currentQuestion].answers) {
    optionsContainer.innerHTML += `
            <label>
                <input type="radio" name="option" value="${key}">
                ${key}: ${questions[currentQuestion].answers[key]}
            </label><br>
        `;
  }
}

function checkAns() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    userAnswers[currentQuestion] = answer;

    if (answer === questions[currentQuestion].correctAnswer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  } else {
    alert("Please select an answer");
  }
}

function showResults() {
  const questionContainer = document.getElementById("ques");
  const optionsContainer = document.getElementById("opt");
  const scoreContainer = document.getElementById("score");
  const restartButton = document.getElementById("restartButton");
  const submitButton = document.getElementById("btn");

  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";
  submitButton.style.display = "none";
  restartButton.style.display = "block";

  let resultsHTML = `You scored ${score} out of ${questions.length}<br><br>`;
  resultsHTML += "<h3>Review your answers:</h3><ol>";

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index] ? userAnswers[index] : "No answer";
    const correctAnswer = question.correctAnswer;
    const correctAnswerText = question.answers[correctAnswer];

    resultsHTML += `<li>
            ${question.question}<br>
            Your answer: ${userAnswer} - ${
      question.answers[userAnswer] || ""
    }<br>
            Correct answer: ${correctAnswer} - ${correctAnswerText}
        </li><br>`;
  });

  resultsHTML += "</ol>";
  scoreContainer.innerHTML = resultsHTML;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();

  document.getElementById("score").innerHTML = "";
  document.getElementById("btn").style.display = "block";
  document.getElementById("restartButton").style.display = "none";
}

loadQuestion();
