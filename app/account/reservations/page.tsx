import { type Metadata } from 'next'

import Link from 'next/link'

import ReservationList from '@/components/ReservationList'

import { auth } from '@/lib/auth'

import getBookings, { type Booking } from '@/services/bookings/getBookings'

export const metadata: Metadata = {
  title: 'Reservations',
}

export default async function ReservationsPage() {
  const session = await auth()
  const bookings: Booking[] = await getBookings(session.user.guestId) // FIXME: 类型问题

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
        <ReservationList bookings={bookings} />
      )}
    </div>
  )
}
