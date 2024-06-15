import { Suspense } from 'react'
import { type Metadata } from 'next'

import CabinInfo from '@/components/CabinInfo'
import Spinner from '@/components/Spinner'
import Reservation from '@/components/Reservation'

import getCabins, { type Cabin } from '@/services/cabins/getCabins'
import getCabin from '@/services/cabins/getCabin'

// Dynamic Metadata
export async function generateMetadata({
  params: { cabinId },
}: {
  params: { cabinId: string }
}): Promise<Metadata> {
  const { name } = await getCabin(cabinId)

  return { title: `Cabin ${name} · The Wild Oasis` } as Metadata
}

export async function generateStaticParams({
  params: { cabinId },
}: {
  params: { cabinId: string }
}) {
  const cabins = await getCabins()
  const cabinIds = cabins.map((cabin: Cabin) => ({ cabinId: String(cabin.id) }))

  return cabinIds
}

export default async function CabinPage({
  params: { cabinId },
}: {
  params: { cabinId: string }
}) {
  const cabin = await getCabin(cabinId)

  const { name } = cabin

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <CabinInfo cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  )
}
