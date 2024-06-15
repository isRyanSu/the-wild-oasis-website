'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { type DateRange } from 'react-day-picker'

interface ReservationProviderProps {
  children: React.ReactNode
}

export interface ReservationContextType {
  range: DateRange | undefined
  setRange: Dispatch<SetStateAction<DateRange | undefined>>
  resetRange: () => void
}

export const ReservationContext = createContext<ReservationContextType>({
  range: undefined,
  setRange: () => {},
  resetRange: () => {},
})

export default function ReservationProvider({
  children,
}: ReservationProviderProps) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  function resetRange() {
    setRange(undefined)
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  )
}
