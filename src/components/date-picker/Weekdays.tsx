import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const days = ['sa', 'su', 'mo', 'tu', 'we', 'th', 'fr']

export default function Weekdays(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('grid grid-cols-7 w-full', props.className ?? '')}>
      {days.map((d, i) => (
        <div key={i} className="col-span-1 py-2.5 flex justify-center items-center">
          <span className="uppercase text-xs font-medium text-slate-900">{d}</span>
        </div>
      ))}
    </div>
  )
}
