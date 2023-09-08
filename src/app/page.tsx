import Link from 'next/link'

import Layout from '@/components/layout'

const Home = () => (
  <Layout header="Welcome to Crypto Calculator!">
    <p className="mb-4">
      Crypto Calculator helps you easily allocate your crypto portfolio across various assets.
    </p>

    <p className="mb-4">
      Simply enter the amount you want to invest, select the cryptocurrencies and allocation amounts, and we'll calculate the number of shares for each one.
    </p>

    <p className="mb-4">
      Get started right away on the <Link href="/calculator" className="text-blue-500 hover:underline">Crypto Asset Allocation Calculator</Link> page.
    </p>

    <p>
      Crypto Calculator takes the guesswork out of building a balanced crypto portfolio. Give it a try today!
    </p>
  </Layout>
)

export default Home
