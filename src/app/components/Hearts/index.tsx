'use client'
import { useEffect } from 'react'

export function Hearts() {
  useEffect(() => {
    const hearts: HTMLDivElement[] = []

    function createHeart() {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.style.left = Math.random() * 100 + 'vw'
      heart.style.animationDuration = 5 + Math.random() * 5 + 's'
      heart.style.opacity = String(Math.random())
      heart.style.transform = `rotate(45deg) scale(${0.5 + Math.random()})`
      heart.style.bottom = '-20px'
      heart.style.position = 'fixed'
      document.body.appendChild(heart)
      hearts.push(heart)
      setTimeout(() => {
        heart.remove()
      }, 11000)
    }

    for (let i = 0; i < 15; i++) {
      createHeart()
    }

    const interval = setInterval(createHeart, 700)

    return () => {
      clearInterval(interval)
      hearts.forEach((h) => h.remove())
    }
  }, [])

  return null
}
