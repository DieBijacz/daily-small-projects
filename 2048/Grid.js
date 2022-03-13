const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 1

export default class Grid {
  #cells

  constructor(gridElement) {
    // based on those property's there will be created board in css
    gridElement.style.setProperty('--grid-size', GRID_SIZE) //rows and columns
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`) //size of each cell
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`) //gaps beteween cells
    // !create Cell object for each created cell
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement, //cell element
        index % GRID_SIZE, // x
        Math.floor(index / GRID_SIZE) // y
      )
    })
  }

  //! GETTERS
  get cells() {
    return this.#cells
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [] //match or init array if there is no any
      cellGrid[cell.x][cell.y] = cell //asign cell to array matched by x so each cell in array have same x value => making this a column
      return cellGrid
    }, [])
  }
  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || []
      cellGrid[cell.y][cell.x] = cell
      return cellGrid
    }, [])
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null) // [] of empty cells
  }
  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length) //get random number in range (1, number of empty cells)
    return this.#emptyCells[randomIndex]
  }
}

class Cell {
  #cellElement
  #x
  #y
  #tile
  #mergeTile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement
    this.#x = x
    this.#y = y
  }

  //! GETTERS
  get x() {
    return this.#x
  }
  get y() {
    return this.#y
  }

  get tile() {
    return this.#tile
  }

  get mergeTile() {
    return this.#mergeTile
  }

  //! SETTERS
  set tile(value) {
    this.#tile = value
    if (value == null) return
    this.#tile.x = this.#x
    this.#tile.y = this.#y
  }

  set mergeTile(value) {
    this.#mergeTile = value
    if (value == null) return
    this.#mergeTile.x = this.#x
    this.#mergeTile.y = this.#y
  }

  canAccept(tile) {
    return (
      this.tile == null || //if there is no tile on that position then can't accept passed tile // return false
      (this.mergeTile == null && this.tile.value === tile.value) //return true if there was no mergeTile before and value of passed tile and that on which was canAccept called is same
    )
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return
    this.tile.value = this.tile.value + this.mergeTile.value
    this.mergeTile.remove()
    this.mergeTile = null
  }
}

function createCellElements(gridElement) {
  const cells = []
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cells.push(cell) //! adds to array (will be used in js)
    gridElement.append(cell) //! add to html
  }
  return cells
}
