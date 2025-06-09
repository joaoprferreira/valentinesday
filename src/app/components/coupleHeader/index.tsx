'use client'
import { useEffect, useState } from 'react'

interface CoupleHeaderProps {
  coupleName: string
  since: string // formato: '2023-01-01T00:00:00' ou '2023-01-01'
}

function getTimeDiff(since: string) {
  const start = new Date(since)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    months += 12
    years--
  }

  return { years, months, days, hours, minutes, seconds }
}

export function CoupleHeader({ coupleName, since }: CoupleHeaderProps) {
  const [diff, setDiff] = useState(getTimeDiff(since))

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(getTimeDiff(since))
    }, 1000)
    return () => clearInterval(interval)
  }, [since])

  return (
    <section className="w-full flex flex-col items-center mb-6">
      <h2 className="text-pink-500 text-2xl md:text-3xl font-bold mb-1 tracking-wide drop-shadow text-center">
        {coupleName}
      </h2>
      <p className="text-pink-400 text-sm mb-3 text-center">Juntos há</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-xs mb-2">
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.years).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">anos</span>
        </div>
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.months).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">meses</span>
        </div>
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.days).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">dias</span>
        </div>
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.hours).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">h</span>
        </div>
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.minutes).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">min</span>
        </div>
        <div className="flex flex-col items-center bg-pink-100/80 rounded-lg py-2">
          <span className="text-pink-700 font-bold text-lg">
            {String(diff.seconds).padStart(2, '0')}
          </span>
          <span className="text-pink-400 text-xs">s</span>
        </div>
      </div>
    </section>
  )
}
