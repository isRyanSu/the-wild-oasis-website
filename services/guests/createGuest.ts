import supabase from '@/lib/supabase'

import { type Guest } from '@/types/Guest'

interface CreateGuestProps {
  fullName: string
  email: string
}

/**
 * 创建一个新的客人。
 *
 * @param {CreateGuestProps} newGuest - 新客人的信息
 * @returns {Promise<Guest>} - 包含新创建客人信息的 Promise 对象
 * @throws {Error} - 当创建客人失败时抛出错误
 */
export default async function createGuest(
  newGuest: CreateGuestProps,
): Promise<Guest> {
  const { data: guest, error: createGuestError } = await supabase
    .from('Guests')
    .insert([newGuest])
    .single()

  // 错误处理
  if (!guest || createGuestError) {
    console.error('[CreateGuestError]:', createGuestError)
    throw new Error(
      'Unable to create guest. Please check your network connection or try again later.',
    )
  }

  return guest as Guest
}
