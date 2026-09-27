import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AvailableIssueOps, issueFormUrl } from '@/lib/data'

export function PortalHeader() {
  return (
    <>
      <div className="min-h-[100px] rounded-xl bg-muted/50 items-center justify-items-center text-center pt-5 pb-5">
        <h1 className="text-5xl font-bold">Kafka Self-Service Portal</h1>
      </div>
      <hr />
    </>
  )
}

export function IssueOpGrid({
  issueOps
}: {
  issueOps: typeof AvailableIssueOps
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
      {issueOps.map((issueOp) => (
        <div
          className="rounded-xl bg-muted/50 min-w-[200px] max-w-full w-full mx-auto"
          key={issueOp.name}>
          <Card className="h-full flex flex-col min-h-[200px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <issueOp.icon className="h-6 w-6 text-blue-500" />
                {issueOp.name}
              </CardTitle>
              <CardDescription>{issueOp.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex justify-end items-end">
              {issueOp.enabled ? (
                <Button
                  asChild
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  <a
                    href={issueFormUrl(issueOp.issueFormTemplate)}
                    target="_blank"
                    rel="noopener noreferrer">
                    Go
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  title="No workflow processes this request yet"
                  className="bg-muted text-muted-foreground py-2 px-4 rounded">
                  Not automated
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
