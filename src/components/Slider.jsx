import React, { useRef, useState } from 'react';
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

  const {contextSafe} = useGSAP(() => {
    gsap.registerPlugin(Draggable);
    gsap.set(slides.current, { display: 'none' });
    gsap.set(slides.current[currentIndex], { display: 'flex' });
  }, { scope: container});

  const handleNext = contextSafe(() => {
    if (currentIndex < songData.length - 1) {
      let tl = gsap.timeline();
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      tl.to(slides.current[currentIndex], {
        x: -300,
        duration: 0.3,
        ease: 'power.inOut',
        display: 'none',
      })
      // .set(slides.current[currentIndex], { display: 'none', ease: 'power.inOut', duration: 0.01, })
      // .set(slides.current[newIndex], { display: 'flex', ease: 'power.inOut', duration: 0.01, })
      .from(slides.current[newIndex], {
        x: 300,
        duration: 0.3,
        ease: 'power.inOut',
      })
      .to(slides.current[newIndex],{
        display: 'flex',
        x: 0,
        duration: 0.3,
        ease: 'power.inOut',
      })
    }
  });

  const handlePrev = contextSafe(() => {
    if (currentIndex > 0) {
      let tl = gsap.timeline();
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      tl.to(slides.current[currentIndex], {
        x: 300,
        duration: 0.3,
        ease: 'power.inOut',
        display: 'none',
      })
      // .set(slides.current[currentIndex], { display: 'none', ease: 'power.inOut', duration: 0.01, })
      // .set(slides.current[newIndex], { display: 'flex', ease: 'power.inOut', duration: 0.01, })
      .from(slides.current[newIndex], {
        x: -300,
        duration: 0.3,
        ease: 'power.inOut',
      })
      .to(slides.current[newIndex],{
        display: 'flex',
        x: 0,
        duration: 0.3,
        ease: 'power.inOut',
      })
    }
  });
  


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
          className={`${layout.slide} `}
          // style={{ transform: `translateX(${i === currentIndex ? '0%' : '100%'})` }}
        >
          <img className="w-full rounded-2xl" src={require(`../assets/images/${song.songImage}`)} alt={song.songName} />
          <div className={`${s.flexBetween} w-full `}>
            <div className="">
              <div className="text-3xl">{song.songName}</div>
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
          <div className={`${s.flexCenter} gap-5 text-2xl w-full`}>
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


// useEffect(() => {
//   if (slides.current.length > 0) {
//     gsap.to(slides.current, {
//       xPercent: -50 * currentIndex,
//       duration: 0.5,
//       ease: 'power2.inOut',
//     });

//     Draggable.create(slides.current, {
//       type: 'x',
//       bounds: { minX: -window.innerWidth * (songData.length - 1), maxX: 0 },
//       inertia: true,
//       onDragEnd: function () {
//         const newIndex = Math.round(-this.x / window.innerWidth);
//         setCurrentIndex(newIndex);
//         gsap.to(slides.current, { xPercent: -100 * newIndex, duration: 0.5 });
//       },
//     });
//   }
// }, [currentIndex]);

// const handleNext = contextSafe(() => {
//   if (currentIndex < songData.length - 1) {
//     const newIndex = currentIndex + 1;
//     setCurrentIndex(newIndex);
//     gsap.to(slides.current, {
//       xPercent: -50 * newIndex,
//       duration: 0.5,
//       ease: 'bounce.in'
//     });
//   }
// })

// const handlePrev = contextSafe(() => {
//   if (currentIndex > 0) {
//     const newIndex = currentIndex - 1;
//     setCurrentIndex(newIndex);
//     gsap.to(slides.current, {
//       xPercent: -50 * newIndex,
//       duration: 0.5,
//       ease: 'bounce.in'
//     });
//   }
// })
