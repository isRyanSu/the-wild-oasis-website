import CabinCard from '@/components/CabinCard'

import getCabins, { type Cabin } from '@/services/cabins/getCabins'

export default async function CabinList() {
  const cabins: Cabin[] = await getCabins()

  if (cabins.length === 0) return null

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {cabins.map((cabin: Cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  )
}
