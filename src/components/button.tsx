import { HTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  label?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isLoading?: boolean
  isDisabled?: boolean
} & HTMLAttributes<HTMLButtonElement>

export function PrimaryActionButton(props: ButtonProps) {
  if (!props.label && !props.iconLeft && !props.iconRight) {
    throw new Error('Button must have at least one of the following: label, iconLeft, iconRight')
  }

  if (!props.onClick) {
    throw new Error('Button must have an onClick callback')
  }

  return (
    <button
      type="button"
      disabled={props.isDisabled ?? false}
      onClick={props.onClick}
      className={twMerge(
        'bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-800 relative flex h-10 w-auto shrink-0 items-center justify-center rounded-full px-6 text-xs font-medium text-white shadow-lg shadow-fuchsia-600/40 hover:shadow-fuchsia-800/40 transition-all duration-300',
        props.className
      )}
    >
      {!!props.isLoading && <FaSpinner className="animate-spin" />}
      {!props.isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          {!!props.iconLeft && props.iconLeft}
          {!!props.label && <span>{props.label}</span>}
          {!!props.iconRight && props.iconRight}
        </div>
      )}
    </button>
  )
}

export function SecondaryActionButton(props: ButtonProps) {
  if (!props.label && !props.iconLeft && !props.iconRight) {
    throw new Error('Button must have at least one of the following: label, iconLeft, iconRight')
  }

  if (!props.onClick) {
    throw new Error('Button must have an onClick callback')
  }

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={twMerge(
        'flex w-auto shrink-0 items-center justify-center rounded-full bg-fuchsia-200 px-6 py-3 text-xs font-medium text-fuchsia-600 shadow-none transition-all duration-300 hover:bg-fuchsia-300',
        props.className
      )}
    >
      {!!props.isLoading && <FaSpinner className="animate-spin" />}
      {!props.isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          {!!props.iconLeft && props.iconLeft}
          {!!props.label && <span>{props.label}</span>}
          {!!props.iconRight && props.iconRight}
        </div>
      )}
    </button>
  )
}
