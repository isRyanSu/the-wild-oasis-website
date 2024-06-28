import supabase from '@/lib/supabase'

export interface Booking {
  id: number
  startDate: string | null
  endDate: string | null
  numNights: number | null
  numGuests: number | null
  cabinPrice: number | null
  extrasPrice: number | null
  totalPrice: number | null
  status: 'unconfirmed' | 'checked-in' | 'checked-out' | null
  hasBreakfast: boolean | null
  isPaid: boolean | null
  observations: string | null
  createdAt: string
  cabinId: number | null
  guestId: string | null
}

/**
 * 获取特定的预订记录。
 *
 * @param {number} bookingId - 预订的 ID
 * @returns {Promise<Booking>} - 包含预订记录的 Promise 对象
 * @throws {Error} - 当获取数据失败时抛出错误
 */
export default async function getBooking(bookingId: string): Promise<Booking> {
  const { data: booking, error: getBookingError } = await supabase
    .from('Bookings')
    .select('*')
    .eq('id', bookingId)
    .single()

  // 错误处理
  if (!booking || getBookingError) {
    console.error('[GetBookingError]:', getBookingError)
    throw new Error(
      'Unable to load booking. Please check your network connection or try again later.',
    )
  }

  return booking as Booking
}
