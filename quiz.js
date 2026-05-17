let quesJSON = [];
let score = 0;
let currentQuestion = 0;
let totalScore = 0;

//Accessing all the elements:
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");

// Fetch questions from JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    quesJSON = data;
    totalScore = quesJSON.length;
    showQuestion();
  })
  .catch((error) => console.error("Error loading questions:", error));

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  nextQuestion();
});

prevEl.addEventListener("click", () => {
  previousQuestion();
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
    prevEl.style.display = "none"; // Hide the Previous button

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
      prevEl.style.display = "block"; // Show Previous button again
      prevEl.disabled = true; // Disable on first question

      // Remove the retry button after clicking it
      retryButton.remove();

      // Display the first question again
      showQuestion();
    });

    // Add the retry button to the options div
    optionEl.appendChild(retryButton);
  } else {
    // Update Previous button state
    prevEl.disabled = currentQuestion === 0;
    // Show the next question if quiz is not yet completed
    showQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    optionEl.textContent = ""; // Clear previous options
    prevEl.disabled = currentQuestion === 0; // Disable if on first question
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
