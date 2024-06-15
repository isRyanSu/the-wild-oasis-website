import supabase from '@/lib/supabase'

export interface Settings {
  id: number
  breakfastPrice: number | null
  maxGuestsPerBooking: number | null
  minBookingLength: number | null
  maxBookingLength: number | null
  createdAt: string
}

/**
 * 获取系统设置。
 *
 * @returns {Promise<Settings>} - 包含系统设置的 Promise 对象
 * @throws {Error} - 当获取数据失败时抛出错误
 */
export default async function getSettings(): Promise<Settings> {
  const { data: settings, error: getSettingsError } = await supabase
    .from('Settings')
    .select('*')
    .single()

  // 错误处理
  if (getSettingsError || !settings) {
    console.error('[GetSettingsError]:', getSettingsError)
    throw new Error(
      'Unable to load settings. Please check your network connection or try again later.',
    )
  }

  return settings as Settings
}
