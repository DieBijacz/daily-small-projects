import Grid from './Grid.js'
import Tile from './Tile.js'

const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true })
}

async function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (!canMoveUp()) {
        setupInput()
        return
      }
      await moveUp()
      break
    case 'ArrowDown':
      if (!canMoveDown()) {
        setupInput()
        return
      }
      await moveDown()
      break
    case 'ArrowRight':
      if (!canMoveRight()) {
        setupInput()
        return
      }
      await moveRight()
      break
    case 'ArrowLeft':
      if (!canMoveLeft()) {
        setupInput()
        return
      }
      await moveLeft()
      break
    default:
      setupInput()
      return
  }
  grid.cells.forEach((cell) => cell.mergeTiles())

  const newTile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = newTile

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      alert('Game Over')
    })
    return
  }
  setupInput()
}

function moveUp() {
  return slideTiles(grid.cellsByColumn)
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((col) => [...col].reverse()))
}

function moveLeft() {
  return slideTiles(grid.cellsByRow)
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((col) => [...col].reverse()))
}

function canMoveUp() {
  return canMove(grid.cellsByColumn)
}
function canMoveDown() {
  return canMove(grid.cellsByColumn.map((col) => [...col].reverse()))
}
function canMoveRight() {
  return canMove(grid.cellsByRow)
}
function canMoveLeft() {
  return canMove(grid.cellsByRow.map((col) => [...col].reverse()))
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false
      if (cell.tile == null) return false
      const moveToCell = group[index - 1]
      return moveToCell.canAccept(cell.tile)
    })
  })
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = []
      // group represents row or column
      for (let i = 1; i < group.length; i++) {
        // for each cell in row / column
        const cell = group[i]
        if (cell.tile == null) continue
        let lastValidCell //init last valid cell to store information about how much group[j] can move
        for (let j = i - 1; j >= 0; j--) {
          //check for cells that tile can move to
          const moveToCell = group[j]
          if (!moveToCell.canAccept(cell.tile)) break // if can't move to that cell
          lastValidCell = moveToCell //store information on how much tile can move
        }

        // ?Are we able to move this tile
        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition())
          //check if there is tile on that position
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile //if there is then merge them
          } else {
            lastValidCell.tile = cell.tile // if not then asign that tile to cell
          }
          cell.tile = null
        }
      }
      return promises
    })
  )
}
