'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import supabase from '@/lib/supabase'

import getBookings, { type Booking } from '@/services/bookings/getBookings'

/**
 * 更新特定的预订记录。
 *
 * @param {FormData} formData - 包含预订更新数据的表单数据
 * @returns {Promise<void>} - 没有返回值的 Promise 对象
 * @throws {Error} - 当用户未登录、无权更新预订记录或更新操作失败时抛出错误
 */
export default async function updateReservation(
  formData: FormData,
): Promise<void> {
  const bookingId = Number(formData.get('bookingId'))
  const numGuests = Number(formData.get('numGuests'))
  const observations = String(formData.get('observations')).slice(0, 1000)

  const session = await auth()

  if (!session) {
    throw new Error(
      'Unable to update reservation. Please verify your login status and try again.',
    )
  }

  const bookings: Booking[] = await getBookings(session.user.guestId) // FIXME: 类型问题
  const bookingIds = bookings.map((booking) => booking.id)

  if (!bookingIds.includes(bookingId)) {
    throw new Error(
      'Unable to update reservation. Please verify your login status and try again.',
    )
  }

  const updatedFields = {
    numGuests,
    observations,
  }

  const { error: updateReservationError } = await supabase
    .from('Bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single()

  if (updateReservationError) {
    console.error('[UpdateReservationError]:', updateReservationError)
    throw new Error(
      'Unable to update reservation. Please check your network connection or try again later.',
    )
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath('/account/reservations')

  redirect('/account/reservations')
}
