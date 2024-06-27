import supabase from '@/lib/supabase'

import { type Guest } from '@/types/Guest'

/**
 * 获取客人信息。
 *
 * @param {string} email - 客人的电子邮件地址
 * @returns {Promise<Guest | null>} - 包含客人信息的 Promise 对象，如果没有找到客人则返回 null
 * @throws {Error} - 当获取客人失败时抛出错误
 */
export default async function getGuest(email: string): Promise<Guest | null> {
  const { data: guest, error: getGuestError } = await supabase
    .from('Guests')
    .select('*')
    .eq('email', email)
    .single()

  // 错误处理
  if (!guest || getGuestError) {
    console.error('[GetGuestError]:', getGuestError)
    throw new Error(
      'Unable to fetch guest. Please check your network connection or try again later.',
    )
  }

  return guest as Guest
}
