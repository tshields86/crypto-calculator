'use client'

import { useState } from 'react'
import { Button, Dropdown, Label, Table, TextInput } from 'flowbite-react'

import { TOP_CRYPTO_CURRENCIES } from '@/utils/constants'
import { CurrencyRateProps } from '@/types'

const MAX_ROWS = 5
const TOTAL_ALLOCATION_AMOUNT = 100

type AllocationByCrypto = Map<string, number | undefined>

export default function AssetAllocationCalculator({
  currency,
  rates
}: CurrencyRateProps) {
  const [investmentAmount, setInvestmentAmount] = useState<number | undefined>()
  const [allocationByCrypto, setAllocationByCrypto] = useState<AllocationByCrypto>(new Map())

  const isMaxRows = allocationByCrypto.size >= MAX_ROWS
  const isNegativeInvestmentAmount = Number(investmentAmount) < 0

  const totalAllocationAmount = [...allocationByCrypto]
    .reduce((sum, [, allocationAmount]) => sum + (Number(allocationAmount) || 0), 0)

  const cryptoDropdownItems = TOP_CRYPTO_CURRENCIES
    .filter(([symbol]) => !allocationByCrypto.has(symbol))

  const investmentAmountInput = (
    <>
      <Label
        className="mb-2 block"
        htmlFor="investment-amount"
        value={`Investment amount (${currency})`}
      />
      <TextInput
        className="mb-8"
        id="investment-amount"
        onChange={({ target }) => setInvestmentAmount(Number(target.value) || undefined)}
        sizing="md"
        type="number"
        value={investmentAmount}
        {...isNegativeInvestmentAmount && { color: 'failure' }}
        helperText={isNegativeInvestmentAmount && <>Can't be a negative amount!</>}
      />
    </>
  )

  const addCryptoButton = (
    <Button
      className="mb-4"
      color="light"
      onClick={() => setAllocationByCrypto((prev: AllocationByCrypto) => {
        const map = new Map(prev)
        map.set('', undefined)
        return map
      })}
      size="xs"
      {...isMaxRows && { disabled: true }}
    >
      + Add Crypto ({allocationByCrypto.size}/5)
    </Button>
  )

  return (
    <>
      <div className="w-1/2">
        {investmentAmountInput}
        {addCryptoButton}
      </div>
      <Table className="min-w-max">
        <Table.Head>
          <Table.HeadCell className="w-1/8">
            Symbol
          </Table.HeadCell>
          <Table.HeadCell className="w-3/8">
            Allocation % ({totalAllocationAmount}/{TOTAL_ALLOCATION_AMOUNT})
          </Table.HeadCell>
          <Table.HeadCell className="w-3/8">
            Number of Shares
          </Table.HeadCell>
          <Table.HeadCell className="w-1/8">
            Remove
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {[...allocationByCrypto].map(([symbol, allocationAmount]) => {
            const negativeAllocationText = Number(allocationAmount) < 0
              && <>Can't be negative</>
            const totalAllocationText = totalAllocationAmount > TOTAL_ALLOCATION_AMOUNT
              && <>Total can't be greater than 100%</>
            const shares = Number(investmentAmount) * (Number(allocationAmount) / TOTAL_ALLOCATION_AMOUNT) * Number(rates?.[symbol])
              || ''

            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={`allocation-${symbol}`}
              >
                <Table.Cell>
                  <Dropdown
                    className="h-52 overflow-y-auto"
                    inline
                    label={symbol}
                  >
                    {cryptoDropdownItems.map(([dropdownSymbol, name]) => (
                      <Dropdown.Item
                        key={`crypto-${dropdownSymbol}`}
                        onClick={() => setAllocationByCrypto((prev: AllocationByCrypto) => {
                          const map = new Map(prev)
                          const allocationAmount = map.get(symbol)
                          map.delete(symbol)
                          map.set(dropdownSymbol, allocationAmount)
                          return map
                        })}
                      >
                        {name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    onChange={({ target }) => setAllocationByCrypto((prev: AllocationByCrypto) => {
                      const map = new Map(prev)
                      map.set(symbol, Number(target.value) || undefined)
                      return map
                    })}
                    sizing="sm"
                    type="number"
                    value={allocationAmount}
                    {...(negativeAllocationText || totalAllocationText) && { color: 'failure' }}
                    helperText={negativeAllocationText || totalAllocationText}
                  />
                </Table.Cell>
                <Table.Cell>
                  {shares}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="light"
                    onClick={() => setAllocationByCrypto((prev: AllocationByCrypto) => {
                      const map = new Map(prev)
                      map.delete(symbol)
                      return map
                    })}
                    size="xs"
                  >
                    -
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}
