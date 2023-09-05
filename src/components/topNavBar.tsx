'use client'

import { Navbar } from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

const NAV_LINKS = [
  { path:'/', name:'Home'},
  { path:'/rates', name:'Exchange Rates' },
  { path: '/calculator', name:'Asset Allocation Calculator' },
]

export default function TopNavbar() {
  const pathname = usePathname()

  return (
    <Navbar
      className="bg-slate-800 text-white"
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
        {NAV_LINKS.map(({ path, name }, idx) => (
          <Link
            className={classNames({
              'text-gray-500 hover:text-gray-300': pathname !== path,
              'text-gray-300': pathname === path,
            })}
            href={path}
            key={idx}
          >
            {name}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
