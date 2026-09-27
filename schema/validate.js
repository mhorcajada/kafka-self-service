import Ajv from 'ajv'
import fs from 'fs'

const schema = JSON.parse(
  fs.readFileSync(new URL('./issueops-self-service-v1.json', import.meta.url), 'utf8')
)
const data = JSON.parse(
  fs.readFileSync(new URL('../data/issue-ops.json', import.meta.url), 'utf8')
)

// The issue forms live in the private repository mhorcajada/helm-values-monitor
const validate = new Ajv({ allowUnionTypes: true }).compile(schema)
if (!validate(data)) {
  throw new Error(`Invalid data/issue-ops.json: ${JSON.stringify(validate.errors, null, 2)}`)
}

console.log(`OK: ${data.length} IssueOps`)
