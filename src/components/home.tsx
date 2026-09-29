'use client'

import {
  IssueOpGrid,
  PortalFooter,
  PortalHeader
} from '@/components/issue-op-grid'
import { Toggle } from '@/components/ui/toggle'
import { type Brand } from '@/lib/brands'
import { AvailableIssueOps } from '@/lib/data'
import { Categories, Category } from '@/lib/enums'
import { useState } from 'react'

export function Home({ brand }: { brand: Brand }) {
  const [visible, setVisible] = useState<Record<Category, boolean>>({
    [Category.TOPICS_USERS]: true,
    [Category.CONNECT]: true,
    [Category.CLUSTER]: true,
    [Category.INTEGRATION]: true
  })

  const filteredIssueOps = AvailableIssueOps.filter(
    (issueOp) => visible[issueOp.category]
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PortalHeader brand={brand} />
      <div className="rounded-[var(--card-radius)] bg-muted/50 p-4">
        <div className="flex flex-row gap-4">
          {Categories.map(({ category }) => (
            <div className="flex-1" key={category}>
              <Toggle
                variant="outline"
                pressed={visible[category]}
                onPressedChange={(pressed) =>
                  setVisible((current) => ({ ...current, [category]: pressed }))
                }
                className="w-full rounded-[var(--button-radius)] hover:bg-[hsl(var(--brand))] hover:text-white data-[state=on]:bg-[hsl(var(--toggle-on))] data-[state=on]:text-[hsl(var(--toggle-on-foreground))] data-[state=on]:hover:bg-[hsl(var(--brand))]">
                {brand.categoryTitles[category]}
              </Toggle>
            </div>
          ))}
        </div>
      </div>
      <IssueOpGrid brand={brand} issueOps={filteredIssueOps} />
      <PortalFooter brand={brand} />
    </div>
  )
}
