import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type TabItem = {
  id: string
  label: string
  icon?: ReactNode
}

type TabMenuProps<T extends readonly TabItem[]> = {
  items: T
  activeTabId: T[number]['id']
  onTabClick: (tabId: T[number]['id']) => void
} & HTMLAttributes<HTMLDivElement>

export default function TabMenu<T extends readonly TabItem[]>(props: TabMenuProps<T>) {
  return (
    <div
      className={twMerge(
        'flex shrink-0 flex-row divide-x divide-fuchsia-600 self-start overflow-hidden',
        props.className
      )}
    >
      {props.items?.map((tab, index) => (
        <div
          key={tab.id}
          className={classNames(
            'flex py-2 grow cursor-pointer flex-col items-center justify-center space-y-1 bg-fuchsia-600 bg-opacity-10 hover:bg-opacity-20 px-2 md:px-6 lg:grow-0',
            { 'rounded-l-full': index === 0, 'rounded-r-full': index === props.items.length - 1 }
          )}
          onClick={() => props.onTabClick(tab.id)}
        >
          <div
            className={classNames('flex flex-col items-stretch transition-all duration-300', {
              'gap-y-1': tab.id === props.activeTabId,
              'gap-y-0': tab.id !== props.activeTabId,
            })}
          >
            <div
              className={classNames(
                'flex items-center gap-x-1 whitespace-nowrap text-center text-xs font-medium transition-all duration-300',
                {
                  'text-slate-700': tab.id === props.activeTabId,
                  'text-fuchsia-600': tab.id !== props.activeTabId,
                }
              )}
            >
              {!!tab.icon && tab.icon}
              {tab.label}
            </div>

            <div
              className={classNames('flex w-full rounded-full bg-slate-700 transition-all duration-300', {
                'h-0.5': props.activeTabId === tab.id,
                'h-0': props.activeTabId !== tab.id,
              })}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
