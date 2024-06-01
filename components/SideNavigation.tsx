import Link from 'next/link'

import { Calendar, Home, User } from 'lucide-react'

import SignOutButton from '@/components/SignOutButton'

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <Home className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <Calendar className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <User className="h-5 w-5 text-primary-600" />,
  },
]

function SideNavigation() {
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex h-full flex-col gap-2 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  )
}

export default SideNavigation
