import { eachDayOfInterval } from 'date-fns'

import supabase from '@/lib/supabase'

export default async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  const today = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z'

  // Getting all bookings
  const { data: bookings, error: getBookedDatesByCabinIdError } = await supabase
    .from('Bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`)

  if (getBookedDatesByCabinIdError) {
    console.error(
      '[GetBookedDatesByCabinIdError]:',
      getBookedDatesByCabinIdError,
    )
    throw new Error(
      'Unable to load data. Please check your network connection or try again later.',
    )
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = bookings
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate as string),
        end: new Date(booking.endDate as string),
      })
    })
    .flat()

  return bookedDates as Date[]
}
