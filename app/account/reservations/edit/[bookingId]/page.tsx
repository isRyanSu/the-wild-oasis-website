import SubmitButton from '@/components/SubmitButton'

import updateReservation from '@/actions/updateReservation'

import getBooking from '@/services/bookings/getBooking'
import getCabin from '@/services/cabins/getCabin'

interface EditPageProps {
  params: {
    bookingId: string
  }
}

export default async function EditPage({
  params: { bookingId },
}: EditPageProps) {
  const { numGuests, observations, cabinId } = await getBooking(bookingId)
  const { maxCapacity } = await getCabin(cabinId as unknown as string)

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservation}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <input name="bookingId" type="hidden" value={bookingId} />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            id="numGuests"
            name="numGuests"
            defaultValue={numGuests ?? 0}
            required
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 8 }, (_, i) => i + 1).map(
              (x) => (
                <option key={x} value={x}>
                  {x} {x === 1 ? 'guest' : 'guests'}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            id="observations"
            name="observations"
            defaultValue={observations ?? ''}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton content="Updating...">Update reservation</SubmitButton>
        </div>
      </form>
    </div>
  )
}
