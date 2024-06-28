'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  content: string
  children: React.ReactNode
}

export default function SubmitButton({ content, children }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? content : children}
    </button>
  )
}
