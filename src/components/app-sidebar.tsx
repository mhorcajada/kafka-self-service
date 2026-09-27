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
import { RepositoryUrl } from '@/lib/data'
import { Categories } from '@/lib/enums'
import { MarkGithubIcon } from '@primer/octicons-react'
import { DockIcon, type LucideIcon, SquareLibrary } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { NavFooter } from './nav-footer'

const data = {
  navMain: [
    {
      title: 'Categories',
      url: '#',
      icon: SquareLibrary,
      isActive: true,
      items: Categories.map(({ category, title }) => ({
        title,
        url: `/${category}`
      }))
    }
  ]
}

const footer = [
  {
    name: 'mhorcajada/helm-values-monitor',
    url: RepositoryUrl,
    icon: MarkGithubIcon as LucideIcon
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <DockIcon className="h-4 w-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Kafka Self-Service
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter projects={footer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
