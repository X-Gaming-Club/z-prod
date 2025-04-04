import './globals.css'

export const metadata = {
  title: 'Insights at Scale',
  description: 'A Claude-like UI clone built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}