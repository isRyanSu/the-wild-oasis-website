import supabase from '@/lib/supabase'

export interface Cabin {
  id: number
  name: string | null
  maxCapacity: number | null
  regularPrice: number | null
  discount: number | null
  image: string | null
}

/**
 * 获取所有小屋的列表。
 *
 * @returns {Promise<Cabin[]>} - 包含所有小屋信息的 Promise
 * @throws {Error} - 如果获取数据失败，则抛出错误
 */
export default async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error: getCabinsError } = await supabase
    .from('Cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name')

  if (getCabinsError) {
    console.error('[GetCabinsError]:', getCabinsError)

    throw new Error(
      'Unable to load cabins. Please check your network connection or try again later.',
    )
  }

  return cabins as Cabin[]
}
