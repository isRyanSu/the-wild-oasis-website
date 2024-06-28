'use client'

import { useTransition } from 'react'
import { Trash } from 'lucide-react'

interface DeleteReservationProps {
  bookingId: number
  deleteFn: (bookingId: number) => void
}

export default function DeleteReservation({
  bookingId,
  deleteFn,
}: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (confirm('Are you sure you want to delete this reservation?')) {
      startTransition(() => deleteFn(bookingId))
    }
  }

  return (
    <button
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
      onClick={handleDelete}
    >
      <Trash className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
      <span className="mt-1">{isPending ? 'Deleting...' : 'Delete'}</span>
    </button>
  )
}
