'use client'

import { IssueOpGrid, PortalHeader } from '@/components/issue-op-grid'
import { Toggle } from '@/components/ui/toggle'
import { AvailableIssueOps } from '@/lib/data'
import { Categories, Category } from '@/lib/enums'
import { useState } from 'react'

export default function Home() {
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
      <PortalHeader />
      <div className="rounded-xl bg-muted/50 p-4">
        <div className="flex flex-row gap-4">
          {Categories.map(({ category, title }) => (
            <div className="flex-1" key={category}>
              <Toggle
                variant="outline"
                pressed={visible[category]}
                onPressedChange={(pressed) =>
                  setVisible((current) => ({ ...current, [category]: pressed }))
                }
                className="w-full hover:bg-blue-500 data-[state=on]:hover:bg-blue-500">
                {title}
              </Toggle>
            </div>
          ))}
        </div>
      </div>
      <IssueOpGrid issueOps={filteredIssueOps} />
    </div>
  )
}
