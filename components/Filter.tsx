'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import FilterButton from '@/components/FilterButton'

export default function Filter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeFilter = searchParams.get('capacity') ?? 'all'

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams)

    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex border border-primary-800">
      <FilterButton
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </FilterButton>
      <FilterButton
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        2&mdash;3 guests
      </FilterButton>
      <FilterButton
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 guests
      </FilterButton>
    </div>
  )
}
