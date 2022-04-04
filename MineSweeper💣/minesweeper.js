const TILE_STATUSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

export function createBoard(boardSize, numberOfMines) {
  const board = []
  const minePositions = getMinesPositions(boardSize, numberOfMines)

  // BOARD
  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement('div') // for each cell create element
      element.dataset.status = TILE_STATUSES.HIDDEN // add [data-status='hidden] for each
      // TILES ON BOARD
      const tile = {
        x,
        y,
        element,
        mine: minePositions.some(positionMatch.bind(null, { x, y })), // true if any of minePosition matches this tile pos
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        }
      }
      row.push(tile)
    }
    board.push(row)
  }
  return board
}
// TILES
export function markTile(tile) {
  switch (tile.status) {
    case TILE_STATUSES.HIDDEN:
      return tile.status = TILE_STATUSES.MARKED
    case TILE_STATUSES.MARKED:
      return tile.status = TILE_STATUSES.HIDDEN
    default:
      return;
  }
}
export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) return //break if tile is not status='hidden'
  if (tile.mine === true) {
    tile.status = TILE_STATUSES.MINE
    return
  }

  tile.status = TILE_STATUSES.NUMBER
  const tilesAround = nearbyTiles(board, tile)
  const mines = tilesAround.filter(tile => tile.mine === true)
  if (mines.length === 0) {
    tilesAround.map(revealTile.bind(null, board))
  } else {
    tile.element.textContent = mines.length
  }
}

// check for win
export function checkWin(board) {
  return board.every(row => {
    return row.every(tile => {
      return tile.status === TILE_STATUSES.NUMBER || (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
    })
  })
}
// check for lose
export function checkLose(tile) {
  return tile.mine === true
}

// MINES
function getMinesPositions(boardSize, numberOfMines) {
  const positions = []

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }
    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position)
    }
  }

  return positions
}
function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

// generate random number
function randomNumber(size) {
  return Math.floor(Math.random() * size)
}

// checks tiles around revealedTile
function nearbyTiles(board, { x, y }) {
  const tiles = []
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset]
      if (tile) tiles.push(tile)
    }
  }
  return tiles
}
