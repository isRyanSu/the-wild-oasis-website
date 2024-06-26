import DateSelector from '@/components/DateSelector'
import ReservationForm from '@/components/ReservationForm'
import LoginMessage from '@/components/LoginMessage'

import { auth } from '@/lib/auth'

import { type Cabin } from '@/services/cabins/getCabin'
import getBookedDatesByCabinId from '@/services/cabins/getBookedDatesByCabinId'
import getSettings from '@/services/settings/getSettings'

interface ReservationProps {
  cabin: Cabin
}

export default async function Reservation({ cabin }: ReservationProps) {
  const { id } = cabin

  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(id),
    getSettings(),
  ])
  const session = await auth()

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}
