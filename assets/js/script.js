var timerEl = document.getElementById('countdown');
const quizRulesEl = document.getElementById('quiz-rules');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const highScore = JSON.parse(localStorage.getItem("highScores")) || [];

var shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', setNextQuestion)

function startGame() {
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove('hide')
	quizRulesEl.classList.add('hide');

	setNextQuestion();

	countdown();
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}

function resetState() {
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setScore(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setScore(button, button.dataset.correct)
	})
}

function setScore(element, correct) {
	if (correct) {
		console.log('yes')
	} else {
		console.log('no')
	}
}

// Timer that counts down from 5
function countdown() {

	var timeLeft = 30;

	// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
	var timeLimit = setInterval(function () {
		// As long as the `timeLeft` is greater than 1
		if (timeLeft > 1) {
			// Set the `textContent` of `timerEl` to show the remaining seconds
			timerEl.textContent = timeLeft + ' seconds remaining';
			// Decrement `timeLeft` by 1
			timeLeft--;
		} else if (timeLeft === 1) {
			// When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
			timerEl.textContent = timeLeft + ' second remaining';
			timeLeft--;
		} else {
			clearInterval(timeLimit);
			// Once `timeLeft` gets to 0, set `timerEl` to an empty string
			timerEl.textContent = '';
			// Use `clearInterval()` to stop the timer
			// Call the `displayMessage()` function

		}
	}, 1000);
}

const questions = [
	{
		question: 'hello',
		answers: [
			{text: 'lol', correct: true},
			{text: 'los', correct: false}
		]
	},
	{
		question: 'bruh',
		answers: [
			{text: 'lol', correct:true},
			{text: 'lol', correct:false}
		]
	}
]