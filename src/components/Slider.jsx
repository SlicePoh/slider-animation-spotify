import React, { useRef, useState, useEffect } from 'react';
import s, { layout } from '../style';
import { IoPause, IoPlay } from 'react-icons/io5';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import songData from '../assets/data.json';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';


export const Slider = () => {
  const [isPlay, setIsPlay] = useState(songData.map(() => false));
  const [isLike, setIsLike] = useState(songData.map(() => false));
  const container = useRef(null);
  const slides = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const contextSafe = useGSAP(()=>{
    gsap.registerPlugin(Draggable);
  },{scope: slides});
  useEffect(() => {
    if (slides.current.length > 0) {
      gsap.to(slides.current, {
        xPercent: -100 * currentIndex,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      Draggable.create(container.current, {
        type: 'x',
        bounds: { minX: -window.innerWidth * (songData.length - 1), maxX: 0 },
        inertia: true,
        onDragEnd: function () {
          const newIndex = Math.round(-this.x / window.innerWidth);
          setCurrentIndex(newIndex);
          gsap.to(slides.current, { xPercent: -100 * newIndex, duration: 0.5 });
        },
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < songData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      gsap.to(slides.current, { xPercent: -100 * newIndex, duration: 0.5 });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      gsap.to(slides.current, { xPercent: -100 * newIndex, duration: 0.5 });
    }
  };

  const togglePlay = (index) => {
    setIsPlay((prev) => prev.map((play, i) => (i === index ? !play : play)));
  };

  const toggleLike = (index) => {
    setIsLike((prev) => prev.map((like, i) => (i === index ? !like : like)));
  };

  return (
    <div ref={container} className={`${layout.slider}`}>
      {songData.map((song, i) => (
        <div
          ref={(el) => (slides.current[i] = el)}
          key={i}
          className={`${layout.slide} ${i === currentIndex ? 'block' : 'hidden'}`}
          style={{ transform: `translateX(${i === currentIndex ? '0%' : '100%'})` }}
        >
          <img className="w-full rounded-lg" src={require(`../assets/images/${song.songImage}`)} alt={song.songName} />
          <div className={`${s.flexBetween} w-5/6`}>
            <div className="">
              <div className="text-2xl">{song.songName}</div>
              <div className="text-2xs font-normal">{song.artist}</div>
            </div>
            <div className="bg-white rounded-full p-1">
              {isLike[i] ? (
                <FcLike onClick={() => toggleLike(i)} />
              ) : (
                <FcLikePlaceholder onClick={() => toggleLike(i)} />
              )}
            </div>
          </div>
          <div className={`${s.flexCenter} gap-5 text-2xl`}>
            <TbPlayerTrackPrevFilled onClick={handlePrev} />
            {isPlay[i] ? (
              <button onClick={() => togglePlay(i)} className={`${s.flexCenter} rounded-full bg-white p-1`}>
                <IoPause className="text-black" />
              </button>
            ) : (
              <button onClick={() => togglePlay(i)} className={`${s.flexCenter} rounded-full bg-white p-1`}>
                <IoPlay className="text-black" />
              </button>
            )}
            <TbPlayerTrackNextFilled onClick={handleNext} />
          </div>
        </div>
      ))}
    </div>
  );
};
