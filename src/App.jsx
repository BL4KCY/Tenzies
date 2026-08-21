import { use, useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die/Die'
import Timer from './components/Timer/Timer'
import './App.css'
import ReactConfetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook'

function App() {
  function generateDice() {
    return new Array(10).fill(0).map((item,i) => (
      {
        id: nanoid(),
        randomValue: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    )
  }

  const [dice, setDice] = useState(() => generateDice(null))
  const [count, setCount] = useState(0)
  
  const newGameRef = useRef(null);
  const timerRef = useRef(null);

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
    setCount(prevCount => prevCount + 1)
  }

  function hold(id) {
    setDice(prevDice => (
      prevDice.map(die => (
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      ))
    ))
  }

  const isWon = dice.every(die => (
    die.randomValue === dice[0].randomValue && die.isHeld
  ))

  isWon && timerRef.current.pause();

  function newGame() {
    setDice(generateDice())
    setCount(0)
    timerRef.current.reset();
  }

  useEffect(() => {
    if (isWon && newGameRef.current !== null) {
      newGameRef.current.focus()
    }
  }, [isWon])

  return (
    <main>
      <div className='game-stats'>
        <Timer ref={timerRef} />
        <span className='roll-counter'>Rolls: {count < 10 ? '0': ''}{count}</span>
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='description'>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die-container">
        {dieList}
      </div>
      {
        isWon
          ? <button ref={newGameRef} className='new-game' onClick={newGame}>New Game</button>
          : <button className='roll-dice' onClick={rollDice}>Roll</button>
      }
      {isWon && <ReactConfetti />}
    </main>
  )
}

export default App
