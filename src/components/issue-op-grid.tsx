import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { type Brand } from '@/lib/brands'
import { AvailableIssueOps, issueFormUrl } from '@/lib/data'

export function PortalHeader({ brand }: { brand: Brand }) {
  return (
    <>
      <div className="min-h-[100px] rounded-[var(--card-radius)] bg-[hsl(var(--header-background))] items-center justify-items-center text-center pt-5 pb-5">
        <h1 className="text-5xl font-bold">{brand.title}</h1>
      </div>
      <hr />
    </>
  )
}

export function PortalFooter({ brand }: { brand: Brand }) {
  if (!brand.footerNote) return null
  return (
    <p className="mt-auto pt-4 text-center text-sm text-muted-foreground">
      {brand.footerNote}
    </p>
  )
}

export function IssueOpGrid({
  brand,
  issueOps
}: {
  brand: Brand
  issueOps: typeof AvailableIssueOps
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
      {issueOps.map((issueOp) => (
        <div
          className="rounded-[var(--card-radius)] bg-muted/50 min-w-[200px] max-w-full w-full mx-auto"
          key={issueOp.name}>
          <Card className="h-full flex flex-col min-h-[200px] rounded-[var(--card-radius)]">
            <CardHeader>
              <CardTitle className="issue-op-title flex items-center gap-2 text-[hsl(var(--card-title))]">
                <issueOp.icon className="h-6 w-6 text-[hsl(var(--brand))]" />
                {issueOp.name}
              </CardTitle>
              <CardDescription>
                {brand.spanish ? issueOp.descriptionEs : issueOp.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex justify-end items-end">
              {issueOp.enabled ? (
                <Button
                  asChild
                  className="bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] hover:bg-[hsl(var(--cta))]/90 py-2 px-4 rounded-[var(--button-radius)]">
                  <a
                    href={issueFormUrl(issueOp.issueFormTemplate)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {brand.goLabel}
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  title={brand.disabledTooltip}
                  className="bg-muted text-muted-foreground py-2 px-4 rounded-[var(--button-radius)]">
                  {brand.disabledLabel}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
