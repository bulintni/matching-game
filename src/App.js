"use client"

import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import HomeIcon from '@mui/icons-material/Home';
import FastForwardIcon from '@mui/icons-material/FastForward';


const cardImages = [
  {"src" : "/Fruit/apple.png" , matched:false},
  {"src" : "/Fruit/bananas.png" , matched:false},
  {"src" : "/Fruit/cherries.png" , matched:false},
  {"src" : "/Fruit/lemon.png" , matched:false},
  {"src" : "/Fruit/orange.png" , matched:false},
  {"src" : "/Fruit/pineapple.png" , matched:false},
  {"src" : "/Fruit/strawberry.png" , matched:false},
  {"src" : "/Fruit/watermelon.png" , matched:false}
];

const cardImagesLv2 = [
  {"src" : "/Fruit/dragon-fruit.png" , matched:false},
  {"src" : "/Fruit/Grapes.png" , matched:false},
  {"src" : "/Fruit/passion-fruit.png" , matched:false},
  {"src" : "/Fruit/kiwi.png" , matched:false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(0)
  const [isHidden, setIsHidden] = useState(false)
  const [isGridCols4, setIsGridCols4] = useState(true)
  
  //จำนวน card ทั้งหมด
  const totalPairs = cardImages.length;

  //Shuffle card
  const shuffleCards = () => {
    setIsHidden(true)

    const shuffleCards = [...cardImages, ...cardImages]

      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random }))
      
      setCards(shuffleCards)
      setTurns(0)
      setScore(0)
  }

  // handleChoice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // handleHome
  const handleHome = () => {
    window.location.reload()
  }

  // Next Level Button
  const nextLevel = () => {
    setScore(0)
    setIsGridCols4(!isGridCols4)
    cardImages.push(...cardImagesLv2)
    shuffleCards()
    setDisabled(true)
  }


  //Checking Matching a card
  useEffect (() => {

    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setScore(score => score+1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else {
        setTimeout(()=> resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  // Reset before Choiced 2 Card

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }



  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh]'>
      {/* Title Container */}
      <div className='flex flex-col justify-center items-center'>
        {/* Title */}
        <h1 className='text-5xl sm:text-7xl mb-12 font-bold'>Matching Card</h1>
        {/* Start Game Button */}
        <button className={`bg-white border-[2px] px-[12px] py-[6px] font-bold text-6xl rounded-xl w-[200px] h-[100px] hover:bg-slate-500 hover:text-white ${isHidden? 'hidden' : ''}`} onClick={shuffleCards}>
        Start
        </button>
      </div>

      {/* Cards Container */}
      {score < totalPairs ? (
      <div className='flex h-auto'>
        
        {/* Score and Home Button Container */}
        <div className={`flex flex-col items-center md:gap-20 sm:gap-10 gap-5 md:mr-10 mr-1 ${!isHidden? 'hidden' : ''}`}>

          {/* Home Button */}
          <button className='md:h-[100px] md:w-[100px] bg-yellow-500 rounded-full border-white border-4 text-white shadow-inner' onClick={handleHome}><HomeIcon fontSize="large" /></button>
          <div className='flex flex-col items-center justify-center'>
            <p className='md:text-3xl sm:text-xl text-lg'>Matches</p>
            <p className='md:text-3xl sm:text-xl text-lg'>{score}</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='md:text-3xl sm:text-xl text-lg'>Turns</p>
            <p className='md:text-3xl sm:text-xl text-lg'>{turns}</p>
          </div>
        </div>

        {/* Card Grid */}
        <div className={`card-grid grid ${isGridCols4 ? 'grid-cols-4' : 'grid-cols-6'} gap-2 sm:gap-4 md:gap-5`}>
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
        ) : (
      <div className='flex flex-col justify-center items-center mt-6'>
        <h2 className='font-bold text-6xl'>Win!</h2>
        <button className='bg-yellow-500 text-white px-5 py-5 mt-5 rounded-full' onClick={nextLevel}><FastForwardIcon fontSize='large'/></button>
      </div>
      )}
    </div>
      );
    }

export default App;
