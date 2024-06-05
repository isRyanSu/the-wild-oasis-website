import { Suspense } from 'react'

import Filter from '@/components/Filter'
import Spinner from '@/components/Spinner'
import CabinList from '@/components/CabinList'

interface CabinsPageProps {
  searchParams: { capacity?: string }
}

// 当页面转变为动态渲染后就失效了
// export const revalidate = 3600

export default function CabinsPage({ searchParams }: CabinsPageProps) {
  const capacity = searchParams?.capacity ?? 'all'

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      <Suspense
        fallback={
          <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-xl text-primary-200">Loading cabin data...</p>
          </div>
        }
      >
        <CabinList filter={capacity} />
      </Suspense>
    </div>
  )
}
