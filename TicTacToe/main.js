import { winningCombinations } from "./combinations.js"
const cellEl = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winnerMsg = document.querySelector('#winnig-msg')
const winningMessageModal = document.querySelector('#winning-message')
const restartBtn = document.querySelector('#restert')
const xClass = 'x'
const oClass = 'o'

let oTurn

startGame()
restartBtn.addEventListener('click', startGame)

function startGame() {
    clear()
    oTurn = true
    cellEl.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
}

function clear() {
    winningMessageModal.classList.remove('show')
    cellEl.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.classList.remove(oClass)
        cell.classList.remove(xClass)
    })
}

function handleClick (e) {
    const cell = e.target
    const currentClass = oTurn ? oClass : xClass
    //placeMark
    placeMark(cell, currentClass)
    
    //check for win
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        //switch turns
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (oTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellEl[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winnerMsg.innerText = 'Draw'
    } else {
        winnerMsg.innerText = `${oTurn ? 'o' : 'x'} wins`
    }
    winningMessageModal.classList.add('show')
}

function isDraw() {
    return [...cellEl].every(cell => {
        return cell.classList.contains(oClass) || cell.classList.contains(xClass)
    })
}