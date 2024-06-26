'use client'

import Image from 'next/image'

import { type User } from 'next-auth'

import useReservation from '@/hooks/useReservation'

import { type Cabin } from '@/services/cabins/getCabin'

interface ReservationFormProps {
  cabin: Cabin
  user: User
}

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range } = useReservation()

  const { maxCapacity } = cabin

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>
        <div className="flex items-center gap-4">
          <Image
            src={user.image ?? ''}
            alt={user.name ?? 'User image'}
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            id="numGuests"
            name="numGuests"
            required
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          >
            <option key="" value="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 10 }, (_, i) => i + 1).map(
              (x) => (
                <option key={x} value={x}>
                  {x} {x === 1 ? 'guest' : 'guests'}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            id="observations"
            name="observations"
            placeholder="Any pets, allergies, special requirements, etc.?"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>
          <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  )
}
