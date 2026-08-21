import { useEffect, useImperativeHandle } from 'react'
import './Timer.css'
import { useStopwatch } from 'react-timer-hook'

export default function Timer(props) {
  const {
		pause,
		reset,
		minutes,
		seconds
	} = useStopwatch()

	useImperativeHandle(props.ref, () => ({reset, pause})) // this allow me to use those callbacks in the parrent component

	return (
		<div className='timer-container'>
			<span className='minutes'>{minutes < 10 ? '0' : ''}{minutes}</span>
			<span className='seconds'>{seconds < 10 ? '0' : ''}{seconds}</span>
		</div>
	)
}
