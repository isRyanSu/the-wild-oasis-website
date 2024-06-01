export type Booking = {
  id: number
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  status: 'unconfirmed' | 'checked-in' | 'checked-out'
  hasBreakfast: boolean
  isPaid: boolean
  observations: string
  createdAt: string
  cabinId: number
  guestId: string
}
