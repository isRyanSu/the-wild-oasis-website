import { type Metadata } from 'next'

import Link from 'next/link'

import ReservationCard from '@/components/ReservationCard'

import { type Booking } from '@/types/Booking'

export const metadata: Metadata = {
  title: 'Reservations',
}

export default function Page() {
  // CHANGE
  const bookings: Booking[] = []

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link href="/cabins" className="text-accent-500 underline">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking: Booking) => (
            <ReservationCard key={booking.id} booking={booking} />
          ))}
        </ul>
      )}
    </div>
  )
}
