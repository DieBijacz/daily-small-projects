import { quizData } from "./questions.js";

const question = document.querySelector("#question")
const Atext = document.querySelector("#A-text")
const Btext = document.querySelector("#B-text")
const Ctext = document.querySelector("#C-text")
const Dtext = document.querySelector("#D-text")
const submitBtn = document.querySelector("#btn")
const answers = document.querySelectorAll(".answer")
const quiz = document.querySelector("#quiz")


let currentQuestion = 0
let score = 0
let answer

loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQiuz = quizData[currentQuestion]
    question.innerText = currentQiuz.question
    Atext.innerText = currentQiuz.A
    Btext.innerText = currentQiuz.B
    Ctext.innerText = currentQiuz.C
    Dtext.innerText = currentQiuz.D
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected()

    console.log(answer);

    if(answer){  
        if(answer === quizData[currentQuestion].correct) {
            score++
        }
        currentQuestion++
        if(currentQuestion < quizData.length){
            loadQuiz()
        } else {
            quiz.innerHTML = `<h2>You scored: ${score}/${quizData.length}</h2>`;
        }
    }
})

function getSelected() {
        
    answers.forEach((answerBox) => {
        if (answerBox.checked) {
            answer = answerBox.id
        } 
    })
    return answer
}

function deselectAnswers() {
    answers.forEach((answerBox) => {
        answerBox.checked = false
    })
}