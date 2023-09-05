'use client'

import { Navbar } from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { path:'/', title:'Home'},
  { path:'/rates', title:'Exchange Rates' },
  { path: '/calculator', title:'Asset Allocation Calculator' },
]

export default function TopNavbar() {
  const pathname = usePathname()

  return (
    <Navbar
      className="bg-slate-900 text-white"
      fluid
    >
      <Link
        className="font-semibold text-xl whitespace-nowrap"
        href="/"
      >
        Crypto Calculator
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {NAV_LINKS.map(({ path, title }, idx) => (
          <Link
            className={pathname === path ? 'text-amber-300' : ''}
            href={path}
            key={idx}
          >
            {title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
