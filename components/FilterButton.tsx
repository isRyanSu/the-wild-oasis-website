import clsx from 'clsx'

interface FilterButtonProps {
  filter: string
  activeFilter: string
  children: React.ReactNode
  handleFilter: (filter: string) => void
}

export default function FilterButton({
  filter,
  activeFilter,
  children,
  handleFilter,
}: FilterButtonProps) {
  return (
    <button
      className={clsx(
        'px-5 py-2 hover:bg-primary-700',
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : '',
      )}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  )
}
