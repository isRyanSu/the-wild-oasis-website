import { type Metadata } from 'next'

import SideNavigation from '@/components/SideNavigation'

export const metadata: Metadata = {
  title: 'Account',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-3">{children}</div>
    </div>
  )
}
