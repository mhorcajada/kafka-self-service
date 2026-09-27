import { IssueOpGrid, PortalHeader } from '@/components/issue-op-grid'
import { AvailableIssueOps } from '@/lib/data'
import { Category } from '@/lib/enums'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(Category).map((category) => ({ category }))
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PortalHeader />
      <IssueOpGrid
        issueOps={AvailableIssueOps.filter(
          (issueOp) => issueOp.category === category
        )}
      />
    </div>
  )
}
