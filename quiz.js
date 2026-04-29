const quesJSON = [
  {
    correctAnswer: "Kathmandu",
    options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"],
    question: "What is the capital city of Nepal?",
  },
  {
    correctAnswer: "Mount Everest",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Annapurna"],
    question:
      "Which is the highest mountain located (at least partly) in Nepal?",
  },
  {
    correctAnswer: "Rhododendron (Lali Gurans)",
    options: ["Marigold", "Rhododendron (Lali Gurans)", "Lotus", "Sunflower"],
    question: "What is the national flower of Nepal?",
  },
  {
    correctAnswer: "Danphe (Impeyan pheasant)",
    options: ["Peacock", "Sparrow", "Danphe (Impeyan pheasant)", "Eagle"],
    question: "What is the national bird of Nepal?",
  },
  {
    correctAnswer: "Nepalese Rupee",
    options: ["Nepalese Rupee", "Indian Rupee", "US Dollar", "Euro"],
    question: "What is the official currency of Nepal?",
  },
];

let score = 0;
let currentQuestion = 0;
const totalScore = quesJSON.length;

//Accessing all the elements:
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById("next");
showQuestion();

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  nextQuestion();
});

function showQuestion() {
  // Destructuring the object
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  //Setting question text content
  questionEl.textContent = question;

  const shuffledOptions = shuffleOptions(options);

  //Populating the Options div with the buttons.
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    // Event handling on the button:
    btn.addEventListener("click", () => {
      if (opt === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
      }
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      nextQuestion();
    });
  });
}

// function nextQuestion() {
//   currentQuestion++;
//   optionEl.textContent = "";
//   if (currentQuestion >= quesJSON.length) {
//     questionEl.textContent = "Quiz Completed!!";
//     nextEl.remove();
//   } else {
//     showQuestion();
//   }
// }

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = ""; // Clear previous options

  // Check if the quiz has ended
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = "Quiz Completed!!";
    nextEl.style.display = "none"; // Hide the Next button

    // Create a "Try Again" button
    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.addEventListener("click", () => {
      // Reset quiz state
      currentQuestion = 0;
      score = 0;
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      optionEl.textContent = ""; // Clear options div
      nextEl.style.display = "block"; // Show Next button again

      // Remove the retry button after clicking it
      retryButton.remove();

      // Display the first question again
      showQuestion();
    });

    // Add the retry button to the options div
    optionEl.appendChild(retryButton);
  } else {
    // Show the next question if quiz is not yet completed
    showQuestion();
  }
}

//Shuffling the Options
function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

//   shuffleOptions([1, 2, 3, 4, 5]);
