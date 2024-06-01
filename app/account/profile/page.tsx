import { type Metadata } from 'next'

import Image from 'next/image'

import SelectCountry from '@/components/SelectCountry'

import countries from '@/public/data/countries.json'

export const metadata: Metadata = {
  title: 'Update profile',
}

export default function Page() {
  // CHANGE
  const countryFlag = countries[48].flag
  const nationality = 'China'

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <Image
              src={countryFlag}
              alt="Country flag"
              width={20}
              height={20}
              className="h-5 rounded-sm"
            />
          </div>

          <SelectCountry
            id="nationality"
            name="nationality"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            defaultCountry={nationality}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            id="nationalID"
            name="nationalID"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update profile
          </button>
        </div>
      </form>
    </div>
  )
}