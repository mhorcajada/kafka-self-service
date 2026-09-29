import { RootLayout } from '@/components/root-layout'
import { assetPath, QuironsaludBrand } from '@/lib/brands'
import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: `${QuironsaludBrand.title} | Quirónsalud`,
  description: QuironsaludBrand.description,
  robots: { index: false, follow: false },
  icons: { icon: assetPath('/quironsalud/logo-quironsalud.png') }
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootLayout brand={QuironsaludBrand}>{children}</RootLayout>
}
