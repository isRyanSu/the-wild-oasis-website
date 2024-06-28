'use client'

import { useFormStatus } from 'react-dom'

import Image from 'next/image'

import updateProfile from '@/actions/updateProfile'

import { type Guest } from '@/types/Guest'

interface UpdateProfileFormProps {
  guest: Guest
  children: React.ReactNode
}

function Button() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  )
}

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileFormProps) {
  const { nationalId, fullName, email, nationality, countryFlag } = guest

  return (
    <form
      action={updateProfile}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullname"
          defaultValue={fullName ?? ''}
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email ?? ''}
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={countryFlag ?? 'https://flagcdn.com/cn.svg'}
            alt="Country flag"
            width={20}
            height={20}
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalId">National ID number</label>
        <input
          id="nationalId"
          name="nationalId"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultValue={nationalId ?? ''}
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button />
      </div>
    </form>
  )
}
