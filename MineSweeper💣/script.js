import { createBoard, markTile, revealTile, checkWin, checkLose } from "./minesweeper.js";

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const body = document.querySelector('body')
body.addEventListener('contextmenu', e => e.preventDefault())
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES) //create board with random mines and hidded tiles
const boardElement = document.querySelector('.board')
const messageText = document.querySelector('.subtext')

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
      checkGameEnd(board, tile)
    })
    tile.element.addEventListener('contextmenu', e => {
      e.preventDefault()
      markTile(tile)
      listMinesLeft()
    })
  })
})

// mines left
const minesLeftText = document.querySelector('[data-mine-left]')
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
  let total = 0
  board.map(row => {
    row.map(tile => {
      if (tile.status === 'marked') {
        total += 1
      }
    })
  })
  minesLeftText.textContent = NUMBER_OF_MINES - total
}

// game end
function checkGameEnd(board, tile) {
  const win = checkWin(board)
  const lose = checkLose(tile)

  if (win || lose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })
  }
  if (win) {
    messageText.textContent = 'You Win'
  }
  if (lose) {
    messageText.textContent = 'You Lose'
    board.map(row => {
      row.map(tile => {
        if (tile.mine === true) {
          tile.status = 'mine'
        }
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

boardElement.style.setProperty('--size', BOARD_SIZE)