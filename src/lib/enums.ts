/** IssueOps Categories */
export enum Category {
  TOPICS_USERS = 'topics-users',
  CONNECT = 'connect',
  CLUSTER = 'cluster',
  INTEGRATION = 'integration'
}

/** Display order and titles used by the home page and the sidebar */
export const Categories: { category: Category; title: string }[] = [
  { category: Category.TOPICS_USERS, title: 'Topics & Users' },
  { category: Category.CONNECT, title: 'Kafka Connect' },
  { category: Category.CLUSTER, title: 'Cluster' },
  { category: Category.INTEGRATION, title: 'Integration' }
]
