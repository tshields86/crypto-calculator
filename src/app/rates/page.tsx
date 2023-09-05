'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'


import Layout from '@/components/layout'
import CurrencyDropdown from '@/components/currencyDropdown'
import ExchangeRateTable from '@/components/exchangeRateTable'
import { getExchangeRates } from '@/utils/api'

export default function Rates() {
  const [currency, setCurrency] = useState('USD')

  const { data: exchangeRates, error, isLoading } = useQuery({
    queryKey: ['exchangeRates', currency],
    queryFn: () => getExchangeRates(currency),
    refetchInterval: 5000,
  })

  let content = null
  if (isLoading) content = 'Loading...'
  if (error instanceof Error) content = `An error has occurred: ${error.message}`
  else content = <ExchangeRateTable currency={currency} rates={exchangeRates?.data?.rates} />
  
  return (
    <Layout header="Crypto Exchange Rates">
      <CurrencyDropdown currency={currency} setCurrency={setCurrency} />
      {content}
    </Layout>
  )
}
