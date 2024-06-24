const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: 0
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        answer: 0
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: 2
    },
    {
        question: "In what year did the Titanic sink?",
        options: ["1902", "1912", "1922", "1932"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
        answer: 3
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        answer: 2
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionElements = document.querySelectorAll('.option span');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');

    questionElement.textContent = quizQuestions[currentQuestionIndex].question;
    optionElements.forEach((element, index) => {
        element.textContent = quizQuestions[currentQuestionIndex].options[index];
    });

    feedbackElement.textContent = '';
    feedbackElement.classList.remove('correct', 'incorrect');
    nextButton.classList.add('hidden');
    scoreElement.textContent = `Score: ${score}`;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const answer = parseInt(selectedOption.value);
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');

    if (answer === quizQuestions[currentQuestionIndex].answer) {
        score++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.add('correct');
    } else {
        feedbackElement.textContent = 'Incorrect!';
        feedbackElement.classList.add('incorrect');
    }

    document.querySelectorAll('input[name="option"]').forEach(input => input.disabled = true);
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        document.querySelector('input[name="option"]:checked').checked = false;
        document.querySelectorAll('input[name="option"]').forEach(input => input.disabled = false);
        loadQuestion();
    } else {
        showResult();
        // В этом блоке, после показа результатов, скрой контейнер с вопросами и покажи кнопку "Restart Quiz"
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('restart-btn').classList.remove('hidden');
    }
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const resultElement = document.getElementById('result');
    const restartButton = document.getElementById('restart-btn');

    quizContainer.classList.add('hidden');
    resultElement.textContent = `Your score is ${score} out of ${quizQuestions.length}`;
    resultElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}



window.onload = loadQuestion;
