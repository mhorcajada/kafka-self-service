'use client'

import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { assetPath, type Brand } from '@/lib/brands'
import { RepositoryUrl } from '@/lib/data'
import { Categories } from '@/lib/enums'
import { MarkGithubIcon } from '@primer/octicons-react'
import { DockIcon, Link2, type LucideIcon, SquareLibrary } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { NavFooter } from './nav-footer'

const footer = [
  {
    name: 'mhorcajada/helm-values-monitor',
    url: RepositoryUrl,
    icon: MarkGithubIcon as LucideIcon
  }
]

export function AppSidebar({
  brand,
  ...props
}: React.ComponentProps<typeof Sidebar> & { brand: Brand }) {
  const navMain = [
    {
      title: brand.categoriesLabel,
      url: '#',
      icon: SquareLibrary,
      isActive: true,
      items: Categories.map(({ category }) => ({
        title: brand.categoryTitles[category],
        url: `${brand.prefix}/${category}`
      }))
    },
    ...(brand.links.length > 0
      ? [
          {
            title: brand.linksLabel,
            url: '#',
            icon: Link2,
            isActive: true,
            items: brand.links
          }
        ]
      : [])
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-auto"
              asChild>
              <Link href={brand.prefix || '/'}>
                {brand.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={assetPath(brand.logo)}
                    alt={brand.sidebarTitle}
                    className="h-10 w-auto"
                  />
                ) : (
                  <>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <DockIcon className="h-4 w-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {brand.sidebarTitle}
                      </span>
                    </div>
                  </>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter projects={footer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
