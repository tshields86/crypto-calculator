'use client'

import { Dispatch, SetStateAction } from 'react'
import { Table } from 'flowbite-react'

import { formatRate } from '@/utils/helpers'
import { TOP_CRYPTO_CURRENCIES } from '@/utils/constants'
import { CurrencyRateProps } from '@/types'


const ExchangeRateTable = ({
  currency,
  rates,
}: CurrencyRateProps) => (
  <Table className="min-w-max">
    <Table.Head>
      <Table.HeadCell className="w-1/4">
        Name
      </Table.HeadCell>
      <Table.HeadCell className="w-1/4">
        Symbol
      </Table.HeadCell>
      <Table.HeadCell className="w-1/2">
        Exchange Rate ({currency})
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {rates && TOP_CRYPTO_CURRENCIES.map(([symbol, name]) => (
        <Table.Row
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
          key={`rate-${symbol}`}
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {name}
          </Table.Cell>
          <Table.Cell>
            {symbol}
          </Table.Cell>
          <Table.Cell>
            {formatRate(rates?.[symbol])}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default ExchangeRateTable
