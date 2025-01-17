import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin']
});
export const metadata = {
  title: 'Enanchored',
  description: 'Enanchored',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className} style={{margin:0, padding:0}}>{children}</body>
    </html>
  )
}
