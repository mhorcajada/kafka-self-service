import { RootLayout } from '@/components/root-layout'
import { DefaultBrand } from '@/lib/brands'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

const monaspaceArgon = localFont({
  src: '../../public/fonts/MonaspaceArgonVarVF[wght,wdth,slnt].ttf',
  weight: '400',
  style: 'normal'
})

export const metadata: Metadata = {
  title: DefaultBrand.title,
  description: DefaultBrand.description
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RootLayout brand={DefaultBrand} fontClassName={monaspaceArgon.className}>
      {children}
    </RootLayout>
  )
}
