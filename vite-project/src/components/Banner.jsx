import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[70vh] bg-cover bg-center flex items-end' style={{backgroundImage : 'url(https://images.hdqwalls.com/download/avengers-end-game-4k-banner-cb-1366x768.jpg)'}}>
      <div className='text-white text-xl text-center w-full bg-gray-900/60 p-3'>Avengers End-game</div>
    </div>
  )
}

export default Banner