import { words } from './targetWords.js'
import { dictionary } from './dictionary.js'

const guessGrid = document.querySelector('.guess-grid')
const alertContainer = document.querySelector('.alert-container')
const keyboard = document.querySelector('.keyboard')
const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const targetWord = words[Math.floor(Math.random() * words.length)]

console.log(targetWord)

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
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(':not([data-letter])') //that will select first empty tile
  nextTile.dataset.letter = key.toLowerCase() //asing dataset to this tile
  nextTile.textContent = key
  nextTile.dataset.state = 'active'
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile === null) return
  lastTile.textContent = ''
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert('Not enough letters')
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, '')
  if (!dictionary.includes(guess)) {
    showAlert('Not in word list')
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.map((tile, index, array) => flipTile(tile, index, array, guess))
}

function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add('flip')
  }, index * FLIP_ANIMATION_DURATION / 2)

  tile.addEventListener('transitionend', () => {
    tile.classList.remove('flip')
    if (targetWord[index] === letter) {
      tile.dataset.state = 'correct'
      key.classList.add('correct')
    } else if (targetWord.includes(letter)) {
      tile.dataset.state = 'wrong-location'
      key.classList.add('wrong-location')
    } else {
      tile.dataset.state = 'wrong'
      key.classList.add('wrong')
    }

    if (index === array.length - 1) {
      tile.addEventListener('transitionend', () => {
        startInteraction()
        checkWin(guess, array)
      }, { once: true })
    }
  }, { once: true })
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement('div')
  alert.classList.add('alert')
  alert.textContent = message
  alertContainer.prepend(alert)
  if (duration === null) return
  // alert fadeout after duration
  setTimeout(() => {
    alert.classList.add('hide')
    alert.addEventListener('transitionend', () => { // remove alert after transition ends
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  // add class, shake it babe, remove class after its done once
  tiles.map(tile => {
    tile.classList.add('shake')
    tile.addEventListener('animationend', () => {
      tile.classList.remove('shake')
    }, { once: true })
  })
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function checkWin(guess, tiles) {
  if (guess === targetWord) {
    showAlert('You win', 5000)
    danceTiles(tiles)
    stopInteraction()
  }
  const remainingTiles = guessGrid.querySelectorAll(':not([data-letter])')
  if (remainingTiles.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    stopInteraction
  }
}

function danceTiles(tiles) {
  tiles.map((tile, index) => {
    setTimeout(() => {
      tile.classList.add('dance')
      tile.addEventListener('animationend', () => {
        tile.classList.remove('dance')
      }, { once: true })
    }, index * DANCE_ANIMATION_DURATION / 5)
  })
}

startInteraction()