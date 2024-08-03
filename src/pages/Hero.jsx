import React from 'react'
//import s,{ layout } from '../style'
import { Slider } from '../components/Slider'
import { Navbar } from '../components/Navbar'

export const Hero = () => {
  return (
    <div className={` bg-black text-white font-babas min-h-screen`}>
      <Navbar/>
      <Slider/>
    </div>
  )
}
