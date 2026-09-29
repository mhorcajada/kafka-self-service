import {
  IssueOpGrid,
  PortalFooter,
  PortalHeader
} from '@/components/issue-op-grid'
import { type Brand } from '@/lib/brands'
import { AvailableIssueOps } from '@/lib/data'
import { Category } from '@/lib/enums'

export function categoryParams() {
  return Object.values(Category).map((category) => ({ category }))
}

export function CategoryPage({
  brand,
  category
}: {
  brand: Brand
  category: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PortalHeader brand={brand} />
      <IssueOpGrid
        brand={brand}
        issueOps={AvailableIssueOps.filter(
          (issueOp) => issueOp.category === category
        )}
      />
      <PortalFooter brand={brand} />
    </div>
  )
}
