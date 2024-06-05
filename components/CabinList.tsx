import CabinCard from '@/components/CabinCard'

import getCabins, { type Cabin } from '@/services/cabins/getCabins'

interface CabinListProps {
  filter: string
}

export default async function CabinList({ filter }: CabinListProps) {
  const cabins: Cabin[] = await getCabins()

  let filteredCabins: Cabin[] = []

  if (cabins.length === 0) return null

  if (filter === 'all') {
    filteredCabins = cabins
  }

  if (filter === 'small') {
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity && cabin.maxCapacity <= 3,
    )
  }

  if (filter === 'medium') {
    filteredCabins = cabins.filter(
      (cabin) =>
        cabin.maxCapacity && cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    )
  }

  if (filter === 'large') {
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity && cabin.maxCapacity >= 8,
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin: Cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  )
}
