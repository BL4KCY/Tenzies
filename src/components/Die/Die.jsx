import React from 'react'
import styles from './Die.module.css'

export default function Die(props) {
  return (
    <button
      className={props.isHeld ? 'held' : ''}
      onClick={props.hold}
    >{props.value}</button>
  )
}
