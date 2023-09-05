'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Layout from '@/components/layout'
import CurrencyDropdown from '@/components/currencyDropdown'
import AssetAllocationCalculator from '@/components/assetAllocationCalculator'
import { getExchangeRates } from '@/utils/api'

export default function Calculator() {
  const [currency, setCurrency] = useState('USD')

  const { data: exchangeRates, error, isLoading } = useQuery({
    queryKey: ['exchangeRates', currency],
    queryFn: () => getExchangeRates(currency),
    refetchInterval: 5000,
  })

  let content = null
  if (isLoading) content = 'Loading...'
  if (error instanceof Error) content = `An error has occurred: ${error.message}`
  else content = <AssetAllocationCalculator currency={currency} rates={exchangeRates?.data?.rates} />

  return (
    <Layout header="Crypto Asset Allocation Calculator">
      <CurrencyDropdown currency={currency} setCurrency={setCurrency} />
      {content}
    </Layout>
  )
}
