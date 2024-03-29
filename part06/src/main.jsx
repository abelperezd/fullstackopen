import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const updateStore = (value) => {
    store.dispatch({
      type: value
    })
  }

  return (
    <div>
      <button onClick={() => updateStore('GOOD')}>Good</button>
      <button onClick={() => updateStore('OK')}>Ok</button>
      <button onClick={() => updateStore('BAD')}>Bad</button>
      <button onClick={() => updateStore('ZERO')}>Reset stats</button>
      <div>good: {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
