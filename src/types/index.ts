export interface CurrencyRateProps {
  currency: string,
  rates: {
    [key: string]: string
  },
}
