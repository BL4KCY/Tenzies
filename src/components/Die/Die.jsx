import React from 'react'
import styles from './Die.module.css'

export default function Die(props) {
  return (
    <button
      className={props.isHeld ? 'held' : ''}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value} ${props.isHeld ? 'Held' : 'not held'}`}
    >{props.value}</button>
  )
}
