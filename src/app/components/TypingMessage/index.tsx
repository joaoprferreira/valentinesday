'use client'
import { useEffect, useRef, useState } from 'react'

export function TypingMessage({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const i = useRef(0)

  useEffect(() => {
    function type() {
      if (i.current < text.length) {
        setDisplayed((prev) => prev + text.charAt(i.current))
        i.current++
        setTimeout(type, 50)
      }
    }
    type()
  }, [text])

  return <span className="typing">{displayed}</span>
}
