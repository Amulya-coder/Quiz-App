const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
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
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'The <body> section', correct: false },
      { text: 'The <head> section', correct: false },
      { text: 'Both <head> and <body> section', correct: true },
      { text: 'None of these', correct: false }       
    ]
  },
  {
    question: 'What is HTML?',
    answers: [
      { text: 'Hypertext Markup Language', correct: true },
      { text: 'Hypertext Modified Language', correct: false },
      { text: 'Hypertext Makeup Language', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    question: 'Why JavaScript is used?',
    answers: [
      { text: 'To create dynamic web pages', correct: true },
      { text: 'To create static pages', correct: false },
      { text: 'To add styling to web pages', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    question: 'What would be the result of 3+2+"7" in JavaScript',
    answers: [
      { text: '78', correct: false },
      { text: '57', correct: true },
      { text: '47', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "file.js"?',
    answers:[
        {text: '<script name="file.js">', correct: false},
        {text: '<script src="file.js">', correct: true},
        {text: '<script href="file.js">', correct: false},
        {text: 'None of these', correct: false }
    ]
  },
  {
  question: 'How do you create a function in JavaScript?',
  answers:[
      {text: 'function = myFunction()', correct: false},
      {text: 'function:myFunction()', correct: false},
      {text: 'function myFunction()', correct: true },
      {text: 'None of these', correct: false}
  ]
}
]