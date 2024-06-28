'use client'

import { useOptimistic } from 'react'

import ReservationCard from '@/components/ReservationCard'

import deleteReservation from '@/actions/deleteReservation'

import { type Booking } from '@/services/bookings/getBookings'

interface ReservationListProps {
  bookings: Booking[]
}

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curentBookings, bookingId) => {
      return curentBookings.filter((booking) => booking.id !== bookingId)
    },
  )

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId)

    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          deleteFn={handleDelete}
        />
      ))}
    </ul>
  )
}
