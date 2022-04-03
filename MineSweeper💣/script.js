import { createBoard, markTile, revealTile } from "./minesweeper.js";

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 5

const body = document.querySelector('body')
body.addEventListener('contextmenu', e => e.preventDefault())
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES) //create board with random mines and hidded tiles
const boardElement = document.querySelector('.board')

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
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

boardElement.style.setProperty('--size', BOARD_SIZE)