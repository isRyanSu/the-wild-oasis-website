import { type Metadata } from 'next'

import Image from 'next/image'

import { EyeOff, MapPin, User } from 'lucide-react'

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
  const { name, description, maxCapacity, image } = await getCabin(cabinId)

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
        <div className="relative -translate-x-3 scale-[1.15]">
          <Image
            src={image ?? ''}
            alt={`Cabin ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            priority={true}
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="mb-5 w-[150%] translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
            Cabin {name}
          </h3>

          <p className="mb-10 text-lg text-primary-300">{description}</p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{' '}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeOff className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  )
}
