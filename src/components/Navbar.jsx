import React from 'react'
import s,{ layout } from '../style'
import { TfiMenuAlt } from "react-icons/tfi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

export const Navbar = () => {
  return (
    <div className={`${layout.navbar} `}>
        <TfiMenuAlt />
        <div className="text-4xl md:text-5xl font-semibold">Liked Songs</div>
        <PiDotsThreeOutlineFill />
    </div>
  )
}
