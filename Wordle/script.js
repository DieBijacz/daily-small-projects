import { words } from './targetWords.js'
import { dictionary } from './dictionary.js'
const guessGrid = document.querySelector('.guess-grid')

function startInteraction() {
  document.addEventListener('click', handleMouseClick)
  document.addEventListener('keydown', handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener('click', handleMouseClick)
  document.removeEventListener('keydown', handleKeyPress)
}

// INPUT LISTENERS
// mouse
function handleMouseClick(e) {
  if (e.target.matches('[data-key]')) {
    pressKey(e.target.dataset.key) //e.target targets specific key /// then dataset refers to data-key="Q" in this div
    return
  }
  if (e.target.matches('data-enter')) {
    submitGuess()
    return
  }
  if (e.target.matches('data-delete')) {
    deleteKey()
    return
  }
}

// keyboard
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    submitGuess()
    return
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    deleteKey()
    return
  }
  if (e.key.match(/^[a-z]$/i)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  const nextTile = guessGrid.querySelector(':not([data-letter])') //that will select first empty tile
  nextTile.dataset.letter = key.toLowerCase() //asing dataset to this tile
  nextTile.textContent = key
  nextTile.dataset.state = 'active'
}

startInteraction()