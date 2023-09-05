const Layout = ({ children, header }: {
  children: React.ReactNode,
  header: string,
}) => (
  <main className="max-w-5xl mx-auto p-8">
    <h1 className="text-2xl font-bold mb-4">{header}</h1>
    {children}
  </main>
)

export default Layout
