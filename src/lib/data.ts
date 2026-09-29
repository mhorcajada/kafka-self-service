import * as Icons from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import IssueOps from '../../data/issue-ops.json'
import { Category } from './enums'

/** Repository where the issues are opened and processed */
export const RepositoryUrl = 'https://github.com/mhorcajada/helm-values-monitor'

/**
 * Maintains the list of available IssueOps operations.
 *
 * This is used to generate the list of operations in the Self-Service UI.
 */
export const AvailableIssueOps: {
  approvers: string[]
  assignees: string[]
  category: Category
  description: string
  descriptionEs: string
  enabled: boolean
  icon: LucideIcon // For icons, see: https://lucide.dev/icons
  issueFormTemplate: string
  label: string
  name: string
}[] = IssueOps.map((issueOp) => ({
  approvers: issueOp.approvers as string[],
  assignees: issueOp.assignees as string[],
  category: issueOp.category as Category,
  description: issueOp.description as string,
  descriptionEs: issueOp.description_es as string,
  enabled: issueOp.enabled as boolean,
  icon: Icons[issueOp.icon as keyof typeof Icons] as LucideIcon,
  issueFormTemplate: issueOp.issueFormTemplate as string,
  label: issueOp.label as string,
  name: issueOp.name as string
}))

/** Issue form URL. See: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue#creating-an-issue-from-a-url-query */
export function issueFormUrl(issueFormTemplate: string): string {
  return `${RepositoryUrl}/issues/new?template=${encodeURIComponent(issueFormTemplate)}`
}
