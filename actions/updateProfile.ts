'use server'

import { revalidatePath } from 'next/cache'

import supabase from '@/lib/supabase'

import { auth } from '@/lib/auth'

import { type Guest } from '@/types/Guest'

// Regular expression for an alphanumeric string between 6 and 12 characters
const regex = /^[a-zA-Z0-9]{6,12}$/

// Function to check the nationalId
function isValidNationalId(nationalId: string) {
  return regex.test(nationalId)
}

/**
 * 更新客人的个人信息。
 *
 * @param {FormData} formData - 包含客人更新信息的表单数据
 * @returns {Promise<Guest>} - 包含更新后客人信息的 Promise 对象
 * @throws {Error} - 当更新失败时抛出错误
 */
export default async function updateProfile(
  formData: FormData,
): Promise<Guest> {
  const session = await auth()

  if (!session) {
    throw new Error(
      'Unable to update profile. Please verify your login status and try again.',
    )
  }

  const nationalId = formData.get('nationalId') as string
  const nationalityData = formData.get('nationality') as string

  const [nationality, countryFlag] = nationalityData.split('%')

  if (!isValidNationalId(nationalId)) {
    throw new Error(
      'Unable to update profile. Please provide a valid National ID.',
    )
  }

  const updatedFields = { nationalId, nationality, countryFlag }

  const { data: guest, error: updateProfileError } = await supabase
    .from('Guests')
    .update(updatedFields)
    .eq('id', session.user.guestId) // FIXME: 类型问题
    .select()
    .single()

  if (!guest || updateProfileError) {
    console.error('[UpdateProfileError]:', updateProfileError)
    throw new Error(
      'Unable to update profile. Please check your network connection or try again later.',
    )
  }

  revalidatePath('/account/profile') // 刷新缓存

  return guest as Guest
}
