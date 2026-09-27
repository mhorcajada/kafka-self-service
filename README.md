# Kafka Self-Service Portal

Catalog of IssueOps requests for [Strimzi](https://strimzi.io) resources, published with GitHub Pages:

**https://mhorcajada.github.io/kafka-self-service/**

The portal is a static site. It does not run anything: each card opens a GitHub issue form in the repository where the requests are processed. That repository is private, so only its collaborators can submit requests.

## How a request works

```
Portal card ─► Issue form ─► Workflow validates and renders the manifest ─► Pull request ─► Review and merge ─► Argo CD syncs the resource
```

1. The requester opens the issue form from the portal and fills in the fields.
2. A GitHub Actions workflow parses the issue with [issue-ops/parser](https://github.com/issue-ops/parser), validates every field and writes the Strimzi custom resource as YAML.
3. The workflow opens a pull request linked to the issue and comments the result on the issue. If validation fails, it comments the error instead.
4. The repository owner reviews and merges the pull request. Nothing reaches the cluster without that approval.
5. Argo CD applies the merged manifest. The Strimzi operators reconcile the resource in Kafka.

Git is the source of truth: every change is a reviewed commit and can be traced back to its issue.

## Catalog

| Category | Operation | Strimzi resource | Status |
|---|---|---|---|
| Topics & Users | Kafka Topic | `KafkaTopic` | Automated |
| Topics & Users | Kafka User | `KafkaUser` | Not automated |
| Kafka Connect | Kafka Connector | `KafkaConnector` | Not automated |
| Kafka Connect | Kafka Connect | `KafkaConnect` | Not automated |
| Cluster | Kafka Cluster | `Kafka` | Not automated |
| Cluster | Kafka Node Pool | `KafkaNodePool` | Not automated |
| Cluster | Kafka Rebalance | `KafkaRebalance` | Not automated |
| Integration | Kafka Bridge | `KafkaBridge` | Not automated |
| Integration | Kafka MirrorMaker 2 | `KafkaMirrorMaker2` | Not automated |

"Not automated" operations already have an issue form, but no workflow processes them yet. Their cards show a disabled button.

### Kafka Topic (automated)

Creates a `KafkaTopic` and manages it through the Topic Operator.

| Field | Rule |
|---|---|
| Topic name | Lowercase letters, digits, `.` and `-`. It is used as the file name, `metadata.name` and `spec.topicName` |
| Partitions | Integer from 1 to 12. It cannot be decreased once the topic exists |
| `retention.ms` | Milliseconds, or `-1` for unlimited retention |
| `cleanup.policy` | `delete` or `compact` |
| Justification | Producers, consumers and intended use |

Checks applied before the pull request is opened:

- Only the allowed topic configuration keys can be set.
- The replication factor is fixed by the platform and cannot be changed from a request.
- User input never reaches the shell directly and is validated before any file is written.
- Removing a topic file from Git does not delete the topic. Pruning is disabled on purpose, so deletions are a manual, deliberate action.

### Kafka User (not automated)

User with `tls`, `tls-external` or `scram-sha-512` authentication, simple ACLs on topics, groups, cluster or transactional IDs, and quotas (`producerByteRate`, `consumerByteRate`, `requestPercentage`, `controllerMutationRate`). Requires the User Operator and simple authorization in the Kafka cluster.

### Kafka Connector (not automated)

Creates a connector, changes its configuration or sets its state to `running`, `paused` or `stopped`. Credentials in the connector configuration must be references to Kubernetes Secrets or config providers, never literal values.

### Kafka Connect (not automated)

Changes to the Connect workers: image, replicas, resources and liveness/readiness probes.

### Kafka Cluster (not automated)

Changes to the `Kafka` resource: Kafka version, `metadataVersion`, listeners and broker configuration. Version upgrades follow the Strimzi procedure, with `version` and `metadataVersion` changed in separate steps.

### Kafka Node Pool (not automated)

Roles (`controller`, `broker`), replicas and storage (`persistent-claim`, `jbod` or `ephemeral`) of a node pool.

### Kafka Rebalance (not automated)

Cruise Control rebalance in `full`, `add-brokers`, `remove-brokers` or `remove-disks` mode. The optimization proposal is only executed after it is approved with the `strimzi.io/rebalance=approve` annotation. Requires Cruise Control enabled in the Kafka cluster.

### Kafka Bridge (not automated)

HTTP/REST API to produce to and consume from Kafka.

### Kafka MirrorMaker 2 (not automated)

Replication of topics and consumer group offsets between Kafka clusters, for migrations or disaster recovery.

## Repository layout

| Path | Content |
|---|---|
| `data/issue-ops.json` | Catalog shown by the portal |
| `schema/issueops-self-service-v1.json` | JSON Schema of the catalog |
| `schema/validate.js` | Catalog validation, run in CI before the build |
| `src/` | Next.js application (static export) |
| `.github/workflows/pages.yml` | Build and deployment to GitHub Pages |

Catalog entry fields:

| Field | Description |
|---|---|
| `name`, `description` | Card title and text |
| `icon` | [Lucide](https://lucide.dev/icons) icon name |
| `category` | `topics-users`, `connect`, `cluster` or `integration` |
| `issueFormTemplate` | Issue form file in the processing repository |
| `label` | Label applied by the issue form |
| `enabled` | `true` when a workflow processes the request |
| `approvers`, `assignees` | Kept from the upstream schema |

## Adding or enabling an operation

1. Add the issue form and its label in the processing repository.
2. Add or update the entry in `data/issue-ops.json`.
3. Set `enabled` to `true` once the workflow that processes the request is in place.
4. Push to `main`. The Pages workflow validates the catalog, builds the site and deploys it.

## Local development

Requires the Node.js version in `.node-version`.

```bash
npm ci
npm run validate:schema
npm run dev
```

`npm run build` generates the static site in `out/`. The site is served under the `/kafka-self-service` base path, set in `next.config.ts`.

## Credits and license

Based on [issue-ops/self-service](https://github.com/issue-ops/self-service), MIT licensed. See [LICENSE](./LICENSE). Uses the Monaspace Argon font by GitHub Next, licensed under the SIL Open Font License 1.1.
