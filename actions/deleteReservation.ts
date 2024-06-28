'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import supabase from '@/lib/supabase'

import getBookings, { type Booking } from '@/services/bookings/getBookings'

/**
 * 删除特定的预订记录。
 *
 * @param {number} bookingId - 预订的 ID
 * @returns {Promise<void>} - 没有返回值的 Promise 对象
 * @throws {Error} - 当用户未登录或删除预订记录失败时抛出错误
 */
export default async function deleteReservation(
  bookingId: number,
): Promise<void> {
  const session = await auth()

  if (!session) {
    throw new Error(
      'Unable to delete reservation. Please verify your login status and try again.',
    )
  }

  const bookings: Booking[] = await getBookings(session.user.guestId) // FIXME: 类型问题
  const bookingIds = bookings.map((booking) => booking.id)

  if (!bookingIds.includes(bookingId)) {
    throw new Error(
      'Unable to delete reservation. Please verify your login status and try again.',
    )
  }

  const { error: deleteReservationError } = await supabase
    .from('Bookings')
    .delete()
    .eq('id', bookingId)

  if (deleteReservationError) {
    console.error('[DeleteReservationError]:', deleteReservationError)
    throw new Error(
      'Unable to delete reservation. Please check your network connection or try again later.',
    )
  }

  revalidatePath('/account/reservations')
}
