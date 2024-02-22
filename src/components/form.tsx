'use client'

import { Listbox, Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { format } from 'date-fns'
import { Fragment, HTMLAttributes, ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { FiCalendar, FiChevronDown, FiXCircle } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import DatePicker from './date-picker/DatePicker'
import { DayCellProps } from './date-picker/DayCell'

type TextInputFieldProps = {
  inputClasses?: string
  icon?: ReactNode
  label?: string
  placeholder: string
  value?: string
  size?: 'sm' | 'md'
  isDisabled?: boolean
  hasBorder?: boolean
  validationSchema?: z.ZodString | z.ZodNumber
  onTextChange?: (input: string) => void
} & HTMLAttributes<HTMLDivElement>

export const TextInputField = forwardRef<unknown, TextInputFieldProps>((props, ref) => {
  const [hasBeenEdittedOnce, setHasBeenEdittedOnce] = useState(false)
  const [textInput, setTextInput] = useState(props.value ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const inputTag = `input-${props.label}-${props.placeholder}`
  const size = props.size ?? 'md'
  const hasIcon = !!props.icon

  useEffect(() => {
    props.onTextChange?.(textInput)

    if (props.isDisabled) {
      setErrorMessage('')
      return
    }

    if (!hasBeenEdittedOnce) {
      setHasBeenEdittedOnce(true)
      return
    }

    if (props.validationSchema) {
      const result = props.validationSchema.safeParse(textInput)

      if (!result.success) {
        setErrorMessage(result.error.errors[0]?.message)
      } else {
        setErrorMessage('')
      }
    }
  }, [textInput, props.isDisabled])

  useImperativeHandle(
    ref,
    () => ({
      isValidated() {
        return props.validationSchema?.safeParse(textInput).success ?? true
      },
      setInputText(val: string) {
        setTextInput(val)
      },
    }),
    [textInput, props.validationSchema]
  )

  const isFieldDisabled = props.isDisabled ?? false
  const hasValidationSchema = !!props.validationSchema
  const hasBorderOutline = props.hasBorder ?? false

  return (
    <div
      className={twMerge(
        classNames('flex flex-col items-stretch', { 'gap-y-1': hasValidationSchema }, props.className)
      )}
    >
      {!!props.label && <span className="ml-5 text-xs font-medium text-slate-400">{props.label}</span>}
      <div className="relative">
        <input
          type="text"
          id={inputTag}
          value={textInput}
          onChange={event => setTextInput(event.target.value)}
          disabled={isFieldDisabled}
          placeholder={props.placeholder}
          className={twMerge(
            classNames(
              'w-full rounded-full ring-fuchsia-600 bg-white font-medium text-slate-800 ring-1 placeholder:text-xs placeholder:font-light placeholder:text-slate-700 focus:ring-2 focus:outline-none focus:ring-fuchsia-600',
              {
                'py-3 pl-12 pr-6 text-sm': size === 'md' && hasIcon,
                'py-3 pl-6 pr-6 text-sm': size === 'md' && !hasIcon,
                'py-2.5 pl-11 pr-5 text-xs': size === 'sm' && hasIcon,
                'py-2.5 pl-6 pr-5 text-xs': size === 'sm' && !hasIcon,
                'border border-slate-200 bg-slate-200': isFieldDisabled,
                'border border-white bg-white': !isFieldDisabled,
                'border border-slate-200': hasBorderOutline,
              }
            ),
            props.inputClasses
          )}
        />
        <div className="text-slate-700 absolute left-5 top-1/2 -translate-y-1/2">{!!props.icon && props.icon}</div>
      </div>
      {hasValidationSchema && errorMessage && (
        <span className="h-3 pl-4 text-xs font-normal italic text-fuchsia-600">{errorMessage}</span>
      )}
    </div>
  )
})

TextInputField.displayName = 'TextInputField'

export type Selectable<T> = T & { isSelected?: boolean }
export type SelectOption = {
  _id: string
  name: string
}

export function toSelectOptionList<T extends SelectOption>(
  items: T[],
  isSelectedPredicate?: (item: T) => boolean
): Selectable<T>[] {
  const ret = []
  for (const item of items) {
    ret.push({
      ...item,
      isSelected: isSelectedPredicate?.(item) ?? false,
    })
  }
  return ret
}

type SelectInputFieldProps<T> = {
  inputClasses?: string
  size?: 'sm' | 'md'
  icon?: ReactNode
  items: Selectable<T>[]
  placeholder: string
  label?: string
  selectedItem?: T | null
  onItemSelect?: (input: T) => void
  onClear?: () => void
  isClearable?: boolean
} & HTMLAttributes<HTMLDivElement>

export function SelectInputField<T extends SelectOption = SelectOption>(props: SelectInputFieldProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const canBeCleared = props.isClearable ?? false
  const size = props?.size ?? 'sm'

  useEffect(() => {
    if (props.selectedItem) {
      setSelectedItem(props.selectedItem)
      return
    }

    for (const option of props.items) {
      if (option.isSelected === true) {
        setSelectedItem(option)
        break
      }
    }
  }, [props.selectedItem])

  return (
    <Listbox
      as="div"
      className={twMerge('relative  flex flex-col items-start gap-y-1', props.className)}
      value={selectedItem}
      onChange={val => {
        if (val) {
          props.onItemSelect?.(val)
          setSelectedItem(val)
        }
      }}
    >
      {!!props.label && (
        <Listbox.Label className="ml-5 text-xs font-medium text-slate-400">{props.label}</Listbox.Label>
      )}
      <Listbox.Button
        as="div"
        className={twMerge(
          classNames(
            'flex w-full cursor-pointer items-center justify-between rounded-full ring-1 focus:ring-2 ring-fuchsia-600 bg-white px-3 md:px-4 text-slate-800',
            [size === 'sm' ? 'py-2.5' : 'py-3.5']
          ),
          props.inputClasses
        )}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-slate-700">{props.icon}</span>
          <span
            className={classNames('select-none whitespace-nowrap text-xs font-light', {
              'line-clamp-1': Boolean(selectedItem?.name),
            })}
          >
            {selectedItem?.name || props.placeholder}
          </span>
        </div>
        <div className="ml-2 md:ml-4 flex items-center gap-x-2">
          {!!selectedItem && canBeCleared && (
            <FiXCircle
              className="text-slate-600"
              strokeWidth={1.5}
              onClick={e => {
                e.preventDefault()
                setSelectedItem(null)
                props.onClear?.()
              }}
            />
          )}
          <FiChevronDown className="text-slate-600" strokeWidth={1.5} />
        </div>
      </Listbox.Button>

      <Listbox.Options className="z-10 absolute left-0 top-full max-h-72 w-full translate-y-2 divide-y divide-slate-100 overflow-y-scroll rounded-lg border border-slate-100 bg-white py-2 shadow-lg focus:outline-0 focus:ring-0">
        {props.items.map(item => (
          <Listbox.Option
            key={item._id}
            value={item}
            className="cursor-pointer transition-all duration-300 hover:bg-slate-100"
          >
            <div className="px-4 py-2.5 text-xs font-normal text-slate-800">{item.name}</div>
          </Listbox.Option>
        ))}

        {!props.items.length && (
          <div className="flex w-full flex-col items-center justify-center px-4 py-4">
            <img src="/images/icon/empty-search.svg" className="h-16" />
            <span className="text-xs font-light italic text-slate-400">No Item</span>
          </div>
        )}
      </Listbox.Options>
    </Listbox>
  )
}

type DateSelectFieldProps = Pick<DayCellProps, 'onSelectDate'> &
  HTMLAttributes<HTMLDivElement> & {
    label: string
    placeholder: string
    buttonClasses?: string
    selectedDate: Date | null
    onClear?: () => void
  }

export function DateSelectField(props: DateSelectFieldProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(props.selectedDate)
  const [displayLabel, setDisplayLabel] = useState('')

  useEffect(() => {
    setSelectedDate(props.selectedDate)
    setDisplayLabel(props.selectedDate ? format(props.selectedDate, 'd MMM yyyy') : '...')
  }, [props.selectedDate])

  const canBeCleared = Boolean(props.onClear)

  return (
    <Menu as="div" className={twMerge('relative inline-block text-left', props.className ?? '')}>
      {!!props.label && <span className="ml-5 text-xs font-medium text-slate-400">{props.label}</span>}
      <Menu.Button
        className={twMerge(
          'flex w-full items-center gap-x-3 rounded-full border-2 ring-fuchsia-600 ring-1 focus:ring-2 border-white bg-white/70 px-6 py-1 transition duration-300',
          props.buttonClasses
        )}
      >
        <div className="shrink-0 text-secondary">
          <FiCalendar />
        </div>
        <div className="flex grow flex-col items-start">
          <span className="whitespace-nowrap text-xs font-light text-slate-800">{props.placeholder}</span>
          <span className="text-xs text-slate-800">{displayLabel}</span>
        </div>
        <div className="ml-2 flex items-center gap-x-2 md:ml-4">
          {!!selectedDate && canBeCleared && (
            <FiXCircle
              className="text-slate-600"
              strokeWidth={1.5}
              onClick={e => {
                e.preventDefault()
                setSelectedDate(null)
                props.onClear?.()
              }}
            />
          )}
          <FiChevronDown className="text-slate-600" strokeWidth={1.5} />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute inset-x-0 right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ close }) => (
              <DatePicker
                selectedDate={selectedDate ?? new Date()}
                onSelectDate={(date: Date) => {
                  setSelectedDate(date)
                  props.onSelectDate(date)
                  close()
                }}
              />
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
