import supabase from '@/lib/supabase'

export interface Booking {
  id: number
  startDate: string | null
  endDate: string | null
  numNights: number | null
  numGuests: number | null
  totalPrice: number | null
  createdAt: string
  cabinId: number | null
  guestId: number | null
  Cabins: {
    name: string | null
    image: string | null
  } | null
}

/**
 * 获取特定客人的预订记录。
 *
 * @param {GetBookingsProps} props - 包含客人 ID 的对象
 * @returns {Promise<Booking[]>} - 包含预订记录的 Promise 对象
 * @throws {Error} - 当获取数据失败时抛出错误
 */
export default async function getBookings(guestId: string): Promise<Booking[]> {
  const { data: bookings, error: getBookingsError } = await supabase
    .from('Bookings')
    .select(
      'id, startDate, endDate, numNights, numGuests, totalPrice, createdAt, cabinId, guestId, Cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate')

  // 错误处理
  if (!bookings || getBookingsError) {
    console.error('[GetBookingsError]:', getBookingsError)
    throw new Error(
      'Unable to load bookings. Please check your network connection or try again later.',
    )
  }

  return bookings as Booking[]
}
