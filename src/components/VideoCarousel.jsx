import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import {hightlightsSlides} from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  
  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease: "power2.inOut",
    })
    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgess = 0;
    let span = videoSpanRef.current;
    if(span[videoId]) {
        // animate the progress of the video
        let anim = gsap.to(span[videoId], {
          onUpdate: () => {
            const progress = Math.ceil(anim.progress() * 100);
            if(progress != currentProgess) {
                currentProgess = progress;
                gsap.to(videoDivRef.current[videoId], {
                    width: window.innerWidth < 760 ? '10vw' : // mobile
                    window.innerWidth < 1200 ? '10vw' : '4vw', // tablet and laptop
                })
                // set the background color of the progress bar
                gsap.to(span[videoId], {
                    width: `${currentProgess}%`,
                    backgroundColor: 'white'
                })
            }
          },
          onComplete: () => {
            gsap.to(videoDivRef.current[videoId], {
                width: '12px'
            })
            gsap.to(span[videoId], {
                backgroundColor: '#afafaf'
            })
          }
        })

        if(videoId == 0){
            anim.restart();
        }
        // update the progress bar
        const animUpdate = () => {
            anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
        }

        if(isPlaying) {
            gsap.ticker.add(animUpdate);
        }else{
            gsap.ticker.remove(animUpdate);
        }
    }
  }, [videoId, startPlay])

  const handleProcess = (type, i) => {
    switch(type) {
      case 'video-end' :
        setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: i + 1}))
      break;
      case 'video-last' :
        setVideo((prevVideo) => ({...prevVideo, isLastVideo: true}))
      break;
      case 'video-reset' :
        setVideo((prevVideo) => ({...prevVideo, isLastVideo: false, videoId: 0}))
      break;
      case "pause":
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
      break;
      case 'play' :
        setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
      break;

      default:
        return video;
    }
  }

  const handleLoadedMetadata = (i, e) => setLoadedData((prevLoadedData) => [...prevLoadedData, e])

  return (
    <>
    <div className='flex items-center'>
        {hightlightsSlides.map((slide, index) => (
            <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
                <div className='video-carousel_container'>
                    <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                        <video id='video' preload="auto" muted playsInline={true} 
                        className={`${slide.id === 2 && 'translate-x-44'} pointer-events-none`}
                        ref={(el) => (videoRef.current[index] = el)}
                        onEnded={() => index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last')}
                        onPlay={() => {
                            setVideo((prevVideo) => ({...prevVideo, isPlaying: true}))
                        }}
                        onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                        >
                            <source src={slide.video} type="video/mp4" />
                        </video>
                    </div>
                    <div className='absolute top-12 left-[5%] z-10'>
                        {slide.textLists.map((text) => (
                            <p key={text} className='text-xl font-medium'>{text}</p>
                        ))}
                    </div>
                </div>
            </div>  
        ))}
    </div>
    <div className='relative flex-center mt-10'>
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_, i) => (
                <span
                key={i}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                ref={(el) => (videoDivRef.current[i] = el)}
                >
                <span
                    className="absolute h-full w-full rounded-full"
                    ref={(el) => (videoSpanRef.current[i] = el)}
                />
                </span>
            ))}
        </div>
        <button className='control-btn'>
            <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg } 
            alt={isLastVideo ? 'replay' : !isPlaying ? 'Play' : 'Pause'} 
            onClick={isLastVideo ? () => handleProcess('video-reset')
            : !isPlaying ? () => handleProcess('play') 
            : () => handleProcess('pause')
            }
            />
        </button>
    </div>
    </>
  )
}

export default VideoCarousel