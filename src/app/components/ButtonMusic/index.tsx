'use client'
import { useRef, useState } from 'react'

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [show, setShow] = useState(true)

  function handlePlay() {
    if (audioRef.current) {
      audioRef.current.muted = false
      audioRef.current.play()
      setShow(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="app/audio/musica_romantica.mp3"
      />
      {show && (
        <button
          id="playBtn"
          aria-label="Ativar música"
          onClick={handlePlay}
          style={{
            marginTop: 20,
            backgroundColor: '#d63384',
            color: 'white',
            border: 'none',
            padding: '12px 22px',
            fontSize: '1.1em',
            borderRadius: 8,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          🔊 Ativar música
        </button>
      )}
    </>
  )
}
