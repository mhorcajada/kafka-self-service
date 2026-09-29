import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { type Brand } from '@/lib/brands'

export function RootLayout({
  brand,
  fontClassName,
  children
}: {
  brand: Brand
  fontClassName?: string
  children: React.ReactNode
}) {
  return (
    <html lang={brand.lang} className={brand.themeClass}>
      <body className={`${fontClassName ?? ''} antialiased`}>
        <SidebarProvider>
          <AppSidebar brand={brand} />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
