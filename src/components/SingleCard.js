import React from 'react'

function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className='card'>
      <div>
        <img 
        className='w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] block rounded-lg border-2 border-white bg-white' src={card.src} 
        alt="Card Front" />
        <img 
        className={`w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] block rounded-lg border-2 border-white absolute -translate-y-[3.1rem] sm:-translate-y-[5rem] md:-translate-y-[6.3rem] ${flipped ? 'hidden':''}`} 
        src="/Image/cover.jpg" 
        alt="Card Back"
        onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard