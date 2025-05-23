
import { useEffect, useRef, useState } from "react";

const SceneAudio = ({audioPath, isPlaying, mute, volume}) => {
  const audioRef = useRef(new Audio(audioPath))

  const [_, setIsLoading] = useState(true)
  const [__, setIsPlaying] = useState(false)

  /**
   * Play Audio Effects
   */
  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true
    audio.volume = 0.5

    const handleCanPlay = () => setIsLoading(false)
    audio.addEventListener('canplay', handleCanPlay)

    const playAudio = async () => {
      try {
        if (isPlaying && !mute) {
          await audio.play()
        } else {
          audio.pause()
        }
      } catch (error) {
        console.log('Audio playback error:', error)
        setIsPlaying(false)
      }
    }

    playAudio()

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying, mute, volume])

  return (
    <></>
  )
}

export default SceneAudio
