import Image from 'next/image'

import { User, MapPin, EyeOff } from 'lucide-react'

import TextExpander from '@/components/TextExpander'

import { type Cabin } from '@/services/cabins/getCabin'

interface CabinInfoProps {
  cabin: Cabin
}

export default function CabinInfo({ cabin }: CabinInfoProps) {
  const { name, description, maxCapacity, image } = cabin

  return (
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

        <p className="mb-10 text-lg text-primary-300">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
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
  )
}
