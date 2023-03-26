import React from 'react'
import { Audio, Puff } from 'react-loader-spinner'
import './Loader.css' // import CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <Puff height="100" width="100" color="#2196f3" ariaLabel="Loading" />
    </div>
  )
}

export default Loader
