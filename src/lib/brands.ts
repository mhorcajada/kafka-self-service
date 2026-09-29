import { Category } from './enums'

/** Visual identity and texts of each portal variant */
export type Brand = {
  id: 'default' | 'quironsalud'
  /** Route prefix inside the site ('' for the default portal) */
  prefix: string
  lang: string
  /** Extra class on <html>; the theme variables live in globals.css */
  themeClass: string
  title: string
  description: string
  sidebarTitle: string
  /** Path under public/, or undefined to use the default icon */
  logo?: string
  categoriesLabel: string
  categoryTitles: Record<Category, string>
  goLabel: string
  disabledLabel: string
  disabledTooltip: string
  footerNote?: string
  linksLabel: string
  /** Extra links shown in the sidebar */
  links: { title: string; url: string }[]
  /** Use description_es from the catalog */
  spanish: boolean
}

export const DefaultBrand: Brand = {
  id: 'default',
  prefix: '',
  lang: 'en',
  themeClass: 'dark',
  title: 'Kafka Self-Service Portal',
  description: 'IssueOps requests for Strimzi resources on kafka-cluster',
  sidebarTitle: 'Kafka Self-Service',
  categoriesLabel: 'Categories',
  categoryTitles: {
    [Category.TOPICS_USERS]: 'Topics & Users',
    [Category.CONNECT]: 'Kafka Connect',
    [Category.CLUSTER]: 'Cluster',
    [Category.INTEGRATION]: 'Integration'
  },
  goLabel: 'Go',
  disabledLabel: 'Not automated',
  disabledTooltip: 'No workflow processes this request yet',
  linksLabel: 'Portals',
  links: [{ title: 'Quirónsalud', url: '/quironsalud' }],
  spanish: false
}

export const QuironsaludBrand: Brand = {
  id: 'quironsalud',
  prefix: '/quironsalud',
  lang: 'es',
  themeClass: 'theme-quironsalud',
  title: 'Portal de autoservicio Kafka',
  description: 'Solicitudes IssueOps de recursos Strimzi',
  sidebarTitle: 'Autoservicio Kafka',
  logo: '/quironsalud/logo-quironsalud.png',
  categoriesLabel: 'Categorías',
  categoryTitles: {
    [Category.TOPICS_USERS]: 'Topics y usuarios',
    [Category.CONNECT]: 'Kafka Connect',
    [Category.CLUSTER]: 'Clúster',
    [Category.INTEGRATION]: 'Integración'
  },
  goLabel: 'Solicitar',
  disabledLabel: 'No automatizado',
  disabledTooltip: 'Todavía no hay un workflow que procese esta solicitud',
  footerNote:
    'Portal interno de solicitudes de plataforma. No es un canal de atención al paciente.',
  linksLabel: 'Portales',
  links: [],
  spanish: true
}

/** Prefixes a path under public/ with the site basePath */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}
