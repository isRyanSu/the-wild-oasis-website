import countries from '@/public/data/countries.json'

interface SelectCountryProps {
  id: string
  name: string
  defaultCountry: string
  className: string
}

export default function SelectCountry({
  id,
  name,
  defaultCountry,
  className,
}: SelectCountryProps) {
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? ''

  return (
    <select
      id={id}
      name={name}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
