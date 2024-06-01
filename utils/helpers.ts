import { formatDistance, parseISO } from 'date-fns'

// 格式化时间距离函数，接受一个日期字符串并返回一个格式化的时间差距字符串
export function formatDistanceFromNow(dateStr: string): string {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '')
}
