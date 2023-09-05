const COINBASE_API_URL = 'https://api.coinbase.com/v2'

export const getExchangeRates = async (currency: string = 'USD') => fetch(`${COINBASE_API_URL}/exchange-rates?currency=${currency}`)
  .then(res => res.json())
