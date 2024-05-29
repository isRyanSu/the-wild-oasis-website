import Link from 'next/link'
import Image from 'next/image'

import logo from '@/public/logo.png'

export default function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        width="60"
        height="60"
        alt="Logo of The Wild Oasis"
        quality={80}
        priority={true}
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  )
}
