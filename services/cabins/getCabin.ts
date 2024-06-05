import { notFound } from 'next/navigation'

import supabase from '@/lib/supabase'

export interface Cabin {
  id: number
  name: string | null
  description: string | null
  maxCapacity: number | null
  regularPrice: number | null
  discount: number | null
  image: string | null
  createdAt: string
}

/**
 * 获取指定 ID 的小屋详情。
 *
 * @param {string} cabinId - 小屋的唯一标识符
 * @returns {Promise<Cabin>} - Promise 对象，包含指定小屋的详细信息
 * @throws {Error} - 若获取小屋信息失败，则会调用 notFound()
 */
export default async function getCabin(cabinId: string): Promise<Cabin> {
  const { data: cabin, error: getCabinError } = await supabase
    .from('Cabins')
    .select('*')
    .eq('id', cabinId)
    .single()

  if (getCabinError) {
    console.error('[GetCabinError]:', getCabinError)

    notFound()
  }

  return cabin as Cabin
}
