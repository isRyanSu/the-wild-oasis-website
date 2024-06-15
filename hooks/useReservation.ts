'use client'

import { useContext } from 'react'

import {
  ReservationContextType,
  ReservationContext,
} from '@/contexts/ReservationContext'

export default function useReservation() {
  const context = useContext<ReservationContextType>(ReservationContext)

  if (context === undefined) {
    throw new Error(
      'Error: ReservationContext was used outside of ReservationContextProvider!',
    )
  }

  return context
}
