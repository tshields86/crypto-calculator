'use client'

import { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'flowbite-react'

import { TOP_FIAT_CURRENCIES } from '@/utils/constants'

const CurrencyDropdown = ({
  currency,
  setCurrency,
}: {
  currency: string,
  setCurrency: Dispatch<SetStateAction<string>>,
  }) => (
  <div className="mb-4 flex justify-end">
    <Dropdown
      inline
      label={`Currency (${currency})`}
    >
      {TOP_FIAT_CURRENCIES.map(([symbol, name]) => (
        <Dropdown.Item
          key={`currency-${symbol}`}
          onClick={() => setCurrency(symbol)}
        >
          {name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  </div>
)

export default CurrencyDropdown
