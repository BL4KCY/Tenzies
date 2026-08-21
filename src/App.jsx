import { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die/Die'
import './App.css'
import ReactConfetti from 'react-confetti'
import confetti from 'canvas-confetti'


function App() {
  function generateDice() {
    return new Array(10).fill(0).map(item => (
      {
        id: nanoid(),
        randomValue: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    )
  }

  const [dice, setDice] = useState(generateDice(null))

  const dieList = dice.map(die => (
    <Die
      key={die.id}
      value={die.randomValue}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ))

  function rollDice() {
    const newDice = generateDice();
    setDice(prevDice => prevDice.map(die => (
      die.isHeld ? die : { ...die, randomValue: Math.floor(Math.random() * 6) + 1 }
    )))
  }

  function hold(id) {
    setDice(prevDice => (
      prevDice.map(die => (
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      ))
    ))
  }

  function newGame() {
    setDice(generateDice())
  }

  const isGameWon = dice.every(die => (
    die.randomValue === dice[0].randomValue && die.isHeld
  ))

  function selebrate() {
    // lift side
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 60,
      origin: { x: 0, y: 0.7 },
    });
    // right side
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 120,
      origin: { x: 1, y: 0.7 },
    });
  }

  isGameWon && selebrate()

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die-container">
        {dieList}
      </div>
      {
        isGameWon
          ? <button className='new-game' onClick={newGame}>New Game</button>
          : <button className='roll-dice' onClick={rollDice}>Roll</button>
      }
      {isGameWon && <ReactConfetti />}
    </main>
  )
}

export default App
