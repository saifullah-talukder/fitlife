'use client'

import React, { HTMLAttributes } from 'react'

export default function NavigationArrowButton(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={props.onClick}
      className="text-primary flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 transition duration-300"
    >
      {props.children}
    </button>
  )
}
