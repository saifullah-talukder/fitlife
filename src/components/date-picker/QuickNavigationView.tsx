export type QuickNavigationItem = { tag: number; label: string }

type QuickNavigationViewProps = {
  items: QuickNavigationItem[]
  onItemClick: (tag: number) => void
}

export default function QuickNavigationView(props: QuickNavigationViewProps) {
  return (
    <div className="grid grid-cols-3 pt-4 gap-0.5">
      {props.items.map((item, i) => (
        <button
          key={i}
          onClick={e => props.onItemClick(item.tag)}
          className="text-center py-2 rounded bg-transparent hover:bg-slate-100 transition duration-300"
        >
          <span className="text-sm font-normal text-slate-700">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
