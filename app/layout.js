import './globals.css'

export const metadata = {
  title: 'XGaming',
  description: 'Insights at Scale',
  icons: {
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    shortcut: ["/favicon-16x16.png"],
    icon: [
      { url: "/favicon.ico", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  }
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